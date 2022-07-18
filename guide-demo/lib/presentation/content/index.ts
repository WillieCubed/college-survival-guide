// Data types for UI

export type UIAuthor = {
  name: string;
  title: string;
};

export type UIChapter = {
  title: string;
  lastUpdated: string;
  contributors: string;
  authors: UIAuthor[];
};

export type UISidebarChapterSection = {
  title: string;
  link: string;
};

export type UISidebarChapter = {
  title: string;
  items: UISidebarChapterSection[];
};

export type UIRichSearchResult = {
  imageUrl?: string;
  content: string;
  subtitle?: string;
  caption?: string;
  link: string;
};

export type UISearchbarResults = {
  textResults: string[];
  richResults: UIRichSearchResult[];
};

export type UISidebarContent = {
  chapters: UISidebarChapter[];
};

export type UIEntrySummary = {
  slug: string;
  title: string;
  description: string;
  thumbnailUrl?: string;
};

export type UIEntryIndex = {
  entries: UIEntrySummary[];
};