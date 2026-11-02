import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Tech Avora',
    short_name: 'Tech Avora',
    description: 'Production-ready AI data operations and implementation from Tech Avora.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FBF8F1',
    theme_color: '#FBF8F1',
    icons: [
      {
        src: '/logo.png',
        sizes: '192x192',
        type: 'image/png',
      },
    ],
  };
}
