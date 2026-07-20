export const HOAT_DONG = {
  it: { ten: 'Ít vận động', heSo: 1.2, moTa: 'Ngồi nhiều, ít hoặc không tập luyện' },
  nhe: { ten: 'Vận động nhẹ', heSo: 1.375, moTa: 'Tập nhẹ 1–3 ngày/tuần' },
  vua: { ten: 'Vận động vừa', heSo: 1.55, moTa: 'Tập vừa 3–5 ngày/tuần' },
  cao: { ten: 'Vận động cao', heSo: 1.725, moTa: 'Tập nặng 6–7 ngày/tuần' },
  ratCao: { ten: 'Rất năng động', heSo: 1.9, moTa: 'Lao động nặng hoặc tập 2 lần/ngày' },
}

// Công thức Mifflin–St Jeor, được dùng rộng rãi để ước tính BMR.
export function tinhBMR({ tuoi, gioiTinh, canNang, chieuCao }) {
  const coBan = 10 * Number(canNang) + 6.25 * Number(chieuCao) - 5 * Number(tuoi)
  return Math.round(coBan + (gioiTinh === 'nam' ? 5 : -161))
}

export function tinhTDEE(thongTin) {
  const bmr = tinhBMR(thongTin)
  const heSo = HOAT_DONG[thongTin.hoatDong]?.heSo ?? HOAT_DONG.vua.heSo
  return Math.round(bmr * heSo)
}

export function taoMucTieuMacDinh(thongTin) {
  const tdee = tinhTDEE(thongTin)
  // Phân bố macro cân bằng: 25% protein, 50% carb, 25% fat.
  const dam = Math.round((tdee * 0.25) / 4)
  const duong = Math.round((tdee * 0.5) / 4)
  const beo = Math.round((tdee * 0.25) / 9)

  return {
    calo: { min: Math.round(tdee * 0.95), max: Math.round(tdee * 1.05) },
    dam: { min: Math.round(dam * 0.85), max: Math.round(dam * 1.25) },
    duong: { min: Math.round(duong * 0.8), max: Math.round(duong * 1.2) },
    beo: { min: Math.round(beo * 0.8), max: Math.round(beo * 1.2) },
    chatXo: { min: 25, max: 60 },
    natri: { min: 0, max: 2300 },
  }
}

export function dinhDangTien(so) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency', currency: 'VND', maximumFractionDigits: 0,
  }).format(so)
}

export function dinhDangSo(so, toiDa = 1) {
  return new Intl.NumberFormat('vi-VN', { maximumFractionDigits: toiDa }).format(so)
}

export function tinhTongDinhDuong(thucPham, khauPhan) {
  return thucPham.reduce((tong, mon) => {
    const khoiLuong = khauPhan[mon.id] || 0
    const heSo = khoiLuong / 100
    return {
      calo: tong.calo + mon.calo * heSo,
      dam: tong.dam + mon.dam * heSo,
      duong: tong.duong + mon.duong * heSo,
      beo: tong.beo + mon.beo * heSo,
      chatXo: tong.chatXo + mon.chatXo * heSo,
      natri: tong.natri + mon.natri * heSo,
      chiPhi: tong.chiPhi + mon.gia * heSo,
    }
  }, { calo: 0, dam: 0, duong: 0, beo: 0, chatXo: 0, natri: 0, chiPhi: 0 })
}
