import Image from 'next/image';

interface Props {
  image: string;
  alt: string | undefined;
  children?: React.ReactNode;
}

const BasicPoster = ({ image, alt, children }: Props) => {
  return (
    <div className="flex justify-center">
      <div className="w-44 h-64 overflow-hidden relative rounded-lg bg-zinc-800 bg-opacity-80 backdrop-blur-sm">
        {image && (
          <Image
            src={image}
            layout="fill"
            placeholder="blur"
            objectFit="cover"
            blurDataURL={image}
            alt={alt}
          />
        )}
        {children}
      </div>
    </div>
  );
};

export default BasicPoster;
