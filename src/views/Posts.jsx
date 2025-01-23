import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Posts = () => {
  const [posts, setPosts] = useState([]); // Lista de posts
  const [tags, setTags] = useState([]); // Lista de tags
  const [newPost, setNewPost] = useState({ title: '', content: '', tags: [] }); // Novo post
  const [editingPost, setEditingPost] = useState(null); // Post sendo editado
  const [error, setError] = useState(''); // Mensagem de erro

  useEffect(() => {
    fetchPosts();
    fetchTags();
  }, []);

  // Buscar todos os posts
  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:8009/api/posts', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setPosts(response.data.data);
    } catch (err) {
      console.error('Erro ao carregar posts:', err);
      setError('Erro ao carregar posts.');
    }
  };

  // Buscar todas as tags
  const fetchTags = async () => {
    try {
      const response = await axios.get('http://localhost:8009/api/tags', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setTags(response.data.data);
    } catch (err) {
      console.error('Erro ao carregar tags:', err);
      setError('Erro ao carregar tags.');
    }
  };

  // Criar novo post
  const createPost = async () => {
    if (!newPost.title.trim() || !newPost.content.trim()) {
      setError('Título e conteúdo são obrigatórios.');
      return;
    }

    try {
      await axios.post(
        'http://localhost:8009/api/posts',
        newPost,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setNewPost({ title: '', content: '', tags: [] });
      fetchPosts();
      setError('');
    } catch (err) {
      console.error('Erro ao criar post:', err);
      setError('Erro ao criar o post.');
    }
  };

  // Atualizar um post existente
  const updatePost = async () => {
    if (!editingPost.title.trim() || !editingPost.content.trim()) {
      setError('Título e conteúdo são obrigatórios.');
      return;
    }

    try {
      await axios.put(
        `http://localhost:8009/api/posts/${editingPost.id}`,
        editingPost,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setEditingPost(null); // Finalizar modo de edição
      fetchPosts(); // Atualizar a lista
      setError('');
    } catch (err) {
      console.error('Erro ao atualizar post:', err);
      setError('Erro ao atualizar o post.');
    }
  };

  // Excluir um post
  const deletePost = async (id) => {
    try {
      await axios.delete(`http://localhost:8009/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      fetchPosts();
    } catch (err) {
      console.error('Erro ao excluir post:', err);
      setError('Erro ao excluir o post.');
    }
  };

  // Manipular seleção de tags
  const handleTagChange = (e, isEditing = false) => {
    const selectedTags = Array.from(e.target.selectedOptions, (option) => option.value);

    if (isEditing) {
      setEditingPost({ ...editingPost, tags: selectedTags });
    } else {
      setNewPost({ ...newPost, tags: selectedTags });
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-700 mb-6">Gerenciamento de Posts</h1>

      {/* Formulário para criar novo post */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Criar Novo Post</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Título"
            className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          />
          <textarea
            placeholder="Conteúdo"
            className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={newPost.content}
            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
          />
          <select
            multiple
            className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            onChange={(e) => handleTagChange(e)}
          >
            {tags.map((tag) => (
              <option key={tag.id} value={tag.id}>
                {tag.name}
              </option>
            ))}
          </select>
          <button
            onClick={createPost}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Criar Post
          </button>
        </div>
        {error && <p className="mt-4 text-red-500">{error}</p>}
      </div>

      {/* Lista de posts */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Lista de Posts</h2>
        {posts.map((post) => (
          <div key={post.id} className="mb-4 border-b pb-4">
            {editingPost?.id === post.id ? (
              <>
                <input
                  type="text"
                  value={editingPost.title}
                  className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 mb-2"
                  onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                />
                <textarea
                  value={editingPost.content}
                  className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 mb-2"
                  onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                />
                <select
                  multiple
                  className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 mb-2"
                  value={editingPost.tags}
                  onChange={(e) => handleTagChange(e, true)}
                >
                  {tags.map((tag) => (
                    <option key={tag.id} value={tag.id}>
                      {tag.name}
                    </option>
                  ))}
                </select>
                <button
                  onClick={updatePost}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 mr-2"
                >
                  Salvar
                </button>
                <button
                  onClick={() => setEditingPost(null)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                >
                  Cancelar
                </button>
              </>
            ) : (
              <>
                <h3 className="text-lg font-bold">{post.title}</h3>
                <p>{post.content}</p>
                <p className="text-sm text-gray-500">
                  Tags: {post.tags?.map((tag) => tag.name).join(', ') || 'Nenhuma'}
                </p>
                <button
                  onClick={() => setEditingPost(post)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 mr-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => deletePost(post.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Excluir
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;