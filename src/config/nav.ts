import { NavItem } from '@/types/types';
import { Layers, LayoutDashboard, StickyNote } from 'lucide-react';

export const navItems: NavItem[] = [
  {
    title: '成績',
    href: '/',
    icon: LayoutDashboard,
  },
  {
    title: 'menu2',
    href: '/itpassport',
    icon: StickyNote,
  },
  {
    title: 'menu3',
    href: '/users',
    icon: Layers,
  },
];
