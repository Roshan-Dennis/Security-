import { Section } from '../components/UI'
import { CHEATSHEETS } from '../data'

export default function CheatSheets() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
      <Section
        eyebrow="Rapid revision"
        title="Cheat sheets"
        intro="The condensed material worth reviewing the morning of the exam — ports, cryptography, risk formulas, the controls matrix, attack identification cues and the incident response runbook."
      >
        <nav className="mb-8 flex flex-wrap gap-2">
          {CHEATSHEETS.map((c) => (
            <a key={c.slug} href={`#${c.slug}`} className="chip hover:bg-white/10">
              {c.title}
            </a>
          ))}
        </nav>

        <div className="space-y-10">
          {CHEATSHEETS.map((c) => (
            <section key={c.slug} id={c.slug} className="scroll-mt-24">
              <h2 className="font-display text-xl font-bold tracking-tight">{c.title}</h2>
              <p className="mt-1.5 max-w-3xl text-[13.5px] leading-relaxed muted">{c.blurb}</p>

              <div className="mt-4 space-y-4">
                {c.sections.map((s) => (
                  <div key={s.heading} className="card overflow-hidden">
                    <h3 className="border-b border-white/10 px-5 py-3 font-display text-[13px] font-semibold uppercase tracking-wider text-cyber-300">
                      {s.heading}
                    </h3>
                    <table className="w-full">
                      <tbody className="divide-y divide-white/6">
                        {s.rows.map(([k, v]) => (
                          <tr key={k} className="transition hover:bg-white/[0.03]">
                            <th
                              scope="row"
                              className="w-[38%] px-5 py-2.5 text-left align-top font-mono text-[12px] font-semibold text-[color:var(--text)]"
                            >
                              {k}
                            </th>
                            <td className="px-5 py-2.5 align-top text-[13px] leading-relaxed muted">{v}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </Section>
    </div>
  )
}
