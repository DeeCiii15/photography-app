import Navigation from './Navigation';
import SiteFooter from './SiteFooter';
import HomeStylePageIntro from './HomeStylePageIntro';

type PortfolioPageShellProps = {
  children: React.ReactNode;
};

export default function PortfolioPageShell({
  children,
}: PortfolioPageShellProps) {
  return (
    <div className="min-h-screen bg-[#f4f1eb] dark:bg-boho-ink">
      <Navigation />
      <HomeStylePageIntro />
      <main id="portfolio-main">{children}</main>
      <SiteFooter />
    </div>
  );
}
