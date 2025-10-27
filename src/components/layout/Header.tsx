import Link from 'next/link';
import { Keyboard } from 'lucide-react';

export function Header() {
  return (
    <header className="py-4 px-6 md:px-12 bg-transparent text-foreground w-full">
      <nav className="flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Keyboard className="text-accent" />
          <h1 className="text-2xl font-headline font-bold text-accent">KeySprint</h1>
        </Link>
      </nav>
    </header>
  );
}
