import type { GetServerSideProps, NextPage } from "next";

const MoviePage: NextPage = () => {
  return <><p>dsdas</p></>
}

export default MoviePage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };
  return { notFound: true }
};
