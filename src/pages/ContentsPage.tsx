import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Article } from '../components/Article';

export function ContentsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-[72px]">
        <Article />
      </main>
      <Footer />
    </div>
  );
}
