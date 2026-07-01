import React, { useState, useEffect } from 'react';
import { fetchNews } from '../../services/api';
import { FaEdit, FaTrashAlt, FaSearch } from 'react-icons/fa';
import Modal from '../../components/Admin/Modal';

const NewsManagement = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  
  // Search state
  const [searchQuery, setSearchQuery] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    title: '', category: 'తెలంగాణ', author: '', image: ''
  });

  useEffect(() => {
    const getNews = async () => {
      try {
        const data = await fetchNews();
        setNews(data);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };
    getNews();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      setNews(news.filter(item => item.id !== id));
      // In a real app, call API to delete
    }
  };

  const openModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({ title: item.title, category: item.category, author: item.author, image: item.image || '' });
    } else {
      setEditingItem(null);
      setFormData({ title: '', category: 'తెలంగాణ', author: '', image: '' });
    }
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editingItem) {
      // Update
      setNews(news.map(item => item.id === editingItem.id ? { ...item, ...formData } : item));
    } else {
      // Add new
      const newItem = {
        id: Date.now(),
        ...formData,
        date: new Date().toISOString()
      };
      setNews([newItem, ...news]);
    }
    setIsModalOpen(false);
  };

  const filteredNews = news.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#1e293b] mb-1">News Management</h1>
          <p className="text-gray-500">Review and manage all news articles.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search articles..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red text-sm"
            />
          </div>
          <button 
            onClick={() => openModal()}
            className="bg-[#c8102e] text-white px-5 py-2 rounded-lg shadow-lg shadow-red-900/20 font-bold hover:bg-[#a00d25] transition-colors whitespace-nowrap self-start md:self-auto"
          >
            + New Article
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="py-4 px-6 font-bold text-sm text-[#1e293b]">Article</th>
                <th className="py-4 px-6 font-bold text-sm text-[#1e293b]">Category</th>
                <th className="py-4 px-6 font-bold text-sm text-[#1e293b]">Author</th>
                <th className="py-4 px-6 font-bold text-sm text-[#1e293b] text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="py-8 text-center text-gray-500">Loading...</td>
                </tr>
              ) : filteredNews.length === 0 ? (
                <tr>
                  <td colSpan="4" className="py-8 text-center text-gray-500">No articles found.</td>
                </tr>
              ) : (
                filteredNews.map((item, idx) => (
                  <tr key={`${item.id}-${idx}`} className="border-b border-gray-50 hover:bg-slate-50 transition-colors group">
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <img 
                          src={item.image || 'https://via.placeholder.com/150'} 
                          alt={item.title} 
                          className="w-14 h-14 rounded-lg object-cover mr-4 shadow-sm"
                        />
                        <div className="flex flex-col max-w-[400px]">
                          <span className="font-bold text-[15px] text-[#1e293b] leading-tight mb-1 truncate">
                            {item.title}
                          </span>
                          <span className="text-[11px] text-gray-400 font-semibold">
                            {item.date ? new Date(item.date).toLocaleDateString() : '1 Jul 2026, 07:09 pm'}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-600">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-bold text-sm text-[#1e293b]">
                        {item.author || 'Admin'}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => openModal(item)}
                          className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition-colors"
                        >
                          <FaEdit size={14} />
                        </button>
                        <button 
                          onClick={() => handleDelete(item.id)}
                          className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100 transition-colors"
                        >
                          <FaTrashAlt size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingItem ? 'Edit Article' : 'New Article'}
      >
        <form onSubmit={handleSave} className="flex flex-col space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Title</label>
            <input 
              type="text" 
              value={formData.title} 
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/20 font-bold"
              required 
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Category</label>
            <select 
              value={formData.category} 
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/20 font-bold"
            >
              <option>తెలంగాణ</option>
              <option>ఆంధ్రప్రదేశ్</option>
              <option>రాజకీయాలు</option>
              <option>బ్రేకింగ్ న్యూస్</option>
              <option>క్రైమ్</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Author</label>
            <input 
              type="text" 
              value={formData.author} 
              onChange={(e) => setFormData({...formData, author: e.target.value})}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/20 font-bold"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Image URL</label>
            <input 
              type="url" 
              value={formData.image} 
              onChange={(e) => setFormData({...formData, image: e.target.value})}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/20 font-bold"
            />
          </div>
          
          <button type="submit" className="w-full bg-[#c8102e] text-white py-3 rounded-xl font-bold mt-4 hover:bg-[#a00d25] transition-colors">
            {editingItem ? 'Save Changes' : 'Create Article'}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default NewsManagement;
