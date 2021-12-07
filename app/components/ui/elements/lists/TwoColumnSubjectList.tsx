import React from 'react';
import {FlatList, Dimensions, StyleSheet} from 'react-native';
import {IconButton} from '../..';
import {SubjectDTO} from '../../../../modules/Courses/services';
import {lists} from '../../../../shared/styles/lists';
import {SubjectCardItem} from '../list-items';
const {width} = Dimensions.get('window');

const TWO_COLUMNS_LIST_DEFAULT_OFFSET = 70;
type ColumnOffsetType = 'right' | 'left';

interface TwoColumnSubjectListProps {
  subjects: SubjectDTO[];
  style?: any;
  withColumnOffset?: boolean;
  columnOffset?: number;
  columnOffsetType?: ColumnOffsetType;
  onPressItem: (subjectId: string) => void;
  onPressAdd?: () => void;
  emptyComponent?: any;
}

function calcMargin(index: number, offset: number, type: ColumnOffsetType) {
  const isPair = index % 2 === 0;
  const isFirst = index === 0;
  const isSecond = index === 1;

  switch (type) {
    case 'right':
      return isSecond ? offset : !isFirst && isPair ? -offset : 0;
    case 'left':
      return isFirst ? offset : !isSecond && !isPair ? -offset : 0;
    default:
      return 0;
  }
}

export const TwoColumnSubjectList = ({
  subjects,
  withColumnOffset,
  columnOffset = TWO_COLUMNS_LIST_DEFAULT_OFFSET,
  columnOffsetType = 'left',
  style,
  onPressItem,
  onPressAdd,
  emptyComponent,
}: TwoColumnSubjectListProps) => {
  const renderSubjectListItem = ({item, index}: any) => {
    const offSetmagin = withColumnOffset
      ? calcMargin(index, columnOffset, columnOffsetType)
      : 0;

    return (
      <>
        {!!onPressAdd && index === 0 && (
          <IconButton
            onPress={onPressAdd}
            icon="add"
            size={32}
            style={[
              styles.addBtn,
              {
                left: columnOffsetType === 'left' ? 0 : 'auto',
                right: columnOffsetType === 'right' ? 0 : 'auto',
              },
            ]}
          />
        )}
        <SubjectCardItem
          item={item}
          index={index}
          offsetMargin={offSetmagin}
          onPress={() => onPressItem(item.id)}
        />
      </>
    );
  };

  return (
    <FlatList
      keyExtractor={item => item.id}
      horizontal={false}
      alwaysBounceHorizontal={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      data={subjects}
      ListEmptyComponent={emptyComponent || null}
      contentContainerStyle={[styles.list, style]}
      renderItem={renderSubjectListItem}
      columnWrapperStyle={lists.column}
      numColumns={2}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    paddingBottom: 120,
  },
  addBtn: {
    zIndex: 99,
    position: 'absolute',
    width: width / 2 - 30,
  },
});
