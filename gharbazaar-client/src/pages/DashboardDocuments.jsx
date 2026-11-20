import { useState } from 'react';

export default function DashboardDocuments() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDocument, setSelectedDocument] = useState(null);

  // Document Categories
  const categories = [
    { id: 'all', name: 'All Documents', count: 15 },
    { id: 'rental', name: 'Rental', count: 5 },
    { id: 'legal', name: 'Legal', count: 4 },
    { id: 'financial', name: 'Financial', count: 3 },
    { id: 'service', name: 'Service', count: 3 },
  ];

  // Sample Documents
  const allDocuments = [
    {
      id: 1,
      name: 'Rental Agreement - Sea View Apartment',
      category: 'rental',
      type: 'PDF',
      size: '2.3 MB',
      uploadDate: '2024-01-01',
      status: 'Active',
      description: '11-month rental agreement',
    },
    {
      id: 2,
      name: 'Police Verification Certificate',
      category: 'rental',
      type: 'PDF',
      size: '1.1 MB',
      uploadDate: '2024-01-05',
      status: 'Active',
      description: 'Tenant verification document',
    },
    {
      id: 3,
      name: 'Title Deed Verification Report',
      category: 'legal',
      type: 'PDF',
      size: '2.7 MB',
      uploadDate: '2024-03-20',
      status: 'Verified',
      description: 'Complete title search report',
    },
    {
      id: 4,
      name: 'Home Loan Approval Letter',
      category: 'financial',
      type: 'PDF',
      size: '0.9 MB',
      uploadDate: '2024-02-15',
      status: 'Active',
      description: 'Loan sanction from HDFC Bank',
    },
    {
      id: 5,
      name: 'Property Insurance Policy',
      category: 'financial',
      type: 'PDF',
      size: '1.8 MB',
      uploadDate: '2024-04-01',
      status: 'Active',
      description: 'Comprehensive coverage',
    },
    {
      id: 6,
      name: 'Property Management Agreement',
      category: 'service',
      type: 'PDF',
      size: '1.8 MB',
      uploadDate: '2024-02-15',
      status: 'Active',
      description: 'Annual service contract',
    },
  ];

  const filteredDocuments = allDocuments.filter(doc => {
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'Active': return 'bg-[#d4f5e9] text-[#004c22]';
      case 'Verified': return 'bg-[#d4f5e9] text-[#004c22]';
      default: return 'bg-[#f6ece6] text-[#6c757d]';
    }
  };

  return (
    <div className="min-h-screen bg-[#fff8f5]">
      <div className="max-w-[1200px] mx-auto p-6">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[13px] text-[#6c757d] mb-6">
          <span>Dashboard</span>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-[#004c22] font-medium">My Documents</span>
        </div>

        {/* Header */}
        <div className="flex items-end justify-between mb-6">
          <div>
            <h1 className="text-[32px] font-bold text-[#1a1a1a] mb-2">My Documents</h1>
            <p className="text-[14px] text-[#6c757d]">Manage all your property-related documents</p>
          </div>
          <button className="px-5 py-2.5 bg-[#004c22] text-white rounded-lg text-[14px] font-medium hover:bg-[#003818] transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">upload</span>
            Upload Document
          </button>
        </div>

        {/* Storage Info */}
        <div className="bg-white rounded-xl border border-[#dee2e6] p-4 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#d4f5e9] rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px] text-[#004c22]">folder</span>
            </div>
            <div>
              <div className="text-[14px] font-bold text-[#1a1a1a]">{allDocuments.length} Documents</div>
              <div className="text-[12px] text-[#6c757d]">15.2 MB used of 50 MB</div>
            </div>
          </div>
          <div className="w-[300px] bg-[#f6ece6] rounded-full h-2">
            <div className="w-[30%] bg-[#004c22] rounded-full h-2"></div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 mb-6">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-[13px] font-medium transition-colors ${
                selectedCategory === cat.id 
                  ? 'bg-[#004c22] text-white' 
                  : 'bg-white border border-[#dee2e6] text-[#6c757d] hover:bg-[#f8f9fa]'
              }`}
            >
              {cat.name}
              <span className={`ml-2 px-2 py-0.5 rounded-full text-[11px] font-bold ${
                selectedCategory === cat.id 
                  ? 'bg-white/20 text-white' 
                  : 'bg-[#f6ece6] text-[#6c757d]'
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-3 text-[20px] text-[#6c757d]">search</span>
            <input
              type="text"
              placeholder="Search documents by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-[#dee2e6] rounded-lg text-[14px] outline-none focus:border-[#004c22] transition-colors"
            />
          </div>
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {filteredDocuments.map(doc => (
            <div key={doc.id} className="bg-white rounded-xl border border-[#dee2e6] overflow-hidden hover:shadow-md transition-all cursor-pointer">
              
              {/* Document Preview */}
              <div className="bg-[#f6ece6] h-[140px] flex items-center justify-center relative group">
                <span className="material-symbols-outlined text-[64px] text-[#6c757d]">description</span>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button 
                    onClick={() => setSelectedDocument(doc)}
                    className="p-2 bg-white rounded-lg hover:bg-[#f8f9fa]"
                  >
                    <span className="material-symbols-outlined text-[20px] text-[#1a1a1a]">visibility</span>
                  </button>
                  <button className="p-2 bg-white rounded-lg hover:bg-[#f8f9fa]">
                    <span className="material-symbols-outlined text-[20px] text-[#1a1a1a]">download</span>
                  </button>
                </div>
              </div>

              {/* Document Info */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-[14px] text-[#1a1a1a] line-clamp-2 flex-1">{doc.name}</h3>
                  <span className={`ml-2 px-2 py-0.5 rounded text-[10px] font-bold ${getStatusColor(doc.status)}`}>
                    {doc.status}
                  </span>
                </div>

                <p className="text-[12px] text-[#6c757d] mb-3 line-clamp-2">{doc.description}</p>

                <div className="flex items-center justify-between text-[11px] text-[#6c757d]">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">insert_drive_file</span>
                    <span>{doc.type}</span>
                  </div>
                  <span>{doc.size}</span>
                  <span>{new Date(doc.uploadDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredDocuments.length === 0 && (
          <div className="bg-white rounded-xl border border-[#dee2e6] p-12 text-center">
            <span className="material-symbols-outlined text-[64px] text-[#6c757d] mb-4 inline-block">description</span>
            <h3 className="text-[18px] font-bold text-[#1a1a1a] mb-2">No documents found</h3>
            <p className="text-[14px] text-[#6c757d]">Try adjusting your search or filters</p>
          </div>
        )}

        {/* Document Detail Modal */}
        {selectedDocument && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedDocument(null)}>
            <div className="bg-white rounded-xl max-w-[600px] w-full max-h-[80vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
              
              {/* Modal Header */}
              <div className="p-6 border-b border-[#dee2e6] flex items-start justify-between">
                <div>
                  <h2 className="text-[20px] font-bold text-[#1a1a1a] mb-1">{selectedDocument.name}</h2>
                  <p className="text-[13px] text-[#6c757d]">{selectedDocument.description}</p>
                </div>
                <button 
                  onClick={() => setSelectedDocument(null)}
                  className="p-2 hover:bg-[#f8f9fa] rounded-lg transition-colors"
                >
                  <span className="material-symbols-outlined text-[24px] text-[#6c757d]">close</span>
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-[#fff8f5] rounded-lg p-4">
                    <div className="text-[11px] text-[#6c757d] mb-1">FILE TYPE</div>
                    <div className="text-[14px] font-bold text-[#1a1a1a]">{selectedDocument.type}</div>
                  </div>
                  <div className="bg-[#fff8f5] rounded-lg p-4">
                    <div className="text-[11px] text-[#6c757d] mb-1">FILE SIZE</div>
                    <div className="text-[14px] font-bold text-[#1a1a1a]">{selectedDocument.size}</div>
                  </div>
                  <div className="bg-[#fff8f5] rounded-lg p-4">
                    <div className="text-[11px] text-[#6c757d] mb-1">UPLOAD DATE</div>
                    <div className="text-[14px] font-bold text-[#1a1a1a]">
                      {new Date(selectedDocument.uploadDate).toLocaleDateString('en-IN', { 
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                    </div>
                  </div>
                  <div className="bg-[#fff8f5] rounded-lg p-4">
                    <div className="text-[11px] text-[#6c757d] mb-1">STATUS</div>
                    <span className={`inline-block px-2 py-1 rounded text-[11px] font-bold ${getStatusColor(selectedDocument.status)}`}>
                      {selectedDocument.status}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button className="flex-1 py-2.5 bg-white border border-[#dee2e6] rounded-lg text-[14px] font-medium hover:bg-[#f8f9fa] transition-colors flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">share</span>
                    Share
                  </button>
                  <button className="flex-1 py-2.5 bg-[#004c22] text-white rounded-lg text-[14px] font-medium hover:bg-[#003818] transition-colors flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">download</span>
                    Download
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
