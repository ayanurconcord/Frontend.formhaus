'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { fetchSiteData, WebsitePayload } from '@/lib/site';

const fallback = {
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
    seo_title: 'Portfolio',
    seo_description: 'Portfolio of formhaus projects.',
    hero_title: '',
    hero_description: '',
    hero_primary_cta: 'Book a consult',
    hero_primary_link: '#contact',
    hero_secondary_cta: 'View projects',
    hero_secondary_link: '/portfolio'
  },
  navigation: [],
  homepage: { sections: [], featuredProjects: [], intro: null },
  services: [],
  projects: [
    { id: 1, title: 'Luma Lamp System', category: 'Lighting', description: 'Modular lighting object shaped for soft illumination.', cover_image: '/images/project-lamp.svg', gallery: '[]', model_url: '', featured: 1, is_published: 1, sort_order: 1, slug: 'luma-lamp-system' },
    { id: 2, title: 'Torque Chair', category: 'Furniture', description: 'Parametric chair exploring comfort and fabrication efficiency.', cover_image: '/images/project-chair.svg', gallery: '[]', model_url: '', featured: 0, is_published: 1, sort_order: 2, slug: 'torque-chair' },
    { id: 3, title: 'Forma Housing Concept', category: 'Industrial Design', description: 'Modular housing concept exploring repeatable prefabrication.', cover_image: '/images/project-forma.svg', gallery: '[]', model_url: '', featured: 1, is_published: 1, sort_order: 3, slug: 'forma-housing-concept' }
  ],
  about: null,
  contact: { email: 'hello@formhaus.studio', phone: '+61 400 000 000', address: '12 River Street, Melbourne VIC', seo_title: 'Contact', seo_description: 'Contact formhaus.' }
} as WebsitePayload;

export default function PortfolioPage() {
  const [data, setData] = useState<WebsitePayload | null>(null);

  useEffect(() => {
    fetchSiteData().then(setData).catch(() => setData(fallback));
  }, []);

  const projects = data?.projects || fallback.projects;

  return (
    <main className="page-shell inner-page">
      <header className="topbar">
        <div className="brand-block"><span className="brand-mark">F</span> <span>{data?.settings.site_name || fallback.settings.site_name}</span></div>
        <nav className="main-nav">
          <Link href="/">Home</Link>
          <Link href="/portfolio">Portfolio</Link>
          <Link href="/services">Services</Link>
          <Link href="/about">About</Link>
          <Link href="/#contact">Contact</Link>
        </nav>
      </header>
      <section className="section-intro top-pad">
        <p className="eyebrow">Portfolio</p>
        <h2>Selected experiments, prototypes and product stories.</h2>
      </section>
      <section className="project-grid two-col">
        {projects.map((project) => (
          <article key={project.id} className="project-card">
            <div className="project-media" style={{ backgroundImage: `url(${project.cover_image || '/images/project-lamp.svg'})` }} />
            <div className="project-content">
              <p className="project-tag">{project.category}</p>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <Link href={`/projects/${project.slug}`}>Open case study →</Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
