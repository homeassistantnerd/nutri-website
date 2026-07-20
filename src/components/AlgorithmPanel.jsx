import { BrainCircuit, Code2, Sigma } from 'lucide-react'
import { taoChuoiCongThuc } from '../lib/optimizer'

export default function AlgorithmPanel({ thucPham, mucTieu, ketQua }) {
  const congThuc = taoChuoiCongThuc(thucPham, mucTieu)
  const soBien = thucPham.filter((mon) => !mon.loaiBo).length
  const soRangBuoc = Object.values(mucTieu).reduce((tong, item) => tong + (item?.min !== '' ? 1 : 0) + (item?.max !== '' ? 1 : 0), 0) + soBien

  return (
    <section className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-6 shadow-panel">
      <div className="flex items-start gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-200"><BrainCircuit size={22} /></span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">Bộ máy tối ưu hóa toán học</p>
          <h2 className="mt-1 text-xl font-bold text-slate-950">Quy hoạch Tuyến tính (Linear Programming)</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Ứng dụng không chọn món bằng mẹo thủ công. Mỗi thực phẩm là một biến quyết định <strong>xᵢ</strong> biểu diễn số khẩu phần 10g. Mô hình Quy hoạch Tuyến tính tìm tổ hợp có chi phí nhỏ nhất nhưng vẫn thỏa mãn tất cả giới hạn dinh dưỡng.
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1.1fr_.9fr]">
        <div className="rounded-2xl border border-emerald-100 bg-white/85 p-4">
          <div className="mb-3 flex items-center gap-2 font-semibold text-slate-800"><Sigma size={18} className="text-emerald-700" /> Mô hình đang chạy</div>
          <div className="space-y-3 font-mono text-sm text-slate-700">
            <div className="rounded-xl bg-slate-950 p-3 text-emerald-100"><span className="text-emerald-300">Hàm mục tiêu:</span><br />{congThuc.objective}</div>
            <div className="rounded-xl bg-slate-50 p-3"><span className="font-sans font-semibold text-slate-500">Ví dụ ràng buộc Calo</span><br />{congThuc.calories}</div>
            <div className="rounded-xl bg-slate-50 p-3"><span className="font-sans font-semibold text-slate-500">Không âm</span><br />{congThuc.nonNegative}</div>
          </div>
        </div>

        <div className="rounded-2xl border border-emerald-100 bg-white/85 p-4">
          <div className="mb-3 flex items-center gap-2 font-semibold text-slate-800"><Code2 size={18} className="text-emerald-700" /> Dạng JSON gửi vào solver</div>
          <div className="grid gap-3 text-sm">
            <div className="rounded-xl bg-slate-50 p-3"><p className="text-xs uppercase tracking-wide text-slate-500">Số biến quyết định</p><p className="mt-1 text-2xl font-semibold text-slate-900">{soBien}</p></div>
            <div className="rounded-xl bg-slate-50 p-3"><p className="text-xs uppercase tracking-wide text-slate-500">Số ràng buộc</p><p className="mt-1 text-2xl font-semibold text-slate-900">{soRangBuoc}</p></div>
            <div className="rounded-xl bg-slate-950 p-3 font-mono text-xs text-slate-100">
              {'{'} optimize: <span className="text-emerald-300">"chiPhi"</span>, opType: <span className="text-emerald-300">"min"</span>, variables: <span className="text-cyan-200">x₁...xₙ</span> {'}'}
            </div>
            {ketQua && <div className={`rounded-xl p-3 text-sm ${ketQua.feasible ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-800'}`}>{ketQua.feasible ? 'Solver đã tìm được nghiệm khả thi và tối ưu theo chi phí.' : 'Solver báo bài toán chưa khả thi với ràng buộc hiện tại.'}</div>}
          </div>
        </div>
      </div>
    </section>
  )
}
