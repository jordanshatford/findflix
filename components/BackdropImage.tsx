import Image from 'next/image';

interface Props {
  src: string;
  alt?: string;
}

const BackdropImage = ({ src, alt = '' }: Props) => {
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat z-0">
      {src && (
        <Image
          src={src}
          layout="fill"
          placeholder="blur"
          objectFit="cover"
          blurDataURL={src}
          alt={alt}
        />
      )}
    </div>
  );
};

export default BackdropImage;
