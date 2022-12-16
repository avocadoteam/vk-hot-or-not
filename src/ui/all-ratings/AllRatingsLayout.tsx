import { getProfileHistoryFX } from '@core/api/rating/effects.rating';
import { $profileHistory, $ratingSort } from '@core/api/rating/store.rating';
import { openLink } from '@core/utils';
import { sgsStyles } from '@ui/settings/sgs.css';
import { valueToImgPath } from '@ui/slider/CoolSlider';
import { typography } from '@ui/theme/typography.css';
import { Avatar, SimpleCell, Spinner } from '@vkontakte/vkui';
import { useStore } from 'effector-react';
import { useCallback, useEffect } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import { noop } from 'rxjs';
import { NoResults } from './NoResults';

export const AllRatingsLayout = () => {
  const { hasNextPage, offset, ratings } = useStore($profileHistory);
  const { orderByRate, sex } = useStore($ratingSort);
  const isNextPageLoading = useStore(getProfileHistoryFX.pending);

  useEffect(() => {
    loadMoreItems();
  }, []);

  const loadMoreItems = useCallback(() => {
    if (isNextPageLoading || !hasNextPage) return;
    getProfileHistoryFX({ offset, sex, orderBy: orderByRate });
  }, [isNextPageLoading, hasNextPage, offset, orderByRate, sex]);

  const itemCount = hasNextPage ? ratings.length + 1 : ratings.length;

  const isItemLoaded = (index: number) => !hasNextPage || index < ratings.length;

  const Item = ({ index, style }: ListChildComponentProps) => {
    if (!isItemLoaded(index)) {
      return (
        <div style={style}>
          <Spinner />
        </div>
      );
    } else {
      return (
        <div style={style}>
          <SimpleCell
            before={<Avatar size={40} src={ratings[index].ava} />}
            onClick={() => openLink(`https://vk.ru/id${ratings[index].vkUserId}`)}
            indicator={
              <img width={24} height={24} src={valueToImgPath(ratings[index].rating ?? 5)} className={sgsStyles.rating} />
            }
          >
            <p className={typography({ color: 'primary', variant: 'caption' })}>{ratings[index].name}</p>
          </SimpleCell>
        </div>
      );
    }
  };

  if (!ratings.length) return <NoResults />;

  return (
    <div
      style={{
        minHeight: '85vh',
      }}
    >
      <AutoSizer>
        {({ height, width }) => (
          <InfiniteLoader
            isItemLoaded={isItemLoaded}
            itemCount={itemCount}
            loadMoreItems={!isNextPageLoading ? loadMoreItems : noop}
          >
            {({ onItemsRendered, ref }) => (
              <FixedSizeList
                itemCount={itemCount}
                onItemsRendered={onItemsRendered}
                ref={ref}
                height={height}
                width={width}
                itemSize={60}
              >
                {Item}
              </FixedSizeList>
            )}
          </InfiniteLoader>
        )}
      </AutoSizer>
    </div>
  );
};
