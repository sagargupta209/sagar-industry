'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, LayoutGrid, Package, Image as ImageIcon, MessageCircle, HelpCircle, X, Mail, Settings, Globe, Share2, Map, Shield, Phone, Youtube, Newspaper, MessageSquare, Pin, BarChart, Menu, Search, Eye, EyeOff, Briefcase, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('products');
  
  // Data State
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [heroSlides, setHeroSlides] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [faqs, setFaqs] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [distributors, setDistributors] = useState<any[]>([]);
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>({});
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success'>('idle');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [pagination, setPagination] = useState<any>({
    totalCount: 0,
    totalPages: 1,
    currentPage: 1,
    limit: 10
  });

  const [searchQuery, setSearchQuery] = useState('');
  
  // ── Form States ──

  // Category
  const [catName, setCatName] = useState('');
  const [catImage, setCatImage] = useState('');

  // Product
  const [prodName, setProdName] = useState('');
  const [prodImage, setProdImage] = useState('');
  const [prodCategory, setProdCategory] = useState('');

  // Hero Slide
  const [heroTitle, setHeroTitle] = useState('');
  const [heroDesc, setHeroDesc] = useState('');
  const [heroImage, setHeroImage] = useState('');
  const [heroImageMobile, setHeroImageMobile] = useState('');

  // Testimonial
  const [testName, setTestName] = useState('');
  const [testReview, setTestReview] = useState('');
  const [testRole, setTestRole] = useState('Verified Customer');

  // FAQ
  const [faqQuestion, setFaqQuestion] = useState('');
  const [faqAnswer, setFaqAnswer] = useState('');
  const [faqCategory, setFaqCategory] = useState('General');

  // Editing State
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const fetchData = async () => {
    try {
        // Only fetch settings once or on demand
        if (Object.keys(settings).length === 0) {
            const settingsRes = await fetch('/api/settings');
            const settingsData = await settingsRes.json();
            if(settingsData.success) setSettings(settingsData.data);
        }

        // Fetch data for the active tab with pagination
        const endpoints: any = {
            products: '/api/products',
            categories: '/api/categories',
            hero: '/api/hero',
            testimonials: '/api/testimonials',
            faqs: '/api/faqs',
            messages: '/api/contact',
            distributors: '/api/distributors',
            newsletter: '/api/newsletter'
        };

        const endpoint = endpoints[activeTab];
        if (!endpoint) return;

        // All dashboard requests are admin requests
        const url = `${endpoint}?page=${currentPage}&limit=${limit}&admin=true${searchQuery ? `&q=${encodeURIComponent(searchQuery)}` : ''}`;
        
        const res = await fetch(url);
        const data = await res.json();

        if (data.success) {
            switch (activeTab) {
                case 'products': setProducts(data.data); break;
                case 'categories': setCategories(data.data); break;
                case 'hero': setHeroSlides(data.data); break;
                case 'testimonials': setTestimonials(data.data); break;
                case 'faqs': setFaqs(data.data); break;
                case 'messages': setContacts(data.data); break;
                case 'distributors': setDistributors(data.data); break;
                case 'newsletter': setSubscribers(data.data); break;
            }
            setPagination(data.pagination || { totalCount: data.data.length, totalPages: 1, currentPage: 1, limit });
        }
    } catch (e) {
        console.error("Failed to fetch dashboard data", e);
    }
  };

  const clearAllData = async () => {
    const confirmMsg = `Are you sure you want to PERMANENTLY delete ALL ${activeTab === 'messages' ? 'messages' : activeTab === 'newsletter' ? 'subscribers' : activeTab === 'distributors' ? 'distributor applications' : activeTab}? This action cannot be undone.`;
    if (!confirm(confirmMsg)) return;
    
    const endpoints: any = {
        products: '/api/products',
        categories: '/api/categories',
        hero: '/api/hero',
        testimonials: '/api/testimonials',
        faqs: '/api/faqs',
        messages: '/api/contact',
        distributors: '/api/distributors',
        newsletter: '/api/newsletter'
    };
    
    const endpoint = endpoints[activeTab];
    if (!endpoint) return;
    
    try {
        const res = await fetch(`${endpoint}?clearAll=true`, { method: 'DELETE' });
        const data = await res.json();
        if (data.success) {
            fetchData();
        } else {
            alert(data.error || 'Failed to clear data');
        }
    } catch (e) {
        alert('Error clearing data');
    }
  };

  const toggleVisibility = async (id: string, currentStatus: boolean | undefined) => {
    // Treat undefined as true (default active)
    const status = currentStatus === undefined ? true : currentStatus;
    
    const endpoints: any = {
        products: '/api/products',
        categories: '/api/categories',
        hero: '/api/hero',
        testimonials: '/api/testimonials',
        faqs: '/api/faqs',
    };
    
    const endpoint = endpoints[activeTab];
    if (!endpoint) return;
    
    try {
        const res = await fetch(`${endpoint}?id=${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ isActive: !status })
        });
        
        // If PATCH fails, try PUT (for backward compatibility with old routes)
        if (!res.ok) {
            await fetch(`${endpoint}?id=${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isActive: !status })
            });
        }
        
        fetchData();
    } catch (e) {
        console.error('Error toggling visibility', e);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab, currentPage, limit, searchQuery]);

  useEffect(() => {
    // Reset page to 1 when changing tabs
    setCurrentPage(1);
  }, [activeTab]);

  useEffect(() => {
    if (activeTab === 'messages' && contacts.length > 0) {
      const markAsRead = async () => {
        const unread = contacts.filter(c => !c.isRead);
        if (unread.length === 0) return;
        
        await Promise.all(unread.map(m => 
          fetch(`/api/contact?id=${m._id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ isRead: true })
          })
        ));
        fetchData();
      };
      markAsRead();
    }
  }, [contacts, activeTab]);

  // ── Handlers ──

  const clearForms = () => {
      setCatName(''); setCatImage('');
      setProdName(''); setProdImage(''); setProdCategory('');
      setHeroTitle(''); setHeroDesc(''); setHeroImage(''); setHeroImageMobile('');
      setTestName(''); setTestReview(''); setTestRole('Verified Customer');
      setFaqQuestion(''); setFaqAnswer(''); setFaqCategory('General');
      setEditingId(null);
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!catName || !catImage) return alert('Fill all fields');
    
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `/api/categories?id=${editingId}` : '/api/categories';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: catName, image: catImage }),
    });
    
    if (res.ok) {
      clearForms();
      fetchData();
    } else {
      const data = await res.json();
      alert(`Error: ${data.error || 'Failed to save'}`);
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!prodName || !prodImage || !prodCategory) return alert('Fill all fields');

    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `/api/products?id=${editingId}` : '/api/products';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: prodName, image: prodImage, category: prodCategory }),
    });

    if (res.ok) {
      clearForms();
      fetchData();
    } else {
      const data = await res.json();
      alert(`Error: ${data.error || 'Failed to save'}`);
    }
  };

  const handleAddHero = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!heroImage) return alert('At least Desktop Image is required');

    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `/api/hero?id=${editingId}` : '/api/hero';

    const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            title: heroTitle, 
            description: heroDesc, 
            image: heroImage,
            imageMobile: heroImageMobile 
        }),
    });

    if (res.ok) {
        clearForms();
        fetchData();
    } else {
        const data = await res.json();
        alert(`Error: ${data.error || 'Failed to save'}`);
    }
  };

  const handleAddTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!testName || !testReview) return alert('Fill all fields');

    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `/api/testimonials?id=${editingId}` : '/api/testimonials';

    const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: testName, review: testReview, role: testRole }),
    });

    if (res.ok) {
        clearForms();
        fetchData();
    } else {
        const data = await res.json();
        alert(`Error: ${data.error || 'Failed to save'}`);
    }
  };

  const handleUpdateSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus('saving');
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      if (res.ok) {
        setSaveStatus('success');
        setTimeout(() => setSaveStatus('idle'), 3000);
      } else {
        alert('Failed to save settings');
        setSaveStatus('idle');
      }
    } catch (e) {
      alert('Failed to save settings');
    }
  };

  const handleSettingsChange = (field: string, value: string) => {
    setSettings((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleAddFAQ = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!faqQuestion || !faqAnswer) return alert('Fill all fields');

    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `/api/faqs?id=${editingId}` : '/api/faqs';

    const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: faqQuestion, answer: faqAnswer, category: faqCategory }),
    });

    if (res.ok) {
        clearForms();
        fetchData();
    } else {
        const data = await res.json();
        alert(`Error: ${data.error || 'Failed to save'}`);
    }
  };

  const setEditCategory = (cat: any) => {
      setEditingId(cat._id);
      setCatName(cat.name);
      setCatImage(cat.image);
      setActiveTab('categories');
  };

  const setEditProduct = (prod: any) => {
      setEditingId(prod._id);
      setProdName(prod.name);
      setProdImage(prod.image);
      setProdCategory(prod.category?._id || prod.category);
      setActiveTab('products');
  };

  const setEditHero = (slide: any) => {
      setEditingId(slide._id);
      setHeroTitle(slide.title || '');
      setHeroDesc(slide.description || '');
      setHeroImage(slide.image);
      setHeroImageMobile(slide.imageMobile || '');
      setActiveTab('hero');
  };

  const setEditTestimonial = (t: any) => {
      setEditingId(t._id);
      setTestName(t.name);
      setTestReview(t.review);
      setTestRole(t.role);
      setActiveTab('testimonials');
  };

  const setEditFAQ = (f: any) => {
      setEditingId(f._id);
      setFaqQuestion(f.question);
      setFaqAnswer(f.answer);
      setFaqCategory(f.category);
      setActiveTab('faqs');
  };

  const handleDelete = async (endpoint: string, id: string) => {
      if(!confirm('Are you sure?')) return;
      await fetch(`${endpoint}?id=${id}`, { method: 'DELETE' });
      fetchData();
  };

  const handleUpdate = async (endpoint: string, id: string, body: any) => {
      try {
          const res = await fetch(`${endpoint}?id=${id}`, {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(body)
          });
          if (res.ok) fetchData();
      } catch (e) {
          console.error('Error updating record', e);
      }
  };

  const handleDeleteSubscriber = async (id: string) => {
      if(!confirm('Delete this subscriber?')) return;
      await fetch('/api/newsletter', { 
          method: 'DELETE',
          body: JSON.stringify({ id })
      });
      fetchData();
  };

  const compressImage = (file: File, maxWidth = 1600, quality = 0.8): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', quality));
        };
      };
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, setter: (val: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      // Show loading or processing state if needed, but for now just compress
      try {
        const compressed = await compressImage(file);
        setter(compressed);
      } catch (e) {
        console.error("Compression failed", e);
        // Fallback to original
        const reader = new FileReader();
        reader.onloadend = () => setter(reader.result as string);
        reader.readAsDataURL(file);
      }
    }
  };

  const SidebarContent = () => (
    <>
        <div className="text-xl font-black text-white mb-8 flex items-center gap-3">
            <div className="w-10 h-10 p-1 flex items-center justify-center shrink-0">
                <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <span className="truncate">Sagar Admin</span>
        </div>
        <nav className="space-y-1">
          <SidebarItem id="products" icon={Package} label="Products" />
          <SidebarItem id="categories" icon={LayoutGrid} label="Categories" />
          <SidebarItem id="hero" icon={ImageIcon} label="Hero Banners" />
          <SidebarItem id="testimonials" icon={MessageCircle} label="Reviews" />
          <SidebarItem id="faqs" icon={HelpCircle} label="FAQs" />
          <SidebarItem id="messages" icon={Mail} label="Enquiries" />
          <SidebarItem id="distributors" icon={Briefcase} label="Distributors" />
          <SidebarItem id="newsletter" icon={Newspaper} label="Newsletter" />
          <SidebarItem id="settings" icon={Settings} label="Site Settings" />
          
          <div className="border-t border-gray-700 pt-4 mt-8">
            <a href="/" className="flex items-center space-x-3 w-full p-3 rounded hover:bg-gray-800 text-gray-400">
                <span>Back to Site</span>
            </a>
          </div>
        </nav>
    </>
  );

  const SidebarItem = ({ id, icon: Icon, label }: any) => (
    <button 
        onClick={() => {
            setActiveTab(id);
            setIsSidebarOpen(false);
        }}
        className={`flex items-center space-x-3 w-full p-3 rounded transition ${activeTab === id ? 'bg-orange-600 font-bold' : 'hover:bg-gray-800'}`}
    >
        <Icon size={20} />
        <span>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex text-gray-800">
      
      {/* ── Desktop Sidebar ── */}
      <aside className="w-64 bg-gray-900 text-white p-6 hidden md:block flex-shrink-0 fixed h-full overflow-y-auto z-50">
         <SidebarContent />
      </aside>

      {/* ── Mobile Sidebar Drawer ── */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 z-[60] md:hidden backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-72 bg-gray-900 text-white p-6 z-[70] md:hidden overflow-y-auto shadow-2xl"
            >
              <div className="flex justify-between items-center mb-10">
                 <h2 className="text-2xl font-bold text-orange-500">Admin Panel</h2>
                 <button onClick={() => setIsSidebarOpen(false)} className="text-gray-400 hover:text-white">
                    <X size={28} />
                 </button>
              </div>
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Main Content ── */}
      <main className="flex-1 p-4 md:p-8 ml-0 md:ml-64 overflow-y-auto min-h-screen">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
                <button 
                    onClick={() => setIsSidebarOpen(true)}
                    className="md:hidden p-2 -ml-2 bg-white rounded-xl shadow-sm border border-orange-100 text-orange-600"
                >
                    <Menu size={24} />
                </button>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 capitalize leading-tight">{activeTab.replace('-', ' ')} Management</h1>
            </div>
            {['products', 'categories', 'hero', 'testimonials', 'faqs', 'messages', 'distributors', 'newsletter'].includes(activeTab) && (
                <RowsPerPage value={limit} onChange={(v) => { setLimit(v); setCurrentPage(1); }} />
            )}
        </div>

        {/* ── Search & Actions Bar ── */}
        {['products', 'categories', 'hero', 'testimonials', 'faqs', 'messages', 'distributors', 'newsletter'].includes(activeTab) && (
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors" size={20} />
                    <input 
                        type="text" 
                        placeholder={`Search ${activeTab}...`} 
                        className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-100 rounded-[1.25rem] focus:ring-4 focus:ring-orange-100 focus:border-orange-500 outline-none transition-all shadow-sm font-medium"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <button 
                    onClick={clearAllData}
                    className="flex items-center justify-center gap-2 px-6 py-3.5 bg-red-50 text-red-600 rounded-[1.25rem] hover:bg-red-600 hover:text-white transition-all duration-300 font-bold shadow-sm whitespace-nowrap group"
                >
                    <Trash2 size={20} className="group-hover:animate-bounce" />
                    Clear All {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                </button>
            </div>
        )}

        {/* ── Categories Tab ── */}
        {activeTab === 'categories' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1 h-fit top-8 sticky">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-orange-100">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">{editingId ? 'Edit' : 'Add'} Category</h3>
                  {editingId && <button onClick={clearForms} className="text-gray-400 hover:text-gray-600"><X size={20}/></button>}
                </div>
                <form onSubmit={handleAddCategory} className="space-y-4">
                  <input type="text" placeholder="Category Name" className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition" value={catName} onChange={e => setCatName(e.target.value)} />
                  <div className="border-2 border-dashed border-gray-200 p-8 text-center rounded-2xl relative cursor-pointer hover:bg-orange-50/30 transition group">
                      <input type="file" onChange={(e) => handleFileChange(e, setCatImage)} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" accept="image/*" />
                      <div className="flex flex-col items-center">
                        <ImageIcon className="text-gray-400 group-hover:text-orange-500 mb-2 transition" size={32} />
                        <span className="text-sm text-gray-500 font-medium">{catImage ? 'Image Selected' : 'Click to Upload Image'}</span>
                      </div>
                  </div>
                  {catImage && <img src={catImage} className="w-full h-40 object-cover rounded-xl shadow-inner" alt="Preview"/>}
                  <button className="w-full bg-orange-600 text-white py-3 rounded-xl hover:bg-orange-700 font-bold shadow-lg shadow-orange-200 transition transform active:scale-95">
                      {editingId ? 'Update' : 'Save'} Category
                  </button>
                  {editingId && (
                      <button type="button" onClick={clearForms} className="w-full bg-gray-100 text-gray-600 py-3 rounded-xl hover:bg-gray-200 font-medium">Cancel</button>
                  )}
                </form>
              </div>
            </div>
            
            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {categories.map((cat) => (
                <div key={cat._id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:border-orange-200 transition-all duration-300 group">
                  <div className="relative h-48 bg-gray-50 overflow-hidden">
                    <img src={cat.image} className="w-full h-full object-cover transition duration-500 group-hover:scale-110" alt={cat.name}/>
                    {!cat.isActive && (
                      <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-[2px] flex items-center justify-center">
                        <span className="bg-white/90 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest text-gray-900 shadow-xl">Hidden</span>
                      </div>
                    )}
                    <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <button onClick={() => toggleVisibility(cat._id, cat.isActive)} className={`p-2 transition-all duration-300 bg-white/90 backdrop-blur rounded-xl shadow-lg border ${cat.isActive ? 'text-green-500 border-green-100 hover:bg-green-500' : 'text-gray-400 border-gray-100 hover:bg-gray-500'} hover:text-white`}>
                        {cat.isActive ? <Eye size={18}/> : <EyeOff size={18}/>}
                      </button>
                      <button onClick={() => setEditCategory(cat)} className="p-2 transition-all duration-300 bg-white/90 backdrop-blur text-blue-500 hover:bg-blue-500 hover:text-white rounded-xl shadow-lg border border-blue-100"><Edit2 size={18}/></button>
                      <button onClick={() => handleDelete('/api/categories', cat._id)} className="p-2 transition-all duration-300 bg-white/90 backdrop-blur text-red-500 hover:bg-red-500 hover:text-white rounded-xl shadow-lg border border-red-100"><Trash2 size={18}/></button>
                    </div>
                  </div>
                  <div className="p-5">
                    <h4 className="font-black text-xl text-gray-900 mb-1">{cat.name}</h4>
                    <p className="text-xs text-gray-400 font-mono tracking-tighter">ID: {cat._id}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-start-2 lg:col-span-3">
              <Pagination pagination={pagination} onPageChange={setCurrentPage} />
            </div>
          </div>
        )}

        {/* ── Products Tab ── */}
        {activeTab === 'products' && (
           <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1 h-fit top-8 sticky">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-orange-100">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">{editingId ? 'Edit' : 'Add'} Product</h3>
                  {editingId && <button onClick={clearForms} className="text-gray-400 hover:text-gray-600"><X size={20}/></button>}
                </div>
                <form onSubmit={handleAddProduct} className="space-y-4">
                  <input type="text" placeholder="Product Name" className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition" value={prodName} onChange={e => setProdName(e.target.value)} />
                   <select className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-orange-500 outline-none bg-white font-medium" value={prodCategory} onChange={e => setProdCategory(e.target.value)}>
                      <option value="">Select Category</option>
                      {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                   </select>
                   <div className="border-2 border-dashed border-gray-200 p-8 text-center rounded-2xl relative cursor-pointer hover:bg-orange-50/30 transition group">
                      <input type="file" onChange={(e) => handleFileChange(e, setProdImage)} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" accept="image/*" />
                      <div className="flex flex-col items-center">
                        <ImageIcon className="text-gray-400 group-hover:text-orange-500 mb-2 transition" size={32} />
                        <span className="text-sm text-gray-500 font-medium">{prodImage ? 'Image Selected' : 'Click to Upload Image'}</span>
                      </div>
                  </div>
                  {prodImage && <img src={prodImage} className="w-full h-40 object-cover rounded-xl shadow-inner" alt="Preview"/>}
                  <button className="w-full bg-orange-600 text-white py-3 rounded-xl hover:bg-orange-700 font-bold shadow-lg shadow-orange-200 transition transform active:scale-95">
                      {editingId ? 'Update' : 'Save'} Product
                  </button>
                  {editingId && (
                      <button type="button" onClick={clearForms} className="w-full bg-gray-100 text-gray-600 py-3 rounded-xl hover:bg-gray-200 font-medium">Cancel</button>
                  )}
                </form>
              </div>
            </div>
             
             <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.map((prod) => (
                <div key={prod._id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:border-orange-200 transition-all duration-300 group">
                   <div className="relative h-48 bg-gray-100 flex items-center justify-center p-6 overflow-hidden">
                    <img src={prod.image} className="w-full h-full object-contain drop-shadow-2xl transition duration-500 group-hover:scale-110" alt={prod.name}/>
                    {!prod.isActive && (
                      <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-[2px] flex items-center justify-center">
                        <span className="bg-white/90 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest text-gray-900 shadow-xl">Hidden</span>
                      </div>
                    )}
                    <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition duration-300 transform translate-x-2 group-hover:translate-x-0">
                      <button onClick={() => toggleVisibility(prod._id, prod.isActive)} className={`p-2.5 transition-all duration-300 bg-white/90 backdrop-blur rounded-xl shadow-lg border ${prod.isActive ? 'text-green-500 border-green-100 hover:bg-green-500' : 'text-gray-400 border-gray-100 hover:bg-gray-500'} hover:text-white`}>
                        {prod.isActive ? <Eye size={18}/> : <EyeOff size={18}/>}
                      </button>
                      <button onClick={() => setEditProduct(prod)} className="p-2.5 transition-all duration-300 bg-white/90 backdrop-blur text-blue-500 hover:bg-blue-500 hover:text-white rounded-xl shadow-lg border border-blue-100"><Edit2 size={18}/></button>
                      <button onClick={() => handleDelete('/api/products', prod._id)} className="p-2.5 transition-all duration-300 bg-white/90 backdrop-blur text-red-500 hover:bg-red-500 hover:text-white rounded-xl shadow-lg border border-red-100"><Trash2 size={18}/></button>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                        <h4 className="font-extrabold text-xl text-gray-900 leading-tight">{prod.name}</h4>
                        <span className="text-[10px] font-black uppercase tracking-widest bg-orange-100 text-orange-700 px-2 py-1 rounded-lg shrink-0 ml-2">
                            {prod.category?.name || 'Uncategorized'}
                        </span>
                    </div>
                    <p className="text-[10px] text-gray-400 font-mono">CODE: {prod._id.slice(-8)}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-start-2 lg:col-span-3">
              <Pagination pagination={pagination} onPageChange={setCurrentPage} />
            </div>
          </div>
        )}

        {/* ── Hero Slides Tab ── */}
        {activeTab === 'hero' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1 h-fit top-8 sticky">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-orange-100">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">{editingId ? 'Edit' : 'Add'} Hero</h3>
                  {editingId && <button onClick={clearForms} className="text-gray-400 hover:text-gray-600"><X size={20}/></button>}
                </div>
                <form onSubmit={handleAddHero} className="space-y-4">
                  <input type="text" placeholder="Title (Optional)" className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition" value={heroTitle} onChange={e => setHeroTitle(e.target.value)} />
                  <input type="text" placeholder="Description (Optional)" className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition" value={heroDesc} onChange={e => setHeroDesc(e.target.value)} />
                  
                  <div className="space-y-2">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Desktop Banner *</p>
                    <div className="border-2 border-dashed border-gray-200 p-6 text-center rounded-2xl relative cursor-pointer hover:bg-orange-50/30 transition group">
                        <input type="file" onChange={(e) => handleFileChange(e, setHeroImage)} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" accept="image/*" />
                        <div className="flex flex-col items-center">
                          <ImageIcon className="text-gray-400 group-hover:text-orange-500 mb-1 transition" size={24} />
                          <span className="text-xs text-gray-500 font-medium">{heroImage ? 'Desktop Selected' : 'Click to Upload Desktop Image'}</span>
                        </div>
                    </div>
                    {heroImage && <img src={heroImage} className="w-full h-24 object-cover rounded-xl shadow-inner" alt="Preview"/>}
                  </div>

                  <div className="space-y-2">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Mobile Banner (Optional)</p>
                    <div className="border-2 border-dashed border-gray-200 p-6 text-center rounded-2xl relative cursor-pointer hover:bg-orange-50/30 transition group">
                        <input type="file" onChange={(e) => handleFileChange(e, setHeroImageMobile)} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" accept="image/*" />
                        <div className="flex flex-col items-center">
                          <ImageIcon className="text-gray-400 group-hover:text-orange-500 mb-1 transition" size={24} />
                          <span className="text-xs text-gray-500 font-medium">{heroImageMobile ? 'Mobile Selected' : 'Click to Upload Mobile Image'}</span>
                        </div>
                    </div>
                    {heroImageMobile && <img src={heroImageMobile} className="w-full h-24 object-cover rounded-xl shadow-inner" alt="Preview"/>}
                  </div>

                  <button className="w-full bg-orange-600 text-white py-3 rounded-xl hover:bg-orange-700 font-bold shadow-lg shadow-orange-200 transition transform active:scale-95">
                      {editingId ? 'Update' : 'Save'} Slide
                  </button>
                  {editingId && (
                      <button type="button" onClick={clearForms} className="w-full bg-gray-100 text-gray-600 py-3 rounded-xl hover:bg-gray-200 font-medium">Cancel</button>
                  )}
                </form>
              </div>
            </div>
            <div className="lg:col-span-3 grid grid-cols-1 xl:grid-cols-2 gap-6">
              {heroSlides.map((slide) => (
                <div key={slide._id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:border-orange-200 transition-all duration-300 group">
                  <div className="relative h-56 bg-gray-900 overflow-hidden">
                    <img src={slide.image} className="w-full h-full object-cover opacity-80 transition duration-700 group-hover:scale-105 group-hover:opacity-100" alt={slide.title}/>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                    {!slide.isActive && (
                      <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-[2px] flex flex-col items-center justify-center p-4">
                        <span className="bg-white/90 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest text-gray-900 shadow-xl mb-2">Hidden</span>
                        <p className="text-white/60 text-[10px] text-center">This slide won't appear on the homepage</p>
                      </div>
                    )}
                    <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <button onClick={() => toggleVisibility(slide._id, slide.isActive)} className={`p-2.5 transition-all duration-300 bg-white/90 backdrop-blur rounded-xl shadow-xl border ${slide.isActive ? 'text-green-500 border-green-100 hover:bg-green-500' : 'text-gray-400 border-gray-100 hover:bg-gray-500'} hover:text-white`}>
                          {slide.isActive ? <Eye size={18}/> : <EyeOff size={18}/>}
                        </button>
                        <button onClick={() => setEditHero(slide)} className="p-2.5 transition-all duration-300 bg-white/90 backdrop-blur text-blue-500 hover:bg-blue-500 hover:text-white rounded-xl shadow-xl border border-blue-100"><Edit2 size={18}/></button>
                        <button onClick={() => handleDelete('/api/hero', slide._id)} className="p-2.5 transition-all duration-300 bg-white/90 backdrop-blur text-red-500 hover:bg-red-500 hover:text-white rounded-xl shadow-xl border border-red-100"><Trash2 size={18}/></button>
                    </div>
                    <div className="absolute bottom-6 left-6 right-6">
                        {slide.imageMobile && <span className="bg-orange-500 text-white text-[8px] font-bold px-2 py-0.5 rounded-full uppercase mb-2 inline-block">Mobile Version Available</span>}
                        <h4 className="font-black text-2xl text-white mb-2 leading-tight">{slide.title || 'Untitled Slide'}</h4>
                        <p className="text-gray-300 text-sm line-clamp-2 font-medium">{slide.description || 'No description'}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-start-2 lg:col-span-3">
              <Pagination pagination={pagination} onPageChange={setCurrentPage} />
            </div>
          </div>
        )}

        {/* ── Testimonials Tab ── */}
        {activeTab === 'testimonials' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1 h-fit top-8 sticky">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-orange-100">
                <div className="flex justify-between items-center mb-4">
                   <h3 className="text-xl font-bold">{editingId ? 'Edit' : 'Add'} Review</h3>
                   {editingId && <button onClick={clearForms} className="text-gray-400 hover:text-gray-600"><X size={20}/></button>}
                </div>
                <form onSubmit={handleAddTestimonial} className="space-y-4">
                  <input type="text" placeholder="Customer Name" className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition" value={testName} onChange={e => setTestName(e.target.value)} />
                  <input type="text" placeholder="Role (e.g. Verified Buyer)" className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition" value={testRole} onChange={e => setTestRole(e.target.value)} />
                  <textarea placeholder="Review Text" className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-orange-500 outline-none h-32 transition" value={testReview} onChange={e => setTestReview(e.target.value)} />
                  <button className="w-full bg-orange-600 text-white py-3 rounded-xl hover:bg-orange-700 font-bold shadow-lg shadow-orange-200 transition transform active:scale-95">
                      {editingId ? 'Update' : 'Save'} Review
                  </button>
                  {editingId && (
                      <button type="button" onClick={clearForms} className="w-full bg-gray-100 text-gray-600 py-3 rounded-xl hover:bg-gray-200 font-medium">Cancel</button>
                  )}
                </form>
              </div>
            </div>
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <div key={t._id} className={`bg-white p-8 rounded-[2rem] shadow-sm border ${t.isActive ? 'border-gray-100' : 'border-red-100 bg-red-50/10'} relative group hover:shadow-xl hover:border-orange-200 transition-all duration-300`}>
                  <div className="absolute top-6 right-6 flex space-x-1 opacity-0 group-hover:opacity-100 transition duration-300">
                      <button onClick={() => toggleVisibility(t._id, t.isActive)} className={`p-2 transition rounded-xl bg-white shadow-sm border ${t.isActive ? 'text-green-500 border-green-100 hover:bg-green-50' : 'text-gray-400 border-gray-100 hover:bg-gray-50'}`}>
                        {t.isActive ? <Eye size={16}/> : <EyeOff size={16}/>}
                      </button>
                      <button onClick={() => setEditTestimonial(t)} className="p-2 transition text-blue-500 hover:bg-blue-50 rounded-xl bg-white shadow-sm border border-blue-100"><Edit2 size={16}/></button>
                      <button onClick={() => handleDelete('/api/testimonials', t._id)} className="p-2 transition text-red-500 hover:bg-red-50 rounded-xl bg-white shadow-sm border border-red-100"><Trash2 size={16}/></button>
                  </div>
                  {!t.isActive && (
                    <div className="absolute top-6 left-8">
                       <span className="bg-red-500 text-white text-[10px] font-black uppercase tracking-tighter px-2 py-0.5 rounded-md shadow-sm">Hidden / Pending</span>
                    </div>
                  )}
                  <div className="flex flex-col h-full">
                    <div className="flex items-center space-x-1 text-orange-400 mb-4">
                        {[...Array(5)].map((_, i) => <Plus key={i} size={10} className="fill-orange-400"/>)}
                    </div>
                    <p className="text-gray-700 font-medium leading-relaxed italic mb-8 flex-1">"{t.review}"</p>
                    <div className="flex items-center space-x-4 pt-4 border-t border-gray-50">
                        <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-black text-xl">
                            {t.name.charAt(0)}
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 leading-none mb-1">{t.name}</h4>
                            <span className="text-[10px] font-black tracking-widest text-orange-500 uppercase">{t.role}</span>
                        </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-start-2 lg:col-span-3">
              <Pagination pagination={pagination} onPageChange={setCurrentPage} />
            </div>
          </div>
        )}

        {/* ── FAQs Tab ── */}
        {activeTab === 'faqs' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
             <div className="lg:col-span-1 h-fit top-8 sticky">
               <div className="bg-white p-6 rounded-2xl shadow-sm border border-orange-100">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">{editingId ? 'Edit' : 'Add'} FAQ</h3>
                  {editingId && <button onClick={clearForms} className="text-gray-400 hover:text-gray-600"><X size={20}/></button>}
                </div>
                <form onSubmit={handleAddFAQ} className="space-y-4">
                  <select className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition bg-white" value={faqCategory} onChange={e => setFaqCategory(e.target.value)}>
                      <option value="General">General</option>
                      <option value="Products">Products & Quality</option>
                      <option value="Orders">Orders & Distribution</option>
                  </select>
                  <input type="text" placeholder="Question" className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition" value={faqQuestion} onChange={e => setFaqQuestion(e.target.value)} />
                  <textarea placeholder="Answer" className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-orange-500 outline-none h-32 transition" value={faqAnswer} onChange={e => setFaqAnswer(e.target.value)} />
                  <button className="w-full bg-orange-600 text-white py-3 rounded-xl hover:bg-orange-700 font-bold shadow-lg shadow-orange-200 transition transform active:scale-95">
                      {editingId ? 'Update' : 'Save'} FAQ
                  </button>
                  {editingId && (
                      <button type="button" onClick={clearForms} className="w-full bg-gray-100 text-gray-600 py-3 rounded-xl hover:bg-gray-200 font-medium">Cancel</button>
                  )}
                </form>
              </div>
            </div>
             <div className="lg:col-span-3 grid grid-cols-1 xl:grid-cols-2 gap-6">
              {faqs.map((f) => (
                 <div key={f._id} className={`bg-white p-8 rounded-[2rem] shadow-sm border ${f.isActive ? 'border-gray-100' : 'border-red-100 bg-red-50/10'} relative group hover:shadow-xl hover:border-orange-200 transition-all duration-300`}>
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-2">
                           <span className="text-[10px] font-black tracking-widest text-blue-600 bg-blue-50 px-3 py-1.5 rounded-xl uppercase">
                               {f.category}
                           </span>
                           {!f.isActive && <span className="text-[10px] font-black tracking-widest text-white bg-red-500 px-2 py-1 rounded-lg uppercase">Hidden</span>}
                        </div>
                        <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition duration-300">
                            <button onClick={() => toggleVisibility(f._id, f.isActive)} className={`p-2 transition rounded-xl bg-white shadow-sm border ${f.isActive ? 'text-green-500 border-green-100 hover:bg-green-50' : 'text-gray-400 border-gray-100 hover:bg-gray-50'}`}>
                                {f.isActive ? <Eye size={16}/> : <EyeOff size={16}/>}
                            </button>
                            <button onClick={() => setEditFAQ(f)} className="p-2 transition text-blue-500 hover:bg-blue-50 rounded-xl bg-white shadow-sm border border-blue-100"><Edit2 size={16}/></button>
                            <button onClick={() => handleDelete('/api/faqs', f._id)} className="p-2 transition text-red-500 hover:bg-red-50 rounded-xl bg-white shadow-sm border border-red-100"><Trash2 size={16}/></button>
                        </div>
                    </div>
                    <h4 className="font-extrabold text-lg text-gray-900 mb-3 leading-snug">{f.question}</h4>
                    <p className="text-gray-600 leading-relaxed font-medium text-sm">{f.answer}</p>
                </div>
              ))}
            </div>
            <div className="lg:col-start-2 lg:col-span-3">
              <Pagination pagination={pagination} onPageChange={setCurrentPage} />
            </div>
          </div>
        )}
        
        {/* ── Messages Tab ── */}
        {activeTab === 'messages' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {contacts.map((m) => (
                <div key={m._id} className={`bg-white rounded-[2.5rem] p-8 shadow-sm border ${m.isRead ? 'border-gray-100' : 'border-orange-200 bg-orange-50/10'} relative group hover:shadow-xl transition-all duration-300`}>
                  {!m.isRead && (
                    <span className="absolute top-6 left-8 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                    </span>
                  )}
                  <div className="absolute top-6 right-8 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all">
                    <button onClick={() => handleDelete('/api/contact', m._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition bg-white shadow-sm border border-red-100">
                      <Trash2 size={16}/>
                    </button>
                  </div>
                  
                  <div className="mb-6">
                    <span className="text-[10px] font-black tracking-widest text-orange-500 uppercase block mb-1">{new Date(m.createdAt).toLocaleDateString()}</span>
                    <h4 className="font-bold text-xl text-gray-900 leading-tight mb-1">{m.firstName} {m.lastName}</h4>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-bold text-gray-700">{m.phone}</p>
                      <p className="text-xs font-medium text-gray-400 break-all">{m.email || 'No email provided'}</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-6 mb-4">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Subject: {m.subject}</p>
                    <p className="text-gray-700 leading-relaxed text-sm italic font-medium">"{m.message}"</p>
                  </div>
                </div>
              ))}
              {contacts.length === 0 && (
                <div className="col-span-full py-20 text-center bg-white rounded-[2.5rem] border-2 border-dashed border-gray-100">
                  <Mail className="mx-auto text-gray-200 mb-4" size={48} />
                  <p className="text-gray-400 font-bold">No messages received yet.</p>
                </div>
              )}
            </div>
            <Pagination pagination={pagination} onPageChange={setCurrentPage} />
          </div>
        )}

        {/* ── Distributors Tab ── */}
        {activeTab === 'distributors' && (
          <div className="space-y-8 pb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {distributors.map((d) => (
                <div key={d._id} className={`bg-white p-8 rounded-[2.5rem] shadow-sm border transition-all duration-300 relative group ${d.isRead ? 'border-gray-100 opacity-80' : 'border-blue-100 bg-blue-50/10'}`}>
                  <div className="absolute top-6 right-6 flex space-x-2">
                    <button 
                       onClick={() => handleUpdate('/api/distributors', d._id, { isRead: !d.isRead })}
                       className={`p-2 rounded-xl border transition ${d.isRead ? 'bg-gray-100 text-gray-400 border-gray-100' : 'bg-blue-500 text-white border-blue-500 hover:bg-blue-600 shadow-lg shadow-blue-200'}`}
                    >
                      <CheckCircle2 size={16}/>
                    </button>
                    <button 
                      onClick={() => handleDelete('/api/distributors', d._id)}
                      className="p-2 transition text-red-500 hover:bg-red-50 rounded-xl bg-white shadow-sm border border-red-100"
                    >
                      <Trash2 size={16}/>
                    </button>
                  </div>
                  
                  <div className="mb-6">
                    <span className="text-[10px] font-black tracking-widest text-[#1a237e] uppercase block mb-1">{new Date(d.createdAt).toLocaleDateString()}</span>
                    <h4 className="font-bold text-2xl text-gray-900 leading-tight mb-1">{d.companyName}</h4>
                    <p className="text-orange-600 font-black text-sm uppercase tracking-wider">{d.ownerName}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 p-4 rounded-2xl">
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Location</p>
                        <p className="text-sm font-bold text-gray-700">{d.city}, {d.state}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-2xl">
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Experience</p>
                        <p className="text-sm font-bold text-gray-700">{d.experience || 'N/A'}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-gray-600">
                        <Phone size={14} className="text-blue-500" />
                        <span className="text-sm font-bold">{d.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                        <Mail size={14} className="text-blue-500" />
                        <span className="text-xs font-medium truncate">{d.email}</span>
                    </div>
                  </div>

                  {d.message && (
                    <div className="mt-6 pt-6 border-t border-gray-100">
                        <p className="text-gray-600 leading-relaxed text-sm italic font-medium">"{d.message}"</p>
                    </div>
                  )}
                </div>
              ))}
              {distributors.length === 0 && (
                <div className="col-span-full py-20 text-center bg-white rounded-[2.5rem] border-2 border-dashed border-gray-100">
                  <Briefcase className="mx-auto text-gray-200 mb-4" size={48} />
                  <p className="text-gray-400 font-bold">No applications received yet.</p>
                </div>
              )}
            </div>
            <Pagination pagination={pagination} onPageChange={setCurrentPage} />
          </div>
        )}

        {/* ── Newsletter Tab ── */}
        {activeTab === 'newsletter' && (
          <div className="space-y-8 pb-20">
            <div className="flex justify-between items-center bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                <div>
                   <h2 className="text-2xl font-black text-gray-900">Newsletter Subscribers</h2>
                   <p className="text-gray-500 font-medium">{subscribers.length} people subscribed to your updates</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-2xl text-orange-600">
                   <Newspaper size={32} />
                </div>
            </div>

            <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden px-4">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Email Address</th>
                            <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Subscribed On</th>
                            <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {subscribers.map((sub) => (
                            <tr key={sub._id} className="hover:bg-gray-50/50 transition">
                                <td className="px-8 py-5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                                            {sub.email.charAt(0).toUpperCase()}
                                        </div>
                                        <span className="font-bold text-gray-900">{sub.email}</span>
                                    </div>
                                </td>
                                <td className="px-8 py-5 text-sm text-gray-500 font-medium">
                                    {new Date(sub.subscribedAt).toLocaleDateString('en-IN', {
                                        day: '2-digit',
                                        month: 'short',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </td>
                                <td className="px-8 py-5 text-right">
                                    <button 
                                        onClick={() => handleDeleteSubscriber(sub._id)}
                                        className="p-2 text-red-300 hover:text-red-600 hover:bg-red-50 rounded-xl transition"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {subscribers.length === 0 && (
                    <div className="py-20 text-center">
                        <Newspaper className="mx-auto text-gray-100 mb-4" size={64} />
                        <p className="text-gray-400 font-bold">No subscribers yet.</p>
                    </div>
                )}
            </div>
            <Pagination pagination={pagination} onPageChange={setCurrentPage} />
          </div>
        )}

        {/* ── Site Settings Tab ── */}
        {activeTab === 'settings' && (
          <form onSubmit={handleUpdateSettings} className="max-w-6xl space-y-10 pb-20">
            <div className="flex justify-between items-center bg-white p-6 rounded-[2rem] shadow-sm border border-orange-100 sticky top-4 z-40">
                <div>
                    <h2 className="text-2xl font-black text-gray-900 leading-tight">Site Settings</h2>
                    <p className="text-sm text-gray-500 font-medium">Manage global business info & configuration</p>
                </div>
                <button 
                    disabled={saveStatus === 'saving'}
                    type="submit" 
                    className="flex items-center gap-2 bg-orange-600 text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-orange-100 hover:bg-orange-700 transition active:scale-95 disabled:opacity-50"
                >
                    {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'success' ? 'Settings Saved!' : 'Save Changes'}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* ── Contact Module ── */}
                <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="bg-blue-50 p-2.5 rounded-xl text-blue-600"><Phone size={20}/></div>
                        <h3 className="font-extrabold text-xl text-gray-900">Contact Information</h3>
                    </div>
                    <div className="space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                            <InputField label="Primary Phone" value={settings.phonePrimary} onChange={(v: string) => handleSettingsChange('phonePrimary', v)} />
                            <InputField label="Secondary Phone" value={settings.phoneSecondary} onChange={(v: string) => handleSettingsChange('phoneSecondary', v)} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <InputField label="WhatsApp Number" value={settings.whatsapp} onChange={(v: string) => handleSettingsChange('whatsapp', v)} />
                            <InputField label="Customer Care" value={settings.customerCare} onChange={(v: string) => handleSettingsChange('customerCare', v)} />
                        </div>
                        <div className="space-y-4 pt-4 border-t border-gray-50">
                            <InputField label="Primary Email" value={settings.emailPrimary} onChange={(v: string) => handleSettingsChange('emailPrimary', v)} />
                            <InputField label="Support Email" value={settings.emailSupport} onChange={(v: string) => handleSettingsChange('emailSupport', v)} />
                            <InputField label="Sales Email" value={settings.emailSales} onChange={(v: string) => handleSettingsChange('emailSales', v)} />
                        </div>
                    </div>
                </div>

                {/* ── Address Module ── */}
                <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="bg-green-50 p-2.5 rounded-xl text-green-600"><Map size={20}/></div>
                        <h3 className="font-extrabold text-xl text-gray-900">Business Address</h3>
                    </div>
                    <div className="space-y-5">
                        <InputField label="Company Name" value={settings.companyName} onChange={(v: string) => handleSettingsChange('companyName', v)} />
                        <InputField label="Street / Flat / Plot" value={settings.addressStreet} onChange={(v: string) => handleSettingsChange('addressStreet', v)} />
                        <InputField label="Area / Locality" value={settings.addressArea} onChange={(v: string) => handleSettingsChange('addressArea', v)} />
                        <div className="grid grid-cols-2 gap-4">
                            <InputField label="City" value={settings.addressCity} onChange={(v: string) => handleSettingsChange('addressCity', v)} />
                            <InputField label="State" value={settings.addressState} onChange={(v: string) => handleSettingsChange('addressState', v)} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <InputField label="Pincode" value={settings.addressPincode} onChange={(v: string) => handleSettingsChange('addressPincode', v)} />
                        </div>
                        <div className="pt-4 border-t border-gray-50">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1 mb-1 block">Google Maps Embed Link (Src Only)</label>
                            <textarea 
                                className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none transition text-sm font-medium h-24"
                                value={settings.googleMapsEmbed}
                                onChange={e => handleSettingsChange('googleMapsEmbed', e.target.value)}
                                placeholder="Paste the iframe src URL here..."
                            />
                        </div>
                    </div>
                </div>

                {/* ── Social Media Module ── */}
                <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="bg-purple-50 p-2.5 rounded-xl text-purple-600"><Share2 size={20}/></div>
                        <h3 className="font-extrabold text-xl text-gray-900">Social Media Links</h3>
                    </div>
                    <div className="space-y-5">
                        <InputField label="Facebook Profile URL" value={settings.facebook} onChange={(v: string) => handleSettingsChange('facebook', v)} />
                        <InputField label="Instagram Profile URL" value={settings.instagram} onChange={(v: string) => handleSettingsChange('instagram', v)} />
                        <InputField label="Twitter / X Profile URL" value={settings.twitter} onChange={(v: string) => handleSettingsChange('twitter', v)} />
                        <InputField label="LinkedIn Page URL" value={settings.linkedin} onChange={(v: string) => handleSettingsChange('linkedin', v)} />
                        <InputField label="YouTube Channel URL" value={settings.youtube} onChange={(v: string) => handleSettingsChange('youtube', v)} />
                        <InputField label="WhatsApp (Contact Link)" value={settings.whatsapp} onChange={(v: string) => handleSettingsChange('whatsapp', v)} />
                        <InputField label="Pinterest profile URL" value={settings.pinterest} onChange={(v: string) => handleSettingsChange('pinterest', v)} />
                    </div>
                </div>

                {/* ── Business Statistics Module ── */}
                <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="bg-green-50 p-2.5 rounded-xl text-green-600"><BarChart size={20}/></div>
                        <h3 className="font-extrabold text-xl text-gray-900">Business Statistics</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                        <InputField label="Years of Experience" value={settings.statsExperience} onChange={(v: string) => handleSettingsChange('statsExperience', v)} />
                        <InputField label="Total Products" value={settings.statsProducts} onChange={(v: string) => handleSettingsChange('statsProducts', v)} />
                        <InputField label="Happy Customers" value={settings.statsCustomers} onChange={(v: string) => handleSettingsChange('statsCustomers', v)} />
                        <InputField label="Cities Covered" value={settings.statsCities} onChange={(v: string) => handleSettingsChange('statsCities', v)} />
                    </div>
                </div>

                {/* ── Homepage Sections Module ── */}
                <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="bg-yellow-50 p-2.5 rounded-xl text-yellow-600"><LayoutGrid size={20}/></div>
                        <h3 className="font-extrabold text-xl text-gray-900">Homepage Sections</h3>
                    </div>
                    <div className="space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                            <InputField label="Trust Badges Title" value={settings.trustBadgesTitle} onChange={(v: string) => handleSettingsChange('trustBadgesTitle', v)} />
                            <InputField label="Title Accent (Orange Text)" value={settings.trustBadgesTitleAccent} onChange={(v: string) => handleSettingsChange('trustBadgesTitleAccent', v)} />
                        </div>
                    </div>
                </div>

                {/* ── Brand & Legal Module ── */}
                <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="bg-orange-50 p-2.5 rounded-xl text-orange-600"><Shield size={20}/></div>
                        <h3 className="font-extrabold text-xl text-gray-900">Brand & Legal</h3>
                    </div>
                    <div className="space-y-5">
                        <InputField label="Copyright Footer Text" value={settings.copyrightText} onChange={(v: string) => handleSettingsChange('copyrightText', v)} />
                        <InputField label="Legal Company Name" value={settings.legalCompanyName} onChange={(v: string) => handleSettingsChange('legalCompanyName', v)} />
                        <div className="grid grid-cols-2 gap-4">
                            <InputField label="GST Number" value={settings.gstNumber} onChange={(v: string) => handleSettingsChange('gstNumber', v)} />
                            <InputField label="CIN Number" value={settings.cinNumber} onChange={(v: string) => handleSettingsChange('cinNumber', v)} />
                        </div>
                        <InputField label="Trademark / Slogan" value={settings.trademarkLine} onChange={(v: string) => handleSettingsChange('trademarkLine', v)} />
                    </div>
                </div>

                {/* ── SEO & Meta Module ── */}
                <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 md:col-span-2">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="bg-indigo-50 p-2.5 rounded-xl text-indigo-600"><Globe size={20}/></div>
                        <h3 className="font-extrabold text-xl text-gray-900">SEO & Meta Defaults</h3>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-1">
                            <InputField label="Default Site Title" value={settings.metaTitle} onChange={(v: string) => handleSettingsChange('metaTitle', v)} />
                            <div className="mt-4">
                                <InputField label="Global OpenGraph Image URL" value={settings.ogImage} onChange={(v: string) => handleSettingsChange('ogImage', v)} />
                            </div>
                        </div>
                        <div className="lg:col-span-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1 mb-1 block">Default Meta Description</label>
                            <textarea 
                                className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none transition text-sm font-medium h-32"
                                value={settings.metaDescription}
                                onChange={e => handleSettingsChange('metaDescription', e.target.value)}
                            />
                        </div>
                    </div>
                </div>

            </div>
          </form>
        )}

      </main>

    </div>
  );
}

const InputField = ({ label, value, onChange, type = "text" }: { label: string, value: string, onChange: (v: string) => void, type?: string }) => (
  <div>
    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1 mb-1 block">{label}</label>
    <input 
      type={type}
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none transition text-sm font-medium"
      placeholder={`Enter ${label.toLowerCase()}...`}
    />
  </div>
);

const RowsPerPage = ({ value, onChange }: { value: number, onChange: (v: number) => void }) => (
  <div className="flex items-center gap-3">
    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Rows per page:</span>
    <select 
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="bg-white border border-gray-100 text-gray-900 text-sm font-bold rounded-xl focus:ring-orange-500 focus:border-orange-500 block p-2 px-4 shadow-sm outline-none cursor-pointer"
    >
      {[10, 20, 50, 100, 500].map(opt => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

const Pagination = ({ pagination, onPageChange }: { pagination: any, onPageChange: (p: number) => void }) => {
  const { totalCount, totalPages, currentPage, limit } = pagination;
  
  const start = (currentPage - 1) * limit + 1;
  const end = Math.min(currentPage * limit, totalCount);

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-6 mt-10 bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
      <div className="text-sm text-gray-500 font-medium">
        Showing <span className="text-gray-900 font-bold">{totalCount > 0 ? start : 0}–{end}</span> of <span className="text-gray-900 font-bold">{totalCount}</span> entries
      </div>
      
      <div className="flex items-center gap-2">
        <button 
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="px-4 py-2 bg-gray-50 text-gray-600 rounded-xl font-bold text-sm hover:bg-orange-50 hover:text-orange-600 disabled:opacity-30 disabled:hover:bg-gray-50 disabled:hover:text-gray-600 transition"
        >
          Previous
        </button>
        
        <div className="flex items-center gap-1">
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
             // Basic pagination window logic
             let pageNum;
             if (totalPages <= 5) {
               pageNum = i + 1;
             } else if (currentPage <= 3) {
               pageNum = i + 1;
             } else if (currentPage >= totalPages - 2) {
               pageNum = totalPages - 4 + i;
             } else {
               pageNum = currentPage - 2 + i;
             }
             
             return (
               <button 
                 key={pageNum}
                 onClick={() => onPageChange(pageNum)}
                 className={`w-10 h-10 rounded-xl font-bold text-sm transition ${currentPage === pageNum ? 'bg-orange-600 text-white shadow-lg' : 'bg-gray-50 text-gray-600 hover:bg-orange-50 hover:text-orange-600'}`}
               >
                 {pageNum}
               </button>
             );
          })}
        </div>

        <button 
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => onPageChange(currentPage + 1)}
          className="px-4 py-2 bg-gray-50 text-gray-600 rounded-xl font-bold text-sm hover:bg-orange-50 hover:text-orange-600 disabled:opacity-30 disabled:hover:bg-gray-50 disabled:hover:text-gray-600 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};
