import { useRef, useState } from 'react'

/**
 *
 * @param input - expect 0 ~ 1
 * @param options - example { length: 0.4 } -> start: -0.4 ~ 1, end: 0 ~ 1.4
 */
function useScaleRange(input: number, options: { length: number }) {
  const start = input * (options.length + 1) - options.length
  const end = start + options.length
  return [start, end] as const
}

function toPercent(num: number, digits = 2) {
  return (num * 100).toFixed(digits) + '%'
}

const DEFAULT_LENGTH = 0.8

export interface ScrollFillTextProps {
  children?: string
}

export default function ScrollFillText({ children }: ScrollFillTextProps) {
  const rafIdRef = useRef<number | null>(null)

  const [fillStop, setFillStop] = useState<{
    start: string
    end: string
  }>(() => {
    const [start, end] = useScaleRange(0, { length: DEFAULT_LENGTH })
    return { start: toPercent(start), end: toPercent(end) }
  })

  /**
   * Add this event listener to the scroll container.
   */
  const onScroll: React.UIEventHandler<HTMLElement> = event => {
    if (rafIdRef.current) return
    rafIdRef.current = requestAnimationFrame(() => {
      const el = event.target as HTMLElement
      const scrollProgress = el.scrollTop / (el.scrollHeight - el.clientHeight)
      const [start, end] = useScaleRange(scrollProgress, { length: DEFAULT_LENGTH })
      setFillStop({ start: toPercent(start), end: toPercent(end) })
      rafIdRef.current = null
    })
  }

  return (
    <div onScroll={onScroll} className='h-screen overflow-y-auto p-3 md:p-6'>
      <div className='h-[400vh]'>
        <p
          style={{
            backgroundImage: `linear-gradient(90deg, var(--color-neu) ${fillStop.start}, color-mix(in oklab, var(--color-neu) 10%, transparent), ${fillStop.end}, color-mix(in oklab, var(--color-neu) 10%, transparent) 100%)`,
          }}
          className='sticky top-1 inline bg-neu/10 bg-clip-text text-5xl leading-snug font-semibold tracking-wide text-wrap text-transparent uppercase transition sm:text-6xl md:text-7xl lg:text-8xl'
        >
          {children}
        </p>
      </div>
    </div>
  )
}
