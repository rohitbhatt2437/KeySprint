import Link from 'next/link';
import { Keyboard } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="py-4 px-6 md:px-12 bg-transparent text-foreground w-full">
      <nav className="flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Keyboard className="text-accent" />
          <h1 className="text-2xl font-headline font-bold text-accent">DarkType</h1>
        </Link>
        <div className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/" className="font-headline">Type</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/leaderboard" className="font-headline">Leaderboard</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/profile" className="font-headline">Profile</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
}
