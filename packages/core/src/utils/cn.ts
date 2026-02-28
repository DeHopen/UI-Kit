type ClassValue = string | undefined | null | false | ClassValue[]

export function cn(...inputs: ClassValue[]): string {
  const result: string[] = []

  for (const input of inputs) {
    if (!input) continue
    if (typeof input === 'string') {
      result.push(input)
    } else if (Array.isArray(input)) {
      const inner = cn(...input)
      if (inner) result.push(inner)
    }
  }

  return result.join(' ')
}
