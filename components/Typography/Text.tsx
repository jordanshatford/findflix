import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const Text = ({ children }: Props) => {
  return <p className="text-sm text-justify text-zinc-300">{children}</p>;
};

export default Text;
