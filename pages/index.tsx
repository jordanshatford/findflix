import type { NextPage, GetServerSideProps } from 'next';

const Home: NextPage = () => {
  return <></>;
};

export const getServerSideProps: GetServerSideProps = async () => {
  return { redirect: { destination: '/favourites', permanent: true } };
};

export default Home;
