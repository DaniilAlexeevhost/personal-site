type EditorialScopeProps = {
  items: string[];
};

export default function EditorialScope({ items }: EditorialScopeProps) {
  return (
    <section className="border-t border-zinc-200 bg-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 py-10 sm:py-14">
        <div className="grid gap-4 sm:gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div
              key={item}
              className="border-t border-zinc-200 pt-4 text-base leading-7 text-zinc-600"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
