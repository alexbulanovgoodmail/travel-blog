import { debounce } from '@/utils/debounce'

const marquee = document.querySelector('.marquee-coords') as HTMLElement | null
const container = document.querySelector(
  '.marquee-coords__container',
) as HTMLElement | null

function initMarquee() {
  if (!marquee || !container) return

  const validSpeeds = ['slow', 'normal', 'fast'] as const
  type Speed = (typeof validSpeeds)[number]

  const speedMap: Record<Speed, number> = {
    slow: 10,
    normal: 40,
    fast: 80,
  }

  let speedAttr = marquee.dataset.speed

  if (!validSpeeds.includes(speedAttr as Speed)) {
    speedAttr = 'normal'
  }

  const speed = speedMap[speedAttr as Speed]

  const direction = marquee.dataset.direction === 'rtl' ? 'rtl' : 'ltr'

  const duration = container.scrollWidth / speed

  container.style.animation = `marquee-${direction} ${duration}s linear infinite`

  const originalNodes = Array.from(container.childNodes)
  container.innerHTML = ''

  while (container.scrollWidth < marquee.offsetWidth * 2) {
    originalNodes.forEach((node) => {
      container.appendChild(node.cloneNode(true))
    })
  }
}

window.addEventListener('DOMContentLoaded', () => {
  initMarquee()

  const debouncedInitMarquee = debounce(initMarquee, 300)
  window.addEventListener('resize', debouncedInitMarquee)
})
