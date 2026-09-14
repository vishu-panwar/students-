import { useState, useRef } from "react";
import { toast } from "react-toastify";
import {
  UploadCloud,
  FileText,
  Image as ImageIcon,
  Trash2,
  Loader2,
  Download,
  X,
} from "lucide-react";
import {
  useGetMyDocumentsQuery,
  useUploadDocumentMutation,
  useDeleteDocumentMutation,
} from "../EmployeeDocuments/employeeDocumentsQuery";

const CATEGORIES = ["General", "ID Proof", "Certificate", "Resume", "Offer Letter", "Other"];

function DocCard({ doc, onDelete, deleting }) {
  const isPdf = doc.fileType === "pdf";
  return (
    <div className="bg-[#FBF9F3] rounded-2xl p-4 flex items-center gap-4 shadow-sm">
      <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm">
        {isPdf ? <FileText size={20} className="text-red-500" /> : <ImageIcon size={20} className="text-blue-500" />}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-[#1B2B22] truncate">{doc.fileName}</p>
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
        <Download size={15} />
      </a>
      <button
        onClick={() => onDelete(doc)}
        disabled={deleting}
        className="p-2 rounded-full bg-white shadow-sm text-red-400 hover:text-red-600 transition-colors disabled:opacity-50"
        title="Delete"
      >
        <Trash2 size={15} />
      </button>
    </div>
  );
}

export default function EmployeeDocuments() {
  const { data, isLoading, isError } = useGetMyDocumentsQuery();
  const [uploadDocument, { isLoading: uploading }] = useUploadDocumentMutation();
  const [deleteDocument] = useDeleteDocumentMutation();

  const [category, setCategory] = useState("General");
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const documents = data?.documents ?? [];

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowed = ["application/pdf", "image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowed.includes(file.type)) {
      toast.error("Only PDF, JPG, PNG, or WEBP files are allowed");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error("File must be under 10MB");
      return;
    }
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please choose a file first");
      return;
    }
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("category", category);
    formData.append("fileName", selectedFile.name);

    try {
      await uploadDocument(formData).unwrap();
      toast.success("Document uploaded");
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      toast.error(err?.data?.message || "Upload failed");
    }
  };

  const handleDelete = async (doc) => {
    try {
      await deleteDocument(doc._id).unwrap();
      toast.success("Document deleted");
    } catch {
      toast.error("Failed to delete document");
    }
  };

  return (
    <div className="max-w-3xl">
      <div className="mb-5">
        <h2 className="text-xl font-bold text-[#1B4332]">My Documents</h2>
        <p className="text-sm text-gray-500 mt-0.5">
          Upload and manage your documents (PDF, JPG, PNG, WEBP — up to 10MB).
        </p>
      </div>

      {/* Upload card */}
      <div className="bg-[#FBF9F3] rounded-3xl p-5 shadow-sm mb-6">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white shadow-sm text-sm font-semibold text-[#1B4332] hover:bg-gray-50 transition-colors"
          >
            <UploadCloud size={16} />
            {selectedFile ? selectedFile.name : "Choose file"}
          </button>

          {selectedFile && (
            <button
              onClick={() => {
                setSelectedFile(null);
                if (fileInputRef.current) fileInputRef.current.value = "";
              }}
              className="p-2 rounded-full bg-white shadow-sm text-gray-400 hover:text-red-500 transition-colors self-center"
              title="Clear selection"
            >
              <X size={14} />
            </button>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png,.webp"
            onChange={handleFileChange}
            className="hidden"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2.5 text-sm bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1B4332]/30 text-gray-700 shadow-sm"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <button
            onClick={handleUpload}
            disabled={uploading || !selectedFile}
            className="flex items-center justify-center gap-2 bg-[#1B4332] text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-[#143828] transition-colors disabled:opacity-50 sm:ml-auto"
          >
            {uploading && <Loader2 size={14} className="animate-spin" />}
            Upload
          </button>
        </div>
      </div>

      {/* Document list */}
      {isLoading ? (
        <div className="flex items-center justify-center py-16 gap-3 text-gray-400">
          <Loader2 size={20} className="animate-spin text-[#1B4332]" />
          <span className="text-sm">Loading documents…</span>
        </div>
      ) : isError ? (
        <div className="text-center py-16 text-gray-500">Couldn't load your documents.</div>
      ) : documents.length === 0 ? (
        <div className="text-center py-16 text-gray-400 text-sm bg-[#FBF9F3] rounded-3xl">
          No documents uploaded yet.
        </div>
      ) : (
        <div className="space-y-3">
          {documents.map((doc) => (
            <DocCard key={doc._id} doc={doc} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}