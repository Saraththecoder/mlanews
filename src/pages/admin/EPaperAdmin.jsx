import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrashAlt } from 'react-icons/fa';
import Modal from '../../components/Admin/Modal';

const EPaperAdmin = () => {
  const [editions, setEditions] = useState([
    { id: 1, title: "Main Edition", date: "1 July 2026", pages: 1, image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80" },
    { id: 2, title: "Main Edition", date: "30 June 2026", pages: 1, image: "https://images.unsplash.com/photo-1546422904-90eab23c3d7e?w=800&q=80" },
    { id: 3, title: "Main Edition", date: "28 June 2026", pages: 1, image: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&q=80" },
    { id: 4, title: "Main Edition", date: "27 June 2026", pages: 1, image: "https://images.unsplash.com/photo-1523995462485-3d171b5c8fa9?w=800&q=80" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEd, setEditingEd] = useState(null);
  const [formData, setFormData] = useState({ title: '', date: '', pages: 1, image: '' });

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this edition?")) {
      setEditions(editions.filter(ed => ed.id !== id));
    }
  };

  const openModal = (ed = null) => {
    if (ed) {
      setEditingEd(ed);
      setFormData({ title: ed.title, date: ed.date, pages: ed.pages, image: ed.image });
    } else {
      setEditingEd(null);
      setFormData({ title: 'Main Edition', date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }), pages: 1, image: '' });
    }
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editingEd) {
      setEditions(editions.map(ed => ed.id === editingEd.id ? { ...ed, ...formData } : ed));
    } else {
      const newEd = {
        id: Date.now(),
        ...formData
      };
      setEditions([newEd, ...editions]);
    }
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#1e293b] mb-1">E-Paper Management</h1>
          <p className="text-gray-500">Manage newspaper editions using page images.</p>
        </div>
        <button 
          onClick={() => openModal()}
          className="bg-[#c8102e] text-white px-5 py-2.5 rounded-xl shadow-lg shadow-red-900/20 font-bold hover:bg-[#a00d25] transition-colors flex items-center whitespace-nowrap self-start md:self-auto"
        >
          <FaPlus className="mr-2" /> Add Edition
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {editions.length === 0 ? (
          <p className="text-gray-500 p-8 col-span-3 text-center bg-white rounded-3xl border border-gray-100">No editions found.</p>
        ) : (
          editions.map((edition) => (
            <div key={edition.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow">
              <div className="h-64 overflow-hidden relative border-b border-gray-100 bg-gray-50">
                <img 
                  src={edition.image || 'https://via.placeholder.com/800x600'} 
                  alt={edition.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-[#1e293b] mb-2">{edition.title}</h3>
                <p className="text-sm font-semibold text-gray-500 mb-1">{edition.date}</p>
                <p className="text-xs text-gray-400 mb-6">{edition.pages} pages</p>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                  <button onClick={() => openModal(edition)} className="text-blue-600 hover:text-blue-800 font-bold text-sm flex items-center transition-colors">
                    <FaEdit className="mr-1.5" /> Edit
                  </button>
                  <button onClick={() => handleDelete(edition.id)} className="text-brand-red hover:text-red-800 font-bold text-sm flex items-center transition-colors">
                    <FaTrashAlt className="mr-1.5" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingEd ? 'Edit Edition' : 'New Edition'}
      >
        <form onSubmit={handleSave} className="flex flex-col space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Edition Title</label>
            <input 
              type="text" 
              value={formData.title} 
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/20 font-bold"
              required 
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Date String</label>
            <input 
              type="text" 
              value={formData.date} 
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/20 font-bold"
              required 
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Number of Pages</label>
            <input 
              type="number" 
              value={formData.pages} 
              onChange={(e) => setFormData({...formData, pages: parseInt(e.target.value) || 1})}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/20 font-bold"
              min="1"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Image URL (Cover)</label>
            <input 
              type="url" 
              value={formData.image} 
              onChange={(e) => setFormData({...formData, image: e.target.value})}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/20 font-bold"
              required
            />
          </div>
          
          <button type="submit" className="w-full bg-[#c8102e] text-white py-3 rounded-xl font-bold mt-4 hover:bg-[#a00d25] transition-colors">
            {editingEd ? 'Save Changes' : 'Add Edition'}
          </button>
        </form>
      </Modal>

    </div>
  );
};

export default EPaperAdmin;
