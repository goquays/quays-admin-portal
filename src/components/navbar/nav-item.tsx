// components/nav-item.tsx
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MdOutlineDashboard, MdOutlineLogout } from 'react-icons/md';
import { PiNotificationDuotone } from 'react-icons/pi';

type IconType = 'dashboard' | 'notification' | 'logout';

interface NavItemProps {
  href: string;
  icon: IconType;
  label: string;
}

const iconMap = {
  dashboard: MdOutlineDashboard,
  notification: PiNotificationDuotone,
  logout: MdOutlineLogout,
};

export default function NavItem({ href, icon, label }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname.startsWith(href);
  const IconComponent = iconMap[icon];

  return (
    <li>
      <div
        className={`p-3 rounded-md ${
          isActive ? 'bg-[#33336f]' : 'hover:bg-[#33336f]'
        }`}
      >
        <Link href={href} className="flex gap-4 items-center">
          <IconComponent size={24} className="text-white" />
          <span className="text-xl">{label}</span>
        </Link>
      </div>
    </li>
  );
}