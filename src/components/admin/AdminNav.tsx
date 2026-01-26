'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  label: string;
  href: string;
  icon: string;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: '📊' },
  { label: 'Blog Posts', href: '/admin/blog', icon: '📝' },
  { label: 'Pages', href: '/admin/pages', icon: '📄' },
  { label: 'Waitlist', href: '/admin/waitlist', icon: '📧' },
];

export default function AdminNav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/admin/dashboard') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className="w-64 bg-white border-r border-gray-200 min-h-screen p-6">
      <ul className="space-y-2">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive(item.href)
                  ? 'bg-brand-violet text-white font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
