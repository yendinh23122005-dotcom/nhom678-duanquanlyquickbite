import React, { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  ExternalLink,
  Code2,
  UploadCloud,
  FileCode,
  Copy,
  Terminal,
  FolderGit2
} from 'lucide-react';
import { useCanteen } from '../context/CanteenContext';

export const VercelHelperView: React.FC = () => {
  const { menu, addMenuItem } = useCanteen();
  const [jsonInput, setJsonInput] = useState('');
  const [importStatus, setImportStatus] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const vercelUrl = 'https://canteen-goo.vercel.app';

  const handleImportJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      if (Array.isArray(parsed)) {
        parsed.forEach(item => {
          if (item.name && item.price) {
            addMenuItem({
              id: item.id || 'imp-' + Math.random().toString(36).substring(2, 7),
              name: item.name,
              category: item.category || 'rice',
              price: Number(item.price),
              image: item.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80',
              description: item.description || '',
              prepTimeMinutes: Number(item.prepTimeMinutes) || 5,
              calories: Number(item.calories) || 450,
              isAvailable: true
            });
          }
        });
        setImportStatus(`Đã nhập thành công ${parsed.length} món vào thực đơn!`);
      } else {
        setImportStatus('Dữ liệu JSON phải là một mảng danh sách món ăn [...]');
      }
    } catch {
      setImportStatus('Lỗi: Cú pháp JSON không hợp lệ. Vui lòng kiểm tra lại.');
    }
  };

  const handleCopyDeployCommands = () => {
    const cmds = `git clone <your-repo>\ncd canteen-goo\nnpm install\nnpm run build\nvercel deploy --prod`;
    navigator.clipboard.writeText(cmds);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Primary Diagnosis Header */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-stone-900">
              Kiểm tra liên kết: <code className="text-amber-900 bg-amber-50 px-1.5 py-0.5 rounded font-mono">{vercelUrl}</code>
            </h1>
            <p className="text-sm text-stone-600 mt-1">
              Phản hồi trực tiếp từ máy chủ Vercel: <span className="font-bold text-rose-600">DEPLOYMENT_NOT_FOUND (sin1)</span>
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-700 space-y-2">
          <p className="font-semibold text-stone-900">
            🔍 Vì sao link này không mở được trên trình duyệt?
          </p>
          <ul className="list-disc pl-5 space-y-1 text-stone-600">
            <li>
              <strong>Tên miền hoặc dự án đã bị xóa/đổi tên:</strong> Dự án trên Vercel của link này có thể đã bị xóa hoặc đổi sang subdomain khác (ví dụ: <code className="bg-stone-200 px-1 rounded">canteen-go</code>, <code className="bg-stone-200 px-1 rounded">canteen-food</code>).
            </li>
            <li>
              <strong>Gõ nhầm ký tự URL:</strong> Có thể bạn muốn mở <code className="bg-stone-200 px-1 rounded">canteen-go.vercel.app</code> (1 chữ "o") thay vì <code className="bg-stone-200 px-1 rounded">canteen-goo</code> (2 chữ "o").
            </li>
            <li>
              <strong>Chưa deploy hoặc build lỗi:</strong> Dự án chưa hoàn tất lệnh <code className="bg-stone-200 px-1 rounded">vercel --prod</code> lên Vercel.
            </li>
          </ul>
        </div>
      </div>

      {/* Solution: App Ready Here */}
      <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-6 space-y-3">
        <div className="flex items-center gap-2 text-emerald-900 font-bold">
          <CheckCircle className="w-5 h-5 text-emerald-600" />
          <span>Ứng dụng Canteen GO đã được triển khai và đang chạy trực tiếp tại đây!</span>
        </div>
        <p className="text-xs text-emerald-800 leading-relaxed">
          Bạn hoàn toàn có thể sử dụng ngay ứng dụng Căn Tin này với đầy đủ các tính năng:
          <br />• <strong>Khách hàng:</strong> Xem thực đơn, lọc món ăn chay/tiết kiệm, thêm vào giỏ hàng, thanh toán VietQR / Thẻ Căn Tin, nhận số còi rung.
          <br />• <strong>Bếp Canteen (KDS):</strong> Nhận vé gọi món, bấm giờ nấu, kích hoạt chuông rung tự động khi món đã hoàn thành.
          <br />• <strong>Quản lý:</strong> Quản lý kho món, bật tắt món còn/hết, thống kê doanh thu bán hàng.
        </p>
      </div>

      {/* Import your files or code */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4 shadow-xs">
        <div className="flex items-center gap-2.5">
          <UploadCloud className="w-5 h-5 text-orange-600" />
          <div>
            <h2 className="text-base font-bold text-stone-900">
              Bạn có mã nguồn hoặc file của dự án canteen-goo?
            </h2>
            <p className="text-xs text-stone-500">
              Nếu bạn có file mã nguồn (.tsx, .jsx, .json) hoặc link GitHub của dự án, bạn có thể dán vào đây hoặc cung cấp mã trực tiếp trong tin nhắn chat để tôi chạy và tích hợp ngay!
            </p>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1.5">
            Nhập dữ liệu thực đơn JSON hoặc danh sách món của bạn:
          </label>
          <textarea
            rows={5}
            value={jsonInput}
            onChange={e => setJsonInput(e.target.value)}
            placeholder={`[\n  {\n    "name": "Món ăn từ canteen-goo",\n    "price": 35000,\n    "category": "rice",\n    "description": "Mô tả món ăn..."\n  }\n]`}
            className="w-full font-mono text-xs p-3 rounded-xl border border-stone-200 bg-stone-50 focus:outline-none focus:border-orange-500"
          />
        </div>

        {importStatus && (
          <p className="text-xs font-semibold text-stone-800 bg-stone-100 p-2.5 rounded-lg border border-stone-200">
            {importStatus}
          </p>
        )}

        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleImportJson}
            disabled={!jsonInput.trim()}
            className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 disabled:bg-stone-300 text-white font-bold text-xs transition-colors shadow-xs"
          >
            Nhập dữ liệu món ăn
          </button>
        </div>
      </div>

      {/* Guide to deploy to Vercel */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-3 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-stone-700" />
            <h3 className="text-sm font-bold text-stone-900">
              Cách đưa ứng dụng này lên Vercel với domain của bạn:
            </h3>
          </div>

          <button
            onClick={handleCopyDeployCommands}
            className="text-xs text-stone-600 hover:text-stone-900 flex items-center gap-1 font-medium bg-stone-100 hover:bg-stone-200 px-2.5 py-1 rounded-lg transition-colors"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>{copied ? 'Đã sao chép!' : 'Sao chép lệnh'}</span>
          </button>
        </div>

        <div className="bg-stone-950 text-stone-200 rounded-xl p-4 font-mono text-xs overflow-x-auto space-y-1">
          <p className="text-stone-500"># 1. Đăng nhập vào Vercel CLI</p>
          <p className="text-emerald-400">npx vercel login</p>
          <p className="text-stone-500 pt-1"># 2. Deploy dự án lên Vercel</p>
          <p className="text-emerald-400">npx vercel --prod</p>
          <p className="text-stone-500 pt-1"># 3. Gán tên miền canteen-goo.vercel.app trong Settings &gt; Domains trên Vercel</p>
        </div>
      </div>

    </div>
  );
};
