import { ReactNode } from 'react';

interface Props {
  title: string;
  children: ReactNode;
}

const Container = ({ title, children }: Props) => {
  return (
    <div className="bg-zinc-900 pb-10 px-1 sm:px-5 md:px-20">
      <p className="text-white pb-2 pl-1 text-xl">{title}</p>
      {children}
    </div>
  );
};

export default Container;
