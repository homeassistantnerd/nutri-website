import { Fragment } from 'react'
import { Ban, Heart, HeartOff, Pencil } from 'lucide-react'
import { NHOM_THUC_PHAM } from '../data/foods'
import { dinhDangSo } from '../lib/nutrition'

const NHAN_SO_THICH = {
  thich: { nhan: 'Ưa thích', icon: Heart, className: 'bg-rose-50 text-rose-700 border-rose-200' },
  binhThuong: { nhan: 'Bình thường', icon: HeartOff, className: 'bg-slate-50 text-slate-600 border-slate-200' },
  khongThich: { nhan: 'Không thích', icon: Ban, className: 'bg-amber-50 text-amber-700 border-amber-200' },
}

const NUTRIENT_COLUMNS = [
  ['calo', 'Calo'], ['dam', 'Đạm'], ['duong', 'Đường bột'], ['beo', 'Béo'], ['chatXo', 'Xơ'],
]

export default function FoodDatabase({ thucPham, setThucPham }) {
  const capNhat = (id, khoa, giaTri) => setThucPham((cu) => cu.map((mon) => mon.id === id ? { ...mon, [khoa]: giaTri } : mon))

  const chuyenSoThich = (mon) => {
    const vong = ['binhThuong', 'thich', 'khongThich']
    const tiepTheo = vong[(vong.indexOf(mon.soThich || 'binhThuong') + 1) % vong.length]
    capNhat(mon.id, 'soThich', tiepTheo)
  }

  const grouped = Object.values(NHOM_THUC_PHAM).map((nhom) => ({ nhom, mons: thucPham.filter((m) => m.nhom === nhom) })).filter((g) => g.mons.length)

  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-panel">
      <div className="flex flex-col gap-3 border-b border-slate-200 p-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Kho dữ liệu thực phẩm Việt Nam</h2>
          <p className="mt-1 max-w-2xl text-sm text-slate-500">Thông số theo 100g. Nhấn vào giá để cập nhật theo thị trường địa phương; sở thích thay đổi hệ số chi phí trong hàm mục tiêu.</p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs text-slate-500"><span className="rounded-full bg-rose-50 px-2.5 py-1 text-rose-700">Ưa thích × 0,8</span><span className="rounded-full bg-slate-100 px-2.5 py-1">Bình thường × 1,0</span><span className="rounded-full bg-amber-50 px-2.5 py-1 text-amber-700">Không thích × 1,45</span></div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1050px] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr><th className="px-4 py-3 font-medium">Thực phẩm</th><th className="px-3 py-3 font-medium">Giá / 100g</th>{NUTRIENT_COLUMNS.map(([, n]) => <th key={n} className="px-3 py-3 font-medium">{n}</th>)}<th className="px-3 py-3 font-medium">Tối đa/ngày</th><th className="px-3 py-3 font-medium">Sở thích</th><th className="px-3 py-3 font-medium">Trạng thái</th></tr>
          </thead>
          <tbody>
            {grouped.map(({ nhom, mons }) => <Fragment key={nhom}>
              <tr className="bg-emerald-50/60"><td colSpan="10" className="px-4 py-2 text-xs font-semibold uppercase tracking-wide text-emerald-800">{nhom}</td></tr>
              {mons.map((mon) => {
                const pref = NHAN_SO_THICH[mon.soThich || 'binhThuong']; const PrefIcon = pref.icon
                return <tr key={mon.id} className={`border-t border-slate-100 transition hover:bg-slate-50 ${mon.loaiBo ? 'opacity-45' : ''}`}>
                  <td className="px-4 py-3 font-medium text-slate-800">{mon.ten}</td>
                  <td className="px-3 py-2"><label className="flex w-[104px] items-center rounded-md border border-slate-200 bg-white px-2 focus-within:border-emerald-500"><input aria-label={`Giá ${mon.ten}`} className="w-full bg-transparent py-1 text-right tabular-nums outline-none" type="number" min="0" value={mon.gia} onChange={(e) => capNhat(mon.id, 'gia', Number(e.target.value))} /><span className="text-xs text-slate-400">đ</span></label></td>
                  {NUTRIENT_COLUMNS.map(([k]) => <td key={k} className="px-3 py-3 tabular-nums text-slate-600">{dinhDangSo(mon[k])}</td>)}
                  <td className="px-3 py-2"><label className="flex w-[84px] items-center rounded-md border border-slate-200 bg-white px-2 focus-within:border-emerald-500"><input aria-label={`Khối lượng tối đa ${mon.ten}`} className="w-full bg-transparent py-1 text-right tabular-nums outline-none" type="number" min="0" value={mon.khoiLuongToiDa} onChange={(e) => capNhat(mon.id, 'khoiLuongToiDa', Number(e.target.value))} /><span className="text-xs text-slate-400">g</span></label></td>
                  <td className="px-3 py-2"><button onClick={() => chuyenSoThich(mon)} className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-xs font-medium transition hover:brightness-95 ${pref.className}`}><PrefIcon size={13} />{pref.nhan}</button></td>
                  <td className="px-3 py-2"><button onClick={() => capNhat(mon.id, 'loaiBo', !mon.loaiBo)} className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition ${mon.loaiBo ? 'bg-slate-100 text-slate-600' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'}`}><span className={`h-1.5 w-1.5 rounded-full ${mon.loaiBo ? 'bg-slate-400' : 'bg-emerald-500'}`} />{mon.loaiBo ? 'Đã loại' : 'Đang dùng'}</button></td>
                </tr>
              })}
            </Fragment>) }
          </tbody>
        </table>
      </div>
      <div className="flex items-center gap-2 border-t border-slate-100 px-6 py-3 text-xs text-slate-400"><Pencil size={13} />Giá hiện tại là giá tham khảo; tổng chi phí được tính trên đúng khối lượng LP chọn.</div>
    </section>
  )
}
