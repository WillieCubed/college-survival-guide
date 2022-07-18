import Link from 'next/link';
import React from 'react';
import { UISidebarContent } from '../lib/presentation/content';

function NavSidebar({ chapters }: UISidebarContent) {
  const sections = chapters.map(({ items, title }) => {
    const sectionItems = items.map(({ link, title }) => {
      return <Link href={link}>
        <li>
          {title}
        </li>
      </Link>
    });

    return (
      <div>
        <div>
          <Link href="/chapters/">
            {title}
            {/* TODO: Expand accordion emnus */}
          </Link>
        </div>
        <ul>{sectionItems}</ul>
      </div>
    );
  })
  return <div>
    <nav>{sections}</nav>
  </div>;
}

interface ContentLayoutProps {
  chapters: UISidebarContent;
}

export default function ContentLayout({ chapters, children }: React.PropsWithChildren<ContentLayoutProps>) {
  return (
    <div>
      <NavSidebar />
      <div>{children}</div>
    </div>
  );
}