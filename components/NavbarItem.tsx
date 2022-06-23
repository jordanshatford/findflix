import Link from 'next/link';
import { UrlObject } from 'url';

interface Props {
  label: string;
  href: string | UrlObject;
  isActive?: boolean;
}

const NavbarItem = ({ label, href, isActive = false }: Props) => {
  return (
    <Link href={href} replace>
      <a
        className={`${
          isActive
            ? 'text-white bg-zinc-900'
            : 'text-zinc-300 hover:bg-zinc-700'
        } block sm:inline px-3 py-2 rounded-lg`}
      >
        {label}
      </a>
    </Link>
  );
};

export default NavbarItem;
