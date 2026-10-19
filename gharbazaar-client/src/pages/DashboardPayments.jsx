import { useState } from 'react';
import { 
  CreditCard, CheckCircle, Clock, Download, Home, Briefcase, 
  ShoppingCart, ShieldCheck, Repeat, XCircle, FileText, 
  Eye, Calendar, MapPin, User, Phone, Mail, Package,
  ExternalLink, File, ChevronRight
} from 'lucide-react';
import './DashboardPayments.css';

export default function DashboardPayments() {
  const [activeTab, setActiveTab] = useState('all');
  const [autoPayRent, setAutoPayRent] = useState(false);
  const [autoPayService, setAutoPayService] = useState(true);
  const [selectedService, setSelectedService] = useState(null);

  // Mock User Services with Details
  const userServices = [
    {
      id: 1,
      type: 'rent',
      serviceName: 'Monthly Rent - Sea View Apartment',
      provider: 'Mr. Rajesh Kumar (Owner)',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      amount: 45000,
      frequency: 'Monthly',
      status: 'Active',
      propertyAddress: '123, Sea View Apartments, Marine Drive, Mumbai - 400002',
      nextDue: '2024-06-01',
      documents: [
        { id: 1, name: 'Rental Agreement', type: 'PDF', size: '2.3 MB', date: '2024-01-01', url: '/docs/rental-agreement.pdf' },
        { id: 2, name: 'Police Verification', type: 'PDF', size: '1.1 MB', date: '2024-01-05', url: '/docs/police-verification.pdf' },
        { id: 3, name: 'Rent Receipts (Jan-May)', type: 'ZIP', size: '4.5 MB', date: '2024-05-31', url: '/docs/rent-receipts.zip' },
      ],
      icon: <Home size={24} />
    },
    {
      id: 2,
      type: 'service',
      serviceName: 'Property Management Service',
      provider: 'GharBazaar Property Services',
      startDate: '2024-02-15',
      endDate: '2025-02-14',
      amount: 5899,
      frequency: 'Monthly',
      status: 'Active',
      description: 'Complete property maintenance and management services',
      nextDue: '2024-06-15',
      documents: [
        { id: 4, name: 'Service Agreement', type: 'PDF', size: '1.8 MB', date: '2024-02-15', url: '/docs/service-agreement.pdf' },
        { id: 5, name: 'Service Reports (Feb-May)', type: 'PDF', size: '3.2 MB', date: '2024-05-31', url: '/docs/service-reports.pdf' },
      ],
      icon: <Briefcase size={24} />
    },
    {
      id: 3,
      type: 'legal',
      serviceName: 'Legal Documentation Service',
      provider: 'Adv. Priya Sharma - Legal Consultant',
      startDate: '2024-03-10',
      endDate: '2024-03-25',
      amount: 15000,
      frequency: 'One-time',
      status: 'Completed',
      description: 'Property purchase legal verification and documentation',
      documents: [
        { id: 6, name: 'Title Deed Verification Report', type: 'PDF', size: '2.7 MB', date: '2024-03-20', url: '/docs/title-verification.pdf' },
        { id: 7, name: 'NOC Documents', type: 'PDF', size: '1.5 MB', date: '2024-03-22', url: '/docs/noc-documents.pdf' },
        { id: 8, name: 'Sale Agreement Draft', type: 'PDF', size: '2.1 MB', date: '2024-03-25', url: '/docs/sale-agreement.pdf' },
      ],
      icon: <FileText size={24} />
    },
    {
      id: 4,
      type: 'maintenance',
      serviceName: 'Plumbing Repair Service',
      provider: 'QuickFix Home Services',
      startDate: '2024-04-28',
      endDate: '2024-04-28',
      amount: 1200,
      frequency: 'One-time',
      status: 'Completed',
      description: 'Kitchen pipe leakage repair',
      documents: [
        { id: 9, name: 'Service Invoice', type: 'PDF', size: '0.8 MB', date: '2024-04-28', url: '/docs/plumbing-invoice.pdf' },
        { id: 10, name: 'Before-After Photos', type: 'ZIP', size: '5.2 MB', date: '2024-04-28', url: '/docs/plumbing-photos.zip' },
      ],
      icon: <Package size={24} />
    }
  ];

  // Comprehensive Payment History
  const payments = [
    { 
      id: 1, 
      title: 'Full Service Plan', 
      type: 'plan',
      amount: 5899, 
      date: '2024-05-10', 
      status: 'Completed',
      description: 'Monthly Subscription',
      method: 'Credit Card',
      transactionId: 'TXN987654321',
      serviceId: 2,
      icon: <ShieldCheck size={20} />
    },
    { 
      id: 2, 
      title: 'Monthly Rent - Sea View Apartment', 
      type: 'rent',
      amount: 45000, 
      date: '2024-05-01', 
      status: 'Completed',
      description: 'Rent for May 2024',
      method: 'UPI AutoPay',
      transactionId: 'TXN123456789',
      serviceId: 1,
      icon: <Home size={20} />
    },
    { 
      id: 3, 
      title: 'Plumbing Service', 
      type: 'service',
      amount: 1200, 
      date: '2024-04-28', 
      status: 'Completed',
      description: 'Pipe Leakage Repair',
      method: 'Credit Card',
      transactionId: 'TXN741852963',
      serviceId: 4,
      icon: <Briefcase size={20} />
    },
    { 
      id: 4, 
      title: 'Legal Documentation', 
      type: 'service',
      amount: 15000, 
      date: '2024-03-25', 
      status: 'Completed',
      description: 'Property Legal Verification',
      method: 'Net Banking',
      transactionId: 'TXN963852741',
      serviceId: 3,
      icon: <FileText size={20} />
    },
    { 
      id: 5, 
      title: 'Premium Cement - 50 Bags', 
      type: 'product',
      amount: 19250, 
      date: '2024-04-25', 
      status: 'Completed',
      description: 'Marketplace Purchase',
      method: 'Net Banking',
      transactionId: 'TXN963852742',
      icon: <ShoppingCart size={20} />
    },
    { 
      id: 6, 
      title: 'Electrician Service', 
      type: 'service',
      amount: 800, 
      date: '2024-05-15', 
      status: 'Pending',
      description: 'Wiring Check',
      method: '-',
      transactionId: '-',
      icon: <Briefcase size={20} />
    },
  ];

  // All Documents from all services
  const allDocuments = userServices.reduce((docs, service) => {
    return [...docs, ...service.documents.map(doc => ({
      ...doc,
      serviceType: service.type,
      serviceName: service.serviceName
    }))];
  }, []);

  const filteredPayments = activeTab === 'all' 
    ? payments 
    : payments.filter(p => p.type === activeTab);

  const handleViewService = (serviceId) => {
    const service = userServices.find(s => s.id === serviceId);
    setSelectedService(service);
  };

  const handleDownloadDocument = (doc) => {
    // In production, this would trigger actual file download
    console.log('Downloading:', doc.name);
    alert(`Downloading: ${doc.name}`);
  };

  const handleViewDocument = (doc) => {
    // In production, this would open document viewer
    console.log('Viewing:', doc.name);
    alert(`Opening: ${doc.name}`);
  };

  return (
    <div className="dashboard-payments-page" style={{ display: 'flex', gap: '1.5rem' }}>
      
      {/* Main Content Area */}
      <div style={{ flex: 1 }}>
        {/* Page Header */}
        <div className="client-page-header" style={{ marginBottom: '1.5rem' }}>
          <h1 style={{ margin: '0 0 0.25rem 0', fontSize: '1.75rem', color: '#111827', fontWeight: 'bold', fontFamily: 'Poppins, sans-serif' }}>
            Payments & Billing
          </h1>
          <p style={{ margin: 0, color: '#6b7280', fontSize: '0.9rem' }}>
            Manage your subscriptions, view service details, and access all documents
          </p>
        </div>

        {/* Service Detail Modal */}
        {selectedService && (
          <div style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              maxWidth: '700px',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'auto',
              boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'
            }}>
              {/* Modal Header */}
              <div style={{
                padding: '24px',
                borderBottom: '1px solid #e5e7eb',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'start'
              }}>
                <div>
                  <h2 style={{ margin: '0 0 8px 0', fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>
                    Service Details
                  </h2>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {selectedService.icon}
                    <span style={{ fontSize: '1.1rem', fontWeight: '600', color: '#374151' }}>
                      {selectedService.serviceName}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedService(null)}
                  style={{
                    padding: '8px',
                    border: 'none',
                    background: '#f3f4f6',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: '#6b7280'
                  }}
                >
                  ×
                </button>
              </div>

              {/* Modal Body */}
              <div style={{ padding: '24px' }}>
                {/* Service Info Grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '16px',
                  marginBottom: '24px',
                  padding: '16px',
                  backgroundColor: '#f9fafb',
                  borderRadius: '8px'
                }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '4px', fontWeight: '600' }}>
                      SERVICE PROVIDER
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#111827', fontWeight: '500' }}>
                      <User size={16} />
                      {selectedService.provider}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '4px', fontWeight: '600' }}>
                      AMOUNT
                    </div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#059669' }}>
                      ₹{selectedService.amount.toLocaleString('en-IN')}
                      <span style={{ fontSize: '0.875rem', fontWeight: 'normal', color: '#6b7280', marginLeft: '4px' }}>
                        / {selectedService.frequency}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '4px', fontWeight: '600' }}>
                      START DATE
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#111827' }}>
                      <Calendar size={16} />
                      {new Date(selectedService.startDate).toLocaleDateString('en-IN')}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '4px', fontWeight: '600' }}>
                      {selectedService.status === 'Active' ? 'NEXT DUE' : 'END DATE'}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#111827' }}>
                      <Calendar size={16} />
                      {selectedService.status === 'Active' 
                        ? new Date(selectedService.nextDue).toLocaleDateString('en-IN')
                        : new Date(selectedService.endDate).toLocaleDateString('en-IN')
                      }
                    </div>
                  </div>
                  {selectedService.propertyAddress && (
                    <div style={{ gridColumn: '1 / -1' }}>
                      <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '4px', fontWeight: '600' }}>
                        PROPERTY ADDRESS
                      </div>
                      <div style={{ display: 'flex', alignItems: 'start', gap: '6px', color: '#111827' }}>
                        <MapPin size={16} style={{ marginTop: '2px', flexShrink: 0 }} />
                        {selectedService.propertyAddress}
                      </div>
                    </div>
                  )}
                  {selectedService.description && (
                    <div style={{ gridColumn: '1 / -1' }}>
                      <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '4px', fontWeight: '600' }}>
                        DESCRIPTION
                      </div>
                      <div style={{ color: '#374151' }}>
                        {selectedService.description}
                      </div>
                    </div>
                  )}
                </div>

                {/* Status Badge */}
                <div style={{ marginBottom: '24px' }}>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    backgroundColor: selectedService.status === 'Active' ? '#d1fae5' : '#e5e7eb',
                    color: selectedService.status === 'Active' ? '#059669' : '#6b7280'
                  }}>
                    {selectedService.status === 'Active' ? <CheckCircle size={14} /> : <Clock size={14} />}
                    {selectedService.status}
                  </span>
                </div>

                {/* Documents Section */}
                <div>
                  <h3 style={{ margin: '0 0 16px 0', fontSize: '1.125rem', fontWeight: 'bold', color: '#111827' }}>
                    Related Documents ({selectedService.documents.length})
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {selectedService.documents.map(doc => (
                      <div
                        key={doc.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '12px',
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                          backgroundColor: '#fff'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                          <div style={{
                            width: '40px',
                            height: '40px',
                            backgroundColor: '#fef3c7',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <FileText size={20} className="text-yellow-700" />
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: '600', color: '#111827', marginBottom: '2px' }}>
                              {doc.name}
                            </div>
                            <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                              {doc.type} • {doc.size} • {new Date(doc.date).toLocaleDateString('en-IN')}
                            </div>
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            onClick={() => handleViewDocument(doc)}
                            style={{
                              padding: '8px 12px',
                              border: '1px solid #d1d5db',
                              background: 'white',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                              fontSize: '0.875rem',
                              fontWeight: '500',
                              color: '#374151'
                            }}
                          >
                            <Eye size={14} />
                            View
                          </button>
                          <button
                            onClick={() => handleDownloadDocument(doc)}
                            style={{
                              padding: '8px 12px',
                              border: 'none',
                              background: '#059669',
                              color: 'white',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                              fontSize: '0.875rem',
                              fontWeight: '500'
                            }}
                          >
                            <Download size={14} />
                            Download
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Active Services Section */}
        <div className="client-card" style={{ marginBottom: '1.5rem' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '1rem'
          }}>
            <h3 className="section-title" style={{ margin: 0 }}>Your Active Services</h3>
            <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
              {userServices.filter(s => s.status === 'Active').length} Active
            </span>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {userServices.filter(s => s.status === 'Active').map(service => (
              <div
                key={service.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  backgroundColor: '#fafafa'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    backgroundColor: '#d1fae5',
                    color: '#059669',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {service.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '1rem', fontWeight: '600', color: '#111827' }}>
                      {service.serviceName}
                    </h4>
                    <p style={{ margin: '0 0 4px 0', fontSize: '0.875rem', color: '#6b7280' }}>
                      {service.provider}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.75rem', color: '#6b7280' }}>
                      <span>₹{service.amount.toLocaleString('en-IN')} / {service.frequency}</span>
                      <span>•</span>
                      <span>Next Due: {new Date(service.nextDue).toLocaleDateString('en-IN')}</span>
                      <span>•</span>
                      <span>{service.documents.length} Documents</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleViewService(service.id)}
                  style={{
                    padding: '8px 16px',
                    border: '1px solid #059669',
                    background: 'white',
                    color: '#059669',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  View Details
                  <ChevronRight size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Payments */}
        <div className="client-card upcoming-payments-card">
          <h3 className="section-title">Upcoming Payments</h3>
          <div className="upcoming-payments-list">
            <div className="upcoming-payment-row">
              <div className="upcoming-payment-main">
                <div className="upcoming-icon" style={{ background: '#dbeafe', color: '#3b82f6' }}>
                  <Home size={22} />
                </div>
                <div className="upcoming-details">
                  <h4>Monthly Rent</h4>
                  <p>Due on June 1, 2024</p>
                </div>
              </div>
              <div className="upcoming-right">
                <div className="upcoming-amount">₹45,000</div>
                <button className="pay-now-btn">Pay Now</button>
              </div>
            </div>
            
            <div className="upcoming-payment-row">
              <div className="upcoming-payment-main">
                <div className="upcoming-icon" style={{ background: '#d1fae5', color: '#059669' }}>
                  <ShieldCheck size={22} />
                </div>
                <div className="upcoming-details">
                  <h4>Full Service Plan</h4>
                  <p>Due on June 10, 2024</p>
                </div>
              </div>
              <div className="upcoming-right">
                <div className="upcoming-amount">₹5,899</div>
                <button className="pay-now-btn">Pay Now</button>
              </div>
            </div>
          </div>
        </div>

        {/* AutoPay Setup Card */}
        <div className="client-card payments-autopay" style={{ marginTop: '1.5rem' }}>
          <h3>AutoPay Settings</h3>
          <p className="autopay-desc">Never miss a payment. Set up automatic deductions for rent and recurring services.</p>
          
          <div className="autopay-option">
            <div className="autopay-option-info">
              <div className="autopay-icon"><Home size={18} /></div>
              <div>
                <h4>Monthly Rent</h4>
                <p>Auto-pay rent on the 1st of every month</p>
              </div>
            </div>
            <label className="toggle-switch">
              <input type="checkbox" checked={autoPayRent} onChange={() => setAutoPayRent(!autoPayRent)} />
              <span className="slider round"></span>
            </label>
          </div>

          <div className="autopay-option">
            <div className="autopay-option-info">
              <div className="autopay-icon"><Repeat size={18} /></div>
              <div>
                <h4>Recurring Services</h4>
                <p>Auto-pay for scheduled maintenance</p>
              </div>
            </div>
            <label className="toggle-switch">
              <input type="checkbox" checked={autoPayService} onChange={() => setAutoPayService(!autoPayService)} />
              <span className="slider round"></span>
            </label>
          </div>
        </div>

        {/* Unified Transaction Table */}
        <div className="client-card payments-history-card" style={{ marginTop: '1.5rem' }}>
          <div className="payments-history-header">
            <h2>Transaction History</h2>
            <div className="payment-filters">
              <button className={activeTab === 'all' ? 'active' : ''} onClick={() => setActiveTab('all')}>All</button>
              <button className={activeTab === 'plan' ? 'active' : ''} onClick={() => setActiveTab('plan')}>Plans</button>
              <button className={activeTab === 'rent' ? 'active' : ''} onClick={() => setActiveTab('rent')}>Rent</button>
              <button className={activeTab === 'service' ? 'active' : ''} onClick={() => setActiveTab('service')}>Services</button>
              <button className={activeTab === 'product' ? 'active' : ''} onClick={() => setActiveTab('product')}>Marketplace</button>
            </div>
          </div>
          
          <div className="payments-table">
            {filteredPayments.map((payment) => (
              <div key={payment.id} className="payment-row">
                <div className="payment-main">
                  <div className="payment-icon-wrapper" data-type={payment.type}>
                    {payment.icon}
                  </div>
                  <div className="payment-details">
                    <h4>{payment.title}</h4>
                    <p className="payment-property">{payment.description}</p>
                    <div className="payment-meta">
                      <span>{new Date(payment.date).toLocaleDateString('en-IN')}</span>
                      <span>•</span>
                      <span>{payment.method}</span>
                      {payment.transactionId !== '-' && (
                        <>
                          <span>•</span>
                          <span className="transaction-id">ID: {payment.transactionId}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="payment-right">
                  <div className="payment-amount">₹{payment.amount.toLocaleString('en-IN')}</div>
                  <div className={`payment-status ${payment.status.toLowerCase()}`}>
                    {payment.status === 'Completed' ? <CheckCircle size={14} /> : (payment.status === 'Failed' ? <XCircle size={14} /> : <Clock size={14} />)}
                    {payment.status}
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {payment.serviceId && (
                      <button 
                        onClick={() => handleViewService(payment.serviceId)}
                        className="download-btn" 
                        title="View Service Details"
                        style={{ marginRight: '4px' }}
                      >
                        <ExternalLink size={16} />
                      </button>
                    )}
                    <button className="download-btn" title="Download Invoice">
                      <Download size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {filteredPayments.length === 0 && (
              <div className="no-payments">
                <p>No transactions found for this category.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Documents Sidebar */}
      <div style={{ 
        width: '320px', 
        flexShrink: 0,
        position: 'sticky',
        top: '20px',
        height: 'fit-content'
      }}>
        <div className="client-card" style={{ padding: '20px' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            marginBottom: '16px'
          }}>
            <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 'bold', color: '#111827' }}>
              My Documents
            </h3>
            <span style={{
              backgroundColor: '#059669',
              color: 'white',
              padding: '2px 8px',
              borderRadius: '12px',
              fontSize: '0.75rem',
              fontWeight: 'bold'
            }}>
              {allDocuments.length}
            </span>
          </div>

          <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '16px' }}>
            All your service-related documents in one place
          </p>

          {/* Documents List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '600px', overflowY: 'auto' }}>
            {allDocuments.map(doc => (
              <div
                key={doc.id}
                style={{
                  padding: '12px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  backgroundColor: '#fafafa',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.borderColor = '#059669'}
                onMouseOut={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}
              >
                <div style={{ display: 'flex', alignItems: 'start', gap: '10px', marginBottom: '8px' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    backgroundColor: '#fef3c7',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <FileText size={16} style={{ color: '#f59e0b' }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      color: '#111827',
                      marginBottom: '2px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {doc.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '4px' }}>
                      {doc.serviceName}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: '#9ca3af' }}>
                      {doc.type} • {doc.size}
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '6px', marginTop: '8px' }}>
                  <button
                    onClick={() => handleViewDocument(doc)}
                    style={{
                      flex: 1,
                      padding: '6px',
                      border: '1px solid #d1d5db',
                      background: 'white',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '0.75rem',
                      fontWeight: '500',
                      color: '#374151',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px'
                    }}
                  >
                    <Eye size={12} />
                    View
                  </button>
                  <button
                    onClick={() => handleDownloadDocument(doc)}
                    style={{
                      flex: 1,
                      padding: '6px',
                      border: 'none',
                      background: '#059669',
                      color: 'white',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '0.75rem',
                      fontWeight: '500',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px'
                    }}
                  >
                    <Download size={12} />
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>

          {allDocuments.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '24px',
              color: '#6b7280',
              fontSize: '0.875rem'
            }}>
              <FileText size={32} style={{ margin: '0 auto 8px', opacity: 0.5 }} />
              <p>No documents yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
