import Link from 'next/link';
import { MouseEventHandler } from 'react';
import { UrlObject } from 'url';

interface Props {
  label: string;
  href: string | UrlObject;
  isActive?: boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

const NavbarItem = ({ label, href, isActive = false, onClick }: Props) => {
  return (
    <Link href={href} passHref>
      <a
        className={`${
          isActive
            ? 'text-white bg-zinc-900'
            : 'text-zinc-300 hover:bg-zinc-700'
        } block sm:inline px-3 py-2 rounded-lg`}
        onClick={onClick}
      >
        {label}
      </a>
    </Link>
  );
};

export default NavbarItem;
