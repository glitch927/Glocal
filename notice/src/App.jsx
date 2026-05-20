import { useState, useEffect } from "react";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    console.log("환영합니다! 게시판을 시작해요.");
  }, []);

  useEffect(() => {
    console.log("현재 글 개수:", posts.length);
  }, [posts]);

  const addPost = () => {
    if (input.trim() === "") {
      alert("제목을 입력해주세요!");
      return;
    }
    const newPost = { id: Date.now(), title: input };
    setPosts([...posts, newPost]);
    setInput("");
  };

  const deletePost = (id) => {
    setPosts(posts.filter((p) => p.id !== id));
  };

  const startEdit = (post) => {
    setEditId(post.id);
    setEditText(post.title);
  };

  const saveEdit = () => {
    if (editText.trim() === "") {
      alert("내용을 입력해주세요!");
      return;
    }
    setPosts(
      posts.map((p) => (p.id === editId ? { ...p, title: editText } : p))
    );
    setEditId(null);
    setEditText("");
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditText("");
  };

  return (
    <div className="app">
      <h1>우리반 게시판</h1>
      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="제목을 입력하세요"
        />
        <button onClick={addPost}>등록</button>
      </div>
      <p className="count">총 글 개수: {posts.length}</p>
      <ul className="post-list">
        {posts.length === 0 && (
          <li className="empty">아직 글이 없어요. 첫 글을 작성해보세요!</li>
        )}
        {posts.map((post) => (
          <li key={post.id} className="post-item">
            {editId === post.id ? (
              <>
                <input
                  type="text"
                  className="edit-input"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button className="btn-save" onClick={saveEdit}>저장</button>
                <button className="btn-cancel" onClick={cancelEdit}>취소</button>
              </>
            ) : (
              <>
                <span className="post-title">{post.title}</span>
                <button className="btn-edit" onClick={() => startEdit(post)}>수정</button>
                <button className="btn-delete" onClick={() => deletePost(post.id)}>삭제</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}