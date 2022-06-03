import type { GetServerSideProps, NextPage } from 'next';
import Image from 'next/image';
import moviedb, { type DetailedMovie, MediaTypeEnum } from '@/services/moviedb';
import Poster from '@/components/Poster';

interface Props {
  result: DetailedMovie;
}

const MoviePage: NextPage<Props> = ({ result }: Props) => {
  const posterImageUrl = moviedb.getImageLink(result.poster_path);
  return (
    <>
      <div className="w-full relative pb-5 bg-zinc-900">
        <div className="w-full relative min-h-screen overflow-y-auto">
          <div
            className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat z-0"
            style={{
              backgroundImage: `url(${moviedb.getImageLink(
                result.backdrop_path,
                'original'
              )})`,
            }}
          ></div>
          <div className="w-full relative">
            {/* bg-gradient-to-b from-transparent to-zinc-900 */}
            <div
              className="w-full min-h-screen flex items-end backdrop-blur-[1px] px-[50px] pb-[50px]"
              style={{
                background: `linear-gradient(360deg, #0d0d0d 30%, transparent)`,
              }}
            >
              <div className="flex">
                {/* Replace this div with movie poster */}
                <div className="w-[210px] h-[320px] bg-zinc-800 rounded-lg relative self-end">
                  <div className="w-[210px] h-[320px] rounded-lg object-cover object-top overflow-hidden relative bg-zinc-800">
                    {posterImageUrl && (
                      <Image
                        src={posterImageUrl}
                        layout="fill"
                        placeholder="blur"
                        objectFit="cover"
                        blurDataURL={posterImageUrl}
                        alt={result.title}
                      />
                    )}
                  </div>
                </div>

                {/* <div className="{styles.content_plot}">
                  <h2 className="{styles.content_title}">{data.title}</h2>
                  <p className="{styles.content_tagline}">{data.tagline}</p>
                  <p className="{styles.content_details}">
                    <i className="bi bi-calendar-day"></i>{' '}
                    {getMonth(data.release_date)}{' '}
                    {data?.release_date?.slice(8, 10)},{' '}
                    {getYear(data.release_date)}
                    <span className={styles.dot}></span>
                    <span>
                      <i className="bi bi-star-fill"></i> {data.vote_average}
                    </span>
                    <span className={styles.dot}></span>
                    <span className={styles.runtime}>
                      <i className="bi bi-clock"></i>
                      {(data.runtime > 60
                        ? getHour(data.runtime) + 'hr '
                        : '') +
                        (getMinute(data.runtime)
                          ? getMinute(data.runtime) + ' min'
                          : '')}
                    </span>
                  </p>
                  <div className={styles.genres}>
                    {data?.genres?.map((item, i) => (
                      <span key={i} className={styles.genre}>
                        {item.name}
                      </span>
                    ))}
                  </div>
                  <p className={styles.content_overview}>{data.overview}</p>
                  {new Date() > new Date(data.release_date) ? (
                    <div className={styles.show}>
                      <Link href={'/en/movie/' + id + '/' + name + '/watch'}>
                        <a>
                          <div className={styles.watch_now}>
                            <i className="bi bi-play-fill"></i>
                            Watch Now
                          </div>
                        </a>
                      </Link>
                      <div
                                                    className={styles.show_trailer}
                                                    onClick={() => setwatch(true)}
                                                >
                                                    Trailer
                                                </div>
                    </div>
                  ) : null}
                </div> */}
              </div>

              <div className="{styles.content_o_details}">
                {/* <table>
                  <tbody>
                    <tr>
                      <td>Original Title</td>
                      <td>{data.original_title}</td>
                    </tr>
                    <tr>
                      <td>Status</td>
                      <td>{data.status}</td>
                    </tr>
                    <tr>
                      <td>Language</td>
                      <td>
                        {' '}
                        {data.spoken_languages.map((item, i) => (
                          <span key={i}>
                            {item.english_name}
                            {i != data.spoken_languages.length - 1
                              ? ','
                              : ''}{' '}
                          </span>
                        ))}
                      </td>
                    </tr>
                    <tr>
                      <td>Budget</td>
                      <td>{convertMoney(data.budget)}</td>
                    </tr>
                    <tr>
                      <td>Revenue</td>
                      <td>{convertMoney(data.revenue)}</td>
                    </tr>
                    <tr>
                      <td>Production</td>
                      <td>
                        {' '}
                        {data.production_companies.map((item, i) => (
                          <span key={i}>
                            {item.name}
                            {i != data.production_companies.length - 1
                              ? ','
                              : ''}{' '}
                          </span>
                        ))}
                      </td>
                    </tr>
                    <tr>
                      <td>Available in</td>
                      <td>
                        {Object.keys(torrents).length ? (
                          torrents?.results?.length ? null : (
                            <span>Not available</span>
                          )
                        ) : (
                          <span>Getting torrent files</span>
                        )}
                        {torrents?.results?.map((item) => {
                          let hash = item.link.split('/')[5];
                          let name = String(item.title).split(' ');
                          return (
                            <a
                              title={item.title}
                              className="magnet-file"
                              href={
                                'magnet:?xt=urn:btih:' +
                                hash +
                                '&amp;dn=' +
                                item.title +
                                '&amp;tr=udp%3A%2F%2Fglotorrents.pw%3A6969%2Fannounce&amp;tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&amp;tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&amp;tr=udp%3A%2F%2Fp4p.arenabg.ch%3A1337&amp;tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337'
                              }
                            >
                              <img
                                src={'/assets/magnet.svg'}
                                alt={'Magnet'}
                              ></img>{' '}
                              <span>{name[name.length - 1]}</span>
                            </a>
                          );
                        })}
                        <br />
                        {torrents?.results?.map((item) => {
                          let hash = item.link.split('/')[5];
                          let name = String(item.title).split(' ');
                          return (
                            <a
                              title={item.title}
                              className="torrent-file"
                              href={
                                'https://torrents.yts.hn/torrent/download/' +
                                hash
                              }
                            >
                              <i className="bi bi-download"></i>{' '}
                              <span>{name[name.length - 1]}</span>
                            </a>
                          );
                        })}
                      </td>
                    </tr>
                  </tbody>
                </table> */}
              </div>
            </div>
            {/* <ImageListContainer data={data.images.backdrops} imageSelect={imageSelect} title="Images" />
                        <VideoContainer data={data?.videos?.results} title="Trailers & Clips" />
                        <CastContainer type="cast" data={data.credits.cast} title="Cast" />
                        <CastContainer type="crew" data={data.credits.crew} title="Crew" />
                        <PosterListContainer type="movie" data={data.recommendations.results} title="More Like This" />
                        <PosterListContainer type="movie" data={data.similar.results} title="Recommendations" /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default MoviePage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };
  const result = await moviedb.getMovieDetails(id);
  return { props: { result } };
};
