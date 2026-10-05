import React from 'react';
import { AlertCircle, ArrowRight, ExternalLink, X } from 'lucide-react';
import { useCanteen } from '../context/CanteenContext';

export const VercelBanner: React.FC = () => {
  const { showVercelNotice, setShowVercelNotice, setActiveView } = useCanteen();

  if (!showVercelNotice) return null;

  return (
    <div className="bg-amber-50 border-b border-amber-200 text-amber-950 px-4 py-2.5 text-sm">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-1 bg-amber-200/80 rounded text-amber-800 shrink-0">
            <AlertCircle className="w-4 h-4" />
          </div>
          <div>
            <span className="font-semibold text-amber-900">Thông báo về link canteen-goo: </span>
            <span className="text-amber-800">
              Trang <code className="bg-amber-100/90 text-amber-900 px-1.5 py-0.5 rounded font-mono text-xs">canteen-goo.vercel.app</code> hiện đang báo <span className="font-medium text-amber-950">DEPLOYMENT_NOT_FOUND</span> trên máy chủ Vercel. Chúng tôi đã khởi chạy sẵn toàn bộ hệ thống <span className="font-semibold text-amber-900">Canteen GO</span> hoàn chỉnh tại đây!
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto justify-end">
          <button
            onClick={() => setActiveView('import-code')}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-900 hover:text-amber-950 bg-amber-200/70 hover:bg-amber-200 px-2.5 py-1 rounded transition-colors"
          >
            <span>Tùy chỉnh & Khắc phục Vercel</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setShowVercelNotice(false)}
            className="p-1 text-amber-700 hover:text-amber-900 hover:bg-amber-200/50 rounded transition-colors"
            title="Đóng thông báo"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
