import { useState } from 'react'
import './App.css'

function App() {
  const now = new Date();
  const dateLabel = now.toLocaleDateString('ko-KR', {
    year: 'numeric', month: 'long', day: 'numeric', weekday: 'long'
  });

  const [todos, setTodos] = useState([
    
  ]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all');
  const [nextId, setNextId] = useState(4);

  const filtered = () => {
    if (filter === 'active') return todos.filter(t => !t.done);
    if (filter === 'done')   return todos.filter(t =>  t.done);
    return todos;
  };

  const addTodo = () => {
    const text = input.trim();
    if (!text) return;
    setTodos([{ id: nextId, text, done: false }, ...todos]);
    setNextId(nextId + 1);
    setInput('');
    setFilter('all');
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  const clearDone = () => {
    setTodos(todos.filter(t => !t.done));
  };

  const activeCount = todos.filter(t => !t.done).length;

  return (
    <div id="app">
      <h1>오늘의 할 일</h1>
      <p className="subtitle">{dateLabel}</p>

      <div className="input-row">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addTodo()}
          placeholder="새 할 일 추가..."
        />
        <button onClick={addTodo}>+ 추가</button>
      </div>

      <div className="tabs">
        {['all', 'active', 'done'].map(f => (
          <button
            key={f}
            className={`tab ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {{ all: '전체', active: '진행 중', done: '완료' }[f]}
          </button>
        ))}
      </div>

      <div className="todo-list">
        {filtered().length === 0 ? (
          <div className="empty">할 일이 없습니다 ✓</div>
        ) : (
          filtered().map(todo => (
            <div key={todo.id} className="todo-item" onClick={() => toggleTodo(todo.id)}>
              <button className={`check-btn ${todo.done ? 'done' : ''}`}>
                {todo.done && '✓'}
              </button>
              <span className={`todo-text ${todo.done ? 'done' : ''}`}>
                {todo.text}
              </span>
              <button className="del-btn" onClick={(e) => {
                e.stopPropagation()
                deleteTodo(todo.id)
              }}>
                🗑
              </button>
            </div>
          ))
        )}
      </div>

      <div className="footer">
        <span>{activeCount}개 남음</span>
        <button className="clear-btn" onClick={clearDone}>완료 항목 삭제</button>
      </div>
    </div>
  )
}

export default App