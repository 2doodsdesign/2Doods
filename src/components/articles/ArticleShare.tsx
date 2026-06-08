import { Check, Copy, Facebook, Send, Share2 } from "lucide-react";
import { useState } from "react";
import type { Article } from "../../data/articles";

interface ArticleShareProps {
  article: Article;
}

export function ArticleShare({ article }: ArticleShareProps) {
  const [message, setMessage] = useState("");
  const url = typeof window === "undefined" ? "" : window.location.href;
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(`${article.title} | 2Doods`);

  async function copyLink() {
    if (navigator.share) {
      try {
        await navigator.share({ title: article.title, text: article.excerpt, url });
        setMessage("Compartilhamento aberto.");
        return;
      } catch {
        // Fall through to clipboard when the native share sheet is canceled or unavailable.
      }
    }

    await navigator.clipboard.writeText(url);
    setMessage("Link copiado para a área de transferência.");
  }

  return (
    <section className="article-share">
      <h2>Compartilhar checkpoint</h2>
      <div className="share-actions">
        <a href={`https://wa.me/?text=${encodedText}%20${encodedUrl}`} target="_blank" rel="noopener noreferrer">
          <Send size={17} />
          WhatsApp
        </a>
        <a href={`https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`} target="_blank" rel="noopener noreferrer">
          <Share2 size={17} />
          X
        </a>
        <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`} target="_blank" rel="noopener noreferrer">
          <Facebook size={17} />
          Facebook
        </a>
        <button type="button" onClick={copyLink}>
          {message ? <Check size={17} /> : <Copy size={17} />}
          Copiar link
        </button>
      </div>
      <p aria-live="polite">{message}</p>
    </section>
  );
}
