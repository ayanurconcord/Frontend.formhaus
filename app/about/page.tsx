import Link from 'next/link';
import { fetchSiteData } from '@/lib/site';

export default async function AboutPage() {
  const site = await fetchSiteData().catch(() => null);
  const page = site?.about || {
    title: 'About the studio',
    content: 'FORMHAUS is a product design and fabrication studio focused on material clarity, sculptural form and intelligent manufacturing workflows. We collaborate with founders, brands and makers to turn ideas into physical objects that feel considered and resolved.'
  };

  return (
    <main className="page-shell inner-page">
      <header className="topbar">
        <div className="brand-block"><span className="brand-mark">F</span> <span>{site?.settings.site_name || 'FORMHAUS.STUDIO'}</span></div>
        <nav className="main-nav">
          <Link href="/">Home</Link>
          <Link href="/shop">Shop</Link>
          <Link href="/about">About</Link>
          <Link href="/#contact">Contact</Link>
        </nav>
        <Link href="/shop#cart" className="primary-link">Cart</Link>
      </header>
      <section className="section-intro top-pad">
        <p className="eyebrow">About</p>
        <h2>{page.title}</h2>
      </section>
      <section className="content-panel">
        <p>{page.content}</p>
      </section>
    </main>
  );
}
