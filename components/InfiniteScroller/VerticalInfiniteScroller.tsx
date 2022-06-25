import { ReactNode } from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';

interface Props {
  loading: boolean;
  hasMore: boolean;
  disabled: boolean;
  onLoadMore: () => void;
  children: ReactNode[];
  className?: string;
}

const VerticalInfiniteScroller = (props: Props) => {
  const [sentryRef] = useInfiniteScroll({
    loading: props.loading,
    hasNextPage: props.hasMore,
    onLoadMore: props.onLoadMore,
    // When there is an error, we stop infinite loading.
    disabled: props.disabled,
    // `rootMargin` is passed to `IntersectionObserver`.
    // We can use it to trigger 'onLoadMore' when the sentry comes near to become
    // visible, instead of becoming fully visible on the screen.
    rootMargin: '0px 0px 400px 0px',
  });

  return (
    <div className={props.className}>
      <div className="flex flex-wrap justify-center gap-4">
        {props.children}
      </div>
      <div ref={sentryRef}></div>
      <div className="flex flex-col items-center mt-2 mb-5 text-white">
        {props.loading && props.hasMore && <div>Loading...</div>}
        {!props.hasMore && <div>No more results</div>}
      </div>
    </div>
  );
};

export default VerticalInfiniteScroller;
