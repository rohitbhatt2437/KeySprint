import { Github, Twitter } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="py-6 px-6 md:px-12 w-full mt-auto">
      <div className="flex justify-between items-center text-muted-foreground">
        <p className="text-sm">&copy; {new Date().getFullYear()} DarkType. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <Link href="#" aria-label="Twitter">
            <Twitter className="w-5 h-5 hover:text-accent transition-colors" />
          </Link>
          <Link href="#" aria-label="GitHub">
            <Github className="w-5 h-5 hover:text-accent transition-colors" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
