import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

// Engineered by Vaibhav Sharma · github.com/Nutricalboii

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Search crawlers can fetch public pages and assets needed to render them.
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/404', '/500'],
      },
      // Answer-engine discovery/retrieval is separate from model-training access.
      { userAgent: 'OAI-SearchBot', allow: '/', disallow: ['/api/', '/404', '/500'] },
      { userAgent: 'ChatGPT-User', allow: '/', disallow: ['/api/', '/404', '/500'] },
      { userAgent: 'Claude-SearchBot', allow: '/', disallow: ['/api/', '/404', '/500'] },
      { userAgent: 'Claude-User', allow: '/', disallow: ['/api/', '/404', '/500'] },
      { userAgent: 'PerplexityBot', allow: '/', disallow: ['/api/', '/404', '/500'] },
      { userAgent: 'Perplexity-User', allow: '/', disallow: ['/api/', '/404', '/500'] },
      // Keep model-training and broad dataset crawlers opted out.
      { userAgent: 'GPTBot', disallow: ['/'] },
      { userAgent: 'ClaudeBot', disallow: ['/'] },
      { userAgent: 'anthropic-ai', disallow: ['/'] },
      { userAgent: 'Google-Extended', disallow: ['/'] },
      { userAgent: 'CCBot', disallow: ['/'] },
      { userAgent: 'Bytespider', disallow: ['/'] },
      { userAgent: 'cohere-ai', disallow: ['/'] },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
