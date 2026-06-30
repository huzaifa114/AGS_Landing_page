import { type ReactNode } from "react";
import { H1_ACCENT } from "@/lib/typography";

/** Split H1 words in half — first half white, second half purple. Short titles stay on one line. */
function formatPageHeroTitle(title: ReactNode): ReactNode {
  if (typeof title !== "string") return title;

  const trimmed = title.trim();
  if (!trimmed) return title;

  const words = trimmed.split(/\s+/).filter(Boolean);
  if (words.length <= 1) {
    return <span className={H1_ACCENT}>{trimmed}</span>;
  }

  const splitAt = Math.ceil(words.length / 2);
  const whitePart = words.slice(0, splitAt).join(" ");
  const purplePart = words.slice(splitAt).join(" ");

  const sentenceCount = (trimmed.match(/\./g) || []).length;
  const keepOnOneLine =
    words.length <= 4 && trimmed.length <= 48 && sentenceCount <= 1;

  if (keepOnOneLine) {
    return (
      <>
        {whitePart}{" "}
        <span className={H1_ACCENT}>{purplePart}</span>
      </>
    );
  }

  return (
    <>
      {whitePart}
      <br />
      <span className={H1_ACCENT}>{purplePart}</span>
    </>
  );
}

export { formatPageHeroTitle };
