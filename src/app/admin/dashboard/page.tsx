'use client'
import React, { useEffect, useState } from 'react';
import { HiOutlineUser, HiOutlineUsers } from 'react-icons/hi2';
import { PiUsersThreeLight } from 'react-icons/pi';
import { IoIosArrowRoundDown } from 'react-icons/io';
import StatCard from '@/components/stat-cards/stat-cards';
import ProtectedRoute from '@/components/protection/protectedRoute';
import { getUserStats } from '@/libs/endpoints';
import LoadingSpinner from '@/components/loading-spinner/loading-spinner';
import FullScreenLoader from '@/components/full-screen-loader/full-screen-loader';

const DashboardPage = () => {
  const [stats, setStats] = useState([
    {
      icon: <HiOutlineUser size={24} className="text-[#2E1758]" />,
      title: 'Signups',
      value: 0, // Initialize with 0
      iconBackground: 'bg-[#E0DAFA]',
      href: '/admin/dashboard/signups',
    },
    {
      icon: <HiOutlineUsers size={24} className="text-[#116B97]" />,
      title: 'Policies',
      value: 0, // Initialize with 0
      iconBackground: 'bg-[#D1F0FA]',
      href: '/admin/dashboard/policies',
    },
    {
      icon: (
        <div className="flex flex-col items-center">
          <PiUsersThreeLight size={16} className="text-[#184E44]" />
          <IoIosArrowRoundDown size={14} className="text-[#184E44]" />
        </div>
      ),
      title: 'Abandoned Policies',
      value: 0, // Initialize with 0
      iconBackground: 'bg-[#DDF3EF] py-3 px-5',
      href: '/admin/dashboard/abandoned-policies',
    },
  ]);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const response = await getUserStats();
        const { signups, policies, abandonedPolicies } = response.data;

        // Update the stats array with the fetched data
        setStats([
          {
            icon: <HiOutlineUser size={24} className="text-[#2E1758]" />,
            title: 'Signups',
            value: signups,
            iconBackground: 'bg-[#E0DAFA]',
            href: '/admin/dashboard/signups',
          },
          {
            icon: <HiOutlineUsers size={24} className="text-[#116B97]" />,
            title: 'Policies',
            value: policies,
            iconBackground: 'bg-[#D1F0FA]',
            href: '/admin/dashboard/policies',
          },
          {
            icon: (
              <div className="flex flex-col items-center">
                <PiUsersThreeLight size={16} className="text-[#184E44]" />
                <IoIosArrowRoundDown size={14} className="text-[#184E44]" />
              </div>
            ),
            title: 'Abandoned Policies',
            value: abandonedPolicies,
            iconBackground: 'bg-[#DDF3EF] py-3 px-5',
            href: '/admin/dashboard/abandoned-policies',
          },
        ]);
      } catch (error) {
        setError('Failed to fetch user stats. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserStats();
  }, []);

  if (loading) {
    return <div>
      <FullScreenLoader/>
    </div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div>
      <div className="font-[Montserrat] text-2xl font-semibold text-gray-800 mb-5">
        Platform Insights
      </div>
      <div className="grid grid-cols-12 items-center gap-5 mb-5">
        {stats.map((stat, index) => (
          <div key={index} className="col-span-4">
            <StatCard
              icon={stat.icon}
              title={stat.title}
              value={stat.value}
              iconBackground={stat.iconBackground}
              href={stat.href}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  );
}