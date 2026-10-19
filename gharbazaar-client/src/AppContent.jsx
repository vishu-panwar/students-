import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Suspense, lazy, useMemo, useEffect } from "react";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import { socket } from "./socket/socket";
import ProtectedRoute from "./pages/authenticate/ProtectedRoute";
import { requestNotificationPermission } from "./config/notification";
import axios from "axios";
import InstantKYCPage from "./pages/employeDashBoard/InstantKyc/InstantKYCPage";
import BroadcastPage from "./pages/adminDashboard/broadcast/BroadCastPage";
import Notifications from "./pages/adminDashboard/notification/Notifications";
import VisitSchedules from "./pages/employeDashBoard/visitschedule/VisitSchedules";
import PaymentPage from "./pages/adminDashboard/payment/PaymentPage";

/* ───────── COMMON ───────── */
const Navbar      = lazy(() => import("./components/common/Navbar"));
const Footer      = lazy(() => import("./components/common/Footer"));
const ScrollToTop = lazy(() => import("./components/common/ScrollToTop"));

/* ───────── MAIN PAGES ───────── */
const Home                   = lazy(() => import("./pages/Home/Home"));
const Services               = lazy(() => import("./pages/Services"));
const Marketplace            = lazy(() => import("./pages/Marketplace"));
const Pricing                = lazy(() => import("./pages/pricing/Pricing"));
const Contact                = lazy(() => import("./pages/contact/Contact"));
const Cart                   = lazy(() => import("./pages/Cart"));
const Login                  = lazy(() => import("./pages/authenticate/Login"));
const Register               = lazy(() => import("./pages/authenticate/Register"));
const AccountSetup           = lazy(() => import("./pages/authenticate/AccountSetup"));
const PricingBenefits        = lazy(() => import("./pages/authenticate/PricingBenefits"));
const OtpVerify              = lazy(() => import("./pages/authenticate/OtpVerify"));
const ForgotPassword         = lazy(() => import("./pages/authenticate/ForgotPassword"));
const ResetPassword          = lazy(() => import("./pages/authenticate/ResetPassword"));
const Favorites              = lazy(() => import("./pages/favourite/Favorites"));
const PropertyDetails        = lazy(() => import("./pages/properties/PropertyDetails"));
const BookingPage            = lazy(() => import("./pages/properties/BookingPage"));
const BookingStep2           = lazy(() => import("./pages/properties/BookingStep2"));
const BookingStep3           = lazy(() => import("./pages/properties/BookingStep3"));
const BookingConfirmation    = lazy(() => import("./pages/properties/BookingConfirmation"));
const Checkout               = lazy(() => import("./pages/Checkout"));
const OrderConfirmation      = lazy(() => import("./pages/OrderConfirmation"));
const AllProperties          = lazy(() => import("./pages/AllProperties"));
const Properties             = lazy(() => import("./pages/properties/Properties"));
const PGHostels              = lazy(() => import("./pages/PGHostels"));
const TrendingProperties     = lazy(() => import("./pages/TrendingProperties"));
const BrokerProfile          = lazy(() => import("./pages/BrokerProfile"));
const PostRequirement        = lazy(() => import("./pages/PostRequirement"));
const ResidentialProperties  = lazy(() => import("./pages/ResidentialProperties"));
const CommercialProperties   = lazy(() => import("./pages/CommercialProperties"));
const PlotsLand              = lazy(() => import("./pages/PlotsLand"));
const LuxuryHomes            = lazy(() => import("./pages/LuxuryHomes"));
const CallPlans              = lazy(() => import("./pages/CallPlans"));
const ReferEarn              = lazy(() => import("./pages/ReferEarn"));
const CategoriesPage         = lazy(() => import("./pages/properties/CategoriesPage"));
const NotFoundPage           = lazy(() => import("./pages/Not Found/Not404"));

/* ───────── USER DASHBOARD ───────── */
const DashboardLayout    = lazy(() => import("./pages/dashboard/DashboardLayout"));
const Dashboard          = lazy(() => import("./pages/dashboard/dashboard/Dashboard"));
const ListProperty       = lazy(() => import("./pages/dashboard/listproperty/ListProperty"));
const MyListings         = lazy(() => import("./pages/dashboard/listproperty/MyListings"));
const MyBookings         = lazy(() => import("./pages/dashboard/MyBookings"));
const BookingDetails     = lazy(() => import("./pages/dashboard/BookingDetails"));
const DisputeResolution  = lazy(() => import("./pages/dashboard/DisputeResolution"));
const DashboardPayments  = lazy(() => import("./pages/DashboardPayments"));
const DashboardDocuments = lazy(() => import("./pages/DashboardDocuments"));
const DashboardSettings  = lazy(() => import("./pages/DashboardSettings"));
const KYCVerification    = lazy(() => import("./pages/dashboard/kyc/KYCVerification"));
const MyProposals        = lazy(() => import("./pages/MyProposals"));
const ProposalDetails    = lazy(() => import("./pages/ProposalDetails"));
const Messages           = lazy(() => import("./pages/employeDashBoard/messages/Messages"));

/* ───────── SELLER ───────── */
const SellerLogin         = lazy(() => import("./pages/seller/SellerLogin"));
const SellerRegister      = lazy(() => import("./pages/seller/SellerRegister"));
const SellerLayout        = lazy(() => import("./components/SellerLayout"));
const PropertyDashboard   = lazy(() => import("./pages/seller/PropertyDashboard"));
const SellerBookings      = lazy(() => import("./pages/seller/SellerBookings"));
const SellerLeads         = lazy(() => import("./pages/seller/SellerLeads"));
const SellerAnalytics     = lazy(() => import("./pages/seller/SellerAnalytics"));
const SellerMessages      = lazy(() => import("./pages/seller/SellerMessages"));
const SellerPayments      = lazy(() => import("./pages/seller/SellerPayments"));
const SellerKYC           = lazy(() => import("./pages/seller/SellerKYC"));
const SellerSettings      = lazy(() => import("./pages/seller/SellerSettings"));
const BecomePartner       = lazy(() => import("./pages/dashboard/BecomePartner"));
const ServiceDashboard    = lazy(() => import("./pages/seller/ServiceDashboard"));
const ProductDashboard    = lazy(() => import("./pages/seller/ProductDashboard"));

/* ───────── EMPLOYEE ───────── */
const EmployeeLayout    = lazy(() => import("./pages/employeDashBoard/EmployeeLayout"));
const EmployeeDashboard = lazy(() => import("./pages/employeDashBoard/dashboard/EmployeeDashboard"));
const KycCentre        = lazy(() => import("./pages/employeDashBoard/kyc/KycCentre"));
const EmployeeKYC       = lazy(() => import("./pages/employeDashBoard/kyc/EmployeeKYC"));
const ManageProperties  = lazy(() => import("./pages/employeDashBoard/properties/ManageProperties"));
const ListingControl    = lazy(() => import("./pages/employeDashBoard/Property Listing Control Centre/ListingControl"));
const CouponGenerator   = lazy(() => import("./pages/employeDashBoard/couponGenearate/CouponGenerator"));
const EmployeeDocuments = lazy(() => import("./pages/employeDashBoard/EmployeeDocuments/EmployeeDocuments"));

/* ───────── ADMIN ───────── */
// ⚠️  File must be saved as exactly: ManageRoles.jsx  (capital M, capital R)
const AdminLayout       = lazy(() => import("./pages/adminDashboard/AdminLayout"));
const AdminDashboard    = lazy(() => import("./pages/adminDashboard/dashboard/AdminDashboard"));
const ManageRoles       = lazy(() => import("./pages/adminDashboard/manageRoles/ManageRoles"));
const UsersManagement   = lazy(() => import("./pages/adminDashboard/dashboard/UserManagement"));
const HeroBannerManager = lazy(() => import("./pages/adminDashboard/heroBanners/HeroBannerManager"));
const AdminEmployeeDocuments = lazy(() => import("./pages/adminDashboard/EmpDoc/AdminEmployeeDocuments"));

/* ════════════════════════════════════════════════════════════════════════════ */

export default function AppContent() {
  const location = useLocation();

  const hideFooterRoutes = useMemo(() => ["/login", "/register", "/properties"], []);

  const isInternalLayout = useMemo(
    () =>
      location.pathname.startsWith("/dashboard") ||
      location.pathname.startsWith("/seller/dashboard") ||
      location.pathname.startsWith("/employee") ||
      location.pathname.startsWith("/admin"),
    [location.pathname],
  );

  const user = JSON.parse(localStorage.getItem("user"));

  /* ── Socket join ── */
  useEffect(() => {
    const joinRoom = () => {
      if (!user?.id) return;
      socket.emit("join", { userId: user.id, role: user.role });
    };

    if (socket.connected) joinRoom();
    socket.on("connect", joinRoom);
    return () => socket.off("connect", joinRoom);
  }, [user?.id]);

  /* ── FCM token sync ── */
  useEffect(() => {
    const syncFCM = async () => {
      const u = JSON.parse(localStorage.getItem("user"));
      if (!u) return;

      const newToken = await requestNotificationPermission();
      if (!newToken) return;

      try {
        await axios.post(
          `${import.meta.env.VITE_BASE_URL}/save-fcm-token`,
          { token: newToken },
          { withCredentials: true },
        );
        localStorage.setItem("user", JSON.stringify({ ...u, fcmToken: newToken }));
      } catch (error) {
        console.error(error);
      }
    };

    syncFCM();
  }, []);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" newestOnTop />

      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen font-bold text-green-600">
            Loading...
          </div>
        }
      >
        {!isInternalLayout && <Navbar />}
        <ScrollToTop />

        <Routes>
          {/* ── MAIN ── */}
          <Route path="/"                        element={<Home />} />
          <Route path="/properties"              element={<Properties />} />
          <Route path="/login"                   element={<Login />} />
          <Route path="/otpverify"               element={<OtpVerify />} />
          <Route path="/register"                element={<Register />} />
          <Route path="/account-setup"           element={<AccountSetup />} />
          <Route path="/pricing-benefits"        element={<PricingBenefits />} />
          <Route path="/forgot-password"         element={<ForgotPassword />} />
          <Route path="/reset-password"          element={<ResetPassword />} />
          <Route path="/categoryProperty"        element={<CategoriesPage />} />
          <Route path="/property/:id"            element={<PropertyDetails />} />
          <Route path="/booking/:id"             element={<BookingPage />} />
          <Route path="/booking-step2/:id"       element={<BookingStep2 />} />
          <Route path="/booking-step3/:id"       element={<BookingStep3 />} />
          <Route path="/booking-confirmation/:id" element={<BookingConfirmation />} />
          <Route path="/favorites"               element={<Favorites />} />
          <Route path="/services"                element={<Services />} />
          <Route path="/marketplace"             element={<Marketplace />} />
          <Route path="/pricing"                 element={<Pricing />} />
          <Route path="/contact"                 element={<Contact />} />
          <Route path="/cart"                    element={<Cart />} />
          <Route path="/checkout"                element={<Checkout />} />
          <Route path="/order-confirmation"      element={<OrderConfirmation />} />
          <Route path="/all-properties"          element={<AllProperties />} />
          <Route path="/pg-hostels"              element={<PGHostels />} />
          <Route path="/trending-properties"     element={<TrendingProperties />} />
          <Route path="/broker-profile/:id"      element={<BrokerProfile />} />
          <Route path="/post-requirement"        element={<PostRequirement />} />
          <Route path="/residential-properties"  element={<ResidentialProperties />} />
          <Route path="/commercial-properties"   element={<CommercialProperties />} />
          <Route path="/plots-land"              element={<PlotsLand />} />
          <Route path="/luxury-homes"            element={<LuxuryHomes />} />
          <Route path="/call-plans"              element={<CallPlans />} />
          <Route path="/refer"                   element={<ReferEarn />} />

          {/* ── USER DASHBOARD ── */}
          <Route element={<ProtectedRoute allowedRoles={["client", "admin"]} />}>
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index                          element={<Dashboard />} />
              <Route path="my-bookings"             element={<MyBookings />} />
              <Route path="booking-details/:id"     element={<BookingDetails />} />
              <Route path="dispute-resolution"      element={<DisputeResolution />} />
              <Route path="favorites"               element={<Favorites />} />
              <Route path="cart"                    element={<Cart />} />
              <Route path="payments"                element={<DashboardPayments />} />
              <Route path="documents"               element={<DashboardDocuments />} />
              <Route path="kyc-verification"        element={<KYCVerification />} />
              <Route path="proposals"               element={<MyProposals />} />
              <Route path="proposals/:id"           element={<ProposalDetails />} />
              <Route path="messages"                element={<Messages />} />
              <Route path="settings"                element={<DashboardSettings />} />
            </Route>
          </Route>

          {/* ── SELLER ── */}
          <Route path="/seller/login"    element={<SellerLogin />} />
          <Route path="/seller/register" element={<SellerRegister />} />

          <Route element={<ProtectedRoute allowedRoles={["seller"]} />}>
            <Route path="/seller/dashboard" element={<SellerLayout />}>
              <Route index                                 element={<Navigate to="property" replace />} />
              <Route path="property"                       element={<PropertyDashboard />} />
              <Route path="property/list-property"         element={<ListProperty />} />
              <Route path="property/listings"              element={<MyListings />} />
              <Route path="property/leads"                 element={<SellerLeads />} />
              <Route path="property/bookings"              element={<SellerBookings />} />
              <Route path="property/become-partner"        element={<BecomePartner />} />
              <Route path="property/analytics"             element={<SellerAnalytics />} />
              <Route path="property/messages"              element={<SellerMessages />} />
              <Route path="property/payments"              element={<SellerPayments />} />
              <Route path="property/kyc-verification"      element={<SellerKYC />} />
              <Route path="property/settings"              element={<SellerSettings />} />
              <Route path="service"                        element={<ServiceDashboard />} />
              <Route path="product"                        element={<ProductDashboard />} />
            </Route>
          </Route>

          {/* ── EMPLOYEE ── */}
          <Route element={<ProtectedRoute allowedRoles={["manager","review","property"]} />}>
            <Route path="/employee" element={<EmployeeLayout />}>
              <Route index                                    element={<EmployeeDashboard />} />
              <Route path="kyc-center"                       element={<KycCentre />} />
              <Route path="instant-kyc"              element={<InstantKYCPage />} />
               <Route path="addProperty"                       element={<ListProperty/>} />
              <Route path="messages"                          element={<Messages />} />
              <Route path="coupon-generate"                   element={<CouponGenerator />} />
              <Route path="property-verification"             element={<ManageProperties />} />
              <Route path="EmployeeListingPanel"              element={<ListingControl />} />
              <Route path="documents"                         element={<EmployeeDocuments />} />
              <Route path="notifications"                element={<Notifications/>} />
              <Route path="visitschedule"                element={<VisitSchedules/>} />
            </Route>
          </Route>

          {/* ── ADMIN ── */}
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index                  element={<AdminDashboard />} />
              <Route path="hero-banners"    element={<HeroBannerManager />} />
              <Route path="kyc-center"     element={<KycCentre />} />
              <Route path="manage-roles"    element={<ManageRoles />} />
              <Route path="users" element={<UsersManagement />} />
              <Route path="messages"                          element={<Messages />} />
              <Route path="coupon-generate"                   element={<CouponGenerator />} />
              <Route path="property-verification"             element={<ManageProperties />} />
              <Route path="EmployeeListingPanel"              element={<ListingControl />} />
              <Route path="employee-documents"                element={<AdminEmployeeDocuments />} />
              <Route path="my-documents"                      element={<EmployeeDocuments />} />
              <Route path="broadcast"                         element={<BroadcastPage />} />
              <Route path="notifications"                element={<Notifications/>} />
              <Route path="visitschedule"                element={<VisitSchedules/>} />
              <Route path="payment"                element={<PaymentPage/>} />
               </Route>
          </Route>

          {/* ── 404 ── */}
          <Route path="/NotFound" element={<NotFoundPage />} />
          <Route path="*"         element={<Navigate to="/NotFound" replace />} />
        </Routes>

        {!isInternalLayout && !hideFooterRoutes.includes(location.pathname) && <Footer />}
      </Suspense>
    </>
  );
}