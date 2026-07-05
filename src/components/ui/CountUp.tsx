import { useCountUp } from '../../hooks/useCountUp'
import { useInView } from '../../hooks/useInView'

type CountUpProps = {
  value: string
  className?: string
}

export function CountUp({ value, className = '' }: CountUpProps) {
  const { ref, inView } = useInView<HTMLSpanElement>()
  const display = useCountUp(value, inView)

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  )
}
