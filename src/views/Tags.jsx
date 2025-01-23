import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Tags = () => {
  const [tags, setTags] = useState([]); // Lista de tags
  const [newTag, setNewTag] = useState(''); // Campo para criar nova tag
  const [editingTag, setEditingTag] = useState(null); // Tag que está sendo editada
  const [error, setError] = useState(''); // Mensagem de erro

  // Carregar tags ao montar o componente
  useEffect(() => {
    fetchTags();
  }, []);

  // Função para buscar todas as tags
  const fetchTags = async () => {
    try {
      const response = await axios.get('http://localhost:8009/api/tags', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setTags(response.data.data);
    } catch (err) {
      console.error('Erro ao carregar tags:', err);
      setError('Erro ao carregar tags');
    }
  };

  // Função para criar nova tag
  const createTag = async () => {
    if (!newTag.trim()) {
      setError('O nome da tag é obrigatório.');
      return;
    }

    try {
      await axios.post(
        'http://localhost:8009/api/tags',
        { name: newTag },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      setNewTag('');
      fetchTags();
      setError('');
    } catch (err) {
      console.error('Erro ao criar tag:', err);
      setError('Erro ao criar a tag.');
    }
  };

  // Função para excluir uma tag
  const deleteTag = async (id) => {
    try {
      await axios.delete(`http://localhost:8009/api/tags/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      fetchTags();
    } catch (err) {
      console.error('Erro ao excluir tag:', err);
      setError('Erro ao excluir a tag.');
    }
  };

  // Função para atualizar uma tag
  const updateTag = async () => {
    if (!editingTag.name.trim()) {
      setError('O nome da tag é obrigatório.');
      return;
    }

    try {
      await axios.put(
        `http://localhost:8009/api/tags/${editingTag.id}`,
        { name: editingTag.name },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      setEditingTag(null); // Finaliza o modo de edição
      fetchTags(); // Atualiza a lista de tags
      setError('');
    } catch (err) {
      console.error('Erro ao atualizar tag:', err);
      setError('Erro ao atualizar a tag.');
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-700 mb-6">Gerenciamento de Tags</h1>

      {/* Formulário para criar nova tag */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Criar Nova Tag</h2>
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Nome da tag"
            className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
          />
          <button
            onClick={createTag}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Criar
          </button>
        </div>
        {error && <p className="mt-2 text-red-500">{error}</p>}
      </div>

      {/* Lista de tags */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Lista de Tags</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border-b py-2 text-left">ID</th>
              <th className="border-b py-2 text-left">Nome</th>
              <th className="border-b py-2 text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {tags.map((tag) => (
              <tr key={tag.id} className="hover:bg-gray-100">
                <td className="py-2">{tag.id}</td>
                <td className="py-2">
                  {editingTag?.id === tag.id ? (
                    <input
                      type="text"
                      value={editingTag.name}
                      className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                      onChange={(e) => setEditingTag({ ...editingTag, name: e.target.value })}
                    />
                  ) : (
                    tag.name
                  )}
                </td>
                <td className="py-2 flex space-x-2">
                  {editingTag?.id === tag.id ? (
                    <>
                      <button
                        onClick={updateTag}
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                      >
                        Salvar
                      </button>
                      <button
                        onClick={() => setEditingTag(null)}
                        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                      >
                        Cancelar
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setEditingTag(tag)}
                        className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => deleteTag(tag.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                      >
                        Excluir
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tags;