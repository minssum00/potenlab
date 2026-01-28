export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterCard?: "summary" | "summary_large_image";
  canonical?: string;
  image?: string;
}

// Function to fetch global OG images from settings
let globalOGImages: { ko?: string; en?: string } | null = null;

export async function fetchGlobalOGImages(): Promise<void> {
  try {
    // Import projectId and publicAnonKey inside the function to avoid circular dependencies
    const { projectId, publicAnonKey } = await import("./supabase/info");

    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-2a57c5c9/seo-settings/global`,
      {
        headers: {
          Authorization: `Bearer ${publicAnonKey}`,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      if (data.settings) {
        globalOGImages = {
          ko: data.settings.ogImageKo,
          en: data.settings.ogImageEn,
        };
      }
    }
  } catch (error) {
    console.warn(
      "Failed to fetch global OG images (server might not be deployed yet):",
      error
    );
    // Silently fail - use default OG images
  }
}

export function updateMetaTags(
  config: SEOConfig,
  language: "ko" | "en" = "ko"
) {
  // Update title
  document.title = config.title;

  // Helper function to set meta tag
  const setMetaTag = (
    name: string,
    content: string,
    attribute: "name" | "property" = "name"
  ) => {
    let element = document.querySelector(
      `meta[${attribute}="${name}"]`
    ) as HTMLMetaElement;
    if (!element) {
      element = document.createElement("meta");
      element.setAttribute(attribute, name);
      document.head.appendChild(element);
    }
    element.content = content;
  };

  // Basic meta tags
  setMetaTag("description", config.description);
  if (config.keywords) {
    setMetaTag("keywords", config.keywords);
  }

  // Robots meta tag - explicitly allow indexing
  setMetaTag("robots", "index, follow");

  // Open Graph tags
  setMetaTag("og:title", config.ogTitle || config.title, "property");
  setMetaTag(
    "og:description",
    config.ogDescription || config.description,
    "property"
  );
  setMetaTag("og:type", "website", "property");

  // Use image property if provided, otherwise use ogImage, otherwise use global OG image
  const imageUrl =
    config.image ||
    config.ogImage ||
    (globalOGImages && globalOGImages[language]);
  if (imageUrl) {
    setMetaTag("og:image", imageUrl, "property");
  }

  if (config.ogUrl) {
    setMetaTag("og:url", config.ogUrl, "property");
  }

  // Twitter Card tags
  setMetaTag("twitter:card", config.twitterCard || "summary_large_image");
  setMetaTag("twitter:title", config.ogTitle || config.title);
  setMetaTag(
    "twitter:description",
    config.ogDescription || config.description
  );

  if (imageUrl) {
    setMetaTag("twitter:image", imageUrl);
  }

  // Canonical URL
  if (config.canonical) {
    let link = document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement;
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = config.canonical;
  }
}

// Default SEO configuration
export const defaultSEO: Record<"ko" | "en", SEOConfig> = {
  ko: {
    title: "포텐랩, MVP개발부터 Product 개발까지 Web,App IT 개발사",
    description:
      "IT 컨설팅부터, MVP 개발, Web·App 구축, UXUI, R&D까지 아이디어를 실행 가능한 프로덕트로 구현",
    keywords:
      "IT개발사, MVP개발, 웹개발, 앱개발, 플랫폼개발, UXUI디자인, 스타트업개발, 서비스개발, 프로덕트개발",
    ogTitle: "포텐랩, MVP개발부터 Product 개발까지 Web,App IT 개발사",
    ogDescription:
      "IT 컨설팅부터, MVP 개발, Web·App 구축, UXUI, R&D까지 아이디어를 실행 가능한 프로덕트로 구현",
    ogImage:
      "https://slereezbgubofcrqnkip.supabase.co/storage/v1/object/public/make-2a57c5c9-article-images/1766135448420-9x0sbk.png",
    ogUrl: "https://www.potenlab.dev",
    twitterCard: "summary_large_image",
    canonical: "https://www.potenlab.dev",
  },
  en: {
    title: "Potenlab - IT Consulting & MVP Development",
    description:
      "Specialized in IT consulting, MVP development, AI, and UX/UI. Complete products from a business perspective",
    keywords:
      "IT consulting, MVP development, AI development, UX/UI design, app development, web development, startup, digital transformation",
    ogTitle: "Potenlab - IT Consulting & MVP Development",
    ogDescription:
      "Specialized in IT consulting, MVP development, AI, and UX/UI. Complete products from a business perspective",
    ogImage:
      "https://vtrporvjpqplrkmqtvmc.supabase.co/storage/v1/object/public/make-2a57c5c9-images/og-image.png",
    ogUrl: "https://www.potenlab.dev",
    twitterCard: "summary_large_image",
    canonical: "https://www.potenlab.dev",
  },
};
