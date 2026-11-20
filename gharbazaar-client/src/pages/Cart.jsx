import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Cart() {
  const navigate = useNavigate();
  
  // Mock cart items for demonstration
  const [mockCartItems, setMockCartItems] = useState([
    {
      id: 1,
      name: 'UltraTech Cement - 50 Kg Bag',
      price: 385,
      quantity: 20,
      img: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400',
      location: 'Mumbai Godown',
      brand: 'UltraTech',
      category: 'Cement'
    },
    {
      id: 2,
      name: 'Tata Tiscon TMT Steel Bars - Fe 500D (12mm)',
      price: 62,
      quantity: 100,
      img: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=400',
      location: 'Pune Warehouse',
      brand: 'Tata Tiscon',
      category: 'Steel & Iron'
    },
    {
      id: 3,
      name: 'Asian Paints Royale - 20 Liter',
      price: 8450,
      quantity: 3,
      img: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400',
      location: 'Delhi Stockist',
      brand: 'Asian Paints',
      category: 'Paint'
    },
    {
      id: 4,
      name: 'Kajaria Floor Tiles - 600x600mm (Box of 4)',
      price: 1250,
      quantity: 15,
      img: 'https://images.unsplash.com/photo-1615971677499-5467cbab01c0?w=400',
      location: 'Bangalore Depot',
      brand: 'Kajaria',
      category: 'Tiles'
    },
    {
      id: 5,
      name: 'ACC Gold Water Shield Cement - 50 Kg',
      price: 425,
      quantity: 10,
      img: 'https://images.unsplash.com/photo-1581092918484-8313e1f2921a?w=400',
      location: 'Chennai Hub',
      brand: 'ACC',
      category: 'Cement'
    }
  ]);

  // Use mock data instead of CartContext for now
  const cartItems = mockCartItems;
  const removeFromCart = (id) => {
    setMockCartItems(mockCartItems.filter(item => item.id !== id));
  };
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(id);
      return;
    }
    setMockCartItems(mockCartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };
  const getCartTotal = () => {
    return mockCartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);

  // Available coupons
  const availableCoupons = {
    'SAVE10': { discount: 10, type: 'percentage', description: '10% off' },
    'SAVE500': { discount: 500, type: 'fixed', description: '₹500 off' },
    'WELCOME': { discount: 15, type: 'percentage', description: '15% off for new users' },
  };

  const applyCoupon = () => {
    const coupon = availableCoupons[couponCode.toUpperCase()];
    if (coupon) {
      setAppliedCoupon({ code: couponCode.toUpperCase(), ...coupon });
      setCouponCode('');
    }
  };

  const subtotal = getCartTotal();
  const shippingCharges = subtotal > 10000 ? 0 : 200;
  
  let discount = 0;
  if (appliedCoupon) {
    discount = appliedCoupon.type === 'percentage' 
      ? (subtotal * appliedCoupon.discount) / 100 
      : appliedCoupon.discount;
  }
  
  const taxableAmount = subtotal - discount;
  const gst = taxableAmount * 0.18;
  const total = subtotal - discount + shippingCharges + gst;

  return (
    <div className="min-h-screen bg-[#fff8f5]">
      <div className="max-w-[1200px] mx-auto p-6">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[13px] text-[#6c757d] mb-6">
          <span>Dashboard</span>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-[#004c22] font-medium">Shopping Cart</span>
        </div>

        {/* Header */}
        <div className="flex items-end justify-between mb-6">
          <div>
            <h1 className="text-[32px] font-bold text-[#1a1a1a] mb-2">Shopping Cart</h1>
            <p className="text-[14px] text-[#6c757d]">Review your construction materials and products</p>
          </div>
          <a href="/marketplace" className="px-4 py-2 bg-white border border-[#dee2e6] rounded-lg text-[14px] font-medium hover:bg-[#f8f9fa] transition-colors">
            Continue Shopping
          </a>
        </div>

        {cartItems.length === 0 ? (
          /* Empty Cart */
          <div className="bg-white rounded-xl border border-[#dee2e6] p-12 text-center">
            <span className="material-symbols-outlined text-[64px] text-[#6c757d] mb-4 inline-block">shopping_cart</span>
            <h3 className="text-[20px] font-bold text-[#1a1a1a] mb-2">Your cart is empty</h3>
            <p className="text-[14px] text-[#6c757d] mb-6">Add construction materials to get started!</p>
            <a href="/marketplace" className="inline-block px-6 py-3 bg-[#004c22] text-white rounded-lg text-[14px] font-medium hover:bg-[#003818] transition-colors">
              Browse Marketplace
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-6">
            
            {/* Cart Items - Left Side (2 columns) */}
            <div className="col-span-2 space-y-3">
              {cartItems.map(item => (
                <div key={item.id} className="bg-white rounded-xl border border-[#dee2e6] p-4 flex gap-4 hover:shadow-md transition-all">
                  
                  {/* Product Image */}
                  <img 
                    src={item.img} 
                    alt={item.name} 
                    className="w-24 h-24 object-cover rounded-lg border border-[#dee2e6]"
                  />

                  {/* Product Details */}
                  <div className="flex-1">
                    <h3 className="font-bold text-[16px] text-[#1a1a1a] mb-1">{item.name}</h3>
                    <p className="text-[12px] text-[#6c757d] mb-2 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">location_on</span>
                      {item.location || item.brand || 'Available'}
                    </p>
                    <span className="inline-block px-2 py-1 bg-[#f6ece6] text-[#6c757d] rounded text-[11px] font-medium">
                      {item.category || 'Construction Material'}
                    </span>
                  </div>

                  {/* Quantity & Price */}
                  <div className="flex flex-col items-end justify-between">
                    <div className="flex items-center gap-2 bg-[#f6ece6] rounded-lg p-1">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white transition-colors"
                      >
                        <span className="material-symbols-outlined text-[18px]">remove</span>
                      </button>
                      <span className="w-8 text-center font-bold text-[14px]">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white transition-colors"
                      >
                        <span className="material-symbols-outlined text-[18px]">add</span>
                      </button>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-[18px] font-bold text-[#1a1a1a]">₹{(item.price * item.quantity).toLocaleString()}</div>
                      <div className="text-[12px] text-[#6c757d]">₹{item.price.toLocaleString()} each</div>
                    </div>

                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-[#dc3545] hover:bg-[#fce4d6] p-2 rounded-lg transition-colors"
                      title="Remove"
                    >
                      <span className="material-symbols-outlined text-[20px]">delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary - Right Side (1 column) */}
            <div className="space-y-4">
              
              {/* Coupon Card */}
              <div className="bg-white rounded-xl border border-[#dee2e6] p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="material-symbols-outlined text-[20px] text-[#004c22]">local_offer</span>
                  <h3 className="font-bold text-[14px] text-[#1a1a1a]">Apply Coupon</h3>
                </div>
                
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Enter code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 px-3 py-2 bg-[#f6ece6] border border-[#dee2e6] rounded-lg text-[14px] outline-none"
                  />
                  <button 
                    onClick={applyCoupon}
                    className="px-4 py-2 bg-[#004c22] text-white rounded-lg text-[13px] font-medium hover:bg-[#003818]"
                  >
                    Apply
                  </button>
                </div>

                {appliedCoupon && (
                  <div className="flex items-center justify-between bg-[#d4f5e9] rounded-lg p-2">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[16px] text-[#004c22]">check_circle</span>
                      <span className="text-[12px] font-bold text-[#004c22]">{appliedCoupon.code} applied</span>
                    </div>
                    <button onClick={() => setAppliedCoupon(null)} className="text-[#004c22]">
                      <span className="material-symbols-outlined text-[16px]">close</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Price Summary Card */}
              <div className="bg-white rounded-xl border border-[#dee2e6] p-4">
                <h3 className="font-bold text-[16px] text-[#1a1a1a] mb-4">Order Summary</h3>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-[14px]">
                    <span className="text-[#6c757d]">Subtotal ({cartItems.length} items)</span>
                    <span className="font-medium text-[#1a1a1a]">₹{subtotal.toLocaleString()}</span>
                  </div>

                  {appliedCoupon && (
                    <div className="flex items-center justify-between text-[14px]">
                      <span className="text-[#28a745]">Discount</span>
                      <span className="font-bold text-[#28a745]">-₹{discount.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-[14px]">
                    <span className="text-[#6c757d]">Shipping</span>
                    <span className={`font-medium ${shippingCharges === 0 ? 'text-[#28a745]' : 'text-[#1a1a1a]'}`}>
                      {shippingCharges === 0 ? 'FREE' : `₹${shippingCharges}`}
                    </span>
                  </div>

                  {shippingCharges === 0 && (
                    <div className="bg-[#d4f5e9] rounded-lg p-2 text-[11px] text-[#004c22] font-medium">
                      🎉 Free shipping on orders above ₹10,000
                    </div>
                  )}

                  <div className="flex items-center justify-between text-[14px]">
                    <span className="text-[#6c757d]">GST (18%)</span>
                    <span className="font-medium text-[#1a1a1a]">₹{gst.toLocaleString()}</span>
                  </div>

                  <div className="border-t border-[#dee2e6] pt-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[16px] font-bold text-[#1a1a1a]">Total Amount</span>
                      <span className="text-[20px] font-bold text-[#004c22]">₹{total.toLocaleString()}</span>
                    </div>
                  </div>

                  {discount > 0 && (
                    <div className="bg-[#fff3cd] rounded-lg p-2 text-[12px] text-[#856404] font-medium text-center">
                      You're saving ₹{discount.toLocaleString()}! 🎉
                    </div>
                  )}
                </div>

                <button 
                  onClick={() => setShowCheckout(true)}
                  className="w-full py-3 bg-[#004c22] text-white rounded-lg text-[14px] font-bold hover:bg-[#003818] transition-colors"
                >
                  Proceed to Checkout
                </button>
              </div>

              {/* Security Badge */}
              <div className="bg-[#e3f2fd] rounded-lg p-3 border border-[#90caf9] flex items-start gap-2">
                <span className="material-symbols-outlined text-[20px] text-[#1976d2]">lock</span>
                <div>
                  <div className="text-[12px] font-bold text-[#1976d2] mb-1">Secure Checkout</div>
                  <p className="text-[11px] text-[#1565c0]">All transactions are encrypted and secure</p>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Checkout Modal */}
        {showCheckout && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowCheckout(false)}>
            <div className="bg-white rounded-xl max-w-[500px] w-full" onClick={(e) => e.stopPropagation()}>
              
              <div className="p-6 border-b border-[#dee2e6] flex items-center justify-between">
                <h2 className="text-[20px] font-bold text-[#1a1a1a]">Checkout</h2>
                <button onClick={() => setShowCheckout(false)} className="p-2 hover:bg-[#f8f9fa] rounded-lg">
                  <span className="material-symbols-outlined text-[24px] text-[#6c757d]">close</span>
                </button>
              </div>

              <div className="p-6">
                <div className="space-y-4 mb-6">
                  
                  {/* Delivery Address */}
                  <div>
                    <label className="block text-[13px] font-bold text-[#1a1a1a] mb-2">Delivery Address</label>
                    <textarea 
                      className="w-full px-3 py-2 bg-[#f6ece6] border border-[#dee2e6] rounded-lg text-[14px] outline-none resize-none"
                      rows="3"
                      placeholder="Enter complete delivery address"
                    ></textarea>
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-[13px] font-bold text-[#1a1a1a] mb-2">Contact Number</label>
                    <input 
                      type="tel"
                      className="w-full px-3 py-2 bg-[#f6ece6] border border-[#dee2e6] rounded-lg text-[14px] outline-none"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>

                  {/* Payment Method */}
                  <div>
                    <label className="block text-[13px] font-bold text-[#1a1a1a] mb-2">Payment Method</label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-3 p-3 bg-[#f6ece6] rounded-lg cursor-pointer hover:bg-[#e9ecef]">
                        <input type="radio" name="payment" defaultChecked />
                        <span className="material-symbols-outlined text-[20px] text-[#004c22]">account_balance</span>
                        <span className="text-[14px] font-medium">Cash on Delivery</span>
                      </label>
                      <label className="flex items-center gap-3 p-3 bg-[#f6ece6] rounded-lg cursor-pointer hover:bg-[#e9ecef]">
                        <input type="radio" name="payment" />
                        <span className="material-symbols-outlined text-[20px] text-[#004c22]">credit_card</span>
                        <span className="text-[14px] font-medium">Online Payment</span>
                      </label>
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="bg-[#fff8f5] rounded-lg p-4 border border-[#f6ece6]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[14px] text-[#6c757d]">Total Amount</span>
                      <span className="text-[20px] font-bold text-[#004c22]">₹{total.toLocaleString()}</span>
                    </div>
                    <div className="text-[11px] text-[#6c757d]">{cartItems.length} items • GST included</div>
                  </div>

                </div>

                <button className="w-full py-3 bg-[#004c22] text-white rounded-lg text-[14px] font-bold hover:bg-[#003818] transition-colors">
                  Place Order
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default Cart;
