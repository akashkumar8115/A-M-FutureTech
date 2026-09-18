import { PortfolioGrid } from '@/components/PortfolioGrid';

export default function PortfolioPage() {
  return (
    <main>
      <section className="section-shell">
        <div className="container text-center">
          <span className="badge">Portfolio</span>
          <h1 className="section-title mx-auto mt-6 max-w-4xl">Selected work that reflects measurable business impact.</h1>
        </div>
      </section>

      <section className="section-shell surface-alt">
        <div className="container">
          <PortfolioGrid />
        </div>
      </section>
    </main>
  );
}
