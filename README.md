# NutriOpti — Phần mềm Tối ưu hóa Khẩu phần Dinh dưỡng

Ứng dụng web một trang (SPA) phục vụ dự án Khoa học & Kỹ thuật: tối ưu hóa khẩu phần ăn hằng ngày bằng **Quy hoạch Tuyến tính (Linear Programming)** và thuật toán **Simplex**.

## Điểm nổi bật

- Giao diện tiếng Việt hoàn toàn, phù hợp thuyết trình trước hội đồng.
- Cơ sở dữ liệu gồm 20 thực phẩm phổ biến tại Việt Nam.
- Tính BMR/TDEE từ tuổi, giới tính, chiều cao, cân nặng và mức vận động.
- Cho phép chỉnh ràng buộc dinh dưỡng: Calo, Đạm, Đường bột, Chất béo, Chất xơ, Natri.
- Cho phép chỉnh giá thực phẩm, sở thích và loại thực phẩm khỏi bài toán.
- Chạy solver LP trực tiếp trên trình duyệt bằng `javascript-lp-solver`.
- Có khối giải thích học thuật hiển thị hàm mục tiêu và ràng buộc.
- Biểu đồ so sánh kết quả đạt được với giới hạn dinh dưỡng.

## Mô hình toán học

Hàm mục tiêu:

```text
Min Z = c₁x₁ + c₂x₂ + ... + cₙxₙ
```

Trong đó:

- `xᵢ` là số đơn vị 10g của thực phẩm `i`.
- `cᵢ` là chi phí đã điều chỉnh theo sở thích.

Ràng buộc ví dụ:

```text
Calo_min ≤ a₁x₁ + a₂x₂ + ... + aₙxₙ ≤ Calo_max
Đạm_min ≤ p₁x₁ + p₂x₂ + ... + pₙxₙ ≤ Đạm_max
xᵢ ≥ 0
```

## Cài đặt và chạy

```bash
npm install
npm run dev
```

Build bản trình diễn:

```bash
npm run build
npm run preview
```

## Cấu trúc mã nguồn

```text
src/
  App.jsx                         # Bảng điều khiển chính
  components/
    TargetSettings.jsx            # Hồ sơ, TDEE, ràng buộc dinh dưỡng
    FoodDatabase.jsx              # Bảng thực phẩm, giá, sở thích
    AlgorithmPanel.jsx            # Giải thích mô hình LP/Simplex
    ResultsPanel.jsx              # Thực đơn tối ưu và KPI
    NutritionChart.jsx            # Biểu đồ đối chiếu dinh dưỡng
  data/foods.js                   # Dữ liệu thực phẩm Việt Nam
  lib/
    nutrition.js                  # Tính BMR/TDEE, tổng dinh dưỡng, định dạng
    optimizer.js                  # Tạo mô hình LP và gọi Simplex solver
```

## Ghi chú khoa học

Dữ liệu dinh dưỡng là dữ liệu tham khảo giáo dục. Khi trình bày, nên nhấn mạnh quy trình chuyển đổi bài toán đời sống thành mô hình toán học: biến quyết định, hàm mục tiêu, ràng buộc, nghiệm khả thi và nghiệm tối ưu.

## Deployment: Debian + Nginx + Cloudflare Tunnel

This project is a static Vite/React SPA. It does not need a Node.js server in production. Build it once, serve the `dist/` folder with Nginx, and expose Nginx through Cloudflare Tunnel.

### Recommended workflow

Use GitHub as the source of truth:

1. Push code changes from your development machine to GitHub.
2. Pull the latest code on the Debian server.
3. Run the deployment script.
4. Nginx serves the new static files from `/var/www/nutri`.

### One-time setup on Debian

Install Node.js 20 LTS, Nginx, and Git:

```bash
sudo apt update
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs nginx git
```

Clone the repository:

```bash
git clone https://github.com/<your-github-user>/nutri-optimizer.git ~/nutri-optimizer
cd ~/nutri-optimizer
```

Install the Nginx site config:

```bash
sudo cp deploy/nginx-nutri.conf /etc/nginx/sites-available/nutri
sudo ln -sf /etc/nginx/sites-available/nutri /etc/nginx/sites-enabled/nutri
sudo nginx -t
sudo systemctl reload nginx
```

The included Nginx config listens on `127.0.0.1:8080`, which is ideal for Cloudflare Tunnel because the service is only reachable locally on the server.

### Deploy or redeploy

Run this on the Debian server:

```bash
chmod +x deploy/deploy.sh
./deploy/deploy.sh
```

The script runs:

```text
git pull --ff-only
npm ci
npm run build
copy dist/* to /var/www/nutri
```

### Cloudflare Tunnel

Create a tunnel that points your public hostname to the local Nginx service:

```yaml
tunnel: nutri
credentials-file: /home/<your-linux-user>/.cloudflared/<tunnel-id>.json
ingress:
  - hostname: nutri.<your-domain>.com
    service: http://127.0.0.1:8080
  - service: http_status:404
```

Then route DNS and run the tunnel service:

```bash
cloudflared tunnel route dns nutri nutri.<your-domain>.com
sudo cloudflared service install
sudo systemctl enable --now cloudflared
```

### Verify the deployment

On the Debian server:

```bash
curl -I http://127.0.0.1:8080
sudo systemctl status nginx
sudo systemctl status cloudflared
```

From a browser, open:

```text
https://nutri.<your-domain>.com
```

The Vietnamese dashboard should load. Click **"Tối Ưu Hóa Khẩu Phần"** to confirm that the in-browser Simplex solver works on the deployed site.
