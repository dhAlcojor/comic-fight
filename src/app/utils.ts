export function getRandomFromRange(min: number, max: number): number {
  if (min > max) {
    throw new Error('Invalid range: min should not be greater than max')
  }
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function waitFor(
  selector: string,
  timeout: number = 30000,
): Promise<HTMLElement> {
  const start = Date.now()
  return new Promise((resolve, reject) => {
    const interval = setInterval(() => {
      const el = document.querySelector(selector) as HTMLElement
      if (el) {
        clearInterval(interval)
        resolve(el)
      } else if (Date.now() - start > timeout) {
        clearInterval(interval)
        reject(new Error('Timeout exceeded'))
      }
    }, 100)
  })
}
