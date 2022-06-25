import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const Title = ({ children }: Props) => {
  return <h2 className="font-semibold text-white text-3xl">{children}</h2>;
};

export default Title;
