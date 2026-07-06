export type NewsSourceType = "rss" | "api" | "manual";
export type NewsLanguage = "pt" | "en" | "jp";
export type NewsDraftStatus = "draft" | "approved" | "rejected";
export type NewsReliability = "confirmed" | "rumor" | "leak" | "analysis";
export type ShortPotential = "low" | "medium" | "high";

export type NewsTopicType =
  | "confirmed"
  | "rumor"
  | "leak"
  | "analysis"
  | "trailer"
  | "release-date"
  | "update"
  | "controversy"
  | "market";

export interface NewsSource {
  id: string;
  name: string;
  url: string;
  type: NewsSourceType;
  language: NewsLanguage;
  priority: number;
  enabled: boolean;
  defaultCategory?: string;
}

export interface RawNewsItem {
  id: string;
  sourceId: string;
  sourceName: string;
  title: string;
  link: string;
  publishedAt: string;
  author?: string;
  excerpt?: string;
  image?: string;
  language?: string;
  category?: string;
  reliability?: NewsReliability;
  tags?: string[];
}

export interface RelatedNewsLink {
  title: string;
  source: string;
  url: string;
}

export interface ShortPackage {
  shortTitle: string;
  suggestedTags: string[];
  pinnedComment: string;
  communityQuestion: string;
}

export interface DoodNewsDraft {
  id: string;
  slug: string;
  status: NewsDraftStatus;
  reliability: NewsReliability;
  topicType: NewsTopicType;
  title: string;
  originalTitle: string;
  sourceName: string;
  sourceUrl: string;
  publishedAt: string;
  generatedAt: string;
  approvedAt?: string;
  category: string;
  tags: string[];
  summary: string;
  whyItMatters: string;
  doodOpinion: string;
  playerImpact: string;
  shortHook?: string;
  shortPotential: ShortPotential;
  shortPackage: ShortPackage;
  priorityScore: number;
  relatedLinks: RelatedNewsLink[];
  reviewNotes?: string;
  isMock?: boolean;
  isDemo?: boolean;
  manualPrompt?: string;
  aiResponseRaw?: string;
  youtubeShortTitle?: string;
  tiktokCaption?: string;
  instagramCaption?: string;
  pinnedComment?: string;
  communityQuestion?: string;
  createdManually?: boolean;
  reviewedByHuman?: boolean;
}

export interface NewsGroup {
  id: string;
  title: string;
  items: RawNewsItem[];
  score: number;
  category: string;
}

export interface EditorialDraftInput {
  originalTitle: string;
  sourceName: string;
  publishedAt: string;
  excerpt?: string;
  link: string;
  relatedLinks: RelatedNewsLink[];
  category: string;
  reliability: NewsReliability;
  topicType: NewsTopicType;
  priorityScore: number;
}
