interface SiteFooterContentItem {
  title: string;
  link: string;
}

interface SiteFooterProps {
  items: SiteFooterContentItem[];
}

export default function SiteFooter({ items }: SiteFooterProps) {}
