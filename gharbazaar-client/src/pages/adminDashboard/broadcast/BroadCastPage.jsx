// BroadcastPage.jsx
import axios from "axios";
import React, { useState, useMemo, useEffect } from "react";

export default function BroadcastPage() {
  // State management
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false); // Track active broadcast network request
  const [error, setError] = useState(null);

  const [message, setMessage] = useState("");
  const [broadcastType, setBroadcastType] = useState("all");
  const [selectedRoleFilter, setSelectedRoleFilter] = useState("all_roles");
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [logs, setLogs] = useState([]);

  // Defined system roles
  const roles = ["manager", "review", "property", "visit"];

  // Helper mapping for role badge colors using Tailwind utilities
  const roleBadgeStyles = {
    manager: "bg-red-100 text-red-800",
    review: "bg-amber-100 text-amber-800",
    property: "bg-green-100 text-green-800",
    visit: "bg-sky-100 text-sky-800",
  };

  // Grab the base URL from Vite environment variables
  const baseUrl = import.meta.env.VITE_BASE_URL || "";

  // Fetch employees from API on mount
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await axios.get(`${baseUrl}/getAllEmployee`, {
          withCredentials: true,
        });

        // Ensure data is an array before setting state
        setUsers(response.data.data || []);
      } catch (err) {
        console.error("Error fetching employees:", err);
        setError(
          err.message || "An error occurred while loading directory files.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployees();
  }, [baseUrl]);

  // Filtered users for the directory display
  const filteredUsers = useMemo(() => {
    if (selectedRoleFilter === "all_roles") return users;
    return users.filter((user) => user.role === selectedRoleFilter);
  }, [users, selectedRoleFilter]);

  // Handle individual user checkbox toggles using MongoDB _id
  const handleUserSelect = (userId) => {
    setSelectedUserIds((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId],
    );
  };

  // Select/Deselect all visible users when in individual mode using MongoDB _id
  const handleSelectAllVisible = () => {
    const visibleIds = filteredUsers.map((u) => u._id);
    const allVisibleSelected = visibleIds.every((id) =>
      selectedUserIds.includes(id),
    );

    if (allVisibleSelected) {
      setSelectedUserIds((prev) =>
        prev.filter((id) => !visibleIds.includes(id)),
      );
    } else {
      setSelectedUserIds((prev) =>
        Array.from(new Set([...prev, ...visibleIds])),
      );
    }
  };

  // Submit handler
  const handleSendBroadcast = async (e) => {
    e.preventDefault();
    if (!message.trim() || isSending) return;

    // UPDATE: Map to all user _ids if broadcastType is "all",
    // otherwise use the selectedUserIds
    const targetedUsers =
      broadcastType === "all" ? users.map((user) => user._id) : selectedUserIds;

    // Guard checking individual criteria matches
    if (broadcastType === "individual" && targetedUsers.length === 0) {
      alert("Please select at least one recipient.");
      return;
    }

    // Build clear human logging text metrics using MongoDB _id
    let targetSummary = "";
    if (broadcastType === "all") {
      targetSummary = `All Users (${users.length})`;
    } else {
      const recipientNames = users
        .filter((u) => targetedUsers.includes(u._id))
        .map((u) => `${u.name} (${u.role})`)
        .join(", ");
      targetSummary = `Selected Users [${recipientNames}]`;
    }

    try {
      setIsSending(true);

      // Execute POST Request to API
      await axios.post(
        `${baseUrl}/broadcast`,
        {
          message: message.trim(),
          users: targetedUsers, // Now contains either selected IDs or ALL IDs
        },
        { withCredentials: true },
      );

      // Add success record entry to dashboard UI logs
      const timestamp = new Date().toLocaleTimeString();
      const logEntry = `[${timestamp}] Sent to ${targetSummary}: "${message}"`;
      setLogs((prev) => [logEntry, ...prev]);

      // Reset input form elements safely
      setMessage("");
      if (broadcastType === "individual") setSelectedUserIds([]);
    } catch (err) {
      console.error("API Transmission failed:", err);
      alert(
        `Failed to transmit broadcast: ${err.response?.data?.message || err.message}`,
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl p-8 font-sans text-gray-800">
      <header className="mb-8 border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Admin Broadcast Dashboard
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Send immediate announcements to your system segments.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 items-start">
        {/* Left Column: Broadcast Controls */}
        <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-semibold text-gray-900">
            Compose Broadcast
          </h2>
          <form onSubmit={handleSendBroadcast}>
            {/* Strategy Toggles */}
            <div className="mb-5">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Recipient Scope
              </label>
              <div className="flex flex-col gap-2">
                <label className="flex cursor-pointer items-center gap-3 text-sm text-gray-600">
                  <input
                    type="radio"
                    name="broadcastType"
                    className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                    checked={broadcastType === "all"}
                    onChange={() => setBroadcastType("all")}
                    disabled={isLoading || isSending}
                  />
                  Broadcast to Everyone ({users.length} users)
                </label>
                <label className="flex cursor-pointer items-center gap-3 text-sm text-gray-600">
                  <input
                    type="radio"
                    name="broadcastType"
                    className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                    checked={broadcastType === "individual"}
                    onChange={() => setBroadcastType("individual")}
                    disabled={isLoading || isSending}
                  />
                  Select Individual Recipients ({selectedUserIds.length}{" "}
                  selected)
                </label>
              </div>
            </div>

            {/* Message Area */}
            <div className="mb-5">
              <label
                htmlFor="broadcast-msg"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Message Body
              </label>
              <textarea
                id="broadcast-msg"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your system announcement here..."
                className="w-full rounded-md border border-gray-300 p-3 text-sm font-sans placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
                disabled={isSending}
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              disabled={isLoading || isSending}
            >
              {isSending ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white"></div>
                  Broadcasting...
                </>
              ) : (
                "🚀 Launch Broadcast"
              )}
            </button>
          </form>

          {/* Activity Log */}
          {logs.length > 0 && (
            <div className="mt-6 border-t border-gray-200 pt-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Recent Transmission Log
              </h3>
              <div className="max-h-[150px] overflow-y-auto rounded-md bg-slate-800 p-4 font-mono text-xs text-slate-100 space-y-2">
                {logs.map((log, index) => (
                  <div
                    key={index}
                    className="leading-relaxed border-b border-slate-700/50 pb-1 last:border-0 last:pb-0"
                  >
                    {log}
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Right Column: Directory & Selection management */}
        <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-xl font-semibold text-gray-900">
              User Directory
            </h2>

            {/* Filter control */}
            <select
              value={selectedRoleFilter}
              onChange={(e) => setSelectedRoleFilter(e.target.value)}
              className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100"
              disabled={isLoading || isSending}
            >
              <option value="all_roles">All System Roles</option>
              {roles.map((role) => (
                <option key={role} value={role}>
                  Role: {role.charAt(0).toUpperCase() + role.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Bulk Checkbox Control if Individual Mode is active */}
          {broadcastType === "individual" &&
            filteredUsers.length > 0 &&
            !isLoading && (
              <button
                type="button"
                onClick={handleSelectAllVisible}
                disabled={isSending}
                className="mb-4 w-full rounded-md border border-gray-300 bg-gray-50 py-2 text-xs font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50"
              >
                {filteredUsers.every((u) => selectedUserIds.includes(u._id))
                  ? "Deselect All Visible"
                  : "Select All Visible"}
              </button>
            )}

          {/* User List Matrix with Loading/Error handling */}
          <div className="flex max-h-[500px] flex-col gap-3 overflow-y-auto pr-1">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-200 border-t-blue-600 mb-2"></div>
                <p className="text-sm">Loading employee records...</p>
              </div>
            ) : error ? (
              <p className="py-4 text-center text-sm font-medium text-red-600">
                ⚠️ Error: {error}
              </p>
            ) : filteredUsers.length === 0 ? (
              <p className="py-8 text-center text-sm text-gray-400">
                No users found matching this role constraint.
              </p>
            ) : (
              filteredUsers.map((user) => {
                const isSelected = selectedUserIds.includes(user._id);
                const isDisabled = broadcastType === "all" || isSending;

                return (
                  <div
                    key={user._id}
                    className={`flex items-center justify-between rounded-lg border p-3 transition-colors ${
                      isDisabled
                        ? "bg-gray-50 border-gray-200 opacity-80 cursor-not-allowed"
                        : isSelected
                          ? "bg-blue-50/70 border-blue-200 cursor-pointer"
                          : "bg-white border-gray-200 hover:bg-gray-50 cursor-pointer"
                    }`}
                    onClick={() => !isDisabled && handleUserSelect(user._id)}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={broadcastType === "all" ? true : isSelected}
                        disabled={isDisabled}
                        onChange={() => {}} // Regulated via parent div onClick handling
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:text-gray-400"
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {user.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {user.email}
                        </div>
                      </div>
                    </div>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${roleBadgeStyles[user.role] || "bg-gray-100 text-gray-800"}`}
                    >
                      {user.role}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
