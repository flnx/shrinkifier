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

    if (status === Status.LOADING && progress === 100) {
      setProgress(13);
      setIsVisible(true);
    }

    const isDone = status === Status.COMPLETED || status === Status.FAILED;

    const percentage = isDone ? 100 : Math.floor(Math.random() * 46) + 40;
    const wait = percentage === 100 ? 0 : 500;

    const timer = setTimeout(() => setProgress(percentage), wait);
    return () => clearTimeout(timer);
  }, [status]);

  useEffect(() => {
    if (progress === 100) {
      const hideTimer = setTimeout(() => setIsVisible(false), 50);
      return () => clearTimeout(hideTimer);
    }
  }, [progress]);

  if (status === Status.FAILED) {
    return (
      <small className="ml-auto pr-16 text-red-500 text-sm font-mono">
        Failed
      </small>
    );
  }

  const isInvisible = status === Status.PENDING || !isVisible;

  return (
    <Progress
      value={progress}
      className={cn('max-w-[250px] h-1', isInvisible ? 'invisible' : 'visible')}
    />
  );
}
