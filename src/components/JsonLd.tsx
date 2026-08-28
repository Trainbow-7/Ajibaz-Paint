export function LocalBusinessJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'AJIBAZ PAINT NIGERIA LIMITED',
    description:
      'Professional residential and commercial painting services, custom colour mixing, and paint/material sales in Ogun State, Nigeria by AJIBAZ PAINT NIGERIA LIMITED.',
    url: 'https://www.ajibazpaint.com',
    telephone: '+234-706-644-3082',
    email: 'info@ajibazpaint.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Iyana Cele, Adigbe, Abeokuta',
      addressLocality: 'Ogun State',
      addressCountry: 'NG',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 7.16,
      longitude: 3.35,
    },
    areaServed: [
      { '@type': 'State', name: 'Ogun State' },
      { '@type': 'State', name: 'Lagos State' },
    ],
    priceRange: '$$',
    image: '/images/og-image.jpg',
    sameAs: [],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '16:00',
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
