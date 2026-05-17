import type { ElementType, ReactNode } from 'react'
import { useInView } from '../../hooks/useInView'

type RevealProps = {
  children: ReactNode
  delay?: number
  as?: ElementType
  className?: string
  id?: string
}

export function Reveal({
  children,
  delay = 0,
  as,
  className = '',
  id,
}: RevealProps) {
  const Tag = (as || 'div') as ElementType
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <Tag
      ref={ref}
      id={id}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        inView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      } ${className}`}
    >
      {children}
    </Tag>
  )
}
