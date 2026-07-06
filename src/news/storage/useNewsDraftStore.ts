import { useMemo } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { mockDoodNewsDrafts } from "../data/mockDoodNews";
import type { DoodNewsDraft, NewsDraftStatus } from "../types";

const storageKey = "2doods-news-drafts";

function sortDrafts(drafts: DoodNewsDraft[]) {
  return [...drafts].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function useNewsDraftStore() {
  const [drafts, setDrafts] = useLocalStorage<DoodNewsDraft[]>(storageKey, mockDoodNewsDrafts);

  const approvedDrafts = useMemo(() => sortDrafts(drafts.filter((draft) => draft.status === "approved")), [drafts]);

  function updateDraft(id: string, patch: Partial<DoodNewsDraft>) {
    setDrafts((current) =>
      sortDrafts(current.map((draft) => (draft.id === id ? { ...draft, ...patch } : draft)))
    );
  }

  function setStatus(id: string, status: NewsDraftStatus) {
    updateDraft(id, {
      status,
      approvedAt: status === "approved" ? new Date().toISOString() : undefined
    });
  }

  function resetMockData() {
    setDrafts(mockDoodNewsDrafts);
  }

  return {
    drafts: sortDrafts(drafts),
    approvedDrafts,
    updateDraft,
    approveDraft: (id: string) => setStatus(id, "approved"),
    rejectDraft: (id: string) => setStatus(id, "rejected"),
    reopenDraft: (id: string) => setStatus(id, "draft"),
    resetMockData
  };
}
