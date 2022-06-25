import { ReactNode, useEffect, useState, useContext } from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { CaretLeft, CaretRight } from 'phosphor-react';

interface ArrowProps {
  children: ReactNode;
  disabled: boolean;
  onClick: () => void;
  className?: string;
}

const Arrow = ({ children, disabled, onClick, className }: ArrowProps) => {
  return (
    <button
      className={`block disabled:hidden h-full bg-zinc-800 border border-zinc-800 hover:bg-zinc-700 ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const LeftArrow = () => {
  const {
    isFirstItemVisible,
    scrollPrev,
    visibleItemsWithoutSeparators,
    initComplete,
  } = useContext(VisibilityContext);

  const [disabled, setDisabled] = useState<boolean>(
    !initComplete || (initComplete && isFirstItemVisible)
  );

  useEffect(() => {
    if (visibleItemsWithoutSeparators.length) {
      setDisabled(isFirstItemVisible);
    }
  }, [isFirstItemVisible, visibleItemsWithoutSeparators]);

  return (
    <Arrow
      className="rounded-tl-lg rounded-bl-lg mr-1"
      disabled={disabled}
      onClick={() => scrollPrev()}
    >
      <CaretLeft size={30} className="h-full flex align-middle text-white" />
    </Arrow>
  );
};

interface RightArrowProps {
  hasMore: boolean;
  onLoadMore: () => void;
}

const RightArrow = ({ hasMore, onLoadMore }: RightArrowProps) => {
  const {
    isLastItemVisible,
    scrollNext,
    visibleItemsWithoutSeparators,
    items,
  } = useContext(VisibilityContext);

  const [disabled, setDisabled] = useState<boolean>(
    !visibleItemsWithoutSeparators.length && isLastItemVisible
  );

  useEffect(() => {
    if (isLastItemVisible) {
      onLoadMore();
    }
    if (!hasMore) {
      setDisabled(isLastItemVisible);
    }
  }, [items, hasMore, isLastItemVisible, onLoadMore]);

  return (
    <Arrow
      className="rounded-tr-lg rounded-br-lg ml-1"
      disabled={disabled}
      onClick={() => scrollNext()}
    >
      <CaretRight size={30} className="h-full flex align-middle text-white" />
    </Arrow>
  );
};

interface ItemProps {
  itemId: string;
  children: ReactNode;
}

export const Item = ({ itemId, children }: ItemProps) => {
  const visibility = useContext(VisibilityContext);
  visibility.isItemVisible(itemId);
  return <div>{children}</div>;
};

type ItemType = React.ReactElement<{
  itemId: string;
}>;

interface Props {
  hasMore: boolean;
  onLoadMore: () => void;
  children: ItemType | ItemType[];
  className?: string;
}

const HorizontalInfiniteScroller = (props: Props) => {
  return (
    <ScrollMenu
      LeftArrow={LeftArrow}
      RightArrow={
        <RightArrow hasMore={props.hasMore} onLoadMore={props.onLoadMore} />
      }
      wrapperClassName={props.className}
      separatorClassName="mx-2"
    >
      {props.children}
    </ScrollMenu>
  );
};

HorizontalInfiniteScroller.Item = Item;
export default HorizontalInfiniteScroller;
