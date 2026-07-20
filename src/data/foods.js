// Cơ sở dữ liệu thực phẩm Việt Nam truyền thống.
// Toàn bộ giá trị dinh dưỡng được tính trên 100g phần ăn được.
// Nguồn tham khảo: Bảng thành phần thực phẩm Việt Nam (Viện Dinh dưỡng Quốc gia).
//
// Các trường:
//   id        : định danh duy nhất
//   ten       : tên món (tiếng Việt)
//   nhom      : nhóm thực phẩm
//   calo      : năng lượng (kcal / 100g)
//   dam       : protein / đạm (g / 100g)
//   duong     : carbohydrate / đường bột (g / 100g)
//   beo       : lipid / chất béo (g / 100g)
//   chatXo    : chất xơ (g / 100g)
//   natri     : natri (mg / 100g)
//   gia       : giá tham khảo (VND / 100g)
//   khoiLuongToiDa : khẩu phần tối đa hợp lý trong ngày (g) — tránh nghiệm phi thực tế

export const NHOM_THUC_PHAM = {
  TINH_BOT: 'Tinh bột',
  DAM_DONG_VAT: 'Đạm động vật',
  DAM_THUC_VAT: 'Đạm thực vật',
  RAU_CU: 'Rau củ',
  TRAI_CAY: 'Trái cây',
  KHAC: 'Khác',
}

export const THUC_PHAM_MAC_DINH = [
  {
    id: 'com-trang',
    ten: 'Cơm trắng',
    nhom: NHOM_THUC_PHAM.TINH_BOT,
    calo: 130, dam: 2.7, duong: 28.2, beo: 0.3, chatXo: 0.4, natri: 1,
    gia: 1500, khoiLuongToiDa: 600,
  },
  {
    id: 'bun-tuoi',
    ten: 'Bún tươi',
    nhom: NHOM_THUC_PHAM.TINH_BOT,
    calo: 110, dam: 2.5, duong: 25.0, beo: 0.2, chatXo: 0.5, natri: 5,
    gia: 2000, khoiLuongToiDa: 500,
  },
  {
    id: 'khoai-lang',
    ten: 'Khoai lang',
    nhom: NHOM_THUC_PHAM.TINH_BOT,
    calo: 119, dam: 0.8, duong: 28.5, beo: 0.2, chatXo: 3.0, natri: 20,
    gia: 2500, khoiLuongToiDa: 400,
  },
  {
    id: 'banh-mi',
    ten: 'Bánh mì',
    nhom: NHOM_THUC_PHAM.TINH_BOT,
    calo: 249, dam: 7.9, duong: 51.0, beo: 1.6, chatXo: 2.3, natri: 490,
    gia: 4000, khoiLuongToiDa: 300,
  },
  {
    id: 'uc-ga',
    ten: 'Ức gà (không da)',
    nhom: NHOM_THUC_PHAM.DAM_DONG_VAT,
    calo: 165, dam: 31.0, duong: 0, beo: 3.6, chatXo: 0, natri: 74,
    gia: 8000, khoiLuongToiDa: 400,
  },
  {
    id: 'thit-bo',
    ten: 'Thịt bò nạc',
    nhom: NHOM_THUC_PHAM.DAM_DONG_VAT,
    calo: 182, dam: 21.0, duong: 0, beo: 10.7, chatXo: 0, natri: 65,
    gia: 25000, khoiLuongToiDa: 300,
  },
  {
    id: 'thit-heo-nac',
    ten: 'Thịt heo nạc',
    nhom: NHOM_THUC_PHAM.DAM_DONG_VAT,
    calo: 143, dam: 19.0, duong: 0, beo: 7.0, chatXo: 0, natri: 55,
    gia: 13000, khoiLuongToiDa: 300,
  },
  {
    id: 'trung-ga',
    ten: 'Trứng gà',
    nhom: NHOM_THUC_PHAM.DAM_DONG_VAT,
    calo: 155, dam: 13.0, duong: 1.1, beo: 11.0, chatXo: 0, natri: 124,
    gia: 3000, khoiLuongToiDa: 200,
  },
  {
    id: 'ca-thu',
    ten: 'Cá thu',
    nhom: NHOM_THUC_PHAM.DAM_DONG_VAT,
    calo: 205, dam: 19.0, duong: 0, beo: 13.9, chatXo: 0, natri: 90,
    gia: 15000, khoiLuongToiDa: 300,
  },
  {
    id: 'tom-su',
    ten: 'Tôm sú',
    nhom: NHOM_THUC_PHAM.DAM_DONG_VAT,
    calo: 99, dam: 24.0, duong: 0.2, beo: 0.3, chatXo: 0, natri: 111,
    gia: 30000, khoiLuongToiDa: 250,
  },
  {
    id: 'dau-hu',
    ten: 'Đậu hũ',
    nhom: NHOM_THUC_PHAM.DAM_THUC_VAT,
    calo: 76, dam: 8.1, duong: 1.9, beo: 4.8, chatXo: 0.3, natri: 7,
    gia: 3000, khoiLuongToiDa: 400,
  },
  {
    id: 'dau-phong',
    ten: 'Đậu phộng',
    nhom: NHOM_THUC_PHAM.DAM_THUC_VAT,
    calo: 567, dam: 25.8, duong: 16.1, beo: 49.2, chatXo: 8.5, natri: 18,
    gia: 6000, khoiLuongToiDa: 100,
  },
  {
    id: 'rau-muong',
    ten: 'Rau muống',
    nhom: NHOM_THUC_PHAM.RAU_CU,
    calo: 23, dam: 2.6, duong: 3.1, beo: 0.2, chatXo: 2.1, natri: 65,
    gia: 1500, khoiLuongToiDa: 400,
  },
  {
    id: 'cai-ngot',
    ten: 'Cải ngọt',
    nhom: NHOM_THUC_PHAM.RAU_CU,
    calo: 18, dam: 1.5, duong: 2.7, beo: 0.2, chatXo: 1.6, natri: 30,
    gia: 1800, khoiLuongToiDa: 400,
  },
  {
    id: 'ca-chua',
    ten: 'Cà chua',
    nhom: NHOM_THUC_PHAM.RAU_CU,
    calo: 18, dam: 0.9, duong: 3.9, beo: 0.2, chatXo: 1.2, natri: 5,
    gia: 2000, khoiLuongToiDa: 300,
  },
  {
    id: 'ca-rot',
    ten: 'Cà rốt',
    nhom: NHOM_THUC_PHAM.RAU_CU,
    calo: 41, dam: 0.9, duong: 9.6, beo: 0.2, chatXo: 2.8, natri: 69,
    gia: 2000, khoiLuongToiDa: 300,
  },
  {
    id: 'chuoi',
    ten: 'Chuối',
    nhom: NHOM_THUC_PHAM.TRAI_CAY,
    calo: 89, dam: 1.1, duong: 22.8, beo: 0.3, chatXo: 2.6, natri: 1,
    gia: 2500, khoiLuongToiDa: 300,
  },
  {
    id: 'cam',
    ten: 'Cam',
    nhom: NHOM_THUC_PHAM.TRAI_CAY,
    calo: 47, dam: 0.9, duong: 11.8, beo: 0.1, chatXo: 2.4, natri: 0,
    gia: 3000, khoiLuongToiDa: 300,
  },
  {
    id: 'sua-tuoi',
    ten: 'Sữa tươi',
    nhom: NHOM_THUC_PHAM.KHAC,
    calo: 61, dam: 3.2, duong: 4.8, beo: 3.3, chatXo: 0, natri: 43,
    gia: 3000, khoiLuongToiDa: 500,
  },
  {
    id: 'dau-nanh',
    ten: 'Sữa đậu nành',
    nhom: NHOM_THUC_PHAM.DAM_THUC_VAT,
    calo: 54, dam: 3.3, duong: 6.0, beo: 1.8, chatXo: 0.6, natri: 12,
    gia: 2000, khoiLuongToiDa: 500,
  },
]

// Danh sách các chất dinh dưỡng dùng chung cho ràng buộc & biểu đồ.
export const CHAT_DINH_DUONG = [
  { key: 'calo', ten: 'Calo', donVi: 'kcal', mau: '#059669' },
  { key: 'dam', ten: 'Đạm', donVi: 'g', mau: '#0d9488' },
  { key: 'duong', ten: 'Đường bột', donVi: 'g', mau: '#0891b2' },
  { key: 'beo', ten: 'Chất béo', donVi: 'g', mau: '#ca8a04' },
  { key: 'chatXo', ten: 'Chất xơ', donVi: 'g', mau: '#65a30d' },
  { key: 'natri', ten: 'Natri', donVi: 'mg', mau: '#dc2626' },
]
