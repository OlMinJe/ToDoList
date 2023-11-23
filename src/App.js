import React, { useCallback, useRef, useState } from 'react';
import './App.css';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';
import TodoTemplate from './components/TodoTemplate';

/* 231123.ver
 * 성능 테스트를 위해 2000개의 할 일을 넣어봄
 */
function createBulkTodos() {
  const array = [];
  for (let i = 1; i <= 2000; i++) {
    array.push({
      id: i,
      text: `할 일 ${i}`,
      checked: false,
    });
  }
  return array;
}

function App() {
  /* 231123.ver
   * 파라미터 대신 함수형 업데이트로 변경
   */
  const [todos, setTodos] = useState(createBulkTodos);
  const nextId = useRef(1);
  const onInsert = useCallback((text) => {
    const todo = {
      id: nextId.current,
      text,
      checked: false,
    };
    /* 231123.ver
     * setTodos(todos.concat(todo));
     * 위 코드 대신 함수형 업데이트로 바꿔준다.
     */
    setTodos((todos) => todos.concat(todo));
    nextId.current += 1;
  });

  const onRemove = useCallback((id) => {
    /* 231123.ver
     * setTodos(todos.filter((todo) => todo.id !== id)), [todos];
     * 위 코드 대신 함수형 업데이트로 바꿔준다.
     */
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  }, []);

  const onToggle = useCallback(
    (id) =>
      /* 231123.ver
       * setTodos(todos.map((todo) => (todo.id === id ? { ...todo, checked: !todo.checked } : todo))), [todos],
       * 위 코드 대신 함수형 업데이트로 바꿔준다.
       */
      setTodos((todos) =>
        todos.map((todo) => (todo.id === id ? { ...todo, checked: !todo.checked } : todo)),
      ),
    [],
  );

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
}

export default App;
