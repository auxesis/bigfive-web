import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import type { Report } from '@/actions';

// Stub heavy/browser-dependent components
vi.mock('@/components/bar-chart', () => ({
  BarChart: ({ results }: { results: { title: string; domain: string }[] }) => (
    <ul aria-label='bar-chart'>
      {results.map((r) => (
        <li key={r.domain}>{r.title}</li>
      ))}
    </ul>
  )
}));

vi.mock('@/components/share-bar', () => ({ default: () => null }));

vi.mock('@/app/[locale]/result/[id]/report-language-switch', () => ({
  ReportLanguageSwitch: () => null
}));

vi.mock('@/app/[locale]/result/[id]/domain-tabs', () => ({
  DomainTabs: ({
    results
  }: {
    results: { title: string; domain: string }[];
  }) => (
    <ul aria-label='domain-tabs'>
      {results.map((r) => (
        <li key={r.domain}>{r.title}</li>
      ))}
    </ul>
  )
}));

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key
}));

vi.mock('@/navigation', () => ({
  Link: ({
    href,
    children,
    className
  }: {
    href: string;
    children: React.ReactNode;
    className?: string;
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  )
}));

vi.mock('@/actions', () => ({
  getTestResult: vi.fn()
}));

const DOMAINS = ['N', 'E', 'O', 'A', 'C'] as const;
const DOMAIN_TITLES: Record<string, string> = {
  N: 'Neuroticism',
  E: 'Extraversion',
  O: 'Openness To Experience',
  A: 'Agreeableness',
  C: 'Conscientiousness'
};

function makeMockReport(id: string): Report {
  return {
    id,
    timestamp: Date.now(),
    availableLanguages: [],
    language: 'en',
    results: DOMAINS.map((domain) => ({
      domain,
      title: DOMAIN_TITLES[domain],
      shortDescription: `Short description for ${domain}`,
      description: `Description for ${domain}`,
      scoreText: 'neutral',
      count: 24,
      score: 60,
      facets: [],
      text: `Result text for ${domain}`
    }))
  };
}

describe('ResultPage', () => {
  const reportId = 'ab8118ca-d140-4224-891a-f1934c95c9df';

  beforeEach(async () => {
    const { getTestResult } = await import('@/actions');
    vi.mocked(getTestResult).mockResolvedValue(makeMockReport(reportId));
  });

  it('renders all five personality domain names', async () => {
    const ResultPage = (await import('@/app/[locale]/result/[id]/page'))
      .default;

    render(
      await ResultPage({
        params: Promise.resolve({ id: reportId }),
        searchParams: Promise.resolve({ lang: 'en' })
      })
    );

    expect(screen.getAllByText('Neuroticism').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Extraversion').length).toBeGreaterThan(0);
    expect(
      screen.getAllByText('Openness To Experience').length
    ).toBeGreaterThan(0);
    expect(screen.getAllByText('Agreeableness').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Conscientiousness').length).toBeGreaterThan(0);
  });

  it('renders the result ID', async () => {
    const ResultPage = (await import('@/app/[locale]/result/[id]/page'))
      .default;

    render(
      await ResultPage({
        params: Promise.resolve({ id: reportId }),
        searchParams: Promise.resolve({ lang: 'en' })
      })
    );

    expect(screen.getByText(reportId)).toBeInTheDocument();
  });

  it('shows an alert when the result is not found', async () => {
    const { getTestResult } = await import('@/actions');
    vi.mocked(getTestResult).mockResolvedValue(undefined);

    const ResultPage = (await import('@/app/[locale]/result/[id]/page'))
      .default;

    render(
      await ResultPage({
        params: Promise.resolve({ id: 'unknown-id' }),
        searchParams: Promise.resolve({ lang: 'en' })
      })
    );

    expect(
      screen.getByText(/could not retrive the following id/i)
    ).toBeInTheDocument();
  });
});
