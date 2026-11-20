import { useState } from 'react';

export default function SellerPayments() {
  const [selectedChannel, setSelectedChannel] = useState('escrow');

  return (
    <div className="min-h-screen bg-[#fff8f5]">
      <div className="max-w-[1400px] mx-auto p-6">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[13px] text-[#6c757d] mb-4">
          <span>Seller Workspace</span>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span>Finance Engine</span>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-[#1a1a1a] font-medium">Payments Overview</span>
        </div>

        {/* Header Section */}
        <div className="bg-[#f6ece6] rounded-xl p-6 mb-6 border border-[#dee2e6]">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-[28px] font-bold text-[#1a1a1a] mb-2">Unified Payments & Settlements Portal</h1>
              <p className="text-[14px] text-[#6c757d] max-w-3xl">
                Track escrow milestones for property sales, manage wholesale material dispatches with instant settlements, and access GST-compliant invoices.
              </p>
            </div>
            <div className="flex items-center gap-3 bg-white rounded-lg p-3 border border-[#dee2e6]">
              <span className="material-symbols-outlined text-[20px] text-[#004c22]">verified</span>
              <div className="text-right">
                <div className="text-[13px] font-bold text-[#1a1a1a]">Shree Krishna Properties & Infra</div>
                <div className="text-[11px] text-[#6c757d]">GSTIN Active • UPRERAPR1842 • Mathura Cluster (Zone 04)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Channel Cards - 3 Columns */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          
          {/* Channel 01 - Escrow & Milestones */}
          <div 
            onClick={() => setSelectedChannel('escrow')}
            className={`bg-white rounded-xl p-5 border-2 cursor-pointer transition-all hover:shadow-md ${
              selectedChannel === 'escrow' ? 'border-[#004c22]' : 'border-[#dee2e6]'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-[#d4f5e9] rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px] text-[#004c22]">shield</span>
              </div>
              <span className="text-[11px] font-bold text-[#6c757d] bg-[#f6ece6] px-2 py-1 rounded">Channel 01</span>
            </div>
            <h3 className="text-[16px] font-bold text-[#1a1a1a] mb-2 flex items-center gap-2">
              Escrow Protection
              {selectedChannel === 'escrow' && <span className="material-symbols-outlined text-[18px] text-[#004c22]">check_circle</span>}
            </h3>
            <p className="text-[13px] text-[#6c757d] mb-4">
              Safe milestone-based releases for residential property sales & PG booking advances with RERA compliance.
            </p>
            <div className="flex items-center gap-4 pt-3 border-t border-[#f6ece6]">
              <div className="flex items-center gap-1.5 text-[12px] text-[#6c757d]">
                <span className="material-symbols-outlined text-[16px]">verified_user</span>
                <span>RERA Protected</span>
              </div>
              <div className="flex items-center gap-1.5 text-[12px] text-[#6c757d]">
                <span className="material-symbols-outlined text-[16px]">schedule</span>
                <span>Auto Release</span>
              </div>
            </div>
          </div>

          {/* Channel 02 - Direct Payouts */}
          <div 
            onClick={() => setSelectedChannel('payouts')}
            className={`bg-white rounded-xl p-5 border-2 cursor-pointer transition-all hover:shadow-md ${
              selectedChannel === 'payouts' ? 'border-[#004c22]' : 'border-[#dee2e6]'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-[#d4f5e9] rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px] text-[#004c22]">account_balance_wallet</span>
              </div>
              <span className="text-[11px] font-bold text-[#6c757d] bg-[#f6ece6] px-2 py-1 rounded">Channel 02</span>
            </div>
            <h3 className="text-[16px] font-bold text-[#1a1a1a] mb-2 flex items-center gap-2">
              Instant Settlements
              {selectedChannel === 'payouts' && <span className="material-symbols-oriented text-[18px] text-[#004c22]">check_circle</span>}
            </h3>
            <p className="text-[13px] text-[#6c757d] mb-4">
              Direct bank transfers for wholesale material dispatches, listing plan renewals, and completed service bookings.
            </p>
            <div className="flex items-center gap-4 pt-3 border-t border-[#f6ece6]">
              <div className="flex items-center gap-1.5 text-[12px] text-[#6c757d]">
                <span className="material-symbols-outlined text-[16px]">payments</span>
                <span>₹3.4L Available</span>
              </div>
              <div className="flex items-center gap-1.5 text-[12px] text-[#6c757d]">
                <span className="material-symbols-outlined text-[16px]">schedule</span>
                <span>24h IMPS</span>
              </div>
            </div>
          </div>

          {/* Channel 03 - Tax & Compliance */}
          <div 
            onClick={() => setSelectedChannel('compliance')}
            className={`bg-white rounded-xl p-5 border-2 cursor-pointer transition-all hover:shadow-md ${
              selectedChannel === 'compliance' ? 'border-[#004c22]' : 'border-[#dee2e6]'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-[#d4f5e9] rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px] text-[#004c22]">receipt_long</span>
              </div>
              <span className="text-[11px] font-bold text-[#6c757d] bg-[#f6ece6] px-2 py-1 rounded">Channel 03</span>
            </div>
            <h3 className="text-[16px] font-bold text-[#1a1a1a] mb-2 flex items-center gap-2">
              GST & Tax Invoices
              {selectedChannel === 'compliance' && <span className="material-symbols-outlined text-[18px] text-[#004c22]">check_circle</span>}
            </h3>
            <p className="text-[13px] text-[#6c757d] mb-4">
              Download platform fee invoices with 18% GST, claim input tax credits, and access TDS certificates (Section 194-O).
            </p>
            <div className="flex items-center gap-4 pt-3 border-t border-[#f6ece6]">
              <div className="flex items-center gap-1.5 text-[12px] text-[#6c757d]">
                <span className="material-symbols-outlined text-[16px]">verified</span>
                <span>ITC ₹8,805</span>
              </div>
              <div className="flex items-center gap-1.5 text-[12px] text-[#6c757d]">
                <span className="material-symbols-outlined text-[16px]">download</span>
                <span>Form 16A</span>
              </div>
            </div>
          </div>

        </div>

        {/* Financial Metrics Dashboard */}
        <div className="bg-white rounded-xl p-6 border border-[#dee2e6] mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[18px] font-bold text-[#1a1a1a]">Financial Performance Overview & Settlement Status</h2>
            <div className="flex items-center gap-2">
              <span className="text-[12px] text-[#6c757d]">Required internal context for verified buyer matching, inspection passes, and deal closure desk</span>
            </div>
          </div>

          {/* KPI Grid */}
          <div className="grid grid-cols-4 gap-4">
            
            <div className="bg-[#fff8f5] rounded-lg p-4 border border-[#f6ece6]">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold text-[#6c757d] uppercase tracking-wide">Total Revenue</span>
                <span className="material-symbols-outlined text-[18px] text-[#004c22]">trending_up</span>
              </div>
              <div className="text-[24px] font-bold text-[#1a1a1a] mb-1">₹14,85,400</div>
              <div className="text-[11px] text-[#28a745] font-medium">▲ +18.4% vs last month</div>
            </div>

            <div className="bg-[#fff8f5] rounded-lg p-4 border border-[#f6ece6]">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold text-[#6c757d] uppercase tracking-wide">Available Balance</span>
                <span className="material-symbols-outlined text-[18px] text-[#004c22]">account_balance_wallet</span>
              </div>
              <div className="text-[24px] font-bold text-[#004c22] mb-1">₹3,42,850</div>
              <div className="text-[11px] text-[#6c757d]">Ready for instant payout</div>
            </div>

            <div className="bg-[#fff8f5] rounded-lg p-4 border border-[#f6ece6]">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold text-[#6c757d] uppercase tracking-wide">In Escrow</span>
                <span className="material-symbols-outlined text-[18px] text-[#f59e0b]">security</span>
              </div>
              <div className="text-[24px] font-bold text-[#1a1a1a] mb-1">₹2,64,200</div>
              <div className="text-[11px] text-[#6c757d]">4 active milestones</div>
            </div>

            <div className="bg-[#fff8f5] rounded-lg p-4 border border-[#f6ece6]">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold text-[#6c757d] uppercase tracking-wide">Platform Fees</span>
                <span className="material-symbols-outlined text-[18px] text-[#6c757d]">receipt</span>
              </div>
              <div className="text-[24px] font-bold text-[#1a1a1a] mb-1">₹48,920</div>
              <div className="text-[11px] text-[#6c757d]">ITC eligible (18%)</div>
            </div>

          </div>
        </div>

        {/* Privacy Shield Notice - Similar to Create Listing */}
        <div className="bg-[#e3f2fd] rounded-lg p-4 mb-6 border border-[#90caf9] flex items-start gap-3">
          <span className="material-symbols-outlined text-[20px] text-[#1976d2]">info</span>
          <div>
            <div className="text-[13px] font-bold text-[#1976d2] mb-1">Secure Settlement Protocol Active</div>
            <p className="text-[12px] text-[#1565c0]">
              All transactions are processed through RBI-authorized escrow partners with zero-dispute guarantee. Your bank account details are encrypted and never shared with buyers.
            </p>
          </div>
        </div>

        {/* Active Escrow Items */}
        {selectedChannel === 'escrow' && (
          <div className="bg-white rounded-xl p-6 border border-[#dee2e6] mb-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-[18px] font-bold text-[#1a1a1a]">Active Escrow Items - Milestone Tracking</h2>
              <button className="text-[13px] text-[#004c22] font-medium hover:underline">View Escrow Policy</button>
            </div>

            <div className="space-y-3">
              {/* Item 1 */}
              <div className="bg-[#fff8f5] rounded-lg p-4 border border-[#f6ece6] flex items-center justify-between hover:border-[#004c22] transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-[#dee2e6]">
                    <span className="material-symbols-outlined text-[20px] text-[#f59e0b]">local_shipping</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-[14px] text-[#1a1a1a]">15 MT Tata Tiscon Fe 550D Rebars</span>
                      <span className="px-2 py-0.5 bg-[#f6ece6] text-[#6c757d] rounded text-[11px] font-medium">Consignment #WH-7892</span>
                      <span className="px-2 py-0.5 bg-[#d4f5e9] text-[#004c22] rounded text-[11px] font-bold">Mathura Bypass Site</span>
                    </div>
                    <div className="text-[12px] text-[#6c757d]">
                      Order Total: ₹8,17,500 • <span className="font-bold text-[#1a1a1a]">Escrow Tranche 1 (25%): ₹2,04,375</span> scheduled for release tomorrow upon weighbridge receipt verification
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-white border border-[#dee2e6] rounded-lg text-[13px] font-medium hover:bg-[#f8f9fa] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">upload_file</span>
                    Upload Slip
                  </button>
                  <button className="px-4 py-2 bg-[#004c22] text-white rounded-lg text-[13px] font-medium hover:bg-[#003818] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">verified</span>
                    Release Payout
                  </button>
                </div>
              </div>

              {/* Item 2 */}
              <div className="bg-[#fff8f5] rounded-lg p-4 border border-[#f6ece6] flex items-center justify-between hover:border-[#004c22] transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-[#dee2e6]">
                    <span className="material-symbols-outlined text-[20px] text-[#f59e0b]">apartment</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-[14px] text-[#1a1a1a]">Radhe Krishna PG - Room 204 Booking Deposit</span>
                      <span className="px-2 py-0.5 bg-[#f6ece6] text-[#6c757d] rounded text-[11px] font-medium">Tenant: Rohit Sharma</span>
                      <span className="px-2 py-0.5 bg-[#fff3cd] text-[#856404] rounded text-[11px] font-bold">Move-in Handover Pending</span>
                    </div>
                    <div className="text-[12px] text-[#6c757d]">
                      Token Amount: <span className="font-bold text-[#1a1a1a]">₹10,000 Security Deposit</span> held • Automated release on tenant digital lease key confirmation (20 Nov 2024)
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-white border border-[#dee2e6] rounded-lg text-[13px] font-medium hover:bg-[#f8f9fa] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">chat</span>
                    Contact Tenant
                  </button>
                  <button className="px-4 py-2 bg-white border border-[#dee2e6] rounded-lg text-[13px] font-medium hover:bg-[#f8f9fa] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">visibility</span>
                    Inspect Token
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Transaction History */}
        <div className="bg-white rounded-xl border border-[#dee2e6] overflow-hidden mb-6">
          <div className="p-6 border-b border-[#f6ece6]">
            <h2 className="text-[18px] font-bold text-[#1a1a1a] mb-4">Transaction Ledger & Settlement History</h2>
            
            {/* Tabs */}
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-[#004c22] text-white rounded-lg text-[13px] font-medium">All (142)</button>
              <button className="px-4 py-2 bg-[#f6ece6] text-[#6c757d] rounded-lg text-[13px] font-medium hover:bg-[#e9ecef]">Escrow (38)</button>
              <button className="px-4 py-2 bg-[#f6ece6] text-[#6c757d] rounded-lg text-[13px] font-medium hover:bg-[#e9ecef]">Plans (24)</button>
              <button className="px-4 py-2 bg-[#f6ece6] text-[#6c757d] rounded-lg text-[13px] font-medium hover:bg-[#e9ecef]">Wholesale (56)</button>
              <button className="px-4 py-2 bg-[#f6ece6] text-[#6c757d] rounded-lg text-[13px] font-medium hover:bg-[#e9ecef]">Invoices (24)</button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#f6ece6] text-[#6c757d] text-[11px] font-bold uppercase tracking-wide">
                  <th className="text-left py-3 px-6">Date & ID</th>
                  <th className="text-left py-3 px-6">Description</th>
                  <th className="text-right py-3 px-6">Amount</th>
                  <th className="text-right py-3 px-6">Fee</th>
                  <th className="text-right py-3 px-6">Net Payout</th>
                  <th className="text-center py-3 px-6">Status</th>
                  <th className="text-center py-3 px-6">Invoice</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f6ece6]">
                
                <tr className="hover:bg-[#fff8f5] transition-colors">
                  <td className="py-4 px-6 whitespace-nowrap">
                    <div className="text-[13px] font-medium text-[#1a1a1a]">18 Nov 2024</div>
                    <div className="text-[11px] text-[#6c757d] font-mono">#TXN-98421</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-bold text-[14px] text-[#1a1a1a]">Wholesale Steel Rebar Dispatch</div>
                    <div className="text-[12px] text-[#6c757d]">15 MT Consignment • Tranche 1 Release</div>
                  </td>
                  <td className="py-4 px-6 text-right font-bold text-[14px]">₹8,17,500</td>
                  <td className="py-4 px-6 text-right text-[13px] text-[#dc3545]">-₹40,875</td>
                  <td className="py-4 px-6 text-right font-bold text-[14px] text-[#004c22]">₹7,69,268</td>
                  <td className="py-4 px-6 text-center">
                    <span className="px-3 py-1 bg-[#fff3cd] text-[#856404] rounded-full text-[11px] font-bold">ESCROW</span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <button className="text-[#004c22] hover:underline text-[12px] font-medium">View</button>
                  </td>
                </tr>

                <tr className="hover:bg-[#fff8f5] transition-colors">
                  <td className="py-4 px-6 whitespace-nowrap">
                    <div className="text-[13px] font-medium text-[#1a1a1a]">15 Nov 2024</div>
                    <div className="text-[11px] text-[#6c757d] font-mono">#TXN-98310</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-bold text-[14px] text-[#1a1a1a]">1 Month Standard Listing Booster</div>
                    <div className="text-[12px] text-[#6c757d]">Promoted Slot • 2 Priority Listings</div>
                  </td>
                  <td className="py-4 px-6 text-right font-bold text-[14px]">₹1,199</td>
                  <td className="py-4 px-6 text-right text-[13px] text-[#6c757d]">+₹216</td>
                  <td className="py-4 px-6 text-right font-bold text-[14px]">-₹1,415</td>
                  <td className="py-4 px-6 text-center">
                    <span className="px-3 py-1 bg-[#d4f5e9] text-[#004c22] rounded-full text-[11px] font-bold">PAID</span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <button className="text-[#004c22] hover:underline">
                      <span className="material-symbols-outlined text-[16px]">picture_as_pdf</span>
                    </button>
                  </td>
                </tr>

                <tr className="hover:bg-[#fff8f5] transition-colors">
                  <td className="py-4 px-6 whitespace-nowrap">
                    <div className="text-[13px] font-medium text-[#1a1a1a]">12 Nov 2024</div>
                    <div className="text-[11px] text-[#6c757d] font-mono">#TXN-98104</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-bold text-[14px] text-[#1a1a1a]">Token Advance - 3BHK Independent Villa</div>
                    <div className="text-[12px] text-[#6c757d]">Deposit Escrow Released • Tenant Handover</div>
                  </td>
                  <td className="py-4 px-6 text-right font-bold text-[14px]">₹24,000</td>
                  <td className="py-4 px-6 text-right text-[13px] text-[#6c757d]">₹0</td>
                  <td className="py-4 px-6 text-right font-bold text-[14px] text-[#004c22]">₹24,000</td>
                  <td className="py-4 px-6 text-center">
                    <span className="px-3 py-1 bg-[#d4f5e9] text-[#004c22] rounded-full text-[11px] font-bold">SETTLED</span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <button className="text-[#004c22] hover:underline text-[12px] font-medium">Receipt</button>
                  </td>
                </tr>

              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-4 bg-[#f6ece6] flex items-center justify-between">
            <span className="text-[13px] text-[#6c757d]">Showing 1-3 of 142 transactions</span>
            <div className="flex gap-2">
              <button className="w-8 h-8 rounded-lg bg-white border border-[#dee2e6] flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px] text-[#6c757d]">chevron_left</span>
              </button>
              <button className="w-8 h-8 rounded-lg bg-[#004c22] text-white font-bold text-[13px]">1</button>
              <button className="w-8 h-8 rounded-lg bg-white border border-[#dee2e6] text-[13px] font-medium">2</button>
              <button className="w-8 h-8 rounded-lg bg-white border border-[#dee2e6] text-[13px] font-medium">3</button>
              <button className="w-8 h-8 rounded-lg bg-white border border-[#dee2e6] flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px] text-[#6c757d]">chevron_right</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bank & GST Section - 2 Column */}
        <div className="grid grid-cols-2 gap-6">
          
          {/* Bank Account */}
          <div className="bg-white rounded-xl border border-[#dee2e6] p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-[16px] font-bold text-[#1a1a1a]">Primary Settlement Bank Account</h3>
              <span className="px-2 py-1 bg-[#d4f5e9] text-[#004c22] rounded text-[11px] font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">verified</span>
                Active & Verified
              </span>
            </div>

            <div className="bg-gradient-to-br from-[#004c22] to-[#003818] rounded-xl p-5 text-white mb-4">
              <div className="text-[11px] opacity-80 mb-2">PRIMARY ACCOUNT</div>
              <div className="text-[20px] font-bold mb-3">HDFC Bank Ltd.</div>
              <div className="text-[15px] font-mono mb-4">•••• •••• •••• 4892</div>
              <div className="grid grid-cols-2 gap-4 text-[12px]">
                <div>
                  <div className="opacity-70">IFSC Code</div>
                  <div className="font-bold">HDFC0001248</div>
                </div>
                <div>
                  <div className="opacity-70">Account Type</div>
                  <div className="font-bold">Current</div>
                </div>
              </div>
            </div>

            <button className="w-full py-2.5 bg-[#f6ece6] border border-[#dee2e6] rounded-lg text-[13px] font-medium hover:bg-[#e9ecef]">
              Change Bank Account
            </button>
          </div>

          {/* GST Compliance */}
          <div className="bg-white rounded-xl border border-[#dee2e6] p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-[16px] font-bold text-[#1a1a1a]">Tax & Statutory Compliance</h3>
              <span className="px-2 py-1 bg-[#d4f5e9] text-[#004c22] rounded text-[11px] font-bold">
                Section 194-O Enabled
              </span>
            </div>

            <div className="space-y-3 mb-4">
              <div className="bg-[#fff8f5] rounded-lg p-4 flex items-center justify-between border border-[#f6ece6]">
                <div>
                  <div className="text-[11px] text-[#6c757d] mb-1">GSTIN (Uttar Pradesh)</div>
                  <div className="text-[14px] font-bold text-[#1a1a1a] font-mono">09AAACS8492K1Z5</div>
                </div>
                <span className="px-2 py-1 bg-[#d4f5e9] text-[#004c22] text-[10px] font-bold rounded">VERIFIED</span>
              </div>

              <div className="bg-[#fff8f5] rounded-lg p-4 flex items-center justify-between border border-[#f6ece6]">
                <div>
                  <div className="text-[11px] text-[#6c757d] mb-1">Permanent A/c Number (PAN)</div>
                  <div className="text-[14px] font-bold text-[#1a1a1a] font-mono">AAACS8492K</div>
                </div>
                <span className="px-2 py-1 bg-[#d4f5e9] text-[#004c22] text-[10px] font-bold rounded">ACTIVE</span>
              </div>
            </div>

            <div className="bg-[#f6ece6] rounded-lg p-4">
              <div className="text-[11px] text-[#6c757d] font-bold mb-2">INPUT TAX CREDIT (THIS QUARTER)</div>
              <div className="flex items-center justify-between">
                <div className="text-[20px] font-bold text-[#1a1a1a]">₹8,805.60</div>
                <button className="px-3 py-1.5 bg-white border border-[#dee2e6] rounded-lg text-[11px] font-medium hover:bg-[#f8f9fa]">
                  View Details
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
