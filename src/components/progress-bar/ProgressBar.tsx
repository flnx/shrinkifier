'use client';

import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { Status } from '@/types/FileData';
import { useEffect, useState } from 'react';

export function ProgressBar({ status }: { status: Status }) {
  const [progress, setProgress] = useState(13);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (status === Status.PENDING) return;

    const percentage = status === Status.COMPLETED ? 100 : 66;
    const timer = setTimeout(() => setProgress(percentage), 500);
    return () => clearTimeout(timer);
  }, [status]);

  useEffect(() => {
    if (progress === 100) {
      const hideTimer = setTimeout(() => setIsVisible(false), 50);
      return () => clearTimeout(hideTimer);
    }
  }, [progress]);

  const isInvisible = status === Status.PENDING || !isVisible;

  return (
    <Progress
      value={progress}
      className={cn('max-w-[250px] h-1', isInvisible ? 'visible' : 'visible')}
    />
  );
}
