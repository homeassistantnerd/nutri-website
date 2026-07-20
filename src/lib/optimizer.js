import solver from 'javascript-lp-solver'
import { CHAT_DINH_DUONG } from '../data/foods'
import { tinhTongDinhDuong } from './nutrition'

const HE_SO_SO_THICH = {
  thich: 0.8,
  binhThuong: 1,
  khongThich: 1.45,
}

function tenBien(mon) {
  return `x_${mon.id.replaceAll('-', '_')}`
}

function laGioiHanHopLe(giaTri) {
  return giaTri !== '' && giaTri !== null && giaTri !== undefined && Number.isFinite(Number(giaTri))
}

export function taoMoHinhLP(thucPham, mucTieu) {
  const variables = {}
  const constraints = {}
  CHAT_DINH_DUONG.forEach((chat) => {
    const gioiHan = mucTieu[chat.key]
    if (!gioiHan) return
    if (laGioiHanHopLe(gioiHan.min)) {
      constraints[`${chat.key}_min`] = { min: Number(gioiHan.min) }
    }
    if (laGioiHanHopLe(gioiHan.max)) {
      constraints[`${chat.key}_max`] = { max: Number(gioiHan.max) }
    }
  })

  thucPham
    .filter((mon) => !mon.loaiBo)
    .forEach((mon) => {
      const bien = tenBien(mon)
      const heSoSoThich = HE_SO_SO_THICH[mon.soThich] ?? HE_SO_SO_THICH.binhThuong
      const variable = {
        chiPhi: Number(mon.gia) * heSoSoThich,
        [`gioiHan_${mon.id}`]: 1,
      }

      CHAT_DINH_DUONG.forEach((chat) => {
        const giaTriTrenMotDonVi = Number(mon[chat.key]) || 0
        variable[`${chat.key}_min`] = giaTriTrenMotDonVi
        variable[`${chat.key}_max`] = giaTriTrenMotDonVi
      })

      constraints[`gioiHan_${mon.id}`] = { max: Math.max(0, Number(mon.khoiLuongToiDa ?? 50)) }
      variables[bien] = variable
    })

  return {
    optimize: 'chiPhi',
    opType: 'min',
    constraints,
    variables,
  }
}

export function giaiBaiToanKhauPhan(thucPham, mucTieu) {
  const thucPhamKhaDung = thucPham.filter((mon) => !mon.loaiBo)

  if (thucPhamKhaDung.length === 0) {
    return {
      feasible: false,
      bounded: false,
      reason: 'Danh sách thực phẩm khả dụng đang trống.',
      suggestions: ['Hãy bật lại ít nhất một thực phẩm trong bảng dữ liệu.'],
    }
  }

  // Solver LP thuần: mỗi biến là số đơn vị 10g (biến liên tục, không âm).
  // Ta chia dinh dưỡng/giá theo 10g để hệ số khớp với đơn vị biến, rồi làm tròn gram khi hiển thị.
  const thucPhamTheoDonVi10g = thucPham.map((mon) => ({
    ...mon,
    calo: mon.calo / 10,
    dam: mon.dam / 10,
    duong: mon.duong / 10,
    beo: mon.beo / 10,
    chatXo: mon.chatXo / 10,
    natri: mon.natri / 10,
    gia: mon.gia / 10,
    khoiLuongToiDa: mon.khoiLuongToiDa / 10,
  }))

  const model = taoMoHinhLP(thucPhamTheoDonVi10g, mucTieu)
  const ketQua = solver.Solve(model)

  if (!ketQua.feasible) {
    return {
      feasible: false,
      bounded: ketQua.bounded,
      model,
      reason: 'Không tìm được khẩu phần thỏa mãn tất cả ràng buộc hiện tại.',
      suggestions: [
        'Nới rộng khoảng Calo tối thiểu/tối đa.',
        'Tăng giới hạn tối đa cho Đường bột hoặc Chất béo nếu đang quá chặt.',
        'Thêm thực phẩm giàu Đạm như ức gà, tôm, đậu hũ hoặc thịt bò.',
        'Bỏ bớt lựa chọn “Loại khỏi bài toán” trong bảng thực phẩm.',
      ],
    }
  }

  const khauPhan = {}
  const khauPhanChinhXac = {}
  thucPham.forEach((mon) => {
    const bien = tenBien(mon)
    const soDonVi10g = ketQua[bien] || 0
    const gam = soDonVi10g * 10
    khauPhanChinhXac[mon.id] = gam
    khauPhan[mon.id] = Math.round(gam)
  })

  // Tổng dinh dưỡng tính trên nghiệm LP chính xác để không báo lệch ràng buộc do làm tròn gram.
  const tong = tinhTongDinhDuong(thucPham, khauPhanChinhXac)

  return {
    feasible: true,
    bounded: ketQua.bounded,
    result: ketQua,
    model,
    khauPhan,
    khauPhanChinhXac,
    tong,
  }
}

export function taoChuoiCongThuc(thucPham, mucTieu) {
  const monDangDung = thucPham.filter((mon) => !mon.loaiBo).slice(0, 5)
  const objective = monDangDung
    .map((mon, index) => `${index === 0 ? '' : ' + '}${mon.gia.toLocaleString('vi-VN')}·x_${index + 1}`)
    .join('')

  const constraint = monDangDung
    .map((mon, index) => `${index === 0 ? '' : ' + '}${mon.calo}·x_${index + 1}`)
    .join('')

  return {
    objective: `Min Z = ${objective}${thucPham.length > 5 ? ' + ...' : ''}`,
    calories: `${mucTieu.calo.min} ≤ ${constraint}${thucPham.length > 5 ? ' + ...' : ''} ≤ ${mucTieu.calo.max}`,
    nonNegative: 'xᵢ ≥ 0 với mọi thực phẩm i',
  }
}
