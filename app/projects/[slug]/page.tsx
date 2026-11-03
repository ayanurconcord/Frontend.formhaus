import Link from 'next/link';
import { fetchSiteData } from '@/lib/site';

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const site = await fetchSiteData().catch(() => null);
  const project = (site?.projects || []).find((item) => item.slug === params.slug) || {
    title: 'Luma Lamp System',
    description: 'A modular lighting object shaped for soft, sculptural illumination.',
    category: 'Lighting',
    cover_image: '/images/project-lamp.jpg',
    gallery: '[]'
  };

  return (
    <main className="page-shell inner-page">
      <header className="topbar">
        <div className="brand-block"><span className="brand-mark">F</span> <span>{site?.settings.site_name || 'FORMHAUS.STUDIO'}</span></div>
        <nav className="main-nav">
          <Link href="/">Home</Link>
          <Link href="/portfolio">Portfolio</Link>
          <Link href="/services">Services</Link>
          <Link href="/about">About</Link>
          <Link href="/#contact">Contact</Link>
        </nav>
      </header>
      <section className="section-intro top-pad">
        <p className="eyebrow">{project.category}</p>
        <h2>{project.title}</h2>
      </section>
      <section className="content-panel">
        <div className="project-media feature" style={{ backgroundImage: `url(${project.cover_image})` }} />
        <p>{project.description}</p>
      </section>
    </main>
  );
}
