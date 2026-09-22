const configuredSiteUrl = process.env.NEXT_PRIVATE_SITE_URL?.trim();

export const siteUrl = configuredSiteUrl?.replace(/\/$/, '');
