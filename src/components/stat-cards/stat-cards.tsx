import React from 'react';
import Link from 'next/link';

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: number;
  iconBackground: string;
  href: string;
}

export default function StatCard({
  icon,
  title,
  value,
  iconBackground,
  href,
}: StatCardProps) {
  return (
    <Link href={href}>
      <div className="flex gap-8 justify-start items-center p-4 rounded-md shadow-lg bg-white cursor-pointer hover:shadow-xl">
        <div className={`rounded-md p-4 ${iconBackground}`}>{icon}</div>
        <div>
          <div className="text-gray-600 text-lg font-medium">{title}</div>
          <div className="text-4xl font-semibold">{value}</div>
        </div>
      </div>
    </Link>
  );
}