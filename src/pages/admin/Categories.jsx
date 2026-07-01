import React, { useState } from 'react';

const Categories = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: "తెలంగాణ", slug: "telangana", type: "MAIN CATEGORY", order: 1, header: true, isSub: false, parent: null },
    { id: 2, name: "ఆదిలాబాద్", slug: "ts-adilabad", type: "SUB OF TELANGANA", order: 1, header: false, isSub: true, parent: "తెలంగాణ" },
    { id: 3, name: "కరీంనగర్", slug: "ts-karimnagar", type: "SUB OF TELANGANA", order: 2, header: false, isSub: true, parent: "తెలంగాణ" },
    { id: 4, name: "రాజన్న సిరిసిల్ల", slug: "ts-sircilla", type: "SUB OF TELANGANA", order: 3, header: false, isSub: true, parent: "తెలంగాణ" },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    parent: 'Main Category (None)',
    order: 0,
    header: false
  });

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter(cat => cat.id !== id));
    }
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.slug) {
      alert('Please fill out Name and Slug');
      return;
    }

    const isSub = formData.parent !== 'Main Category (None)';
    const type = isSub ? `SUB OF ${formData.parent.toUpperCase()}` : 'MAIN CATEGORY';
    
    const newCategory = {
      id: Date.now(),
      name: formData.name,
      slug: formData.slug,
      type: type,
      order: Number(formData.order),
      header: formData.header,
      isSub: isSub,
      parent: isSub ? formData.parent : null
    };

    setCategories([...categories, newCategory]);
    // Reset form
    setFormData({
      name: '',
      slug: '',
      parent: 'Main Category (None)',
      order: 0,
      header: false
    });
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#1e293b] mb-1">Category Management</h1>
          <p className="text-gray-500">Create, rename and remove report categories.</p>
        </div>
      </div>

      {/* Add New Category Form */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 mb-8">
        <h2 className="text-xl font-bold text-[#1e293b] mb-1">Add New Category</h2>
        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-6">Configure main categories or sub-categories (districts)</p>
        
        <form onSubmit={handleAdd} className="flex items-end gap-6 flex-wrap">
          <div className="flex flex-col flex-1 min-w-[200px]">
            <label className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-2">Category Name (Telugu)</label>
            <input 
              type="text" 
              placeholder="e.g. క్రీడలు" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="bg-[#f8fafc] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e293b]/20" 
            />
          </div>
          
          <div className="flex flex-col flex-1 min-w-[200px]">
            <label className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-2">Internal ID / Slug (English)</label>
            <input 
              type="text" 
              placeholder="e.g. sports" 
              value={formData.slug}
              onChange={(e) => setFormData({...formData, slug: e.target.value})}
              className="bg-[#f8fafc] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e293b]/20" 
            />
          </div>
          
          <div className="flex flex-col flex-1 min-w-[200px]">
            <label className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-2">Parent (Optional)</label>
            <select 
              value={formData.parent}
              onChange={(e) => setFormData({...formData, parent: e.target.value})}
              className="bg-[#f8fafc] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e293b]/20 font-bold text-gray-700"
            >
              <option>Main Category (None)</option>
              {categories.filter(c => !c.isSub).map(c => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>
          
          <div className="flex flex-col w-[120px]">
            <label className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-2">Sort Order</label>
            <input 
              type="number" 
              value={formData.order}
              onChange={(e) => setFormData({...formData, order: e.target.value})}
              className="bg-[#f8fafc] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e293b]/20 font-bold" 
            />
          </div>
          
          <div className="flex flex-col items-center justify-center h-[72px] px-4">
            <label className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-2">Show in Header</label>
            <div 
              onClick={() => setFormData({...formData, header: !formData.header})}
              className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${formData.header ? 'bg-green-500' : 'bg-gray-200'}`}
            >
              <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 shadow-sm transition-transform ${formData.header ? 'left-[22px]' : 'left-0.5'}`}></div>
            </div>
          </div>
          
          <button type="submit" className="bg-[#c8102e] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#a00d25] transition-colors h-[48px]">
            Add Category
          </button>
        </form>
      </div>

      {/* List */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="py-4 px-8 font-bold text-xs text-gray-400 uppercase tracking-widest">Category Name</th>
              <th className="py-4 px-6 font-bold text-xs text-gray-400 uppercase tracking-widest">Internal ID</th>
              <th className="py-4 px-6 font-bold text-xs text-gray-400 uppercase tracking-widest">Type</th>
              <th className="py-4 px-6 font-bold text-xs text-gray-400 uppercase tracking-widest text-center">Order</th>
              <th className="py-4 px-6 font-bold text-xs text-gray-400 uppercase tracking-widest text-center">Header</th>
              <th className="py-4 px-8 font-bold text-xs text-gray-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 ? (
              <tr><td colSpan="6" className="text-center py-6 text-gray-500">No categories found.</td></tr>
            ) : (
              categories.map((cat, idx) => (
                <tr key={cat.id || idx} className="border-b border-gray-50 hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-8">
                    <div className={`font-bold ${cat.isSub ? 'text-gray-600 pl-8 relative' : 'text-xl text-[#1e293b]'}`}>
                      {cat.isSub && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-[2px] bg-gray-300"></div>
                      )}
                      {cat.isSub && (
                        <div className="absolute left-3 top-0 h-1/2 w-[2px] bg-gray-300"></div>
                      )}
                      {cat.name}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-400 font-medium">{cat.slug}</td>
                  <td className="py-4 px-6">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded ${cat.isSub ? 'bg-blue-50 text-blue-500' : 'bg-red-50 text-brand-red'}`}>
                      {cat.type}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center font-bold text-gray-600">{cat.order}</td>
                  <td className="py-4 px-6 text-center">
                    {cat.header ? (
                      <span className="text-[10px] font-bold text-green-500 uppercase tracking-wider">Yes</span>
                    ) : (
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">No</span>
                    )}
                  </td>
                  <td className="py-4 px-8 text-right space-x-2">
                    <button className="px-3 py-1 bg-white border border-gray-200 rounded text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors">Edit</button>
                    <button onClick={() => handleDelete(cat.id)} className="px-3 py-1 bg-red-50 text-brand-red rounded text-xs font-bold hover:bg-red-100 transition-colors">Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
};

export default Categories;
