import { title } from '@/components/primitives';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ComparePeople } from './compare-people';
import { Suspense } from 'react';

interface Props {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ id: string }>;
}

export default async function ComparePage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { id } = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'getCompare' });
  return (
    <div className='h-[calc(60vh)]'>
      <h1 className={title()}>{t('title')}</h1>
      <br />
      <br />
      <span className='mt-2'>{t('description1')}</span>
      <Suspense fallback='loading...'>
        <ComparePeople
          addPersonText={t('addPerson')}
          comparePeopleText={t('comparePeople')}
          paramId={id}
        />
      </Suspense>
    </div>
  );
}
