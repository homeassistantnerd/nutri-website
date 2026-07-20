import { useState } from 'react'
import { Calculator, ChevronRight, Leaf, RotateCcw, Sparkles } from 'lucide-react'
import AlgorithmPanel from './components/AlgorithmPanel'
import FoodDatabase from './components/FoodDatabase'
import ResultsPanel from './components/ResultsPanel'
import TargetSettings from './components/TargetSettings'
import { THUC_PHAM_MAC_DINH } from './data/foods'
import { taoMucTieuMacDinh } from './lib/nutrition'
import { giaiBaiToanKhauPhan } from './lib/optimizer'

const THONG_TIN_MAC_DINH = { tuoi: 17, gioiTinh: 'nam', chieuCao: 170, canNang: 62, hoatDong: 'vua' }

const BUOC = [
  ['01', 'Thiết lập mục tiêu'],
  ['02', 'Chọn thực phẩm'],
  ['03', 'Tối ưu hóa'],
  ['04', 'Xem kết quả'],
]

function saoChepThucPhamMacDinh() {
  return THUC_PHAM_MAC_DINH.map((mon) => ({ ...mon, soThich: 'binhThuong', loaiBo: false }))
}

export default function App() {
  const [thongTin, setThongTin] = useState(THONG_TIN_MAC_DINH)
  const [mucTieu, setMucTieu] = useState(() => taoMucTieuMacDinh(THONG_TIN_MAC_DINH))
  const [thucPham, setThucPham] = useState(saoChepThucPhamMacDinh)
  const [ketQua, setKetQua] = useState(null)
  const [dangToiUu, setDangToiUu] = useState(false)

  const toiUu = () => {
    setDangToiUu(true)
    // Độ trễ rất nhỏ giúp trạng thái đang giải hiển thị rõ khi thuyết trình.
    window.setTimeout(() => {
      setKetQua(giaiBaiToanKhauPhan(thucPham, mucTieu))
      setDangToiUu(false)
      window.setTimeout(() => document.getElementById('ket-qua')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 30)
    }, 350)
  }

  const datLai = () => {
    setThongTin(THONG_TIN_MAC_DINH)
    setMucTieu(taoMucTieuMacDinh(THONG_TIN_MAC_DINH))
    setThucPham(saoChepThucPhamMacDinh())
    setKetQua(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen grid-background">
      <header className="border-b border-emerald-900/10 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-4 py-4 sm:px-6">
          <a href="#dau-trang" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-600 text-white shadow-lg shadow-emerald-200"><Leaf size={22} /></span>
            <span><strong className="block text-base leading-tight text-slate-950">NutriOpti</strong><span className="block text-xs text-slate-500">Tối ưu hóa khẩu phần</span></span>
          </a>
          <button onClick={datLai} className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100"><RotateCcw size={16} />Đặt lại</button>
        </div>
      </header>

      <main id="dau-trang" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
        <section className="fade-up rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-800 px-6 py-10 text-white shadow-xl shadow-emerald-950/10 sm:px-10">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-emerald-50"><Sparkles size={14} />Dự án Khoa học & Kỹ thuật — Tin học / Hệ thống phần mềm</div>
            <h1 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">Phần mềm Tối ưu hóa<br className="hidden sm:block" /> Khẩu phần Dinh dưỡng</h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-emerald-50 sm:text-base">Thiết kế thực đơn đủ dinh dưỡng với chi phí thấp nhất bằng <strong>Quy hoạch Tuyến tính (Linear Programming)</strong> và thuật toán <strong>Simplex</strong>, chạy hoàn toàn trên trình duyệt.</p>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {BUOC.map(([so, ten]) => <a key={so} href={so === '01' ? '#muc-tieu' : so === '02' ? '#thuc-pham' : so === '03' ? '#bo-may' : '#ket-qua'} className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-sm transition hover:bg-white/20"><span className="font-mono text-xs text-emerald-200">{so}</span>{ten}<ChevronRight size={14} /></a>)}
          </div>
        </section>

        <div className="mt-10 space-y-10">
          <section id="muc-tieu" className="scroll-mt-6 fade-up delay-1">
            <div className="mb-4 flex items-center gap-3"><span className="grid h-8 w-8 place-items-center rounded-full bg-emerald-600 text-sm font-bold text-white">1</span><div><h2 className="font-semibold text-slate-900">Thiết lập mục tiêu dinh dưỡng</h2><p className="text-sm text-slate-500">Hồ sơ cá nhân và các ràng buộc của bài toán.</p></div></div>
            <TargetSettings thongTin={thongTin} setThongTin={setThongTin} mucTieu={mucTieu} setMucTieu={setMucTieu} />
          </section>

          <section id="thuc-pham" className="scroll-mt-6 fade-up delay-2">
            <div className="mb-4 flex items-center gap-3"><span className="grid h-8 w-8 place-items-center rounded-full bg-emerald-600 text-sm font-bold text-white">2</span><div><h2 className="font-semibold text-slate-900">Chọn thực phẩm và giá cả</h2><p className="text-sm text-slate-500">Điều chỉnh dữ liệu đầu vào cho mô hình.</p></div></div>
            <FoodDatabase thucPham={thucPham} setThucPham={setThucPham} />
          </section>

          <section id="bo-may" className="scroll-mt-6">
            <div className="mb-4 flex items-center gap-3"><span className="grid h-8 w-8 place-items-center rounded-full bg-emerald-600 text-sm font-bold text-white">3</span><div><h2 className="font-semibold text-slate-900">Bộ máy tối ưu hóa</h2><p className="text-sm text-slate-500">Mô hình toán học minh bạch, có thể giải thích trước hội đồng.</p></div></div>
            <AlgorithmPanel thucPham={thucPham} mucTieu={mucTieu} ketQua={ketQua} />
            <div className="mt-5 flex justify-center">
              <button onClick={toiUu} disabled={dangToiUu} className="inline-flex min-w-[260px] items-center justify-center gap-3 rounded-xl bg-emerald-600 px-6 py-4 text-base font-bold text-white shadow-lg shadow-emerald-200 transition hover:bg-emerald-700 disabled:cursor-wait disabled:bg-emerald-400">
                <Calculator size={21} />{dangToiUu ? 'Đang chạy Simplex…' : 'Tối Ưu Hóa Khẩu Phần'}
              </button>
            </div>
          </section>

          <section id="ket-qua" className="scroll-mt-6">
            <div className="mb-4 flex items-center gap-3"><span className="grid h-8 w-8 place-items-center rounded-full bg-emerald-600 text-sm font-bold text-white">4</span><div><h2 className="font-semibold text-slate-900">Kết quả tối ưu</h2><p className="text-sm text-slate-500">Khẩu phần, chi phí tối thiểu và bằng chứng đáp ứng dinh dưỡng.</p></div></div>
            {ketQua ? <ResultsPanel ketQua={ketQua} thucPham={thucPham} mucTieu={mucTieu} /> : <div className="rounded-2xl border border-dashed border-slate-300 bg-white/70 px-6 py-12 text-center text-slate-500"><Calculator className="mx-auto mb-3 text-slate-300" size={32} /><p className="font-medium text-slate-600">Chưa có kết quả tối ưu</p><p className="mt-1 text-sm">Hãy kiểm tra mục tiêu, thực phẩm rồi nhấn “Tối Ưu Hóa Khẩu Phần”.</p></div>}
          </section>
        </div>
      </main>
      <footer className="mt-8 border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">NutriOpti · Mô hình học thuật sử dụng Quy hoạch Tuyến tính (Simplex) · Dữ liệu dinh dưỡng dùng cho mục đích giáo dục</footer>
    </div>
  )
}
