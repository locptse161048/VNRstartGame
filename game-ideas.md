# 🎮 Bản hùng ca Điện Biên — Tài liệu ý tưởng game

> Game tri ân các anh hùng trong chiến dịch Điện Biên Phủ, tái hiện sự khốc liệt và hy sinh qua từng màn chơi.
> **Cập nhật lần cuối:** 2026-06-24

---

## 1. Thông tin chung

| Mục | Nội dung |
|---|---|
| Nền tảng | **Web** — chơi trên trình duyệt ở cả **điện thoại và máy tính** (không phải app native) |
| Điều khiển | Responsive: **chạm màn hình** (điện thoại) + **bàn phím/chuột** (máy tính); layout co giãn theo màn hình |
| Mục tiêu | Game mở đầu cho **bài thuyết trình trên lớp** (có hệ thống chấm điểm) |
| Engine / công nghệ | **HTML5 + JavaScript (Canvas)** — 1 file, deploy web, không cần cài đặt |
| Deadline | **Tối 2026-06-24** |
| Yêu cầu | Deploy được link để cả lớp cùng chơi |
| Phong cách đồ họa | **Pixel art** (vẽ bằng code Python + Pillow, upscale nearest) |

### Quyết định thiết kế (đã chốt)
- Nhân vật người chơi = **1 người lính vô danh chứng kiến** (không phải chính anh hùng).
- **Thắng → không có ai hy sinh.** Chỉ khi **thua** mới hiện cut scene hy sinh.
- Game **"dựa trên"** lịch sử, không bê nguyên — cho phép linh hoạt sáng tạo.
- Có **hệ thống tính điểm** xuyên suốt (xem mục 4).

---

## 2. Cấu trúc & gameplay

**Cảm xúc cốt lõi:** đau thương, khốc liệt của chiến tranh và sự hy sinh cao cả của anh hùng Việt Nam.

**Mở đầu:** đoạn văn 5 câu tóm tắt bối cảnh.

### Giai đoạn 1 — Tô Vĩnh Diện (Timing game) — ✅ đã dựng
- Kéo/đẩy pháo lên dốc bằng **thanh nhịp**: vạch trắng chạy qua lại, chỉ có **một ô vàng "Hoàn hảo"** (không còn ô "Tốt"). **Ô vàng xuất hiện ở vị trí ngẫu nhiên mỗi lượt** để người chơi không bắt được nhịp cố định, và **kích thước nhỏ dần qua từng lượt**. Bấm Space / chạm khi vạch vào ô vàng → **Hoàn hảo**, pháo leo lên; bấm ra ngoài ô → **Hụt**, pháo tụt nhẹ. *(Phát hiện trúng tính theo cả ĐOẠN vạch quét trong khung hình, tránh báo hụt oan khi vạch chạy rất nhanh.)*
- **Đúng 5 lượt canh nhịp** (không phải 5 màn). HUD hiện **"LƯỢT x/5"**. **Vạch trượt nhanh dần qua mỗi lượt** và **ô vàng nhỏ dần**; ngoài ra **combo càng cao thì vạch chạy càng nhanh** (tối đa +60%) → giữ combo vừa thưởng điểm vừa tăng rủi ro.
- **Lượt thứ 5** hiện **banner cảnh báo "⚠ CHÚ Ý — LƯỢT CUỐI!"** (nhấp nháy đỏ–vàng) kèm thanh nhịp khó nhất.
- Pháo leo dọc theo một **đường mòn nằm trên sườn dốc** (đoạn đường đất tối, hẹp). **Người chèn đá đẩy ở phía sau (trái/dưới dốc); đội kéo gồm 3 người ở phía trước (phải/trên dốc), tay cầm chung một sợi dây thừng nối thẳng tới khẩu pháo.**
- **Thắng** (hụt ≤ 1 lần trong cả 5 lượt): không ai hy sinh → màn chuyển "Vượt đèo thành công" → sang Giai đoạn 2.
- **Thua — bấm hụt 2 lần thì hiện cut scene LUÔN** (kích hoạt ngay tại lần hụt thứ 2, không cần chơi hết 5 lượt; **hoặc** hết giờ cũng vào cut scene). **Cut scene**: pháo **trượt theo đúng đường mòn xuống dốc**, 1 người lính **chạy đến chèn pháo** (animation chạy 8 khung `linh_chay_side`) → pháo dừng, lính **ngã chảy máu nằm dưới bánh pháo** (`linh_nga_chay_mau`). Sau khi animation xong → **đợi ~1 giây** → **màn hình mờ dần sang đen** → **hiện block "ANH HÙNG TÔ VĨNH DIỆN"** (gồm **2 ảnh thật**: chân dung `assets/heroes/to_vinh_dien.jpg` + tranh "lấy thân chèn bánh pháo" `assets/heroes/to_vinh_dien_chen_phao.jpg`, kèm tên, năm sinh–mất, tóm tắt sự kiện) → nút Tiếp tục sang Giai đoạn 2.
- **Điểm:** Hoàn hảo +50, Hụt −30; **combo** ×1.1→×2; thưởng thời gian còn lại; **không hụt lượt nào** +500.

### Giai đoạn 2 — Phan Đình Giót (Bắn cuộn dọc, top-down)
Chia 2 phần:

**▸ 2.1 — Thủ chiến hào**
- 1 người lính giữ chiến hào — đứng **ở dưới cùng**, **tường bao cát nằm GIỮA người chơi và lính địch** (núp sau bao cát, bắn vượt lên). Di chuyển trái/phải, súng tự bắn lên.
- Lính Pháp tràn từ trên xuống; trải qua **3 vòng** tấn công (vòng 1: 12 lính, vòng 2: 24 lính, **vòng 3: 22 lính** — đợt tăng viện đông). Lính **chạm tường bao cát** = thủng phòng tuyến → mất 1 mạng.
- **Vòng 3 — địch tăng viện loại lính mới**: cứng hơn (**2 máu → cần 2 viên**, trúng viên đầu chớp trắng + nảy nhẹ) và **bắn 1 lần 2 viên đạn** vào chỗ người chơi (có chấm đỏ cảnh báo trên đầu).
- **Chi viện ở vòng 3:** khi người chơi **tụt còn 1 mạng** trong vòng 3 → **cut scene ngắn (đóng băng trận đấu)**: 1 **lính đồng minh chạy vào từ mép phải** (kích thước nhỏ) đến đứng cạnh người chơi (chữ "ĐỒNG ĐỘI CHI VIỆN!", chevron xanh trên đầu). **Hết cut scene → một sóng xung kích phát ra từ người chơi: đẩy lùi toàn bộ lính địch về sau và xoá sạch mọi viên đạn địch đang bay.** Sau đó đồng minh **đi theo người chơi và bắn thêm 1 luồng đạn** (tăng hỏa lực).
- **Hết vòng 3 → cut scene chuyển tiếp**: nhân vật **nhảy khỏi chiến hào, vượt tường bao cát**, hô **"XUNG PHONG!"** rồi **chạy thẳng lên đỉnh màn hình** → vào boss (2.2).
- Có **3 mạng**. **Hết 3 mạng trong 2.1 → cut scene thua**: nhân vật **khụy gối rồi nằm chảy máu** (sprite top-down `linh_nga_chay_mau`) + dòng tri ân → màn hình kết quả.

**▸ 2.2 — Đánh boss lỗ châu mai**
- Sau khi qua 3 vòng thủ hào (+ cut scene "Xung phong"), người chơi **nhảy khỏi chiến hào**, di chuyển tự do mọi hướng.
- **Boss = 2 lỗ châu mai** ở hai góc trên, mỗi ụ có thanh máu riêng.
- **3 chiêu của boss:**
  1. **Bắn loạt đạn nhắm thẳng** vào vị trí người chơi đang đứng.
  2. **2 ụ bắn loạt đạn hình quạt** toả về phía người chơi; **đạn nảy khỏi tường 2 lần** rồi biến mất.
  3. **Gọi máy bay** bay ngang màn hình, **đánh dấu chỗ sắp ném bom** rồi thả bom đúng chỗ đó.
- **Hố bom biến mất sau ~2 giây.**
- **Khi người chơi hạ được 1 ụ súng → ụ còn lại ra chiêu NHANH HƠN** (chu kỳ tấn công ~1.25s thay vì ~2.2s) và **mở khoá thêm Chiêu 4 — CÀI MÌN**: rải ~6 quả mìn trên mặt đất, đánh dấu bằng **chấm đỏ** (nhấp nháy nhanh lúc đang kích hoạt ~0.7s). Người chơi **dẵm trúng mìn → mìn nổ** (mất 1 mạng + hố bom); mìn tự biến mất sau ~7 giây nếu không ai dẵm.
- **Ụ cuối dưới 25% máu → BẬT LỚP KHIÊN trong 3 giây** (vòng khiên xanh, **chặn toàn bộ đạn** — không trừ máu) **và ra chiêu nhanh hơn nữa** (chu kỳ ~0.8s). Sau 3s khiên tắt, đánh tiếp bình thường.
- **Cut scene thua (phân nhánh theo số ụ súng còn sống lúc mất mạng cuối):**
  - **Còn 2 ụ súng:** 1 lính chạy từ **mép phải** vào **nằm chèn ụ phải** hy sinh; **1 tiểu đội từ phía dưới chạy lên tiêu diệt ụ trái**; **xác người chơi vẫn nằm tại chỗ**.
  - **Còn 1 ụ súng:** 1 lính chạy ra **từ phía ụ còn lại**, **nằm chèn lên ụ** hy sinh; sau đó **một tiểu đội hô "TIẾN LÊN!" chạy thẳng lên**.
  - Cả hai nhánh: sau animation → **chờ ~1 giây → tối màn → hiện block Phan Đình Giót** (logic trình bày như cut scene GĐ1), **kèm ảnh chân dung thật** `assets/heroes/phan_dinh_giot.jpg`.
- **Cơ chế hy sinh (theo số mạng khi vào 2.2):**
  - **Trường hợp 1 — vào boss khi chỉ còn 1 mạng:** mất nốt mạng cuối → cut scene như trên (có thể còn 2 hoặc 1 ụ tuỳ người chơi đã hạ được ụ nào chưa) → sự kiện Phan Đình Giót.
  - **Trường hợp 2 — vào boss khi còn ≥ 2 mạng:** khi số mạng tụt xuống **= 1** → **cảnh chi viện**: 1 người lính **chạy lên từ phía dưới → bắn 1 quả pháo vào ụ súng NHIỀU MÁU NHẤT → ụ đó bị phá huỷ, bốc cháy và ở nguyên tại chỗ**. Game tiếp tục với **1 ụ còn lại**, người chơi tiêu diệt nốt thanh máu của ụ đó.
    - Nếu sau đó **mất luôn mạng cuối** → cut scene: người chơi gục ngã, đồng đội đánh hạ nốt lỗ châu mai còn lại → hình ảnh & sự kiện Phan Đình Giót.

**Kết:** đoạn văn 5 câu tóm tắt chiến thắng chiến dịch Điện Biên Phủ.

**USP:** gameplay gắn trực tiếp với hành động lịch sử có thật; cơ chế "thất bại cũng dẫn đến hy sinh anh hùng" biến thua thành khoảnh khắc xúc động thay vì trừng phạt.

**Lưu ý:** kiểm tra độ chính xác lịch sử, làm việc cẩn trọng & tôn trọng với hình ảnh anh hùng có thật.

---

## 2b. Lời dẫn trong game (mở đầu & kết)

### Mở đầu (5 câu — hiện trước Giai đoạn 1)
> Năm 1954, tại lòng chảo Điện Biên Phủ giữa núi rừng Tây Bắc, thực dân Pháp dựng nên một tập đoàn cứ điểm được coi là "pháo đài bất khả xâm phạm". Để đánh vào nơi ấy, bộ đội ta phải kéo những khẩu pháo nặng hàng tấn, băng qua đèo dốc hiểm trở dưới mưa rừng và bom đạn. Mỗi mét đường là mồ hôi, là máu, và đôi khi là cả tính mạng của những người lính. Họ là những con người bình dị đã làm nên những điều phi thường. Đây là câu chuyện về lòng quả cảm và sự hy sinh ấy.

### Kết (5 câu — hiện sau khi hạ boss)
> Ngày 7 tháng 5 năm 1954, lá cờ "Quyết chiến Quyết thắng" tung bay trên nóc hầm tướng De Castries. Sau 56 ngày đêm khoét núi, ngủ hầm, mưa dầm, cơm vắt, tập đoàn cứ điểm Điện Biên Phủ hoàn toàn thất thủ. Đó là chiến thắng "lừng lẫy năm châu, chấn động địa cầu". Nó chấm dứt gần một thế kỷ đô hộ của thực dân và buộc Pháp ký Hiệp định Genève. Xin tri ân máu xương của những người đã ngã xuống cho ngày hôm nay.

---

## 3. Art Direction & thư viện ảnh

**Phong cách chung:** pixel art. GĐ1 tông đêm mưa rừng xanh; GĐ2 tông âm u xám (không mưa), góc nhìn cuộn dọc (tham khảo 1942, Raiden, Sky Force).

### Giai đoạn 1
- Cảnh **đêm + mưa nhỏ**, rừng nhiệt đới, ánh trăng trên–phải; **dãy núi nhiều tầng** phía xa (có tuyết mờ + **vài tảng đá nhô trên sườn núi**), **nhiều cây** rải trên dốc (xa nhỏ–mờ, gần to–rõ); mặt đất là **sườn dốc nghiêng lên phải**.
- **Đường mòn**: dải đất **tối, hẹp**, **gập ghềnh** (lượn sóng + sỏi đá lởm chởm) chạy dọc **nằm trên mặt dốc**, rải **nhiều vũng nước phản chiếu ánh trăng** và **các tảng đá ở hai bên vệ đường**; pháo leo lên / trượt xuống đều bám theo đường này và **nhấp nhô nhẹ** theo độ gập ghềnh.
- Bố cục: **người chèn đá đẩy ở phía sau** (trái/dưới dốc, mặt hướng lên dốc, tì vào pháo) + **người kéo dây ở phía trước** (phải/trên dốc, mặt quay về phía pháo). Bộ đội **đội nón cối, đeo balo ốp lưng**. Điểm nhấn **cờ đỏ sao vàng** trên pháo.
- **Cut scene thua**: dùng chu kỳ chạy 8 khung `linh_chay_side` cho người lính lao lên chèn pháo, rồi đổi sang `linh_nga_chay_mau` khi anh ngã xuống dưới bánh pháo.
- Ánh sáng từ trăng → bóng mềm bầu dục đổ xuống dưới–trái.

### Giai đoạn 2
- Top-down, khung dọc (portrait). Quân ta xanh olive + nón cối; quân Pháp xanh xám + mũ Adrian.
- **Animation chạy** (top-down 6 khung): quân ta `nguoi_choi_chay` (chạy khi di chuyển), lính Pháp `linh_phap_chay` (luôn chạy khi tiến xuống).
- **2.1:** **cờ đỏ sao vàng** ở lề trái, HUD "VÒNG x/3" góc trái–trên, số mạng (♥) góc phải–trên. **Trang trí**: khói xa, hố đạn, mảnh vỡ + **hàng rào thép gai** (1 hàng phía xa "no-man's land" + 1 hàng ngay trước tường bao cát). Người chơi đứng dưới cùng, **tường bao cát ở giữa** người chơi và địch.
- **2.2:** không có thép gai; HUD số mạng góc phải–trên; thể hiện rõ 3 chiêu boss.

### Concept art (`assets/concept/`)

| File | Dùng cho | Mô tả |
|---|---|---|
| `Kéo pháo.jpg` | Tham chiếu gốc | Tranh màu nước kéo pháo (người dùng cung cấp) — nguồn cảm hứng. |
| `Keo_phao_pixel_night_rain.png` | **Giai đoạn 1** | Kéo pháo lên dốc, đêm + mưa nhỏ. Ảnh chủ đạo GĐ1. |
| `Giai_doan_2_1_thu_chien_hao.png` | **Giai đoạn 2.1** | Thủ chiến hào, bắn lính Pháp (2 vòng), HUD vòng + mạng. |
| `Giai_doan_2_2_danh_boss.png` | **Giai đoạn 2.2** | Đánh boss 2 lỗ châu mai, 3 chiêu, HUD mạng. |

### Sprite đã tách (`assets/sprites/`) — PNG nền trong suốt
Xem nhanh tất cả trong `assets/sprites/_preview_sprites.png`.

**phase1/** — `linh_day_chen_da.png`, `linh_keo_day.png`, `khau_phao.png`, `cay_rung.png`, `linh_chay.png` (lính chạy, side), `linh_nga_chay_mau.png` (ngã chảy máu, side — cut scene)
**phase2/** — `nguoi_choi_linh_ta.png`, `linh_phap.png`, `nguoi_choi_chay.png` (chạy, top-down), `linh_phap_chay.png` (địch chạy tới), `linh_nga_chay_mau.png` (ngã chảy máu, top-down), `lo_chau_mai.png`, `may_bay_nem_bom.png`, `dan_ta.png`, `dan_dich.png`, `vong_canh_bao_bom.png`, `mang_tim.png`, `bao_cat.png`, `ho_bom.png`

### Cấu trúc thư mục dự án
```
start game/
├── game-ideas.md                  # tài liệu thiết kế (file này)
└── assets/
    ├── concept/                   # ảnh concept art gốc
    └── sprites/
        ├── phase1/                # sprite tĩnh Giai đoạn 1
        ├── phase2/                # sprite tĩnh Giai đoạn 2
        ├── anim/                  # chu kỳ chạy (run cycle) — frame + .gif + _strip
        │   ├── linh_chay_side/    # 8 khung (side, cut scene GĐ1)
        │   ├── nguoi_choi_chay/   # 6 khung (top-down, quân ta)
        │   └── linh_phap_chay/    # 6 khung (top-down, quân Pháp)
        └── _preview_sprites.png   # ảnh xem nhanh tất cả sprite tĩnh
```
> Khi dựng game sẽ thêm: `index.html`, `js/` (hoặc gộp trong 1 file HTML), `audio/`.

---

## 4. Hệ thống tính điểm

```
Điểm 1 vòng = Điểm thời gian + Điểm tiêu diệt + Điểm mạng
Tổng điểm   = cộng dồn tất cả các vòng (GĐ1 ×5 lượt bấm, GĐ2.1 ×2 vòng, GĐ2.2 boss)
```

### 4.1. Điểm thời gian (hoàn thành nhanh)
Mỗi vòng có **quỹ thời gian** (par time). Xong sớm = nhiều điểm:
```
Điểm thời gian = max(0, (Tpar − Tthực)) × 10
```
Ví dụ par 60s, xong trong 42s → (60−42)×10 = **180 điểm**. Sàn = 0 (không phạt người chậm).

### 4.2. Điểm tiêu diệt (GĐ2.1 — đã cân bằng lại cho số lính tăng)

| Mục tiêu | Điểm |
|---|---|
| Lính Pháp thường (vòng 1–2) | +40 |
| Lính bắn-đôi (vòng 3, 2 máu) | +80 |
| Phá xong 1 lỗ châu mai (GĐ2.2) | +2000 |
| **Combo** (hạ liên tiếp không trúng đạn) | ×1.1, ×1.2, ×1.3… (tối đa ×2) |
| **Hoàn thành 1 vòng** | +200 |
| **Thưởng thời gian** mỗi vòng | (giây dư) × 4 |
| **Giữ vững** — qua 1 vòng không mất mạng nào | +500 |

> Per-kill giảm từ 100 → 40/80 vì tổng số lính GĐ2.1 đã tăng (12 + 24 + 22 = 58 lính); bù lại thưởng theo **kỹ năng** (combo, hoàn thành vòng, không mất mạng) thay vì chỉ đếm đầu lính.
> **GĐ1 không có địch** → thay bằng **điểm canh nhịp**: Hoàn hảo +50, bấm hụt −30, kèm combo Hoàn hảo liên tiếp.

### 4.3. Điểm mạng còn lại
Tính ở **cuối Giai đoạn 2**:
```
Điểm mạng = số mạng còn lại × 500
```
Ví dụ còn 2/3 mạng → **1000 điểm**. GĐ1 (không có mạng) → tương đương: **không để hy sinh / không bấm hụt** → thưởng "Hoàn hảo" +500.

### 4.4. Xếp hạng cuối

| Hạng | Ngưỡng điểm (gợi ý) |
|---|---|
| ⭐⭐⭐ S | ≥ 10000 |
| ⭐⭐ A | 7000–9999 |
| ⭐ B | 4500–6999 |
| C | < 4500 |

> Ba thành phần tạo căng thẳng tốt: muốn điểm thời gian cao phải chơi nhanh, nhưng nhanh dễ mất mạng (GĐ2) và dễ bấm hụt (GĐ1) → phải cân bằng. Combo thưởng việc chơi sạch.
> *Các con số (100/2000/500/×10, ngưỡng hạng) là gợi ý — tinh chỉnh khi cân bằng game.*

---

## 5. Bước tiếp theo

1. ✅ Viết nội dung 5 câu mở đầu + 5 câu kết (xem mục 2b).
2. ✅ Tách sprite từ concept art (xem `assets/sprites/`).
3. 🔧 Dựng prototype trong `index.html` (1 file HTML5 Canvas): ✅ GĐ1 (5 lượt canh nhịp + cut scene Tô Vĩnh Diện) · ☐ GĐ2.1 · ☐ GĐ2.2 *(bản nháp đã có, đang tinh chỉnh)*.
4. ✅ Gắn hệ thống tính điểm + màn hình kết quả/xếp hạng (bản đầu — chờ cân bằng).
5. ☐ Tinh chỉnh cân bằng độ khó + thêm âm thanh.
6. ☐ Deploy link cho cả lớp chơi.
