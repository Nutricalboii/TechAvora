import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Avora Ventures',
    short_name: 'Avora',
    description: 'Production-ready AI data operations and implementation from Avora Ventures.',
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
