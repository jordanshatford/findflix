import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { UrlObject } from 'url';

interface Props {
  imageUrl: string;
  href: string | UrlObject;
  title?: string;
  subtitle?: string;
  description?: string;
  isHoverable?: boolean;
}

const Poster = ({
  imageUrl,
  href,
  title = '',
  subtitle = '',
  description = '',
  isHoverable = true,
}: Props) => {
  return (
    <Link href={href} passHref>
      <a className="group">
        <motion.div
          whileHover={{ scale: isHoverable ? 1.05 : 1 }}
          className="flex justify-center"
        >
          <div className="flex justify-center">
            <div className="w-44 h-64 overflow-hidden relative rounded-lg bg-zinc-800 bg-opacity-80 backdrop-blur-sm">
              {imageUrl && (
                <Image
                  src={imageUrl}
                  layout="fill"
                  placeholder="blur"
                  objectFit="cover"
                  blurDataURL={imageUrl}
                  alt={title}
                />
              )}
              {isHoverable && (
                <>
                  <div className="py-4 px-3 w-full h-full hidden absolute group-hover:flex bg-zinc-800 bg-opacity-80 backdrop-blur-sm justify-end flex-col">
                    <p className="font-semibold text-sm text-white">{title}</p>
                    <p className="line-clamp-3 text-xs font-light text-zinc-400">
                      {subtitle}
                    </p>
                    <p className="line-clamp-3 text-xs font-light text-zinc-400">
                      {description}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </a>
    </Link>
  );
};

export default Poster;
