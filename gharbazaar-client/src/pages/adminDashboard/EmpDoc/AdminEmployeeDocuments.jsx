import { useMemo, useState } from "react";
import { FileText, Image as ImageIcon, Download, Loader2, Search, User } from "lucide-react";
import { useGetAllDocumentsAdminQuery } from "../../employeDashBoard/EmployeeDocuments/employeeDocumentsQuery";

export default function AdminEmployeeDocuments() {
  const { data, isLoading, isError } = useGetAllDocumentsAdminQuery();
  const [search, setSearch] = useState("");

  const documents = data?.documents ?? [];

  // Group flat document list by employee
  const grouped = useMemo(() => {
    const map = new Map();
    for (const doc of documents) {
      const emp = doc.employee;
      const key = emp?._id || "unknown";
      if (!map.has(key)) {
        map.set(key, {
          name: emp?.fullName || "Unknown Employee",
          email: emp?.email || "",
          role: emp?.role || "",
          docs: [],
        });
      }
      map.get(key).docs.push(doc);
    }
    return Array.from(map.values());
  }, [documents]);

  const filtered = grouped.filter((g) =>
    g.name.toLowerCase().includes(search.toLowerCase()) ||
    g.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-5xl">
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold text-[#1B4332]">Employee Documents</h2>
          <p className="text-sm text-gray-500 mt-0.5">All documents uploaded by staff, grouped by employee.</p>
        </div>
        <div className="relative">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search employee…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2.5 text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-[#1B4332]/30 w-56 text-gray-700 shadow-sm"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-16 gap-3 text-gray-400">
          <Loader2 size={20} className="animate-spin text-[#1B4332]" />
          <span className="text-sm">Loading documents…</span>
        </div>
      ) : isError ? (
        <div className="text-center py-16 text-gray-500">Couldn't load documents.</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400 text-sm bg-[#FBF9F3] rounded-3xl">
          No documents found.
        </div>
      ) : (
        <div className="space-y-5">
          {filtered.map((group) => (
            <div key={group.name + group.email} className="bg-[#FBF9F3] rounded-3xl shadow-sm overflow-hidden">
              <div className="flex items-center gap-3 px-5 py-4 bg-[#EFEBDD]/60">
                <div className="w-9 h-9 rounded-full bg-[#1B4332] text-white flex items-center justify-center shrink-0">
                  <User size={15} />
                </div>
                <div>
                  <p className="font-bold text-[#1B2B22] text-sm">{group.name}</p>
                  <p className="text-xs text-gray-500">
                    {group.email} {group.role && `· ${group.role}`} · {group.docs.length} document{group.docs.length !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              <div className="divide-y divide-[#EFEBDD]">
                {group.docs.map((doc) => {
                  const isPdf = doc.fileType === "pdf";
                  return (
                    <div key={doc._id} className="flex items-center gap-4 px-5 py-3.5">
                      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm">
                        {isPdf ? <FileText size={16} className="text-red-500" /> : <ImageIcon size={16} className="text-blue-500" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#1B2B22] truncate">{doc.fileName}</p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {doc.category} · {new Date(doc.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <a
                        href={doc.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-white shadow-sm text-gray-500 hover:text-[#1B4332] transition-colors"
                        title="View / Download"
                      >
                        <Download size={14} />
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}