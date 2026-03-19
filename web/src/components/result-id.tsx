'use client';

import { formatAndValidateId } from '@/lib/helpers';
import { useMemo, useState } from 'react';
import { Input } from '@nextui-org/input';
import { ResultIcon } from '@/components/icons';

export default function ResultId() {
  const [id, setId] = useState('');

  const isInvalidId = useMemo(() => {
    if (id === '') return false;

    return !formatAndValidateId(id);
  }, [id]);

  return (
    <Input
      type='text'
      label='ID'
      labelPlacement='outside'
      placeholder='550e8400-e29b-41d4-a716-446655440000'
      startContent={
        <ResultIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
      }
      isInvalid={isInvalidId}
      color={isInvalidId ? 'danger' : 'default'}
      onValueChange={setId}
      errorMessage={isInvalidId && 'Please enter a valid ID'}
    />
  );
}
