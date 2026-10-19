import { useState } from 'react';
import { 
  FileText, Download, Eye, Search, Filter, 
  Calendar, Folder, File, Archive, 
  ChevronDown, X, Upload, Trash2,
  CheckCircle, Clock, AlertCircle, Share2,
  Grid, List as ListIcon
} from 'lucide-react';
import './DashboardDocuments.css';

export default function DashboardDocuments() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('date-desc');

  // Document Categories
  const categories = [
    { id: 'all', name: 'All Documents', count: 15 },
    { id: 'rental', name: 'Rental Documents', count: 5 },
    { id: 'legal', name: 'Legal Documents', count: 4 },
    { id: 'financial', name: 'Financial Records', count: 3 },
    { id: 'service', name: 'Service Documents', count: 3 },
  ];

  // All Documents
  const allDocuments = [
    {
      id: 1,
      name: 'Rental Agreement - Sea View Apartment',
      category: 'rental',
      type: 'PDF',
      size: '2.3 MB',
      uploadDate: '2024-01-01',
      expiryDate: '2024-12-31',
      status: 'Active',
      description: '11-month rental agreement with Mr. Rajesh Kumar',
      tags: ['Agreement', 'Legal', 'Important'],
      relatedTo: 'Monthly Rent - Sea View Apartment',
      downloadUrl: '/docs/rental-agreement.pdf',
      pages: 12,
      signedBy: ['Tenant', 'Owner', 'Witness'],
      version: '1.0'
    },
    {
      id: 2,
      name: 'Police Verification Certificate',
      category: 'rental',
      type: 'PDF',
      size: '1.1 MB',
      uploadDate: '2024-01-05',
      expiryDate: '2025-01-05',
      status: 'Active',
      description: 'Tenant verification from Mumbai Police',
      tags: ['Verification', 'Legal'],
      relatedTo: 'Monthly Rent - Sea View Apartment',
      downloadUrl: '/docs/police-verification.pdf',
      pages: 3,
      signedBy: ['Police Authority'],
      version: '1.0'
    },
    {
      id: 3,
      name: 'Rent Receipts - January to May 2024',
      category: 'rental',
      type: 'ZIP',
      size: '4.5 MB',
      uploadDate: '2024-05-31',
      expiryDate: null,
      status: 'Active',
      description: 'Consolidated rent payment receipts',
      tags: ['Receipt', 'Payment', 'Archive'],
      relatedTo: 'Monthly Rent - Sea View Apartment',
      downloadUrl: '/docs/rent-receipts.zip',
      pages: null,
      signedBy: null,
      version: '1.0'
    },
    {
      id: 4,
      name: 'Property Tax Receipt 2023-24',
      category: 'rental',
      type: 'PDF',
      size: '0.8 MB',
      uploadDate: '2024-04-01',
      expiryDate: '2025-03-31',
      status: 'Active',
      description: 'Municipal property tax payment receipt',
      tags: ['Tax', 'Payment'],
      relatedTo: 'Property Ownership',
      downloadUrl: '/docs/property-tax.pdf',
      pages: 2,
      signedBy: ['Municipal Authority'],
      version: '1.0'
    },
    {
      id: 5,
      name: 'Electricity Bill - May 2024',
      category: 'rental',
      type: 'PDF',
      size: '0.3 MB',
      uploadDate: '2024-05-10',
      expiryDate: null,
      status: 'Active',
      description: 'Monthly electricity consumption bill',
      tags: ['Bill', 'Utility'],
      relatedTo: 'Monthly Rent - Sea View Apartment',
      downloadUrl: '/docs/electricity-bill.pdf',
      pages: 1,
      signedBy: null,
      version: '1.0'
    },
    {
      id: 6,
      name: 'Title Deed Verification Report',
      category: 'legal',
      type: 'PDF',
      size: '2.7 MB',
      uploadDate: '2024-03-20',
      expiryDate: null,
      status: 'Completed',
      description: 'Complete title search and verification by legal expert',
      tags: ['Legal', 'Verification', 'Important'],
      relatedTo: 'Property Purchase',
      downloadUrl: '/docs/title-verification.pdf',
      pages: 18,
      signedBy: ['Adv. Priya Sharma', 'Legal Consultant'],
      version: '2.0'
    },
    {
      id: 7,
      name: 'NOC from Society',
      category: 'legal',
      type: 'PDF',
      size: '1.5 MB',
      uploadDate: '2024-03-22',
      expiryDate: null,
      status: 'Completed',
      description: 'No Objection Certificate from housing society',
      tags: ['NOC', 'Legal'],
      relatedTo: 'Property Purchase',
      downloadUrl: '/docs/noc-society.pdf',
      pages: 4,
      signedBy: ['Society Secretary', 'Chairman'],
      version: '1.0'
    },
    {
      id: 8,
      name: 'Sale Agreement Draft',
      category: 'legal',
      type: 'PDF',
      size: '2.1 MB',
      uploadDate: '2024-03-25',
      expiryDate: null,
      status: 'Completed',
      description: 'Property sale agreement with terms and conditions',
      tags: ['Agreement', 'Legal', 'Important'],
      relatedTo: 'Property Purchase',
      downloadUrl: '/docs/sale-agreement.pdf',
      pages: 15,
      signedBy: ['Buyer', 'Seller', 'Witness 1', 'Witness 2'],
      version: '3.0'
    },
    {
      id: 9,
      name: 'Encumbrance Certificate',
      category: 'legal',
      type: 'PDF',
      size: '1.2 MB',
      uploadDate: '2024-03-18',
      expiryDate: null,
      status: 'Completed',
      description: 'Certificate showing property is free from legal dues',
      tags: ['Certificate', 'Legal'],
      relatedTo: 'Property Purchase',
      downloadUrl: '/docs/encumbrance-cert.pdf',
      pages: 5,
      signedBy: ['Sub-Registrar Office'],
      version: '1.0'
    },
    {
      id: 10,
      name: 'Home Loan Approval Letter',
      category: 'financial',
      type: 'PDF',
      size: '0.9 MB',
      uploadDate: '2024-02-15',
      expiryDate: null,
      status: 'Active',
      description: 'Loan sanction letter from HDFC Bank',
      tags: ['Loan', 'Financial', 'Important'],
      relatedTo: 'Home Loan',
      downloadUrl: '/docs/loan-approval.pdf',
      pages: 6,
      signedBy: ['Bank Manager'],
      version: '1.0'
    },
    {
      id: 11,
      name: 'Loan Repayment Schedule',
      category: 'financial',
      type: 'PDF',
      size: '0.5 MB',
      uploadDate: '2024-02-20',
      expiryDate: null,
      status: 'Active',
      description: 'EMI schedule for 20-year home loan',
      tags: ['Loan', 'Schedule'],
      relatedTo: 'Home Loan',
      downloadUrl: '/docs/loan-schedule.pdf',
      pages: 3,
      signedBy: null,
      version: '1.0'
    },
    {
      id: 12,
      name: 'Property Insurance Policy',
      category: 'financial',
      type: 'PDF',
      size: '1.8 MB',
      uploadDate: '2024-04-01',
      expiryDate: '2025-03-31',
      status: 'Active',
      description: 'Comprehensive property insurance coverage',
      tags: ['Insurance', 'Financial'],
      relatedTo: 'Property Protection',
      downloadUrl: '/docs/insurance-policy.pdf',
      pages: 8,
      signedBy: ['Insurance Company'],
      version: '1.0'
    },
    {
      id: 13,
      name: 'Property Management Service Agreement',
      category: 'service',
      type: 'PDF',
      size: '1.8 MB',
      uploadDate: '2024-02-15',
      expiryDate: '2025-02-14',
      status: 'Active',
      description: 'Annual property management service contract',
      tags: ['Service', 'Agreement'],
      relatedTo: 'Property Management',
      downloadUrl: '/docs/pm-agreement.pdf',
      pages: 10,
      signedBy: ['Service Provider', 'Client'],
      version: '1.0'
    },
    {
      id: 14,
      name: 'Monthly Service Report - May 2024',
      category: 'service',
      type: 'PDF',
      size: '3.2 MB',
      uploadDate: '2024-05-31',
      expiryDate: null,
      status: 'Active',
      description: 'Maintenance and service activities report',
      tags: ['Report', 'Service'],
      relatedTo: 'Property Management',
      downloadUrl: '/docs/service-report-may.pdf',
      pages: 12,
      signedBy: ['Service Manager'],
      version: '1.0'
    },
    {
      id: 15,
      name: 'Plumbing Service Invoice',
      category: 'service',
      type: 'PDF',
      size: '0.8 MB',
      uploadDate: '2024-04-28',
      expiryDate: null,
      status: 'Completed',
      description: 'Invoice for pipe leakage repair service',
      tags: ['Invoice', 'Payment'],
      relatedTo: 'Maintenance',
      downloadUrl: '/docs/plumbing-invoice.pdf',
      pages: 2,
      signedBy: ['Service Provider'],
      version: '1.0'
    },
  ];

  // Filter and sort documents
  let filteredDocuments = allDocuments.filter(doc => {
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Sort documents
  filteredDocuments = filteredDocuments.sort((a, b) => {
    switch(sortBy) {
      case 'date-desc':
        return new Date(b.uploadDate) - new Date(a.uploadDate);
      case 'date-asc':
        return new Date(a.uploadDate) - new Date(b.uploadDate);
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      case 'size-desc':
        return parseFloat(b.size) - parseFloat(a.size);
      case 'size-asc':
        return parseFloat(a.size) - parseFloat(b.size);
      default:
        return 0;
    }
  });

  const handleDownload = (doc) => {
    console.log('Downloading:', doc.name);
    alert(`Downloading: ${doc.name}`);
  };

  const handleView = (doc) => {
    setSelectedDocument(doc);
  };

  const handleShare = (doc) => {
    console.log('Sharing:', doc.name);
    alert(`Share options for: ${doc.name}`);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Active': return '#059669';
      case 'Completed': return '#3b82f6';
      case 'Expired': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Active': return <CheckCircle size={16} />;
      case 'Completed': return <CheckCircle size={16} />;
      case 'Expired': return <AlertCircle size={16} />;
      default: return <Clock size={16} />;
    }
  };

  const totalSize = allDocuments.reduce((sum, doc) => {
    return sum + parseFloat(doc.size);
  }, 0);

  return (
    <div className="dashboard-documents-page">
      {/* Page Header */}
      <div className="docs-page-header">
        <div>
          <h1>My Documents</h1>
          <p>Manage all your property-related documents in one secure place</p>
        </div>
        <div className="header-actions">
          <div className="storage-badge">
            <Archive size={18} />
            <span>{totalSize.toFixed(1)} MB of 50 MB</span>
          </div>
          <button className="upload-btn-primary">
            <Upload size={20} />
            Upload New Document
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="category-tabs">
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`category-tab ${selectedCategory === cat.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat.id)}
          >
            {cat.name}
            <span className="count-badge">{cat.count}</span>
          </button>
        ))}
      </div>

      {/* Toolbar */}
      <div className="docs-toolbar">
        <div className="search-container">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Search by name, description, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="clear-btn" onClick={() => setSearchQuery('')}>
              <X size={16} />
            </button>
          )}
        </div>
        
        <div className="toolbar-right">
          <select 
            className="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="date-desc">Newest First</option>
            <option value="date-asc">Oldest First</option>
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="size-desc">Largest First</option>
            <option value="size-asc">Smallest First</option>
          </select>
          
          <div className="view-switcher">
            <button 
              className={viewMode === 'grid' ? 'active' : ''}
              onClick={() => setViewMode('grid')}
              title="Grid View"
            >
              <Grid size={18} />
            </button>
            <button 
              className={viewMode === 'list' ? 'active' : ''}
              onClick={() => setViewMode('list')}
              title="List View"
            >
              <ListIcon size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Results Info */}
      <div className="results-info">
        <span className="result-count">
          Showing {filteredDocuments.length} of {allDocuments.length} documents
        </span>
        {searchQuery && (
          <button className="clear-search-btn" onClick={() => setSearchQuery('')}>
            Clear search
          </button>
        )}
      </div>

      {/* Documents Display */}
      <div className={`documents-display ${viewMode}-view`}>
        {filteredDocuments.map(doc => (
          <div key={doc.id} className="doc-card">
            <div className="doc-preview">
              <div className={`file-type-icon ${doc.type.toLowerCase()}`}>
                <FileText size={32} />
                <span className="type-label">{doc.type}</span>
              </div>
              <div className="doc-actions-overlay">
                <button onClick={() => handleView(doc)} className="action-btn view-btn">
                  <Eye size={16} />
                  View
                </button>
                <button onClick={() => handleDownload(doc)} className="action-btn download-btn">
                  <Download size={16} />
                  Download
                </button>
              </div>
            </div>
            
            <div className="doc-content">
              <div className="doc-header">
                <h3 className="doc-title" title={doc.name}>{doc.name}</h3>
                <span 
                  className="doc-status"
                  style={{ 
                    backgroundColor: `${getStatusColor(doc.status)}20`,
                    color: getStatusColor(doc.status)
                  }}
                >
                  {getStatusIcon(doc.status)}
                  {doc.status}
                </span>
              </div>
              
              <p className="doc-desc">{doc.description}</p>
              
              <div className="doc-metadata">
                <span className="meta-item">
                  <Calendar size={14} />
                  {new Date(doc.uploadDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
                <span className="meta-item">
                  <File size={14} />
                  {doc.size}
                </span>
                {doc.pages && (
                  <span className="meta-item">{doc.pages} pages</span>
                )}
              </div>

              <div className="doc-tags">
                {doc.tags.slice(0, 3).map((tag, idx) => (
                  <span key={idx} className="doc-tag">{tag}</span>
                ))}
              </div>

              <div className="doc-footer">
                <span className="related-to">{doc.relatedTo}</span>
                <button 
                  className="share-icon-btn"
                  onClick={() => handleShare(doc)}
                  title="Share"
                >
                  <Share2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredDocuments.length === 0 && (
        <div className="empty-state">
          <FileText size={64} />
          <h3>No documents found</h3>
          <p>Try adjusting your search or filters</p>
        </div>
      )}

      {/* Document Detail Modal */}
      {selectedDocument && (
        <div className="doc-modal-overlay" onClick={() => setSelectedDocument(null)}>
          <div className="doc-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h2>{selectedDocument.name}</h2>
                <p>{selectedDocument.description}</p>
              </div>
              <button className="modal-close-btn" onClick={() => setSelectedDocument(null)}>
                <X size={24} />
              </button>
            </div>

            <div className="modal-body">
              <div className="details-grid">
                <div className="detail-item">
                  <label>File Type</label>
                  <span>{selectedDocument.type}</span>
                </div>
                <div className="detail-item">
                  <label>File Size</label>
                  <span>{selectedDocument.size}</span>
                </div>
                <div className="detail-item">
                  <label>Upload Date</label>
                  <span>{new Date(selectedDocument.uploadDate).toLocaleDateString('en-IN', { 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                  })}</span>
                </div>
                <div className="detail-item">
                  <label>Status</label>
                  <span 
                    className="doc-status"
                    style={{ 
                      backgroundColor: `${getStatusColor(selectedDocument.status)}20`,
                      color: getStatusColor(selectedDocument.status)
                    }}
                  >
                    {getStatusIcon(selectedDocument.status)}
                    {selectedDocument.status}
                  </span>
                </div>
                {selectedDocument.pages && (
                  <div className="detail-item">
                    <label>Pages</label>
                    <span>{selectedDocument.pages} pages</span>
                  </div>
                )}
                {selectedDocument.version && (
                  <div className="detail-item">
                    <label>Version</label>
                    <span>v{selectedDocument.version}</span>
                  </div>
                )}
                {selectedDocument.expiryDate && (
                  <div className="detail-item">
                    <label>Expiry Date</label>
                    <span>{new Date(selectedDocument.expiryDate).toLocaleDateString('en-IN', { 
                      day: 'numeric', 
                      month: 'long', 
                      year: 'numeric' 
                    })}</span>
                  </div>
                )}
                <div className="detail-item">
                  <label>Related To</label>
                  <span>{selectedDocument.relatedTo}</span>
                </div>
              </div>

              {selectedDocument.signedBy && (
                <div className="detail-section">
                  <label>Signed By</label>
                  <div className="signers-list">
                    {selectedDocument.signedBy.map((signer, idx) => (
                      <span key={idx} className="signer-badge">
                        <CheckCircle size={14} />
                        {signer}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="detail-section">
                <label>Tags</label>
                <div className="modal-tags">
                  {selectedDocument.tags.map((tag, idx) => (
                    <span key={idx} className="doc-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="modal-actions">
              <button 
                className="modal-action-btn secondary"
                onClick={() => handleShare(selectedDocument)}
              >
                <Share2 size={18} />
                Share
              </button>
              <button 
                className="modal-action-btn secondary"
                onClick={() => handleView(selectedDocument)}
              >
                <Eye size={18} />
                Open Document
              </button>
              <button 
                className="modal-action-btn primary"
                onClick={() => handleDownload(selectedDocument)}
              >
                <Download size={18} />
                Download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
