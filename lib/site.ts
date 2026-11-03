export type SiteSettings = {
  site_name: string;
  logo_url: string;
  favicon_url: string;
  accent_color: string;
  charcoal_color: string;
  bone_color: string;
  steel_color: string;
  contact_email: string;
  contact_phone: string;
  contact_address: string;
  social_instagram: string;
  social_linkedin: string;
  social_behance: string;
  seo_title: string;
  seo_description: string;
  hero_title: string;
  hero_description: string;
  hero_primary_cta: string;
  hero_primary_link: string;
  hero_secondary_cta: string;
  hero_secondary_link: string;
};

export type NavigationItem = {
  id: number;
  label: string;
  href: string;
  position: number;
  is_visible: number;
};

export type Project = {
  id: number;
  title: string;
  slug: string;
  category: string;
  description: string;
  cover_image: string;
  gallery: string;
  model_url: string;
  featured: number;
  is_published: number;
  sort_order: number;
};

export type Service = {
  id: number;
  name: string;
  description: string;
  image: string;
  price: string;
  is_visible: number;
  sort_order: number;
};

export type WebsitePayload = {
  settings: SiteSettings;
  navigation: NavigationItem[];
  homepage: {
    sections: any[];
    featuredProjects: Project[];
    intro: any;
  };
  services: Service[];
  projects: Project[];
  about: any;
  contact: {
    email: string;
    phone: string;
    address: string;
    seo_title: string;
    seo_description: string;
  };
};

export async function fetchSiteData(): Promise<WebsitePayload> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
  const response = await fetch(`${apiUrl}/site`, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error('Unable to load site data');
  }
  return response.json();
}
