import type { Metadata } from 'next';
import './styles.css';
import { siteUrl } from './site';

const title = 'Software de postcosecha para flores | Florvia';
const description = 'Florvia ayuda a postcosechas florícolas pequeñas a registrar recepción, calidad, disponibilidad, pedidos y liquidaciones desde tablet y web.';

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title,
  description,
  applicationName: 'Florvia',
  category: 'Software de gestión para postcosechas florícolas',
  alternates: siteUrl ? { canonical: '/' } : undefined,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es',
    siteName: 'Florvia',
    title,
    description,
    url: siteUrl,
    images: siteUrl ? [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Florvia, software de postcosecha para flores' }] : undefined,
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: siteUrl ? ['/opengraph-image'] : undefined,
  },
  icons: {
    icon: '/icon.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Florvia',
    description,
    inLanguage: 'es',
    ...(siteUrl ? { url: siteUrl } : {}),
    publisher: {
      '@type': 'Organization',
      name: 'Florvia',
      ...(siteUrl ? { url: siteUrl } : {}),
    },
  };

  return (
    <html lang="es">
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </body>
    </html>
  );
}
