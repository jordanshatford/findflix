import Head from 'next/head';

interface Props {
  title?: string;
  url?: string;
  keywords?: string[];
}

const MetaHead = (props: Props) => {
  const siteName = 'FindFlix';
  const description =
    'FindFlix provides the ability to find and view your favourite Movies and TV Shows.';
  return (
    <Head>
      <title>{`${props.title} - ${siteName}`}</title>
      <meta name="title" content={`${props.title} - ${siteName}`} />
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content={`Movies, TV Shows, Streaming${
          props.keywords && props.keywords.join(', ')
        }`}
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={props.url} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={`${props.title} - ${siteName}`} />
      <meta property="og:description" content={description} />
    </Head>
  );
};

export default MetaHead;
