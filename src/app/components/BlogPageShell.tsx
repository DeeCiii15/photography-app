import Navigation from './Navigation';
import SiteFooter from './SiteFooter';
import HomeStylePageIntro from './HomeStylePageIntro';

type BlogPageShellProps = {
  children: React.ReactNode;
};

export default function BlogPageShell({ children }: BlogPageShellProps) {
  return (
    <div className="min-h-screen bg-[#f4f1eb] dark:bg-boho-ink">
      <Navigation />
      <HomeStylePageIntro />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
