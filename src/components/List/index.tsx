import React, { useCallback, useRef } from 'react';
import {
  AutoSizer,
  WindowScroller,
  List as WindowList,
  CellMeasurerCache,
  CellMeasurer,
} from 'react-virtualized';
import { ResultsType } from '../../api/randomUser';
import { ListWrapper } from './List.style';
import ListItem from '../ListItem';

interface ListPropsType {
  list: ResultsType[];
  onClickListItem: (phone: string, isBookmark?: boolean) => void;
}

const List = ({ list, onClickListItem }: ListPropsType) => {
  const listRef = useRef<WindowList | undefined>(undefined);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const cache = new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 20,
  });

  const rowRenderer = useCallback(
    ({ key, index, parent, style }) => {
      const item = list[index];
      if (!item) return <></>;

      const customStyle: React.CSSProperties = {
        ...style,
        width: '100%',
      };

      const { cell, name, phone, email, picture, isBookmark } = item;
      const fullName = `${name.title}. ${name.first} ${name.last}`;

      return (
        <CellMeasurer key={key} cache={cache} parent={parent} rowIndex={index}>
          <ListItem
            style={customStyle}
            phone={phone}
            picture={picture}
            fullName={fullName}
            cell={cell}
            email={email}
            isBookmark={isBookmark}
            onClickListItem={onClickListItem}
          />
        </CellMeasurer>
      );
    },
    [list, cache, onClickListItem],
  );

  if (!list) return null;

  return (
    <ListWrapper>
      <WindowScroller>
        {({ height, scrollTop }) => (
          <AutoSizer disableHeight>
            {({ width }) => {
              return (
                <WindowList
                  ref={(ref) => {
                    listRef.current = ref as WindowList;
                  }}
                  autoHeight
                  width={width}
                  height={height}
                  scrollTop={scrollTop}
                  rowCount={list && list.length}
                  rowHeight={cache.rowHeight}
                  deferredMeasurementCache={cache}
                  rowRenderer={rowRenderer}
                />
              );
            }}
          </AutoSizer>
        )}
      </WindowScroller>
    </ListWrapper>
  );
};

export default List;
