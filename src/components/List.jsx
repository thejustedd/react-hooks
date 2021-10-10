import React, { useRef, useState } from 'react'
import useScroll from '../hooks/useScroll';

function List() {
  const [todos, setTodos] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 20;
  const parentRef = useRef();
  const childRef = useRef();

  useScroll(parentRef, childRef, () => fetchTodos(page, limit));

  function fetchTodos(page, limit) {
    fetch(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}&_page=${page}`)
      .then(response => response.json())
      .then(json => {
        setTodos(prev => [...prev, ...json]);
        setPage(prev => prev + 1);
      });
  }

  return (
    <div ref={parentRef} style={{ height: '80vh', overflowY: 'auto' }}>
      {todos.map(todo =>
        <div key={todo.id} style={{ padding: 15, border: '1px solid black' }}>
          {todo.id}. {todo.title}
        </div>
      )}
      <div ref={childRef} style={{ height: 20, backgroundColor: 'green' }}></div>
    </div>
  )
}

export default List
