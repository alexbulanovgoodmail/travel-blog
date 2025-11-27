declare global {
  interface Window {
    gsap: typeof import('gsap')
    SplitText: typeof import('gsap/SplitText').SplitText
    ScrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger
  }
}

export {}
