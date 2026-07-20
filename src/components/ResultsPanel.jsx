import { AlertTriangle, CircleCheck, Coins, Lightbulb, UtensilsCrossed } from 'lucide-react'
import NutritionChart from './NutritionChart'
import { dinhDangSo, dinhDangTien } from '../lib/nutrition'

function Infeasible({ ketQua }) {
  return (
    <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6 shadow-panel">
      <div className="flex items-start gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-amber-100 text-amber-700"><AlertTriangle size={22} /></span>
        <div>
          <h2 className="text-lg font-bold text-amber-900">Không có nghiệm khả thi</h2>
          <p className="mt-1 text-sm text-amber-800">{ketQua.reason}</p>
          <ul className="mt-4 space-y-2">
            {ketQua.suggestions?.map((g) => (
              <li key={g} className="flex items-start gap-2 rounded-xl bg-white/70 p-3 text-sm text-amber-900">
                <Lightbulb size={16} className="mt-0.5 shrink-0 text-amber-600" />{g}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default function ResultsPanel({ ketQua, thucPham, mucTieu }) {
  if (!ketQua) return null
  if (!ketQua.feasible) return <Infeasible ketQua={ketQua} />

  const monDuocChon = thucPham
    .map((mon) => ({ ...mon, khoiLuong: ketQua.khauPhan[mon.id] || 0 }))
    .filter((mon) => mon.khoiLuong > 0)
    .sort((a, b) => b.khoiLuong - a.khoiLuong)

  return (
    <section className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-emerald-200 bg-emerald-600 p-5 text-white shadow-panel">
          <div className="flex items-center gap-2 text-emerald-50"><Coins size={18} /><span className="text-sm">Tổng chi phí tối ưu / ngày</span></div>
          <p className="mt-2 text-3xl font-bold">{dinhDangTien(ketQua.tong.chiPhi)}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-panel">
          <div className="flex items-center gap-2 text-slate-500"><UtensilsCrossed size={18} /><span className="text-sm">Số món trong thực đơn</span></div>
          <p className="mt-2 text-3xl font-bold text-slate-900">{monDuocChon.length}<span className="ml-1 text-base font-normal text-slate-400">món</span></p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-panel">
          <div className="flex items-center gap-2 text-slate-500"><CircleCheck size={18} /><span className="text-sm">Tổng năng lượng đạt được</span></div>
          <p className="mt-2 text-3xl font-bold text-slate-900">{dinhDangSo(ketQua.tong.calo)}<span className="ml-1 text-base font-normal text-slate-400">kcal</span></p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-panel">
        <h2 className="text-lg font-semibold text-slate-900">Thực đơn tối ưu trong ngày</h2>
        <p className="mt-1 text-sm text-slate-500">Khối lượng (gram) cần dùng cho mỗi món để đạt chi phí thấp nhất.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {monDuocChon.map((mon) => (
            <div key={mon.id} className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div>
                <p className="font-medium text-slate-800">{mon.ten}</p>
                <p className="text-xs text-slate-400">{mon.nhom}</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-emerald-700 tabular-nums">{dinhDangSo(mon.khoiLuong)} g</p>
                <p className="text-xs text-slate-400 tabular-nums">{dinhDangTien(mon.gia * mon.khoiLuong / 100)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <NutritionChart tong={ketQua.tong} mucTieu={mucTieu} />
    </section>
  )
}
