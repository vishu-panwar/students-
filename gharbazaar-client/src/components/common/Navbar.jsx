import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { 
  Search, Heart, Menu, X, LogOut, Loader2,
  Home, ShoppingBag, Briefcase, DollarSign,
  Gift, Info, Phone, LayoutDashboard, CircleUserRound, TrendingUp
} from "lucide-react";
import axios from "axios";
import { useGetBookmarkQuery } from "../../store/propertyQuery/getPropertyQuery";
import { toast } from "react-toastify";

const NAV_LINKS = [
  { label: "Properties",   path: "/",           icon: Home },
  { 
    label: "Services",     
    path: "/services",   
    icon: Briefcase,
    hasDropdown: true,
    dropdown: [
      { label: "For Buyers", path: "/services?type=buyer", icon: Home },
      { label: "For Sellers", path: "/services?type=seller", icon: TrendingUp },
      { label: "For Tenants", path: "/services?type=tenant", icon: CircleUserRound },
      { label: "For Landlords", path: "/services?type=landlord", icon: LayoutDashboard },
      { label: "For Investors", path: "/services?type=investor", icon: DollarSign },
    ]
  },
  { label: "Marketplace",  path: "/marketplace",icon: ShoppingBag },
  { label: "Pricing",      path: "/pricing",    icon: DollarSign },
  { label: "Refer & Earn", path: "/refer",      icon: Gift },
  { label: "About",        path: "/about",      icon: Info },
  { label: "Contact",      path: "/contact",    icon: Phone },
];

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { getCartCount } = useCart();
  const searchContainerRef = useRef(null);

  const { data } = useGetBookmarkQuery();
  const bookmarkCount = data?.data?.length || 0;

  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showServicesDropdown, setShowServicesDropdown] = useState(false);
  const profileDropdownRef = useRef(null);
  const servicesDropdownRef = useRef(null);

  // Search and Debounce States
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const cartCount = getCartCount();

  // Handle Auth & Role Guarding
  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);

        const role = parsedUser?.role;

        // ROLE-BASED ROUTING (SAFE)
        if (
          location.pathname === "/login" ||
          location.pathname === "/register"
        ) {
          if (role === "client") {
            navigate("/dashboard");
          } else if (role === "manager") {
            navigate("/employee");
          } else if (role === "admin") {
            navigate("/admin");
          } else if (role === "review") {
            navigate("/review");
          } else if (role === "property") {
            navigate("/property");
          } else if (role === "ban") {
            toast.info("your account is currently suspended contact to admin");
          } else {
            navigate("/notfound");
          }
        }
      } catch (err) {
        localStorage.removeItem("user");
      }
    }
  }, [location, navigate]);

  // Debounced Search API Logic
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setIsLoadingSearch(false);
      return;
    }

    setIsLoadingSearch(true);

    const delayDebounceFn = setTimeout(async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/search?q=${searchQuery}`,
          { withCredentials: true }
        );
        setSearchResults(response.data?.data || response.data || []);
      } catch (error) {
        console.error("Search API Error:", error);
      } finally {
        setIsLoadingSearch(false);
      }
    }, 600);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  // Close search dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(event.target)) {
        setShowServicesDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/logout`,
        {},
        { withCredentials: true }
      );
    } catch (err) {
      console.error(err);
      localStorage.removeItem("user");
    } finally {
      localStorage.removeItem("user");
      setUser(null);
      setMobileOpen(false);
      navigate("/login");
    }
  };

  // Smooth-scroll to footer, navigating home first if needed
  const handleAboutClick = (e, closeMobile) => {
    e.preventDefault();
    if (closeMobile) setMobileOpen(false);

    if (location.pathname === "/") {
      document.getElementById("site-footer")?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        document.getElementById("site-footer")?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  };

  const username =
    user?.name ||
    user?.fullName ||
    user?.username ||
    user?.firstName ||
    "User";

  const avatar =
    user?.avatar ||
    user?.profileImage ||
    user?.photo ||
    user?.image ||
    "";

  const getDashboardPath = () => {
    switch (user?.role) {
      case "client":
        return "/dashboard";
      case "manager":
        return "/employee";
      case "admin":
        return "/admin";
      case "review":
        return "/employee";
      case "property":
        return "/employee";
      case "visit":
        return "/employee";
      default:
        return "/";
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm h-[58px]">
        <div className="max-w-[1450px] mx-auto px-5 h-full flex items-center justify-between">
          
          {/* LEFT */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <img
                src="/logo.jpeg"
                alt="logo"
                className="h-12 w-auto object-contain"
              />
              <div className="leading-none">
                <div className="flex items-baseline gap-0">
                  <span className="text-[20px] font-black text-[#1B7A3E] tracking-tight">Ghar</span>
                </div>
                <div className="flex items-baseline gap-0">
                  <span className="text-[20px] font-black text-[#1B7A3E] tracking-tight">Bazaar</span>
                  <span className="text-[12px] font-bold text-[#4CAF7D] ml-0.5">.in</span>
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-6">
              {NAV_LINKS.map(({ label, path, hasDropdown, dropdown }) => {
                const isActive = location.pathname === path || (label === "Services" && location.pathname.startsWith("/services"));
                const isAbout = label === "About";

                if (hasDropdown) {
                  return (
                    <div 
                      key={label}
                      ref={servicesDropdownRef}
                      className="relative"
                      onMouseEnter={() => setShowServicesDropdown(true)}
                      onMouseLeave={() => setShowServicesDropdown(false)}
                    >
                      <Link
                        to={path}
                        className={`relative text-[15px] font-medium transition-colors ${
                          isActive
                            ? "text-black"
                            : "text-gray-700 hover:text-black"
                        }`}
                      >
                        {label}
                        {isActive && (
                          <span className="absolute left-0 -bottom-[14px] h-[2px] w-full bg-black rounded-full" />
                        )}
                      </Link>

                      {/* Services Dropdown */}
                      {showServicesDropdown && (
                        <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden">
                          {dropdown.map((item) => {
                            const ItemIcon = item.icon;
                            return (
                              <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setShowServicesDropdown(false)}
                                className="flex items-center gap-3 px-4 py-3 hover:bg-green-50 transition-colors border-b border-gray-100 last:border-0"
                              >
                                <ItemIcon size={18} className="text-green-700 shrink-0" strokeWidth={1.8} />
                                <span className="text-sm font-medium text-gray-700">{item.label}</span>
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={label}
                    to={isAbout ? "#" : path}
                    onClick={isAbout ? (e) => handleAboutClick(e, false) : undefined}
                    className={`relative text-[15px] font-medium transition-colors ${
                      isActive
                        ? "text-black"
                        : "text-gray-700 hover:text-black"
                    }`}
                  >
                    {label}

                    {isActive && (
                      <span className="absolute left-0 -bottom-[14px] h-[2px] w-full bg-black rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-5">

            {/* Search Container with Dropdown */}
            <div ref={searchContainerRef} className="hidden md:block relative min-w-[320px]">
              <div className="flex items-center border-b border-gray-400 w-full relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowDropdown(true);
                  }}
                  onFocus={() => setShowDropdown(true)}
                  placeholder="Search properties, location..."
                  className="w-full bg-transparent py-1 text-sm outline-none pr-8 text-gray-700 placeholder:text-gray-500"
                />
                <div className="absolute right-0 flex items-center">
                  {isLoadingSearch ? (
                    <Loader2 size={18} className="text-gray-500 animate-spin" />
                  ) : (
                    <Search size={18} className="text-gray-600" />
                  )}
                </div>
              </div>

              {/* Live Search Results Dropdown */}
              {showDropdown && searchQuery.trim() && (
                <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl max-h-[300px] overflow-y-auto z-50">
                  {isLoadingSearch ? (
                    <div className="p-4 text-center text-sm text-gray-500">Searching...</div>
                  ) : searchResults.length > 0 ? (
                    <div className="py-2">
                      {searchResults.map((item) => (
                        <Link
                          key={item._id || item.id}
                          to={`/property/${item._id || item.id}`}
                          onClick={() => {
                            setShowDropdown(false);
                            setSearchQuery("");
                          }}
                          className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition border-b border-gray-50 last:border-0"
                        >
                          {item.images?.[0] || item.image ? (
                            <img 
                              src={item.images?.[0] || item.image} 
                              alt={item.title} 
                              className="w-10 h-10 object-cover rounded bg-gray-100 shrink-0" 
                            />
                          ) : (
                            <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center shrink-0">
                              <Search size={16} className="text-gray-400" />
                            </div>
                          )}
                          <div className="overflow-hidden">
                            <p className="text-sm font-medium text-gray-900 truncate">{item.title || item.name}</p>
                            <p className="text-xs text-gray-500 truncate">{item.location || item.address || 'Property item'}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-sm text-gray-500">No results found</div>
                  )}
                </div>
              )}
            </div>

            {/* Wishlist */}
            <Link
              to="/favorites"
              className="relative text-gray-700 hover:text-green-700 transition"
            >
              <Heart size={20} strokeWidth={1.7} />

              {bookmarkCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] h-4 w-4 rounded-full flex items-center justify-center">
                  {bookmarkCount}
                </span>
              )}
            </Link>

            {/* USER */}
            {user ? (
              <div ref={profileDropdownRef} className="hidden md:block relative">
                <button
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition"
                >
                  <span className="text-[14px] text-green-700 font-medium whitespace-nowrap">
                    Hi, {username}
                  </span>

                  <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-300 shadow-sm">
                    {avatar ? (
                      <img
                        src={avatar}
                        alt={username}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-green-700 text-white flex items-center justify-center font-semibold">
                        {username?.charAt(0)?.toUpperCase()}
                      </div>
                    )}
                  </div>
                </button>

                {/* Profile Dropdown */}
                {showProfileDropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden">
                    <div className="p-4 border-b border-gray-100 bg-gray-50">
                      <p className="font-bold text-gray-900 truncate">{username}</p>
                      <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                    </div>
                    
                    <div className="py-2">
                      <Link
                        to={getDashboardPath()}
                        onClick={() => setShowProfileDropdown(false)}
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors"
                      >
                        <LayoutDashboard size={18} className="text-gray-600" />
                        <span className="text-sm font-medium text-gray-700">Dashboard</span>
                      </Link>
                      
                      <button
                        onClick={() => {
                          setShowProfileDropdown(false);
                          handleLogout();
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 transition-colors text-left"
                      >
                        <LogOut size={18} className="text-red-600" />
                        <span className="text-sm font-medium text-red-600">Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden md:flex bg-green-800 text-white px-5 py-2 rounded-md text-sm font-medium"
              >
                Login
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-gray-800"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* MOBILE DRAWER */}
        <div
          className={`lg:hidden fixed inset-0 top-[58px] bg-[#EDE8DF] z-40 transition-transform duration-300 overflow-y-auto ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col w-full">

            {/* User profile row */}
            {user ? (
              <div className="flex items-center gap-4 px-5 py-5 border-b border-[#d5cfc5]">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0">
                  {avatar ? (
                    <img src={avatar} alt={username} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-[#1B9E4B] text-white flex items-center justify-center font-bold text-xl">
                      {username?.charAt(0)?.toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="overflow-hidden">
                  <p className="font-bold text-[#0A0A0A] text-[16px] truncate">{username}</p>
                  <p className="text-sm text-gray-500 truncate">{user?.email}</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4 px-5 py-5 border-b border-[#d5cfc5]">
                <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                  <CircleUserRound size={32} className="text-gray-400" strokeWidth={1.5} />
                </div>
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="font-bold text-[#0A0A0A] text-[16px]"
                >
                  Login / Register
                </Link>
              </div>
            )}

            {/* Nav links */}
            {NAV_LINKS.map(({ label, path, icon: Icon, hasDropdown, dropdown }) => {
              const isAbout = label === "About";
              
              if (hasDropdown) {
                return (
                  <div key={label}>
                    <Link
                      to={path}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-4 px-5 py-[15px] border-b border-[#d5cfc5] text-[#0A0A0A] hover:bg-black/5 transition-colors"
                    >
                      <Icon size={20} className="text-[#0A0A0A] shrink-0" strokeWidth={1.8} />
                      <span className="text-[15px] font-medium">{label}</span>
                    </Link>
                    {/* Dropdown items in mobile */}
                    {dropdown.map((subItem) => {
                      const SubIcon = subItem.icon;
                      return (
                        <Link
                          key={subItem.path}
                          to={subItem.path}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-4 px-5 py-3 pl-14 bg-gray-50 border-b border-[#d5cfc5] text-gray-700 hover:bg-black/5 transition-colors"
                        >
                          <SubIcon size={16} className="text-green-700 shrink-0" strokeWidth={1.8} />
                          <span className="text-[14px] font-medium">{subItem.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                );
              }
              
              return (
                <Link
                  key={label}
                  to={isAbout ? "#" : path}
                  onClick={isAbout ? (e) => handleAboutClick(e, true) : () => setMobileOpen(false)}
                  className="flex items-center gap-4 px-5 py-[15px] border-b border-[#d5cfc5] text-[#0A0A0A] hover:bg-black/5 transition-colors"
                >
                  <Icon size={20} className="text-[#0A0A0A] shrink-0" strokeWidth={1.8} />
                  <span className="text-[15px] font-medium">{label}</span>
                </Link>
              );
            })}

            {/* Dashboard + Logout (logged in only) */}
            {user && (
              <>
                <Link
                  to={getDashboardPath()}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-4 px-5 py-[15px] border-b border-[#d5cfc5] text-[#0A0A0A] hover:bg-black/5 transition-colors"
                >
                  <LayoutDashboard size={20} className="text-[#0A0A0A] shrink-0" strokeWidth={1.8} />
                  <span className="text-[15px] font-medium">Dashboard</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-4 px-5 py-[15px] border-b border-[#d5cfc5] text-red-500 hover:bg-red-50/40 transition-colors text-left"
                >
                  <LogOut size={20} className="text-red-500 shrink-0" strokeWidth={1.8} />
                  <span className="text-[15px] font-medium">Logout</span>
                </button>
              </>
            )}

          </div>
        </div>
      </header>

      {/* Spacer */}
      <div className="h-[58px]" />
    </>
  );
}