import { useState } from 'react';
import { useRouter } from 'next/router';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { MediaTypeEnum } from '@/services/tmdb';
import NavbarItem from '@/components/Navbar/NavbarItem';

const Navbar = () => {
  const router = useRouter();
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
  const routes = [
    {
      label: 'Movies',
      href: '/movie/trending',
      id: MediaTypeEnum.MOVIE,
    },
    {
      label: 'TV Shows',
      href: '/tv/trending',
      id: MediaTypeEnum.TV_SHOW,
    },
    {
      label: 'Jordans Favourites',
      href: '/favourites',
      id: 'favourites',
    },
    {
      label: 'Search',
      href: '/search',
      id: 'search',
    },
  ];

  return (
    <nav className="bg-zinc-800 shadow-md shadow-zinc-900 fixed top 0 z-40 w-full">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden text-zinc-200">
            {showMobileMenu && (
              <XIcon
                onClick={() => setShowMobileMenu(false)}
                className="w-8 h-8 cursor-pointer hover:text-red-800"
              />
            )}
            {!showMobileMenu && (
              <MenuIcon
                onClick={() => setShowMobileMenu(true)}
                className="w-8 h-8 cursor-pointer"
              />
            )}
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              <p className="text-red-700 text-3xl font-extrabold uppercase">
                FF
              </p>
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                {routes.map((route) => (
                  <NavbarItem
                    key={route.id}
                    label={route.label}
                    href={route.href}
                    isActive={
                      router.query.type === route.id ||
                      router.pathname === route.href
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {showMobileMenu && (
        <div className="block sm:hidden px-3 pt-2 pb-3 space-y-1">
          {routes.map((route) => (
            <NavbarItem
              key={route.id}
              label={route.label}
              href={route.href}
              isActive={
                router.query.type === route.id || router.pathname === route.href
              }
              onClick={() => setShowMobileMenu(false)}
            />
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
