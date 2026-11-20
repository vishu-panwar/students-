import { useState } from 'react';

export default function DashboardPayments() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [autopayEnabled, setAutopayEnabled] = useState(true);
  const [showAutopayModal, setShowAutopayModal] = useState(false);

  // Upcoming payments for buyer
  const upcomingPayments = [
    {
      id: 1,
      type: 'rent',
      property: '2BHK Apartment, Andheri West',
      amount: 25000,
      dueDate: '1st Dec 2026',
      daysLeft: 12,
      landlord: 'Mr. Rajesh Kumar',
      autopay: true,
      recurring: true
    },
    {
      id: 2,
      type: 'maintenance',
      property: '2BHK Apartment, Andheri West',
      amount: 3500,
      dueDate: '5th Dec 2026',
      daysLeft: 16,
      landlord: 'Society Maintenance',
      autopay: true,
      recurring: true
    },
    {
      id: 3,
      type: 'pg_rent',
      property: 'PG Accommodation, Powai',
      amount: 12000,
      dueDate: '28th Nov 2026',
      daysLeft: 9,
      landlord: 'Comfort Living PG',
      autopay: false,
      recurring: true
    }
  ];

  // Transaction history for buyer
  const transactionHistory = [
    {
      id: 'PAY20241115001',
      type: 'rent',
      property: '2BHK Apartment, Andheri West',
      amount: 25000,
      status: 'completed',
      date: '1st Nov 2026',
      method: 'Autopay - UPI',
      landlord: 'Mr. Rajesh Kumar'
    },
    {
      id: 'PAY20241015002',
      type: 'maintenance',
      property: '2BHK Apartment, Andheri West',
      amount: 3500,
      status: 'completed',
      date: '5th Nov 2026',
      method: 'Autopay - UPI',
      landlord: 'Society Maintenance'
    },
    {
      id: 'PAY20241028003',
      type: 'pg_rent',
      property: 'PG Accommodation, Powai',
      amount: 12000,
      status: 'completed',
      date: '28th Oct 2026',
      method: 'UPI Manual',
      landlord: 'Comfort Living PG'
    },
    {
      id: 'PAY20241012004',
      type: 'security_deposit',
      property: 'Commercial Space, BKC',
      amount: 150000,
      status: 'completed',
      date: '12th Oct 2026',
      method: 'Bank Transfer',
      landlord: 'Prime Properties Ltd'
    },
    {
      id: 'PAY20241001005',
      type: 'rent',
      property: '2BHK Apartment, Andheri West',
      amount: 25000,
      status: 'completed',
      date: '1st Oct 2026',
      method: 'Autopay - UPI',
      landlord: 'Mr. Rajesh Kumar'
    }
  ];

  // Payment methods
  const paymentMethods = [
    {
      id: 1,
      type: 'upi',
      name: 'UPI Autopay',
      identifier: 'rahul@paytm',
      isPrimary: true,
      isAutopay: true,
      icon: 'credit_card'
    },
    {
      id: 2,
      type: 'card',
      name: 'HDFC Debit Card',
      identifier: '•••• 8745',
      isPrimary: false,
      isAutopay: false,
      icon: 'credit_card'
    },
    {
      id: 3,
      type: 'bank',
      name: 'HDFC Bank Account',
      identifier: 'HDFC ••••8745',
      isPrimary: false,
      isAutopay: false,
      icon: 'account_balance'
    }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'bg-[#d4f5e9] text-[#004c22]';
      case 'pending': return 'bg-[#fff3cd] text-[#856404]';
      case 'failed': return 'bg-[#fce4d6] text-[#dc3545]';
      default: return 'bg-[#e9ecef] text-[#495057]';
    }
  };

  const getTypeLabel = (type) => {
    const labels = {
      rent: 'Monthly Rent',
      maintenance: 'Maintenance',
      pg_rent: 'PG Rent',
      security_deposit: 'Security Deposit'
    };
    return labels[type] || type;
  };

  return (
    <div className="min-h-screen bg-[#fff8f5]">
      <div className="max-w-[1400px] mx-auto p-6">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-4">
          <span className="text-[#6c757d]">Home</span>
          <span className="material-symbols-outlined text-[14px] text-[#6c757d]">chevron_right</span>
          <span className="text-[#004c22] font-medium">Payments & Billing</span>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-[28px] font-bold text-[#1a1a1a] mb-1">Payments & Billing</h1>
            <p className="text-[#6c757d] text-[14px]">Manage rent autopay, upcoming payments, and transaction history</p>
          </div>
          <button className="px-5 py-2 bg-[#004c22] text-white rounded-lg text-sm font-medium hover:bg-[#003818] transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">download</span>
            Download Statement
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-[#dee2e6] p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[#6c757d] text-[13px] font-medium">TOTAL SPENT</span>
              <span className="material-symbols-outlined text-[20px] text-[#004c22]">payments</span>
            </div>
            <div className="text-[28px] font-bold text-[#1a1a1a] mb-1">₹2,27,500</div>
            <div className="text-[12px] text-[#6c757d]">Last 6 months</div>
          </div>

          <div className="bg-white rounded-xl border border-[#dee2e6] p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[#6c757d] text-[13px] font-medium">UPCOMING PAYMENTS</span>
              <span className="material-symbols-outlined text-[20px] text-[#dc3545]">schedule</span>
            </div>
            <div className="text-[28px] font-bold text-[#1a1a1a] mb-1">₹40,500</div>
            <div className="text-[12px] text-[#6c757d]">Due in next 30 days</div>
          </div>

          <div className="bg-white rounded-xl border border-[#dee2e6] p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[#6c757d] text-[13px] font-medium">AUTOPAY STATUS</span>
              <span className="material-symbols-outlined text-[20px] text-[#28a745]">verified</span>
            </div>
            <div className="text-[28px] font-bold text-[#1a1a1a] mb-1">Active</div>
            <div className="text-[12px] text-[#28a745]">2 payments automated</div>
          </div>

          <div className="bg-white rounded-xl border border-[#dee2e6] p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[#6c757d] text-[13px] font-medium">SAVED CARDS</span>
              <span className="material-symbols-outlined text-[20px] text-[#004c22]">credit_card</span>
            </div>
            <div className="text-[28px] font-bold text-[#1a1a1a] mb-1">3</div>
            <div className="text-[12px] text-[#6c757d]">Payment methods</div>
          </div>
        </div>

        {/* Rent Autopay Setup */}
        <div className="bg-gradient-to-br from-[#004c22] to-[#003818] rounded-xl p-6 mb-6 text-white">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="material-symbols-outlined text-[32px]">autorenew</span>
                <div>
                  <h2 className="text-[20px] font-bold mb-1">Rent Autopay</h2>
                  <p className="text-[13px] opacity-90">Never miss a rent payment with automated monthly transfers</p>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${autopayEnabled ? 'bg-[#28a745]' : 'bg-[#dc3545]'}`}></span>
                  <span className="text-[14px] font-medium">{autopayEnabled ? 'Enabled' : 'Disabled'}</span>
                </div>
                <span className="opacity-50">•</span>
                <span className="text-[13px] opacity-90">Next: 1st Dec 2026 - ₹28,500</span>
              </div>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowAutopayModal(true)}
                className="px-4 py-2 bg-white/10 border border-white/30 rounded-lg text-[13px] font-medium hover:bg-white/20 transition-colors"
              >
                Configure
              </button>
              <button 
                onClick={() => setAutopayEnabled(!autopayEnabled)}
                className="px-4 py-2 bg-white text-[#004c22] rounded-lg text-[13px] font-medium hover:bg-[#f8f9fa] transition-colors"
              >
                {autopayEnabled ? 'Disable' : 'Enable'}
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Tabs */}
        <div className="bg-white rounded-xl border border-[#dee2e6] p-6 mb-6">
          
          {/* Tabs */}
          <div className="flex items-center gap-2 mb-6 border-b border-[#dee2e6]">
            {[
              { id: 'upcoming', label: 'Upcoming Payments', icon: 'schedule' },
              { id: 'history', label: 'Transaction History', icon: 'history' },
              { id: 'methods', label: 'Payment Methods', icon: 'credit_card' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-[13px] font-medium transition-colors relative flex items-center gap-2 ${
                  activeTab === tab.id 
                    ? 'text-[#004c22]' 
                    : 'text-[#6c757d] hover:text-[#1a1a1a]'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#004c22]"></div>
                )}
              </button>
            ))}
          </div>

          {/* Upcoming Payments Tab */}
          {activeTab === 'upcoming' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[16px] font-bold text-[#1a1a1a]">Scheduled Payments</h3>
                <span className="text-[12px] text-[#6c757d]">{upcomingPayments.length} payments due</span>
              </div>
              {upcomingPayments.map(payment => (
                <div key={payment.id} className="bg-[#fff8f5] border border-[#dee2e6] rounded-lg p-5 hover:border-[#004c22] transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center border border-[#dee2e6]">
                        <span className="material-symbols-outlined text-[24px] text-[#004c22]">
                          {payment.type === 'rent' ? 'home' : payment.type === 'maintenance' ? 'build' : 'bed'}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-[#1a1a1a] text-[15px]">{getTypeLabel(payment.type)}</span>
                          {payment.autopay && (
                            <span className="px-2 py-0.5 bg-[#d4f5e9] text-[#004c22] text-[10px] font-bold rounded flex items-center gap-1">
                              <span className="material-symbols-outlined text-[12px]">autorenew</span>
                              AUTOPAY
                            </span>
                          )}
                          {payment.recurring && (
                            <span className="px-2 py-0.5 bg-[#e9ecef] text-[#495057] text-[10px] font-bold rounded">
                              RECURRING
                            </span>
                          )}
                        </div>
                        <div className="text-[14px] text-[#495057] mb-2">{payment.property}</div>
                        <div className="flex items-center gap-3 text-[12px] text-[#6c757d]">
                          <span>Payee: {payment.landlord}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-[#1a1a1a] text-[18px] mb-1">₹{payment.amount.toLocaleString()}</div>
                      <div className="text-[12px] text-[#495057] mb-1">Due: {payment.dueDate}</div>
                      <div className={`text-[11px] font-medium ${
                        payment.daysLeft <= 7 ? 'text-[#dc3545]' : payment.daysLeft <= 15 ? 'text-[#856404]' : 'text-[#28a745]'
                      }`}>
                        {payment.daysLeft} days left
                      </div>
                    </div>
                  </div>
                  {!payment.autopay && (
                    <div className="mt-4 pt-4 border-t border-[#dee2e6] flex items-center justify-between">
                      <button className="px-4 py-2 bg-white border border-[#dee2e6] rounded-lg text-[#495057] text-[13px] font-medium hover:bg-[#f8f9fa] transition-colors">
                        Enable Autopay
                      </button>
                      <button className="px-4 py-2 bg-[#004c22] text-white rounded-lg text-[13px] font-medium hover:bg-[#003818] transition-colors">
                        Pay Now
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Transaction History Tab */}
          {activeTab === 'history' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[16px] font-bold text-[#1a1a1a]">Payment History</h3>
                <div className="flex gap-2">
                  <select className="px-3 py-1.5 bg-[#f8f9fa] border border-[#dee2e6] rounded-lg text-[13px] font-medium text-[#495057]">
                    <option>Last 6 months</option>
                    <option>Last 3 months</option>
                    <option>This year</option>
                    <option>All time</option>
                  </select>
                  <button className="px-3 py-1.5 bg-[#f8f9fa] border border-[#dee2e6] rounded-lg text-[13px] font-medium text-[#495057] hover:bg-[#e9ecef] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px]">filter_list</span>
                    Filter
                  </button>
                </div>
              </div>
              {transactionHistory.map(txn => (
                <div key={txn.id} className="bg-[#fff8f5] border border-[#dee2e6] rounded-lg p-4 hover:border-[#004c22] transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-[#dee2e6]">
                        <span className="material-symbols-outlined text-[20px] text-[#004c22]">
                          {txn.type === 'rent' ? 'home' : txn.type === 'maintenance' ? 'build' : txn.type === 'pg_rent' ? 'bed' : 'security'}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-[#1a1a1a] text-[14px] mb-0.5">{getTypeLabel(txn.type)}</div>
                        <div className="text-[13px] text-[#6c757d] mb-1">{txn.property}</div>
                        <div className="flex items-center gap-2 text-[11px] text-[#6c757d]">
                          <span>{txn.id}</span>
                          <span>•</span>
                          <span>{txn.landlord}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div className="font-bold text-[#1a1a1a] text-[15px] mb-1">₹{txn.amount.toLocaleString()}</div>
                        <div className="text-[11px] text-[#6c757d]">{txn.method}</div>
                      </div>
                      <div className="text-right min-w-[90px]">
                        <div className="text-[12px] text-[#495057] mb-1">{txn.date}</div>
                        <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${getStatusColor(txn.status)}`}>
                          {txn.status.toUpperCase()}
                        </span>
                      </div>
                      <button className="p-2 hover:bg-white rounded-lg transition-colors">
                        <span className="material-symbols-outlined text-[18px] text-[#6c757d]">download</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Payment Methods Tab */}
          {activeTab === 'methods' && (
            <div>
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-[16px] font-bold text-[#1a1a1a]">Saved Payment Methods</h3>
                <button className="px-4 py-2 bg-[#004c22] text-white rounded-lg text-[13px] font-medium hover:bg-[#003818] transition-colors flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]">add</span>
                  Add Payment Method
                </button>
              </div>
              <div className="space-y-3">
                {paymentMethods.map(method => (
                  <div key={method.id} className="bg-[#fff8f5] border border-[#dee2e6] rounded-lg p-5 hover:border-[#004c22] transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center border border-[#dee2e6]">
                          <span className="material-symbols-outlined text-[24px] text-[#004c22]">{method.icon}</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-[#1a1a1a] text-[15px]">{method.name}</span>
                            {method.isPrimary && (
                              <span className="px-2 py-0.5 bg-[#004c22] text-white text-[10px] font-bold rounded">
                                PRIMARY
                              </span>
                            )}
                            {method.isAutopay && (
                              <span className="px-2 py-0.5 bg-[#d4f5e9] text-[#004c22] text-[10px] font-bold rounded flex items-center gap-1">
                                <span className="material-symbols-outlined text-[12px]">autorenew</span>
                                AUTOPAY
                              </span>
                            )}
                          </div>
                          <div className="text-[13px] text-[#6c757d]">{method.identifier}</div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {!method.isPrimary && (
                          <button className="px-3 py-1.5 bg-white border border-[#dee2e6] rounded-lg text-[#495057] text-[12px] font-medium hover:bg-[#f8f9fa] transition-colors">
                            Set as Primary
                          </button>
                        )}
                        <button className="px-3 py-1.5 bg-white border border-[#dee2e6] rounded-lg text-[#495057] text-[12px] font-medium hover:bg-[#f8f9fa] transition-colors">
                          Edit
                        </button>
                        <button className="p-2 hover:bg-white rounded-lg transition-colors">
                          <span className="material-symbols-outlined text-[18px] text-[#dc3545]">delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Bank Account */}
              <div className="mt-6 p-5 bg-[#f8f9fa] border border-dashed border-[#dee2e6] rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <span className="material-symbols-outlined text-[24px] text-[#6c757d]">info</span>
                  <div>
                    <div className="text-[14px] font-bold text-[#1a1a1a] mb-1">Add Bank Account for Autopay</div>
                    <div className="text-[12px] text-[#6c757d]">Link your bank account to enable automatic rent payments and get cashback rewards</div>
                  </div>
                </div>
                <button className="px-4 py-2 bg-white border border-[#dee2e6] rounded-lg text-[#495057] text-[13px] font-medium hover:bg-[#f8f9fa] transition-colors">
                  Link Bank Account
                </button>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Autopay Configuration Modal */}
      {showAutopayModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-[500px] w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[20px] font-bold text-[#1a1a1a]">Configure Autopay</h3>
              <button onClick={() => setShowAutopayModal(false)} className="p-2 hover:bg-[#f8f9fa] rounded-lg">
                <span className="material-symbols-outlined text-[24px] text-[#6c757d]">close</span>
              </button>
            </div>
            <p className="text-[13px] text-[#6c757d] mb-6">Set up automatic rent payments for your properties</p>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="text-[12px] font-medium text-[#495057] mb-2 block">Select Property</label>
                <select className="w-full px-4 py-3 bg-[#f8f9fa] border border-[#dee2e6] rounded-lg text-[14px]">
                  <option>2BHK Apartment, Andheri West</option>
                  <option>PG Accommodation, Powai</option>
                </select>
              </div>
              <div>
                <label className="text-[12px] font-medium text-[#495057] mb-2 block">Payment Method</label>
                <select className="w-full px-4 py-3 bg-[#f8f9fa] border border-[#dee2e6] rounded-lg text-[14px]">
                  <option>UPI Autopay - rahul@paytm</option>
                  <option>HDFC Debit Card ••••8745</option>
                  <option>HDFC Bank Account ••••8745</option>
                </select>
              </div>
              <div>
                <label className="text-[12px] font-medium text-[#495057] mb-2 block">Payment Date</label>
                <select className="w-full px-4 py-3 bg-[#f8f9fa] border border-[#dee2e6] rounded-lg text-[14px]">
                  <option>1st of every month</option>
                  <option>5th of every month</option>
                  <option>10th of every month</option>
                  <option>15th of every month</option>
                </select>
              </div>
            </div>

            <div className="bg-[#fff8f5] border border-[#dee2e6] rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[20px] text-[#004c22]">info</span>
                <div className="text-[12px] text-[#495057]">
                  Amount will be automatically debited on the selected date. You'll receive a notification 2 days before each payment.
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => setShowAutopayModal(false)}
                className="flex-1 px-4 py-3 bg-[#f8f9fa] border border-[#dee2e6] rounded-lg text-[#495057] text-[14px] font-medium hover:bg-[#e9ecef] transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  setAutopayEnabled(true);
                  setShowAutopayModal(false);
                }}
                className="flex-1 px-4 py-3 bg-[#004c22] text-white rounded-lg text-[14px] font-medium hover:bg-[#003818] transition-colors"
              >
                Enable Autopay
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
