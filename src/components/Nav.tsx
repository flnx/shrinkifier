import Link from 'next/link';
import { ThemeToggler } from './ThemeToggler';

export function Nav() {
  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-white shadow-sm dark:bg-gray-950">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link className="flex items-center gap-2" href="#">
          <MountainIcon className="h-6 w-6" />
          <span className="text-lg font-bold">Shrinkifier</span>
        </Link>
        <ThemeToggler />
      </div>
    </header>
  );
}

function MountainIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
