import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Portfolio } from '../components/Portfolio';

export function PortfolioPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-[72px]">
        <Portfolio />
      </main>
      <Footer />
    </div>
  );
}
