'use client';

import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {}, [error]);

  return (
    <div className="min-h-screen flex flex-col justify-center gap-4 items-center">
      <h1 className="text-2xl font-semibold mb-4">
        Oh no, something went wrong...
      </h1>
      <Button size="lg" onClick={reset}>Refresh page</Button>
    </div>
  );
}
