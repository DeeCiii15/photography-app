import { redirect } from 'next/navigation';

/** Legacy URL — nav and bookmarks now use /experience */
export default function FAQRedirectPage() {
  redirect('/experience');
}
