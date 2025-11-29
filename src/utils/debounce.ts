export function debounce<Args extends unknown[], Return>(
  callee: (...args: Args) => Return,
  timeoutMs: number,
): (this: unknown, ...args: Args) => void {
  let lastCall = 0
  let lastCallTimer: ReturnType<typeof setTimeout>

  return function (this: unknown, ...args: Args) {
    const now = Date.now()

    if (lastCall && now - lastCall <= timeoutMs) {
      clearTimeout(lastCallTimer)
    }

    lastCall = now

    lastCallTimer = setTimeout(() => {
      callee.apply(this, args)
    }, timeoutMs)
  }
}
