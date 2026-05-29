function normalizeContentTitle(value: string) {
  return value
    .replace(/^#{1,6}\s+/, "")
    .replace(/[*_`~]/g, "")
    .replace(/[.!?！？。…:：]+$/u, "")
    .trim()
    .replace(/\s+/g, " ")
    .toLocaleLowerCase("ru-RU");
}

export function stripLeadingContentTitle(content: string, title: string) {
  const trimmedContent = content.trimStart();
  const [firstLine = "", ...remainingLines] = trimmedContent.split(/\r?\n/);
  const headingMatch = firstLine.trim().match(/^#{1,6}\s+(.+?)\s*#*$/);
  const firstLineTitle = headingMatch?.[1] ?? firstLine;

  if (
    normalizeContentTitle(firstLineTitle) !== normalizeContentTitle(title)
  ) {
    return content;
  }

  return remainingLines.join("\n").trimStart();
}
