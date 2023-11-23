import React, { useCallback } from 'react';
/* 231123
 * react-virtualized 라이브러리 추가
 */
import { List } from 'react-virtualized';
import './TodoList.scss';
import TodoListItem from './TodoListItem';

const TodoList = ({ todos, onRemove, onToggle }) => {
  /* 231123
   * rowRenderer 함수 추가
   */
  const rowRenderer = useCallback(
    ({ index, key, style }) => {
      const todo = todos[index];
      return (
        <TodoListItem todo={todo} key={key} onRemove={onRemove} onToggle={onToggle} style={style} />
      );
    },
    [onRemove, onToggle, todos],
  );

  return (
    /* 231123 코드 주석처리
     *<div className="TodoList">
     *  {todos.map((todo) => (<TodoListItem todo={todo} key={todo.id} onRemove={onRemove} onToggle={onToggle} />))}
     *</div>
     */
    <List
      className="TodoList"
      width={512} // 전체 크기
      height={700} // 전체 높이
      rowCount={todos.length} // 항목 개수
      rowHeight={60} // 항목 높이
      rowRenderer={rowRenderer} // 항목을 렌더링할 때 쓰는 함수
      list={todos} // 배열
      style={{ outline: 'none' }} // List에 기본 적용되는 outline 스타일 제거
    />
  );
};

export default React.memo(TodoList);
