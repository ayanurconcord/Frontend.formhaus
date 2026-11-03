'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchSiteData, WebsitePayload } from '@/lib/site';
import { HeroScene } from '@/components/Scene';

const fallbackData: WebsitePayload = {
  settings: {
    site_name: 'FORMHAUS.STUDIO',
    logo_url: '',
    favicon_url: '',
    accent_color: '#d85c2d',
    charcoal_color: '#111111',
    bone_color: '#f3efe8',
    steel_color: '#d0d1ce',
    contact_email: 'hello@formhaus.studio',
    contact_phone: '+61 400 000 000',
    contact_address: '12 River Street, Melbourne VIC',
    social_instagram: 'https://instagram.com',
    social_linkedin: 'https://linkedin.com',
    social_behance: 'https://behance.net',
    seo_title: 'FORMHAUS.STUDIO',
    seo_description: 'Premium 3D printing, product design and fabrication studio.',
    hero_title: 'Precision in every layer.',
    hero_description: 'We design, prototype, and fabricate extraordinary objects with industrial-grade 3D printing and custom production expertise.',
    hero_primary_cta: 'Book a consult',
    hero_primary_link: '#contact',
    hero_secondary_cta: 'View projects',
    hero_secondary_link: '/portfolio'
  },
  navigation: [
    { id: 1, label: 'Home', href: '/', position: 1, is_visible: 1 },
    { id: 2, label: 'Portfolio', href: '/portfolio', position: 2, is_visible: 1 },
    { id: 3, label: 'Services', href: '/services', position: 3, is_visible: 1 },
    { id: 4, label: 'About', href: '/about', position: 4, is_visible: 1 },
    { id: 5, label: 'Contact', href: '#contact', position: 5, is_visible: 1 }
  ],
  homepage: {
    sections: [],
    featuredProjects: [],
    intro: null
  },
  services: [],
  projects: [],
  about: null,
  contact: {
    email: 'hello@formhaus.studio',
    phone: '+61 400 000 000',
    address: '12 River Street, Melbourne VIC',
    seo_title: 'FORMHAUS.STUDIO',
    seo_description: 'Premium 3D printing, product design and fabrication studio.'
  }
};

export default function HomePage() {
  const [site, setSite] = useState<WebsitePayload | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSiteData()
      .then((data) => setSite(data))
      .catch(() => setSite(fallbackData))
      .finally(() => setLoading(false));
  }, []);

  const payload = site || fallbackData;
  const settings = payload.settings;
  const featured = payload.homepage.featuredProjects?.length ? payload.homepage.featuredProjects : payload.projects.slice(0, 3);

  return (
    <main className="page-shell">
      <header className="topbar">
        <div className="brand-block">
          <span className="brand-mark">F</span>
          <span>{settings.site_name}</span>
        </div>
        <nav className="main-nav">
          {payload.navigation.map((item) => (
            <Link key={item.id} href={item.href}>{item.label}</Link>
          ))}
        </nav>
        <Link href="#contact" className="primary-link">Book a consult</Link>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <motion.p className="eyebrow"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            3D printing • product design • rapid prototyping
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {settings.hero_title}
          </motion.h1>
          <motion.p className="lead"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >
            {settings.hero_description}
          </motion.p>
          <motion.div className="hero-actions"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <a href={settings.hero_primary_link} className="primary-button">{settings.hero_primary_cta}</a>
            <a href={settings.hero_secondary_link} className="secondary-button">{settings.hero_secondary_cta}</a>
          </motion.div>
        </div>
        <HeroScene />
      </section>

      <section className="metrics">
        <div><span>12+</span> years practice</div>
        <div><span>320</span> prototypes shipped</div>
        <div><span>43</span> product launches</div>
      </section>

      <section className="section-intro">
        <p className="eyebrow">Selected work</p>
        <h2>Objects with narrative, precision and material clarity.</h2>
      </section>

      <section className="project-grid">
        {featured.map((project, index) => (
          <motion.article key={project.id || index} className="project-card" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }}>
            <div className="project-media" style={{ backgroundImage: `url(${project.cover_image || '/images/project-lamp.svg'})` }} />
            <div className="project-content">
              <p className="project-tag">{project.category || 'Industrial Design'}</p>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <Link href={`/projects/${project.slug}`}>View project →</Link>
            </div>
          </motion.article>
        ))}
      </section>

      <section className="services-panel">
        <div className="section-intro">
          <p className="eyebrow">Capabilities</p>
          <h2>From concept development to production-ready output.</h2>
        </div>
        <div className="service-grid">
          {(payload.services.length ? payload.services : fallbackData.services).map((service) => (
            <article key={service.id} className="service-card">
              <div className="service-image" style={{ backgroundImage: `url(${service.image || '/images/prototyping.svg'})` }} />
              <h3>{service.name}</h3>
              <p>{service.description}</p>
              <span>{service.price}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="process-bar">
        <div className="process-item">
          <span>01</span>
          <h3>Research</h3>
          <p>Material strategy, product framing and rapid design exploration.</p>
        </div>
        <div className="process-item">
          <span>02</span>
          <h3>Prototype</h3>
          <p>Testability, fit and tactile feedback in early iterations.</p>
        </div>
        <div className="process-item">
          <span>03</span>
          <h3>Refine</h3>
          <p>Engineering clarity, performance evaluation and manufacturing adaptation.</p>
        </div>
        <div className="process-item">
          <span>04</span>
          <h3>Produce</h3>
          <p>Small-batch fabrication and final installation or delivery.</p>
        </div>
      </section>

      <section id="contact" className="contact-panel">
        <div>
          <p className="eyebrow">Get in touch</p>
          <h2>Build the next object worth keeping.</h2>
        </div>
        <div className="contact-details">
          <a href={`mailto:${settings.contact_email}`}>{settings.contact_email}</a>
          <a href={`tel:${settings.contact_phone}`}>{settings.contact_phone}</a>
          <p>{settings.contact_address}</p>
        </div>
      </section>

      <footer className="site-footer">
        <div>{settings.site_name}</div>
        <div className="footer-links">
          <a href={settings.social_instagram}>Instagram</a>
          <a href={settings.social_linkedin}>LinkedIn</a>
          <a href={settings.social_behance}>Behance</a>
        </div>
      </footer>
      {loading ? <div className="loading-overlay">Loading studio data…</div> : null}
    </main>
  );
}
