interface Props {
  isLoading: boolean;
  hasMore: boolean;
}

const PagedResultIndicator = ({ isLoading, hasMore }: Props) => {
  return (
    <div className="flex flex-col items-center mt-1 mb-5 text-white">
      {isLoading && hasMore && <div>Loading...</div>}
      {!hasMore && <div>No more results</div>}
    </div>
  );
};

export default PagedResultIndicator;
