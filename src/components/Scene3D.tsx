import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import type { VisualKey } from '../types'
import { useReducedMotion } from '../lib/store'

const PALETTE = {
  cyan: 0x4fdcff,
  green: 0x3ddc97,
  violet: 0xa78bfa,
  red: 0xff5b6e,
  amber: 0xffb547,
  dim: 0x1d3a55,
}

interface Props {
  variant: VisualKey
  className?: string
  /** visual density; lower on small cards for performance */
  density?: number
}

/**
 * Lightweight Three.js scene renderer.
 * - caps device pixel ratio
 * - pauses rendering when scrolled out of view (IntersectionObserver)
 * - honours prefers-reduced-motion by rendering a single static frame
 */
export default function Scene3D({ variant, className = '', density = 1 }: Props) {
  const host = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = host.current
    if (!el) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100)
    camera.position.set(0, 0, 8)

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' })
    } catch {
      return // WebGL unavailable — the surrounding UI still renders fine
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    el.appendChild(renderer.domElement)
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'
    renderer.domElement.style.display = 'block'

    scene.add(new THREE.AmbientLight(0xffffff, 0.55))
    const key = new THREE.PointLight(PALETTE.cyan, 90, 60)
    key.position.set(6, 6, 8)
    scene.add(key)
    const rim = new THREE.PointLight(PALETTE.violet, 60, 60)
    rim.position.set(-7, -4, 4)
    scene.add(rim)

    const root = new THREE.Group()
    scene.add(root)

    const disposables: Array<{ dispose: () => void }> = []
    const track = <T extends THREE.BufferGeometry | THREE.Material>(x: T) => {
      disposables.push(x)
      return x
    }

    const build = buildersFor(variant)
    const update = build(root, track, density)

    let raf = 0
    let visible = true
    const clock = new THREE.Clock()

    const resize = () => {
      const w = el.clientWidth || 1
      const h = el.clientHeight || 1
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(el)

    const io = new IntersectionObserver((entries) => {
      visible = entries[0]?.isIntersecting ?? true
    })
    io.observe(el)

    let pointerX = 0
    let pointerY = 0
    const onPointer = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      pointerX = ((e.clientX - r.left) / r.width - 0.5) * 2
      pointerY = ((e.clientY - r.top) / r.height - 0.5) * 2
    }
    el.addEventListener('pointermove', onPointer)

    const loop = () => {
      raf = requestAnimationFrame(loop)
      if (!visible) return
      const t = clock.getElapsedTime()
      update(t)
      root.rotation.y += (pointerX * 0.35 - root.rotation.y * 0.02) * 0.012
      root.rotation.x += (-pointerY * 0.22 - root.rotation.x) * 0.03
      renderer.render(scene, camera)
    }

    if (reduced) {
      update(0)
      renderer.render(scene, camera)
    } else {
      loop()
    }

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      el.removeEventListener('pointermove', onPointer)
      disposables.forEach((d) => d.dispose())
      renderer.dispose()
      if (renderer.domElement.parentNode === el) el.removeChild(renderer.domElement)
    }
  }, [variant, density, reduced])

  return <div ref={host} className={className} aria-hidden="true" />
}

type Track = <T extends THREE.BufferGeometry | THREE.Material>(x: T) => T
type Builder = (root: THREE.Group, track: Track, density: number) => (t: number) => void

function buildersFor(variant: VisualKey): Builder {
  switch (variant) {
    case 'lock':
      return buildLock
    case 'firewall':
      return buildFirewall
    case 'malware':
      return buildMalware
    case 'cloud':
      return buildCloud
    case 'network':
      return buildNetwork
    case 'radar':
      return buildRadar
    case 'shield':
      return buildShield
    case 'globe':
    default:
      return buildGlobe
  }
}

function particleField(track: Track, count: number, radius: number, color: number, size = 0.045) {
  const pos = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const r = radius * (0.6 + Math.random() * 0.6)
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
    pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
    pos[i * 3 + 2] = r * Math.cos(phi)
  }
  const geo = track(new THREE.BufferGeometry())
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  const mat = track(new THREE.PointsMaterial({ color, size, transparent: true, opacity: 0.7 }))
  return new THREE.Points(geo, mat)
}

const buildGlobe: Builder = (root, track, d) => {
  const globe = new THREE.Group()
  root.add(globe)

  const wire = new THREE.LineSegments(
    track(new THREE.EdgesGeometry(track(new THREE.IcosahedronGeometry(2.5, 3)))),
    track(new THREE.LineBasicMaterial({ color: PALETTE.cyan, transparent: true, opacity: 0.22 })),
  )
  globe.add(wire)

  const core = new THREE.Mesh(
    track(new THREE.IcosahedronGeometry(2.42, 2)),
    track(new THREE.MeshStandardMaterial({ color: 0x08203a, roughness: 0.35, metalness: 0.6, transparent: true, opacity: 0.55 })),
  )
  globe.add(core)

  const nodeCount = Math.round(26 * d)
  const nodes: THREE.Mesh[] = []
  const nodeGeo = track(new THREE.SphereGeometry(0.055, 10, 10))
  for (let i = 0; i < nodeCount; i++) {
    const mat = track(new THREE.MeshBasicMaterial({ color: i % 5 === 0 ? PALETTE.green : PALETTE.cyan }))
    const m = new THREE.Mesh(nodeGeo, mat)
    const phi = Math.acos(2 * ((i + 0.5) / nodeCount) - 1)
    const theta = Math.PI * (1 + Math.sqrt(5)) * i
    m.position.setFromSphericalCoords(2.55, phi, theta)
    globe.add(m)
    nodes.push(m)
  }

  // arcs between nearby nodes
  for (let i = 0; i < nodes.length; i++) {
    const a = nodes[i].position
    const b = nodes[(i * 7 + 3) % nodes.length].position
    const mid = a.clone().add(b).multiplyScalar(0.5).setLength(3.35)
    const curve = new THREE.QuadraticBezierCurve3(a.clone(), mid, b.clone())
    const geo = track(new THREE.BufferGeometry().setFromPoints(curve.getPoints(28)))
    const mat = track(new THREE.LineBasicMaterial({ color: PALETTE.cyan, transparent: true, opacity: 0.2 }))
    globe.add(new THREE.Line(geo, mat))
  }

  const dust = particleField(track, Math.round(320 * d), 6.4, PALETTE.violet, 0.035)
  root.add(dust)

  const ring = new THREE.Mesh(
    track(new THREE.TorusGeometry(3.5, 0.008, 8, 128)),
    track(new THREE.MeshBasicMaterial({ color: PALETTE.green, transparent: true, opacity: 0.5 })),
  )
  ring.rotation.x = Math.PI / 2.3
  root.add(ring)

  return (t) => {
    globe.rotation.y = t * 0.16
    ring.rotation.z = t * 0.4
    dust.rotation.y = -t * 0.03
    nodes.forEach((n, i) => {
      const s = 1 + Math.sin(t * 2.2 + i) * 0.35
      n.scale.setScalar(s)
    })
  }
}

const buildLock: Builder = (root, track, d) => {
  const body = new THREE.Mesh(
    track(new THREE.BoxGeometry(2.3, 1.8, 1.0)),
    track(new THREE.MeshStandardMaterial({ color: 0x0d2c46, metalness: 0.85, roughness: 0.25 })),
  )
  body.position.y = -0.5
  root.add(body)

  const shackle = new THREE.Mesh(
    track(new THREE.TorusGeometry(0.72, 0.16, 16, 40, Math.PI)),
    track(new THREE.MeshStandardMaterial({ color: PALETTE.cyan, metalness: 0.9, roughness: 0.2, emissive: 0x0a3d52 })),
  )
  shackle.position.y = 0.42
  root.add(shackle)

  const keyhole = new THREE.Mesh(
    track(new THREE.TorusGeometry(0.22, 0.06, 12, 28)),
    track(new THREE.MeshBasicMaterial({ color: PALETTE.green })),
  )
  keyhole.position.set(0, -0.45, 0.52)
  root.add(keyhole)

  const rings: THREE.Mesh[] = []
  for (let i = 0; i < 3; i++) {
    const r = new THREE.Mesh(
      track(new THREE.TorusGeometry(2.2 + i * 0.45, 0.01, 8, 96)),
      track(new THREE.MeshBasicMaterial({ color: i % 2 ? PALETTE.violet : PALETTE.cyan, transparent: true, opacity: 0.45 })),
    )
    r.rotation.x = Math.PI / 2 + i * 0.25
    root.add(r)
    rings.push(r)
  }
  const dust = particleField(track, Math.round(240 * d), 5, PALETTE.cyan, 0.03)
  root.add(dust)

  return (t) => {
    root.rotation.z = Math.sin(t * 0.4) * 0.05
    rings.forEach((r, i) => (r.rotation.z = t * (0.3 + i * 0.18) * (i % 2 ? -1 : 1)))
    keyhole.scale.setScalar(1 + Math.sin(t * 3) * 0.12)
    dust.rotation.y = t * 0.05
  }
}

const buildFirewall: Builder = (root, track, d) => {
  const wall = new THREE.Group()
  root.add(wall)
  const brick = track(new THREE.BoxGeometry(0.52, 0.3, 0.16))
  for (let y = -4; y <= 4; y++) {
    for (let x = -4; x <= 4; x++) {
      const mat = track(
        new THREE.MeshStandardMaterial({
          color: 0x0b2b45,
          emissive: (x + y) % 3 === 0 ? PALETTE.cyan : 0x061a2b,
          emissiveIntensity: 0.35,
          metalness: 0.6,
          roughness: 0.4,
        }),
      )
      const m = new THREE.Mesh(brick, mat)
      m.position.set(x * 0.56 + (y % 2 ? 0.28 : 0), y * 0.34, 0)
      wall.add(m)
    }
  }

  const packets: Array<{ mesh: THREE.Mesh; speed: number; blocked: boolean; offset: number }> = []
  const pGeo = track(new THREE.SphereGeometry(0.08, 10, 10))
  const count = Math.round(26 * d)
  for (let i = 0; i < count; i++) {
    const blocked = i % 3 === 0
    const mat = track(new THREE.MeshBasicMaterial({ color: blocked ? PALETTE.red : PALETTE.green }))
    const m = new THREE.Mesh(pGeo, mat)
    m.position.set((Math.random() - 0.5) * 4, (Math.random() - 0.5) * 2.6, -4)
    root.add(m)
    packets.push({ mesh: m, speed: 1.1 + Math.random() * 1.3, blocked, offset: Math.random() * 6 })
  }

  return (t) => {
    wall.rotation.y = Math.sin(t * 0.25) * 0.22
    packets.forEach((p) => {
      const cycle = ((t * p.speed + p.offset) % 6) - 4
      const limit = p.blocked ? -0.25 : 3.2
      p.mesh.position.z = Math.min(cycle, limit)
      const mat = p.mesh.material as THREE.MeshBasicMaterial
      mat.opacity = 1
      p.mesh.scale.setScalar(p.blocked && cycle > -0.4 ? Math.max(0.1, 1 - (cycle + 0.4) * 3) : 1)
    })
  }
}

const buildMalware: Builder = (root, track, d) => {
  const core = new THREE.Mesh(
    track(new THREE.IcosahedronGeometry(1.25, 1)),
    track(new THREE.MeshStandardMaterial({ color: 0x3a0d16, emissive: PALETTE.red, emissiveIntensity: 0.45, roughness: 0.3, metalness: 0.5, flatShading: true })),
  )
  root.add(core)

  const spikes = new THREE.Mesh(
    track(new THREE.IcosahedronGeometry(1.75, 1)),
    track(new THREE.MeshBasicMaterial({ color: PALETTE.red, wireframe: true, transparent: true, opacity: 0.35 })),
  )
  root.add(spikes)

  const victims: THREE.Mesh[] = []
  const vGeo = track(new THREE.BoxGeometry(0.3, 0.3, 0.3))
  const n = Math.round(16 * d)
  for (let i = 0; i < n; i++) {
    const mat = track(new THREE.MeshStandardMaterial({ color: 0x0d2c46, emissive: 0x08415e, metalness: 0.7, roughness: 0.3 }))
    const m = new THREE.Mesh(vGeo, mat)
    const a = (i / n) * Math.PI * 2
    m.position.set(Math.cos(a) * 3.4, Math.sin(a * 1.7) * 1.5, Math.sin(a) * 3.4)
    root.add(m)
    victims.push(m)
  }
  const dust = particleField(track, Math.round(260 * d), 5.6, PALETTE.red, 0.03)
  root.add(dust)

  return (t) => {
    core.rotation.x = t * 0.4
    core.rotation.y = t * 0.55
    spikes.rotation.y = -t * 0.32
    spikes.scale.setScalar(1 + Math.sin(t * 1.8) * 0.06)
    victims.forEach((v, i) => {
      const infected = (Math.sin(t * 0.7 - i * 0.5) + 1) / 2
      const mat = v.material as THREE.MeshStandardMaterial
      mat.emissive.setHex(infected > 0.75 ? PALETTE.red : 0x08415e)
      v.rotation.x = t * 0.6 + i
      v.rotation.y = t * 0.4
    })
    dust.rotation.y = t * 0.06
  }
}

const buildCloud: Builder = (root, track, d) => {
  const cloud = new THREE.Group()
  root.add(cloud)
  const blobGeo = track(new THREE.SphereGeometry(1, 20, 20))
  const positions: [number, number, number, number][] = [
    [0, 0.3, 0, 1.15],
    [-1.35, 0, 0.2, 0.85],
    [1.3, 0.05, -0.15, 0.9],
    [0.55, 0.75, 0.25, 0.7],
    [-0.6, 0.7, -0.2, 0.62],
  ]
  positions.forEach(([x, y, z, s]) => {
    const mat = track(
      new THREE.MeshStandardMaterial({ color: 0x0e3350, emissive: 0x0a4463, emissiveIntensity: 0.35, roughness: 0.35, metalness: 0.55, transparent: true, opacity: 0.9 }),
    )
    const m = new THREE.Mesh(blobGeo, mat)
    m.position.set(x, y, z)
    m.scale.setScalar(s)
    cloud.add(m)
  })

  const racks: THREE.Mesh[] = []
  const rGeo = track(new THREE.BoxGeometry(0.34, 0.7, 0.34))
  for (let i = 0; i < Math.round(9 * d); i++) {
    const mat = track(new THREE.MeshStandardMaterial({ color: 0x0a2138, emissive: PALETTE.cyan, emissiveIntensity: 0.15, metalness: 0.8, roughness: 0.25 }))
    const m = new THREE.Mesh(rGeo, mat)
    m.position.set((i % 3) * 0.6 - 0.6, -2.1, Math.floor(i / 3) * 0.6 - 0.6)
    root.add(m)
    racks.push(m)
  }

  const streams: THREE.Mesh[] = []
  const sGeo = track(new THREE.SphereGeometry(0.06, 8, 8))
  for (let i = 0; i < Math.round(18 * d); i++) {
    const mat = track(new THREE.MeshBasicMaterial({ color: i % 4 === 0 ? PALETTE.green : PALETTE.cyan }))
    const m = new THREE.Mesh(sGeo, mat)
    root.add(m)
    streams.push(m)
  }

  return (t) => {
    cloud.rotation.y = t * 0.14
    cloud.position.y = Math.sin(t * 0.7) * 0.09
    racks.forEach((r, i) => {
      const mat = r.material as THREE.MeshStandardMaterial
      mat.emissiveIntensity = 0.12 + ((Math.sin(t * 2 + i) + 1) / 2) * 0.5
    })
    streams.forEach((s, i) => {
      const p = ((t * 0.6 + i / streams.length) % 1)
      const a = (i / streams.length) * Math.PI * 2
      s.position.set(Math.cos(a) * 1.2 * (1 - p * 0.4), -2.1 + p * 2.3, Math.sin(a) * 1.2 * (1 - p * 0.4))
    })
  }
}

const buildNetwork: Builder = (root, track, d) => {
  const nodes: THREE.Mesh[] = []
  const pts: THREE.Vector3[] = []
  const n = Math.round(20 * d)
  const geo = track(new THREE.OctahedronGeometry(0.2, 0))
  for (let i = 0; i < n; i++) {
    const mat = track(
      new THREE.MeshStandardMaterial({ color: 0x0d2c46, emissive: i % 6 === 0 ? PALETTE.violet : PALETTE.cyan, emissiveIntensity: 0.4, metalness: 0.7, roughness: 0.3 }),
    )
    const m = new THREE.Mesh(geo, mat)
    const p = new THREE.Vector3(
      (Math.random() - 0.5) * 6.5,
      (Math.random() - 0.5) * 4,
      (Math.random() - 0.5) * 5,
    )
    m.position.copy(p)
    pts.push(p)
    root.add(m)
    nodes.push(m)
  }
  const linePos: number[] = []
  for (let i = 0; i < pts.length; i++) {
    for (let j = i + 1; j < pts.length; j++) {
      if (pts[i].distanceTo(pts[j]) < 2.6) linePos.push(...pts[i].toArray(), ...pts[j].toArray())
    }
  }
  const lg = track(new THREE.BufferGeometry())
  lg.setAttribute('position', new THREE.BufferAttribute(new Float32Array(linePos), 3))
  root.add(new THREE.LineSegments(lg, track(new THREE.LineBasicMaterial({ color: PALETTE.cyan, transparent: true, opacity: 0.22 }))))

  return (t) => {
    root.rotation.y = t * 0.12
    nodes.forEach((m, i) => {
      m.rotation.x = t * 0.8 + i
      m.rotation.y = t * 0.5
      const mat = m.material as THREE.MeshStandardMaterial
      mat.emissiveIntensity = 0.25 + ((Math.sin(t * 2.4 + i * 0.8) + 1) / 2) * 0.6
    })
  }
}

const buildRadar: Builder = (root, track, d) => {
  const rings: THREE.Mesh[] = []
  for (let i = 1; i <= 4; i++) {
    const m = new THREE.Mesh(
      track(new THREE.TorusGeometry(i * 0.75, 0.008, 8, 96)),
      track(new THREE.MeshBasicMaterial({ color: PALETTE.green, transparent: true, opacity: 0.32 })),
    )
    m.rotation.x = Math.PI / 2
    root.add(m)
    rings.push(m)
  }
  const sweep = new THREE.Mesh(
    track(new THREE.CircleGeometry(3, 40, 0, Math.PI / 3.2)),
    track(new THREE.MeshBasicMaterial({ color: PALETTE.green, transparent: true, opacity: 0.14, side: THREE.DoubleSide })),
  )
  sweep.rotation.x = Math.PI / 2
  root.add(sweep)

  const blips: THREE.Mesh[] = []
  const bGeo = track(new THREE.SphereGeometry(0.09, 10, 10))
  for (let i = 0; i < Math.round(12 * d); i++) {
    const mat = track(new THREE.MeshBasicMaterial({ color: i % 4 === 0 ? PALETTE.red : PALETTE.amber, transparent: true, opacity: 0.2 }))
    const m = new THREE.Mesh(bGeo, mat)
    const a = Math.random() * Math.PI * 2
    const r = 0.6 + Math.random() * 2.4
    m.position.set(Math.cos(a) * r, 0, Math.sin(a) * r)
    m.userData.angle = a
    root.add(m)
    blips.push(m)
  }
  root.rotation.x = 0.5

  return (t) => {
    sweep.rotation.z = -t * 1.1
    rings.forEach((r, i) => (r.scale.setScalar(1 + Math.sin(t * 1.4 - i * 0.5) * 0.015)))
    const sweepAngle = (t * 1.1) % (Math.PI * 2)
    blips.forEach((b) => {
      const diff = Math.abs(((b.userData.angle as number) - sweepAngle + Math.PI * 4) % (Math.PI * 2))
      const mat = b.material as THREE.MeshBasicMaterial
      mat.opacity = diff < 0.5 ? 1 : Math.max(0.12, 1 - diff * 0.7)
      b.scale.setScalar(diff < 0.5 ? 1.6 : 1)
    })
  }
}

const buildShield: Builder = (root, track, d) => {
  const shape = new THREE.Shape()
  shape.moveTo(0, 1.8)
  shape.bezierCurveTo(1.3, 1.5, 1.5, 1.0, 1.5, 0.2)
  shape.bezierCurveTo(1.5, -1.0, 0.8, -1.7, 0, -2.1)
  shape.bezierCurveTo(-0.8, -1.7, -1.5, -1.0, -1.5, 0.2)
  shape.bezierCurveTo(-1.5, 1.0, -1.3, 1.5, 0, 1.8)

  const shield = new THREE.Mesh(
    track(new THREE.ExtrudeGeometry(shape, { depth: 0.3, bevelEnabled: true, bevelSize: 0.06, bevelThickness: 0.06, bevelSegments: 3, curveSegments: 24 })),
    track(new THREE.MeshStandardMaterial({ color: 0x0d2c46, emissive: 0x0a4463, emissiveIntensity: 0.3, metalness: 0.85, roughness: 0.25 })),
  )
  root.add(shield)

  const outline = new THREE.Line(
    track(new THREE.BufferGeometry().setFromPoints(shape.getPoints(80).map((p) => new THREE.Vector3(p.x, p.y, 0.36)))),
    track(new THREE.LineBasicMaterial({ color: PALETTE.cyan, transparent: true, opacity: 0.85 })),
  )
  root.add(outline)

  const rings: THREE.Mesh[] = []
  for (let i = 0; i < 3; i++) {
    const r = new THREE.Mesh(
      track(new THREE.TorusGeometry(2.4 + i * 0.5, 0.008, 8, 96)),
      track(new THREE.MeshBasicMaterial({ color: [PALETTE.cyan, PALETTE.green, PALETTE.violet][i], transparent: true, opacity: 0.4 })),
    )
    r.rotation.x = Math.PI / 2.6 + i * 0.3
    root.add(r)
    rings.push(r)
  }
  const dust = particleField(track, Math.round(220 * d), 5.2, PALETTE.green, 0.03)
  root.add(dust)

  return (t) => {
    shield.rotation.y = Math.sin(t * 0.5) * 0.35
    outline.rotation.y = shield.rotation.y
    const mat = shield.material as THREE.MeshStandardMaterial
    mat.emissiveIntensity = 0.22 + ((Math.sin(t * 1.6) + 1) / 2) * 0.35
    rings.forEach((r, i) => (r.rotation.z = t * (0.25 + i * 0.15) * (i % 2 ? -1 : 1)))
    dust.rotation.y = -t * 0.04
  }
}
