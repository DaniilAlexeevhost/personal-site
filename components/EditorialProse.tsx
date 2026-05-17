import type { ReactNode } from "react";

type EditorialProseProps = {
  children: ReactNode;
};

export default function EditorialProse({ children }: EditorialProseProps) {
  return (
    <div className="prose prose-zinc prose-base max-w-none prose-headings:text-zinc-950 prose-headings:font-semibold prose-headings:tracking-tight prose-h1:mt-0 prose-h1:mb-5 prose-h1:text-3xl sm:prose-h1:text-[2.15rem] prose-h1:leading-tight prose-h2:mt-9 sm:prose-h2:mt-10 prose-h2:mb-3.5 prose-h2:text-[1.35rem] sm:prose-h2:text-[1.6rem] prose-h2:leading-tight prose-h3:mt-7 sm:prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-[1.15rem] sm:prose-h3:text-[1.3rem] prose-h3:leading-snug prose-p:my-4 prose-p:text-zinc-700 prose-p:leading-8 prose-lead:text-zinc-700 prose-lead:text-lg prose-a:text-zinc-950 prose-a:underline prose-a:decoration-zinc-300 prose-a:decoration-1 prose-a:underline-offset-4 prose-a:transition prose-a:hover:decoration-zinc-600 prose-strong:text-zinc-950 prose-strong:font-semibold prose-em:text-zinc-700 prose-hr:my-8 sm:prose-hr:my-9 prose-hr:border-zinc-200 prose-ul:my-4 prose-ol:my-4 prose-ul:pl-5 sm:prose-ul:pl-6 prose-ol:pl-5 sm:prose-ol:pl-6 prose-li:my-1.5 prose-li:pl-1 prose-li:marker:text-zinc-400 prose-blockquote:my-7 prose-blockquote:border-l-2 prose-blockquote:border-zinc-300 prose-blockquote:bg-zinc-50/70 prose-blockquote:px-4 sm:prose-blockquote:px-5 prose-blockquote:py-4 prose-blockquote:text-zinc-700 prose-blockquote:italic prose-blockquote:leading-8 prose-code:break-words prose-code:rounded-md prose-code:bg-zinc-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-[0.9em] prose-code:font-medium prose-code:text-zinc-900 prose-code:before:content-none prose-code:after:content-none prose-pre:my-7 prose-pre:overflow-x-auto prose-pre:rounded-2xl prose-pre:bg-zinc-950 prose-pre:p-4 sm:prose-pre:p-5 prose-pre:text-sm prose-pre:leading-7 prose-pre:shadow-none prose-pre:prose-code:bg-transparent prose-pre:prose-code:p-0 prose-img:my-8 prose-img:rounded-2xl sm:prose-img:rounded-3xl prose-img:shadow-none">
      {children}
    </div>
  );
}
