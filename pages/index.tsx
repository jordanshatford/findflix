import type { NextPage, GetServerSideProps } from 'next';
import { MovieListEnum, MediaTypeEnum } from '@/services/moviedb';

const Home: NextPage = () => {
  return <></>;
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: `/${MediaTypeEnum.MOVIE}/${MovieListEnum.POPULAR}`,
      permanent: true,
    },
  };
};

export default Home;
