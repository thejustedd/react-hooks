import { useState } from 'react';
import Hover from './components/Hover';
import List from './components/List';
import useDebounce from './hooks/useDebounce';
import useInput from './hooks/useInput';
import useRequest from './hooks/useRequest';

function App() {
  const [query, setQuery] = useState('');
  const debouncedSearch = useDebounce(search, 500);
  const [todos, loading, error] = useRequest(fetchTodos);
  const username = useInput('');
  const password = useInput('');

  function search(query) {
    fetch(`https://jsonplaceholder.typicode.com/todos?query=${query}`)
      .then(response => response.json())
      .then(json => {
        console.log(json);
      });
  }

  function fetchTodos() {
    return fetch(`https://jsonplaceholder.typicode.com/todos`);
  }

  function onChange(e) {
    const query = e.target.value;
    setQuery(query);
    debouncedSearch(query);
  }

  if (loading) {
    return <h1>Идёт загрузка...</h1>;
  }

  if (error) {
    return <h1>Произошла ошибка при загрузке данных: {error.stack}</h1>;
  }

  return (
    <div>
      <input {...username} type="text" placeholder="Username" />
      <input {...password} type="text" placeholder="Password" />
      <button onClick={() => console.log(username.value, password.value)}>Click</button>
      <input type="text" value={query} onChange={onChange} />
      <Hover />
      <div>
        {todos && todos.map(todo =>
          <div key={todo.id} style={{ padding: 15, border: '1px solid black' }}>
            {todo.id}. {todo.title}
          </div>
        )}
      </div>
      {/* <List /> */}
    </div>
  );
}

export default App;
