import type { NextPage, GetServerSideProps } from 'next';
import { MovieListEnum, MediaTypeEnum } from '@/services/tmdb';

const IndexPage: NextPage = () => {
  return <></>;
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: `/${MediaTypeEnum.MOVIE}/${MovieListEnum.TRENDING}`,
      permanent: true,
    },
  };
};

export default IndexPage;
