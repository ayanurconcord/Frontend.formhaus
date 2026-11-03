import Link from 'next/link';
import { fetchSiteData } from '@/lib/site';

export default async function ContactPage() {
  const site = await fetchSiteData().catch(() => null);
  const settings = site?.settings || {
    contact_email: 'hello@formhaus.studio',
    contact_phone: '+61 400 000 000',
    contact_address: '12 River Street, Melbourne VIC',
    site_name: 'FORMHAUS.STUDIO'
  };

  return (
    <main className="page-shell inner-page">
      <header className="topbar">
        <div className="brand-block"><span className="brand-mark">F</span> <span>{settings.site_name}</span></div>
        <nav className="main-nav">
          <Link href="/">Home</Link>
          <Link href="/portfolio">Portfolio</Link>
          <Link href="/services">Services</Link>
          <Link href="/about">About</Link>
          <Link href="/#contact">Contact</Link>
        </nav>
      </header>
      <section className="section-intro top-pad">
        <p className="eyebrow">Contact</p>
        <h2>Tell us what should exist in the world.</h2>
      </section>
      <section className="contact-panel large">
        <div className="contact-details">
          <a href={`mailto:${settings.contact_email}`}>{settings.contact_email}</a>
          <a href={`tel:${settings.contact_phone}`}>{settings.contact_phone}</a>
          <p>{settings.contact_address}</p>
        </div>
      </section>
    </main>
  );
}
