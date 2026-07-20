import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { CHAT_DINH_DUONG } from '../data/foods'
import { dinhDangSo } from '../lib/nutrition'

const MAU_DAT = '#047857'
const MAU_CHUA_DAT = '#d97706'

function ChuGiai() {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-600" aria-label="Chú giải biểu đồ">
      <span className="flex items-center gap-1.5"><i className="h-2.5 w-2.5 rounded-sm bg-emerald-700" />Đạt / trong giới hạn</span>
      <span className="flex items-center gap-1.5"><i className="h-2.5 w-2.5 rounded-sm bg-amber-600" />Ngoài giới hạn</span>
      <span className="flex items-center gap-1.5"><i className="h-0.5 w-4 bg-slate-400" />Mức tối đa là 100%</span>
    </div>
  )
}

export default function NutritionChart({ tong, mucTieu }) {
  const data = CHAT_DINH_DUONG.map((chat) => {
    const giaTri = tong[chat.key] || 0
    const max = Number(mucTieu[chat.key]?.max) || 1
    const min = Number(mucTieu[chat.key]?.min) || 0
    const tyLe = (giaTri / max) * 100
    const dat = giaTri >= min && giaTri <= max

    return {
      ten: chat.ten,
      tyLe: Math.min(tyLe, 120),
      hienThi: `${dinhDangSo(giaTri)} ${chat.donVi}`,
      gioiHan: `${dinhDangSo(min)} – ${dinhDangSo(max)} ${chat.donVi}`,
      mau: dat ? MAU_DAT : MAU_CHUA_DAT,
      dat,
    }
  })

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-panel">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="font-semibold text-slate-900">Đối chiếu dinh dưỡng</h3>
          <p className="mt-1 text-sm text-slate-500">Mỗi cột biểu diễn tỷ lệ so với giới hạn tối đa (100%).</p>
        </div>
        <ChuGiai />
      </div>
      <div className="h-[290px]" role="img" aria-label="Biểu đồ tỷ lệ dinh dưỡng đạt được so với giới hạn">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 8, bottom: 2, left: -24 }} barCategoryGap="28%">
            <CartesianGrid vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="ten" tick={{ fill: '#475569', fontSize: 11 }} axisLine={{ stroke: '#cbd5e1' }} tickLine={false} />
            <YAxis domain={[0, 120]} ticks={[0, 25, 50, 75, 100]} tickFormatter={(v) => `${v}%`} tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip
              cursor={{ fill: '#f1f5f9' }}
              contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', boxShadow: '0 6px 16px rgba(15, 23, 42, .10)' }}
              formatter={(value, _, item) => [`${dinhDangSo(value)}%`, item.payload.dat ? 'Trạng thái: Đạt' : 'Trạng thái: Ngoài giới hạn']}
              labelFormatter={(_, items) => {
                const item = items?.[0]?.payload
                return item ? `${item.ten}: ${item.hienThi} (mục tiêu ${item.gioiHan})` : ''
              }}
            />
            <Bar dataKey="tyLe" name="Tỷ lệ" maxBarSize={24} radius={[4, 4, 0, 0]}>
              {data.map((entry) => <Cell key={entry.ten} fill={entry.mau} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 overflow-x-auto rounded-xl border border-slate-100">
        <table className="w-full min-w-[520px] text-left text-xs">
          <thead className="bg-slate-50 text-slate-500"><tr><th className="px-3 py-2 font-medium">Chất dinh dưỡng</th><th className="px-3 py-2 font-medium">Đạt được</th><th className="px-3 py-2 font-medium">Giới hạn</th><th className="px-3 py-2 font-medium">Trạng thái</th></tr></thead>
          <tbody>{data.map((item) => <tr key={item.ten} className="border-t border-slate-100 text-slate-700"><td className="px-3 py-2 font-medium">{item.ten}</td><td className="px-3 py-2 tabular-nums">{item.hienThi}</td><td className="px-3 py-2 tabular-nums">{item.gioiHan}</td><td className="px-3 py-2"><span className={item.dat ? 'text-emerald-700' : 'text-amber-700'}>{item.dat ? '✓ Đạt' : '⚠ Cần điều chỉnh'}</span></td></tr>)}</tbody>
        </table>
      </div>
    </div>
  )
}
