/**
 * Randomises the order of answer options while remapping the answer index.
 *
 * Why this exists: questions authored by hand (or by a model) tend to place the
 * correct answer in a consistent position. An audit of this bank found 81% of
 * single-answer exam questions and 84% of topic-quiz questions had the correct
 * answer at index 1, which meant a candidate could score highly without reading
 * the question. Shuffling at runtime removes the pattern entirely and also stops
 * answer positions being memorised across repeat attempts.
 */
export function shuffleOptions<T extends { options: string[]; answer: number | number[] }>(q: T): T {
  const order = q.options.map((_, i) => i)
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[order[i], order[j]] = [order[j], order[i]]
  }
  const options = order.map((i) => q.options[i])
  const remap = (original: number) => order.indexOf(original)
  const answer = Array.isArray(q.answer)
    ? q.answer.map(remap).sort((a, b) => a - b)
    : remap(q.answer)
  return { ...q, options, answer }
}
