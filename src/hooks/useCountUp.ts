import { useEffect, useMemo, useState } from 'react'

type ParsedMetric = {
  prefix: string
  target: number
  suffix: string
  decimals: number
}

function parseMetric(value: string): ParsedMetric | null {
  const match = value.match(/^([^0-9]*)([\d.]+)(.*)$/)
  if (!match) return null
  const num = Number(match[2])
  if (Number.isNaN(num)) return null
  const decimals = match[2].includes('.') ? match[2].split('.')[1].length : 0
  return { prefix: match[1], target: num, suffix: match[3], decimals }
}

export function useCountUp(value: string, active: boolean, duration = 1400) {
  const parsed = useMemo(() => parseMetric(value), [value])
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    if (!parsed || !active) {
      setDisplay(value)
      return
    }

    let frame = 0
    const totalFrames = Math.max(24, Math.round(duration / 16))
    const { prefix, target, suffix, decimals } = parsed

    const tick = () => {
      frame += 1
      const progress = Math.min(frame / totalFrames, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = target * eased
      setDisplay(`${prefix}${current.toFixed(decimals)}${suffix}`)
      if (progress < 1) requestAnimationFrame(tick)
    }

    setDisplay(`${prefix}${(0).toFixed(decimals)}${suffix}`)
    const id = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(id)
  }, [value, active, duration, parsed])

  return display
}
