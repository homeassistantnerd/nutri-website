import { useMemo } from 'react'
import { Activity, User } from 'lucide-react'
import { CHAT_DINH_DUONG } from '../data/foods'
import { HOAT_DONG, taoMucTieuMacDinh, tinhBMR, tinhTDEE } from '../lib/nutrition'

function O({ label, children }) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="font-medium text-slate-700">{label}</span>
      {children}
    </label>
  )
}

const inputCls = 'rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100'

export default function TargetSettings({ thongTin, setThongTin, mucTieu, setMucTieu }) {
  const bmr = useMemo(() => tinhBMR(thongTin), [thongTin])
  const tdee = useMemo(() => tinhTDEE(thongTin), [thongTin])

  const capNhatHoSo = (khoa, giaTri) => setThongTin((cu) => ({ ...cu, [khoa]: giaTri }))

  const dongBoMucTieu = () => setMucTieu(taoMucTieuMacDinh(thongTin))

  const capNhatGioiHan = (chatKey, canBien, giaTri) =>
    setMucTieu((cu) => ({ ...cu, [chatKey]: { ...cu[chatKey], [canBien]: giaTri === '' ? '' : Number(giaTri) } }))

  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-panel">
        <div className="mb-5 flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-50 text-emerald-700"><User size={20} /></span>
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Thông tin cá nhân</h2>
            <p className="text-sm text-slate-500">Dùng để ước tính nhu cầu năng lượng (TDEE) theo công thức Mifflin–St Jeor.</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <O label="Tuổi"><input type="number" min="10" max="100" className={inputCls} value={thongTin.tuoi} onChange={(e) => capNhatHoSo('tuoi', Number(e.target.value))} /></O>
          <O label="Giới tính">
            <select className={inputCls} value={thongTin.gioiTinh} onChange={(e) => capNhatHoSo('gioiTinh', e.target.value)}>
              <option value="nam">Nam</option>
              <option value="nu">Nữ</option>
            </select>
          </O>
          <O label="Chiều cao (cm)"><input type="number" min="120" max="220" className={inputCls} value={thongTin.chieuCao} onChange={(e) => capNhatHoSo('chieuCao', Number(e.target.value))} /></O>
          <O label="Cân nặng (kg)"><input type="number" min="30" max="200" className={inputCls} value={thongTin.canNang} onChange={(e) => capNhatHoSo('canNang', Number(e.target.value))} /></O>
          <O label="Mức độ vận động">
            <select className={inputCls} value={thongTin.hoatDong} onChange={(e) => capNhatHoSo('hoatDong', e.target.value)}>
              {Object.entries(HOAT_DONG).map(([khoa, v]) => <option key={khoa} value={khoa}>{v.ten}</option>)}
            </select>
          </O>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl bg-slate-50 p-4"><p className="text-xs uppercase tracking-wide text-slate-500">BMR</p><p className="mt-1 text-2xl font-semibold text-slate-900">{bmr}<span className="ml-1 text-sm font-normal text-slate-400">kcal</span></p></div>
          <div className="rounded-xl bg-emerald-50 p-4"><p className="text-xs uppercase tracking-wide text-emerald-600">TDEE (khuyến nghị)</p><p className="mt-1 text-2xl font-semibold text-emerald-700">{tdee}<span className="ml-1 text-sm font-normal text-emerald-500">kcal</span></p></div>
          <div className="flex items-center">
            <button onClick={dongBoMucTieu} className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 font-medium text-white transition hover:bg-emerald-700">
              <Activity size={18} /> Áp dụng mục tiêu theo TDEE
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-panel">
        <h2 className="text-lg font-semibold text-slate-900">Ràng buộc dinh dưỡng (Min / Max)</h2>
        <p className="mt-1 text-sm text-slate-500">Đây chính là các ràng buộc bất đẳng thức trong mô hình Quy hoạch Tuyến tính. Có thể chỉnh tay.</p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CHAT_DINH_DUONG.map((chat) => (
            <div key={chat.key} className="rounded-xl border border-slate-200 p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="font-medium text-slate-800">{chat.ten}</span>
                <span className="text-xs text-slate-400">{chat.donVi}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <O label="Tối thiểu"><input type="number" min="0" className={inputCls} value={mucTieu[chat.key]?.min ?? ''} onChange={(e) => capNhatGioiHan(chat.key, 'min', e.target.value)} /></O>
                <O label="Tối đa"><input type="number" min="0" className={inputCls} value={mucTieu[chat.key]?.max ?? ''} onChange={(e) => capNhatGioiHan(chat.key, 'max', e.target.value)} /></O>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
