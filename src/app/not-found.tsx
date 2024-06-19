import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon } from '@radix-ui/react-icons';

export default async function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl text-foreground mb-8">Page Not Found</p>
      <Button asChild size="lg">
        <Link href="/">
          <div className="flex items-center justify-center gap-2">
            <ArrowLeftIcon className="w-5 h-5" />
            Back to home page
          </div>
        </Link>
      </Button>
    </div>
  );
}
