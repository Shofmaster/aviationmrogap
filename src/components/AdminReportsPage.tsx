import { useQuery } from 'convex/react';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../convex/_generated/api';
import { FaDownload, FaHome, FaEnvelope, FaExclamationTriangle } from 'react-icons/fa';
import type { Id } from '../../convex/_generated/dataModel';

const ADMIN_EMAIL = 'hofmastershelby@gmail.com';

export default function AdminReportsPage() {
  const navigate = useNavigate();
  const { user, isLoaded } = useUser();
  const isAdmin = user?.primaryEmailAddress?.emailAddress === ADMIN_EMAIL;
  const reports = useQuery(api.pdfReports.listAllReports) ?? [];

  if (!isLoaded) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-sky-blue border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-4">
        <div className="glass-strong rounded-2xl p-8 max-w-md text-center">
          <FaExclamationTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
          <p className="text-gray-300 mb-6">You do not have permission to view this page.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-sky-blue hover:bg-sky-blue/90 text-navy-900 font-bold px-6 py-3 rounded-lg"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold gradient-text" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Assessment Reports
          </h1>
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <FaHome />
            Home
          </button>
        </div>

        <div className="space-y-4">
          {reports.map((report) => (
            <ReportRow key={report._id} report={report} />
          ))}
          {reports.length === 0 && (
            <div className="glass rounded-xl p-8 text-center">
              <p className="text-gray-400">No reports submitted yet.</p>
            </div>
          )}
        </div>
    </>
  );
}

function ReportRow({ report }: { report: { _id: string; companyName: string; overallScore: number; createdAt: number; emailSent: boolean; storageId: Id<'_storage'>; fileName: string } }) {
  const downloadUrl = useQuery(api.pdfReports.getReportUrl, {
    storageId: report.storageId,
  });

  const scoreColor = report.overallScore >= 80 ? 'text-green-400' : report.overallScore >= 60 ? 'text-yellow-400' : 'text-red-400';

  return (
    <div className="glass rounded-xl p-4 flex items-center justify-between">
      <div>
        <h3 className="font-semibold text-lg">{report.companyName}</h3>
        <div className="flex items-center gap-4 text-sm text-gray-400 mt-1">
          <span className={scoreColor}>Score: {report.overallScore}%</span>
          <span>{new Date(report.createdAt).toLocaleDateString()}</span>
          <span className="flex items-center gap-1">
            <FaEnvelope className={report.emailSent ? 'text-green-400' : 'text-red-400'} />
            {report.emailSent ? 'Sent' : 'Not sent'}
          </span>
        </div>
      </div>
      {downloadUrl && (
        <a
          href={downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-sky-blue hover:bg-sky-blue/90 text-navy-900 font-bold px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <FaDownload />
          Download
        </a>
      )}
    </div>
  );
}
