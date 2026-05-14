type SectionHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export default function SectionHero({
  eyebrow,
  title,
  description,
}: SectionHeroProps) {
  return (
    <section className="max-w-6xl mx-auto px-5 sm:px-6 pt-30 sm:pt-32 md:pt-36 pb-12 sm:pb-18 md:pb-20">
      <div className="max-w-3xl">
        <p className="text-xs sm:text-sm uppercase tracking-[0.16em] sm:tracking-[0.28em] text-zinc-500 mb-4 sm:mb-6">
          {eyebrow}
        </p>

        <h1 className="font-semibold text-[2.35rem] sm:text-5xl md:text-6xl xl:text-7xl leading-[1.07] sm:leading-[1.05] tracking-tight mb-5 sm:mb-8 text-zinc-950">
          {title}
        </h1>

        <p className="text-[1.05rem] sm:text-xl md:text-2xl leading-8 md:leading-9 text-zinc-600 max-w-2xl">
          {description}
        </p>
      </div>
    </section>
  );
}
