import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Property } from '../types';

interface SEOHeadProps {
  currentView: string;
  selectedProperty?: Property | null;
}

export const SEOHead: React.FC<SEOHeadProps> = ({ currentView, selectedProperty }) => {
  const baseUrl = 'https://www.morganpropertyservices.co.uk/';

  // 1. If viewing a specific property detail modal
  if (selectedProperty) {
    const title = `${selectedProperty.title} | Morgan Property Services Newry`;
    const description = `${selectedProperty.title} - ${selectedProperty.priceText}. Located at ${selectedProperty.address.street}, ${selectedProperty.address.town} (${selectedProperty.address.postcode}). ${selectedProperty.bedrooms} Beds, ${selectedProperty.bathrooms} Baths, ${selectedProperty.sqft} sq ft. Contact Morgan Property Services at 028 3025 0000.`;
    const image = selectedProperty.mainImage;
    const url = `${baseUrl}#properties`;

    return (
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={url} />
        <meta property="og:site_name" content="Morgan Property Services" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
      </Helmet>
    );
  }

  // 2. Views configuration mapping
  const viewSeoMap: Record<string, { title: string; description: string; url: string }> = {
    home: {
      title: 'Morgan Property Services | Estate Agents Newry & Mourne',
      description: 'Leading Independent Estate Agents in Newry and Mourne specializing in residential property sales, lettings, commercial real estate, and expert valuations across Co. Down & Co. Armagh.',
      url: `${baseUrl}#home`
    },
    properties: {
      title: 'Property Search & Listings | Morgan Property Services Newry',
      description: 'Browse houses for sale, property to let, and commercial real estate across Newry, Warrenpoint, Rostrevor, Camlough and surrounding South Down areas.',
      url: `${baseUrl}#properties`
    },
    sales: {
      title: 'Residential Houses For Sale | Newry & Mourne Estate Agents',
      description: 'Discover premier residential houses and apartments for sale in Newry and Mourne. Dedicated property sales team with local market expertise.',
      url: `${baseUrl}#sales`
    },
    lettings: {
      title: 'Residential Lettings & Property Management | Newry & Mourne',
      description: 'Explore quality rental properties in Newry & Mourne. Professional landlord letting services, tenant sourcing, and comprehensive property management.',
      url: `${baseUrl}#lettings`
    },
    commercial: {
      title: 'Commercial Real Estate & Retail Units | Newry & Mourne',
      description: 'Commercial property for sale and to lease in Newry City Centre and surrounding industrial estates. Retail premises, offices, and developmental land.',
      url: `${baseUrl}#commercial`
    },
    about: {
      title: 'About Morgan Property Services | Independent Newry Estate Agency',
      description: 'Learn about Morgan Property Services, our history, client-first philosophy, and dedicated local team serving buyers and sellers in Newry & Mourne.',
      url: `${baseUrl}#about`
    },
    services: {
      title: 'Real Estate Services & Free Valuations | Morgan Property Services',
      description: 'Comprehensive property services: Free market valuations, residential sales, tenant letting management, commercial advice, and EPC certificates in Newry.',
      url: `${baseUrl}#services`
    },
    contact: {
      title: 'Contact Us | Morgan Property Services Estate Agency Newry',
      description: 'Get in touch with Morgan Property Services team in Newry. Call 028 3025 0000 or visit our office at Monaghan Street, Newry.',
      url: `${baseUrl}#contact`
    }
  };

  const seo = viewSeoMap[currentView] || viewSeoMap.home;

  return (
    <Helmet>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <link rel="canonical" href={seo.url} />

      {/* Keywords */}
      <meta 
        name="keywords" 
        content="Estate Agents Newry, Houses for sale Newry, Property to let Newry, Morgan Property Services, Real Estate Warrenpoint, Rostrevor Property, Commercial Property Newry, Property Valuation Newry" 
      />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:site_name" content="Morgan Property Services" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
    </Helmet>
  );
};
