# Hướng dẫn deploy — Bản hùng ca Điện Biên

Kiến trúc: **front-end tĩnh + 1 serverless function trên Vercel + MongoDB Atlas**.
Connection string MongoDB nằm ở **biến môi trường** trên Vercel — không lộ trong code.

```
Trình duyệt ──> /api/scores (Vercel function) ──> MongoDB Atlas
   (index.html / leaderboard.html)        (đọc MONGODB_URI từ env var)
```

## Cấu trúc thư mục
```
start game/
├── index.html            # game (POST điểm tới /api/scores khi bấm "Xác nhận")
├── leaderboard.html      # bảng xếp hạng (GET /api/scores, tự refresh 10s) — mở trên máy chiếu
├── api/
│   └── scores.js         # serverless function (GET top 100 / POST lưu điểm)
├── package.json          # khai báo dependency "mongodb"
└── assets/               # sprite, ảnh
```

## Bước 1 — MongoDB Atlas (miễn phí)
1. Tạo tài khoản tại **mongodb.com/atlas** → tạo **cluster M0 (Free)**, chọn region gần (Singapore).
2. **Tạo Database User** (tài khoản để function đăng nhập vào DB):
   - Thanh bên trái, mục **Security → Database Access** → bấm **Add New Database User**.
   - **Authentication Method:** chọn **Password**.
   - Nhập **Username** (vd: `gameuser`) và **Password**. Nên bấm **Autogenerate Secure Password** rồi copy lại.
     *Tránh ký tự `@ : / ?` trong mật khẩu (sẽ làm hỏng connection string); nếu có thì phải URL-encode.*
   - **Database User Privileges:** chọn **Read and write to any database** (hoặc Built-in Role `readWriteAnyDatabase`).
   - Bấm **Add User**. (Nhớ lại username + password để ghép vào connection string ở Bước 4.)
3. **Mở Network Access** (cho phép Vercel kết nối tới DB):
   - Thanh bên trái, mục **Security → Network Access** → bấm **Add IP Address**.
   - Bấm nút **ALLOW ACCESS FROM ANYWHERE** (tự điền `0.0.0.0/0`), hoặc gõ tay `0.0.0.0/0` vào ô Access List Entry.
   - Bấm **Confirm**, đợi dòng trạng thái chuyển sang **Active** (khoảng 1 phút).
   - *Lý do: serverless function của Vercel chạy từ IP không cố định nên cần mở rộng. Đây là bước bắt buộc, nếu không sẽ lỗi kết nối.*
4. **Connect → Drivers (Node.js)** → copy connection string, dạng:
   `mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`
   (thay `<password>` bằng mật khẩu thật).
5. Không cần tạo sẵn database/collection — `dienbien.leaderboard` sẽ tự tạo khi có điểm đầu tiên.

## Bước 2 — Đưa code lên Vercel
Cách dễ nhất: đẩy thư mục này lên **GitHub**, rồi vào **vercel.com → Add New → Project → Import** repo đó.
(Hoặc dùng Vercel CLI: cài `npm i -g vercel`, chạy `vercel` trong thư mục này.)

Khi import, Framework Preset để **Other** (không cần build). Vercel tự:
- phục vụ `index.html`, `leaderboard.html` như file tĩnh,
- biến `api/scores.js` thành endpoint `/api/scores`,
- cài `mongodb` theo `package.json`.

## Bước 3 — Đặt biến môi trường
Trong **Project → Settings → Environment Variables**, thêm:

| Name | Value |
|---|---|
| `MONGODB_URI` | connection string ở Bước 1 (đã thay password) |
| `MONGODB_DB` | `dienbien` *(tuỳ chọn)* |

Bấm **Save** rồi **Redeploy** (Deployments → … → Redeploy) để env var có hiệu lực.

## Bước 4 — Dùng
- Chơi game: `https://<tên-project>.vercel.app/`
- Bảng xếp hạng (máy chiếu): `https://<tên-project>.vercel.app/leaderboard.html`
- Người chơi xong → nhập tên → **Xác nhận** → điểm lưu vào MongoDB → bảng xếp hạng tự cập nhật mỗi 10s.

## Kiểm thử nhanh tại máy (không cần deploy)
- Mở thẳng `index.html` bằng trình duyệt (giao thức `file://`): game tự lưu điểm vào **localStorage** của máy đó (chỉ để test giao diện), `leaderboard.html` cũng đọc localStorage.
- Để chạy thật cả `/api` ở máy: `npm i` rồi `vercel dev` (cần đăng nhập Vercel CLI) — lúc này dùng MongoDB thật.

## Lưu ý bảo mật
- `MONGODB_URI` chỉ ở env var trên Vercel, **không** commit vào file.
- `0.0.0.0/0` ở Network Access tiện cho lớp học; nếu cần chặt hơn có thể giới hạn IP của Vercel sau.
- Endpoint cho phép ghi công khai (ai cũng POST được) — phù hợp bài tập trên lớp.
