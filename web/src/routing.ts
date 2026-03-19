import { defineRouting } from 'next-intl/routing';
import { locales } from './config/site';

export const routing = defineRouting({
  locales,
  defaultLocale: 'en',
  localePrefix: 'as-needed'
});
