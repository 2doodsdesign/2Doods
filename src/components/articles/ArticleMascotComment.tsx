import { MessageSquareText } from "lucide-react";
import { MascotAvatar } from "../mascot/MascotAvatar";

interface ArticleMascotCommentProps {
  children: string;
  compact?: boolean;
}

export function ArticleMascotComment({ children, compact = false }: ArticleMascotCommentProps) {
  return (
    <aside className={compact ? "article-mascot article-mascot--compact" : "article-mascot"}>
      <MascotAvatar expression="talking" size={compact ? "small" : "medium"} floating />
      <div>
        <MessageSquareText size={20} />
        <p>{children}</p>
      </div>
    </aside>
  );
}
