// Demo User Setup Script
// Copy and paste this in browser console to create a demo user

const demoUser = {
  id: "demo123456",
  _id: "demo123456",
  name: "Vishu Panwar",
  email: "demo@gharbazaar.in",
  phone: "8171864219",
  phoneNumber: "8171864219",
  role: "client",
  isVerified: true,
  fcmToken: null
};

// Set demo user in localStorage
localStorage.setItem("user", JSON.stringify(demoUser));

// Also set a demo token
localStorage.setItem("token", "demo-token-12345");

console.log("✅ Demo user created successfully!");
console.log("User details:", demoUser);
console.log("\n🔄 Please refresh the page now.");
