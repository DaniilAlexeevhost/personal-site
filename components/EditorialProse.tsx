import type { ReactNode } from "react";

type EditorialProseProps = {
  children: ReactNode;
};

export default function EditorialProse({ children }: EditorialProseProps) {
  return (
    <div className="prose prose-zinc prose-lg sm:prose-xl max-w-none prose-headings:text-zinc-950 prose-headings:font-semibold prose-headings:tracking-tight prose-h1:mt-0 prose-h1:mb-8 prose-h1:text-3xl sm:prose-h1:text-4xl prose-h1:leading-tight prose-h2:mt-16 prose-h2:mb-5 prose-h2:text-[1.7rem] sm:prose-h2:text-[2rem] prose-h2:leading-tight prose-h3:mt-11 prose-h3:mb-4 prose-h3:text-[1.35rem] sm:prose-h3:text-[1.55rem] prose-h3:leading-snug prose-p:my-5 sm:prose-p:my-6 prose-p:text-zinc-700 prose-p:leading-8 sm:prose-p:leading-9 prose-lead:text-zinc-700 prose-lead:text-xl prose-a:text-zinc-950 prose-a:underline prose-a:decoration-zinc-300 prose-a:decoration-1 prose-a:underline-offset-4 prose-a:transition prose-a:hover:decoration-zinc-600 prose-strong:text-zinc-950 prose-strong:font-semibold prose-em:text-zinc-700 prose-hr:my-12 prose-hr:border-zinc-200 prose-ul:my-6 prose-ol:my-6 prose-ul:pl-6 prose-ol:pl-6 prose-li:my-2.5 sm:prose-li:my-3 prose-li:pl-1 prose-li:marker:text-zinc-400 prose-blockquote:my-9 prose-blockquote:border-l-2 prose-blockquote:border-zinc-300 prose-blockquote:bg-zinc-50/70 prose-blockquote:px-5 sm:prose-blockquote:px-6 prose-blockquote:py-4 sm:prose-blockquote:py-5 prose-blockquote:text-zinc-700 prose-blockquote:italic prose-blockquote:leading-8 prose-code:break-words prose-code:rounded-md prose-code:bg-zinc-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-[0.9em] prose-code:font-medium prose-code:text-zinc-900 prose-code:before:content-none prose-code:after:content-none prose-pre:my-9 prose-pre:overflow-x-auto prose-pre:rounded-2xl prose-pre:bg-zinc-950 prose-pre:p-5 sm:prose-pre:p-6 prose-pre:text-sm prose-pre:leading-7 prose-pre:shadow-none prose-pre:prose-code:bg-transparent prose-pre:prose-code:p-0 prose-img:my-10 prose-img:rounded-2xl sm:prose-img:rounded-3xl prose-img:shadow-none">
      {children}
    </div>
  );
}
