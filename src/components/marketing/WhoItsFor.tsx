type WhoItsForProps = {
  text: string
}

export function WhoItsFor({ text }: WhoItsForProps) {
  return (
    <section className="section-off section-block">
      <div className="container">
        <p className="text-center text-base leading-relaxed text-muted sm:text-lg">{text}</p>
      </div>
    </section>
  )
}
