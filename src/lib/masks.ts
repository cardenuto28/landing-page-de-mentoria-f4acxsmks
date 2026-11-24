export function applyMask(value: string, mask: string, keep: RegExp = /\d/g): string {
  const chars = value.toUpperCase().match(keep) ?? []
  let i = 0
  let out = ''
  for (const m of mask) {
    if (i >= chars.length) break
    out += m === '0' ? chars[i++] : m
  }
  return out
}

export function formatPhoneBR(value: string): string {
  const digits = value.replace(/\D/g, '').replace(/^55(?=\d{10,11}$)/, '')
  return applyMask(digits, digits.length > 10 ? '(00) 00000-0000' : '(00) 0000-0000')
}
