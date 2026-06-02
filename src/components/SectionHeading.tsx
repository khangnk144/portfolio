type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-rose-600)]">
        {eyebrow}
      </p>
      <h2 className="font-serif text-3xl leading-tight text-[var(--color-ink)] sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-sm leading-7 text-[var(--color-muted)] sm:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}
