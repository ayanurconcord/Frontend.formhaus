import Link from 'next/link';
import { fetchSiteData } from '@/lib/site';

export default async function ServicesPage() {
  const site = await fetchSiteData().catch(() => null);
  const services = site?.services || [
    { id: 1, name: 'Rapid Prototyping', description: 'Functional prototypes for testing and validation.', image: '/images/prototyping.svg', price: 'From $299' },
    { id: 2, name: 'Custom Fabrication', description: 'Small-batch production for premium objects.', image: '/images/fabrication.svg', price: 'From $899' },
    { id: 3, name: 'Design for 3D Printing', description: 'Material-informed design for printability and finish.', image: '/images/design.svg', price: 'From $450' }
  ];

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
        <p className="eyebrow">Services</p>
        <h2>Precision design and fabrication for ambitious products.</h2>
      </section>
      <section className="service-grid">
        {services.map((service) => (
          <article key={service.id} className="service-card">
            <div className="service-image" style={{ backgroundImage: `url(${service.image})` }} />
            <h3>{service.name}</h3>
            <p>{service.description}</p>
            <span>{service.price}</span>
          </article>
        ))}
      </section>
    </main>
  );
}
