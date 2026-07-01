import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrashAlt } from 'react-icons/fa';
import Modal from '../../components/Admin/Modal';

const BreakingNews = () => {
  const [items, setItems] = useState([
    { id: 1, title: "అమరావతి నిర్మాణ పనులపై సీఎం సమీక్ష", linked: null, active: true },
    { id: 2, title: "రాజన్న సిరిసిల్ల జిల్లాలో తీవ్ర విషాదం..", linked: "Linked to Article #269", active: true },
    { id: 3, title: "రాష్ట్రంలో మండిపోతున్న ఎండలు..", linked: "Linked to Article #17", active: false },
    { id: 4, title: "సెస్ చైర్మన్ చిక్కాల రామారావుకు పుత్రశోకం..", linked: "Linked to Article #733", active: true },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({ title: '', linked: '' });

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this ticker item?")) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const toggleActive = (id) => {
    setItems(items.map(item => item.id === id ? { ...item, active: !item.active } : item));
  };

  const openModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({ title: item.title, linked: item.linked || '' });
    } else {
      setEditingItem(null);
      setFormData({ title: '', linked: '' });
    }
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editingItem) {
      setItems(items.map(item => item.id === editingItem.id ? { ...item, ...formData } : item));
    } else {
      const newItem = {
        id: Date.now(),
        ...formData,
        active: true
      };
      setItems([newItem, ...items]);
    }
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 flex flex-col md:flex-row md:justify-between md:items-center items-start gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-[#1e293b] mb-1">Breaking News</h1>
          <p className="text-gray-500">Manage the red scrolling ticker items.</p>
        </div>
        <button 
          onClick={() => openModal()}
          className="bg-[#c8102e] text-white px-5 py-2.5 rounded-xl shadow-lg shadow-red-900/20 font-bold hover:bg-[#a00d25] transition-colors flex items-center whitespace-nowrap self-start md:self-auto"
        >
          <FaPlus className="mr-2" /> Add Item
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {items.length === 0 ? (
          <p className="text-gray-500 p-4 bg-white rounded-xl shadow-sm border border-gray-100 text-center">No breaking news items found.</p>
        ) : (
          items.map((item) => (
            <div key={item.id} className={`bg-white rounded-2xl shadow-sm border ${item.active ? 'border-gray-100' : 'border-red-100 bg-red-50/20'} p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between group cursor-pointer hover:shadow-md transition-all gap-4`}>
              <div className="flex items-center">
                <button 
                  onClick={() => toggleActive(item.id)}
                  className={`w-3 h-3 rounded-full mr-5 shrink-0 transition-colors ${item.active ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-gray-300'}`}
                  title={item.active ? 'Click to deactivate' : 'Click to activate'}
                />
                <div className="flex flex-col">
                  <span className={`font-bold text-lg ${item.active ? 'text-[#1e293b]' : 'text-gray-500 line-through'}`}>
                    {item.title}
                  </span>
                  <span className="text-[11px] text-gray-400 font-bold flex items-center mt-1">
                    {item.linked ? (
                      <>
                        <span className="text-brand-red mr-1.5">🔗</span> {item.linked}
                      </>
                    ) : (
                      "Text only (no link)"
                    )}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity self-end sm:self-auto">
                <button 
                  onClick={() => openModal(item)}
                  className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition-colors"
                >
                  <FaEdit size={14} />
                </button>
                <button 
                  onClick={() => handleDelete(item.id)}
                  className="w-9 h-9 rounded-lg bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100 transition-colors"
                >
                  <FaTrashAlt size={14} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingItem ? 'Edit Ticker Item' : 'New Ticker Item'}
      >
        <form onSubmit={handleSave} className="flex flex-col space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Ticker Text (Telugu)</label>
            <input 
              type="text" 
              value={formData.title} 
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/20 font-bold"
              required 
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Link to Article ID (Optional)</label>
            <input 
              type="text" 
              value={formData.linked} 
              onChange={(e) => setFormData({...formData, linked: e.target.value})}
              placeholder="e.g., Linked to Article #123"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/20 font-bold"
            />
          </div>
          
          <button type="submit" className="w-full bg-[#c8102e] text-white py-3 rounded-xl font-bold mt-4 hover:bg-[#a00d25] transition-colors">
            {editingItem ? 'Save Changes' : 'Add Item'}
          </button>
        </form>
      </Modal>

    </div>
  );
};

export default BreakingNews;
