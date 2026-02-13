import { useRef, useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { SectionProps, FormField } from './FormComponents';
import { FaCloudUploadAlt, FaFileAlt, FaTimes } from 'react-icons/fa';
import { SignedIn, SignedOut } from '@clerk/clerk-react';

const ACCEPT = '.pdf,.doc,.docx,.xls,.xlsx,.txt,.csv,.png,.jpg,.jpeg';
const MAX_FILE_SIZE_MB = 25;
const MAX_FILES = 20;

export default function DocumentUploadSection({ data, updateData }: SectionProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const generateUploadUrl = useMutation(api.pdfReports.generateUploadUrl);

  const docs = data.uploadedDocuments ?? [];

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    setError(null);
    const toAdd: { storageId: string; fileName: string }[] = [];
    const maxTotal = MAX_FILES - docs.length;
    const remaining = Math.min(files.length, maxTotal);

    if (files.length > maxTotal) {
      setError(`Only ${maxTotal} more file(s) can be added (max ${MAX_FILES} total).`);
    }

    setUploading(true);
    try {
      for (let i = 0; i < remaining; i++) {
        const file = files[i];
        if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
          setError(`"${file.name}" is over ${MAX_FILE_SIZE_MB}MB and was skipped.`);
          continue;
        }
        const uploadUrl = await generateUploadUrl();
        const res = await fetch(uploadUrl, {
          method: 'POST',
          headers: { 'Content-Type': file.type || 'application/octet-stream' },
          body: file,
        });
        if (!res.ok) throw new Error('Upload failed');
        const { storageId } = (await res.json()) as { storageId: string };
        toAdd.push({ storageId, fileName: file.name });
      }
      updateData({
        ...data,
        uploadedDocuments: [...docs, ...toAdd],
      });
    } catch (err) {
      console.error(err);
      setError('One or more uploads failed. Please try again.');
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const removeDoc = (index: number) => {
    const next = docs.filter((_, i) => i !== index);
    updateData({ ...data, uploadedDocuments: next });
  };

  return (
    <div className="space-y-6">
      <p className="text-gray-300 text-sm">
        Upload company manuals, procedures, quality documents, or other files to include in your full gap analysis. 
        These will be stored securely and referenced in your assessment report.
      </p>

      <SignedOut>
        <div className="rounded-lg bg-white/5 border border-white/10 p-4 text-center text-gray-400 text-sm">
          Sign in to upload company documents for full analysis. Your files will be kept confidential.
        </div>
      </SignedOut>

      <SignedIn>
        <FormField
          label="Company files & manuals"
          helpText={`PDF, Word, Excel, text, or images. Max ${MAX_FILE_SIZE_MB}MB per file, up to ${MAX_FILES} files.`}
        >
          <div
            className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:border-sky-blue/50 transition-colors cursor-pointer"
            onClick={() => inputRef.current?.click()}
          >
            <input
              ref={inputRef}
              type="file"
              accept={ACCEPT}
              multiple
              className="hidden"
              onChange={handleFileSelect}
              disabled={uploading || docs.length >= MAX_FILES}
            />
            {uploading ? (
              <p className="text-sky-blue">Uploading…</p>
            ) : docs.length >= MAX_FILES ? (
              <p className="text-gray-400">Maximum number of files reached.</p>
            ) : (
              <>
                <FaCloudUploadAlt className="w-12 h-12 text-sky-blue mx-auto mb-3" />
                <p className="text-gray-300 font-medium">Click or drag files here</p>
                <p className="text-gray-500 text-sm mt-1">Manuals, procedures, quality docs, etc.</p>
              </>
            )}
          </div>
        </FormField>

        {error && (
          <p className="text-sm text-red-300" role="alert">
            {error}
          </p>
        )}

        {docs.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-300">
              Uploaded for full analysis ({docs.length})
            </h3>
            <ul className="space-y-2">
              {docs.map((doc, index) => (
                <li
                  key={`${doc.storageId}-${index}`}
                  className="flex items-center gap-3 rounded-lg bg-white/5 px-3 py-2 text-sm"
                >
                  <FaFileAlt className="w-4 h-4 text-sky-blue flex-shrink-0" />
                  <span className="flex-1 truncate text-gray-300" title={doc.fileName}>
                    {doc.fileName}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeDoc(index)}
                    className="text-gray-400 hover:text-red-400 transition-colors p-1"
                    aria-label={`Remove ${doc.fileName}`}
                  >
                    <FaTimes className="w-4 h-4" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </SignedIn>
    </div>
  );
}
