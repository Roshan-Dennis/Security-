/**
 * The size of the exam bank, as a plain constant.
 *
 * The homepage headline stat needs this number, but importing EXAM_BANK there
 * would pull all 300 questions into the main bundle and cost roughly 50 kB
 * gzipped on first paint. The exam bank belongs in the lazily loaded /exam
 * chunk, so the count lives here instead. A smoke test asserts it matches the
 * real bank length, so the two cannot drift apart.
 */
export const EXAM_BANK_SIZE = 300
