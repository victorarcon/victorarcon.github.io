type SectionHeadingProps = {
  id: string
  eyebrow: string
  title: string
  description?: string
}

export function SectionHeading({ id, eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-12">
      <div className="flex flex-col gap-3">
        <p className="flex items-center gap-3 font-mono text-xs font-semibold uppercase tracking-widest text-accent">
          <span className="h-0.5 w-8 bg-accent" aria-hidden="true" />
          {eyebrow}
        </p>
        <h2
          id={id}
          className="text-balance text-4xl font-black uppercase leading-none tracking-tight [font-stretch:125%] md:text-6xl"
        >
          {title}
        </h2>
      </div>
      {description ? (
        <p className="max-w-md text-pretty leading-relaxed text-muted-foreground">{description}</p>
      ) : null}
    </div>
  )
}
