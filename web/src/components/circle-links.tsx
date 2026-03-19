'use client';

import { Button } from '@nextui-org/button';
import { Chip } from '@nextui-org/react';
import { Link } from '@nextui-org/link';

interface CircleItem {
  name: string;
  href: string;
  style: React.CSSProperties;
  smallStyle: React.CSSProperties;
}

export function CircleLinks({ items }: { items: CircleItem[] }) {
  return (
    <>
      {items.map((e, idx) => (
        <div key={idx}>
          <Button
            key={idx}
            name={e.name}
            style={e.style}
            className='absolute hidden md:inline-flex hover:bg-secondary'
            variant='bordered'
            as={Link}
            href={e.href}
            aria-label={e.name}
          >
            {e.name}
          </Button>
          <Chip
            size='sm'
            color='secondary'
            variant='shadow'
            aria-label={e.name}
            classNames={{
              base: 'absolute md:hidden rounded-full left-[85px]',
              content: 'drop-shadow shadow-black text-white w-full w-36'
            }}
            style={e.smallStyle}
            as={Link}
            href={e.href}
          >
            {e.name}
          </Chip>
        </div>
      ))}
    </>
  );
}

export function CentreButton({ label, href }: { label: string; href: string }) {
  return (
    <Button
      isIconOnly
      aria-label={label}
      className='z-50 w-auto h-auto bg-gradient-to-b from-[#FF1CF7] to-[#7928CA]'
      radius='full'
      as={Link}
      href={href}
    >
      {/* Icon rendered by parent */}
    </Button>
  );
}
