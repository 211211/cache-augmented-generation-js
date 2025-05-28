# Cache-Augmented Generation (CAG) – Khoá học mini bằng JavaScript 🇻🇳

Tài liệu này được viết **hoàn toàn bằng tiếng Việt** nhằm hỗ trợ giảng dạy về kỹ thuật *Cache-Augmented Generation* (CAG).  Mỗi tệp trong repo là **một bài học độc lập** giúp bạn (hoặc học viên) dần dần xây dựng trực giác về việc nạp trước tri thức vào bộ nhớ ngữ cảnh của mô hình ngôn ngữ.

> **Mục tiêu**: Chạy được ngay với Node.js thuần, không phụ thuộc thư viện ngoài, log chi tiết để quan sát luồng xử lý.

---

## Danh sách tệp & mục đích sư phạm

| Tệp | Cấp độ | Kiến thức chính | Bạn sẽ học được |
|-----|--------|-----------------|-----------------|
| **cag_demo.js** | Cơ bản | Bộ nhớ cache dạng chuỗi thuần | • Khái niệm nạp trước (pre-load)<br>• Truy vấn theo từ khoá (string match) |
| **cag_demo_with_vector_store.js** | Trung bình | Thêm _vector store_ giả lập & phép đo cosine | • Embedding giả<br>• Tương đồng ngữ nghĩa<br>• Ngưỡng similarity `0.85` |
| **cache_augmented_llm.js** | Khá | Tái cấu trúc thành lớp `CacheAugmentedLLM` và thêm tính năng | • Tiêm hàm embedding tùy chỉnh<br>• Kết nối vector store ngoài (mock)<br>• Cache kết quả truy vấn để tăng tốc |
| **cache_augmented_llm_with_search.js** | Nâng cao | Tách pipeline rõ ràng: _vector hoá ➜ tìm kiếm ➜ phản hồi_ | • Hàm độc lập `vectorizeQuery` & `searchVectorStore`<br>• Minh họa thuật toán ANN ở mức mô phỏng |

### Lời khuyên cho giảng viên

1. Bắt đầu với `cag_demo.js`, cho sinh viên thấy hạn chế của khớp chuỗi.
2. Chuyển sang `cag_demo_with_vector_store.js` để chứng minh lợi ích của embedding.
3. Khảo sát `cache_augmented_llm.js` để bàn về kiến trúc sản phẩm thật.
4. Kết thúc với `cache_augmented_llm_with_search.js`, nhấn mạnh tầm quan trọng của từng bước trong pipeline tìm kiếm.

---

## Cách chạy nhanh

```bash
# Yêu cầu Node >= 14

# Chạy bài học cơ bản
node cag_demo.js

# Chạy phiên bản nâng cao với log chi tiết
node cache_augmented_llm_with_search.js
```

Mỗi script sẽ in **console log** mô tả từng bước, cực kỳ hữu ích để trình chiếu trên lớp.

---

## CAG & RAG khác nhau thế nào?

| Tiêu chí | CAG (_Cache-Augmented_) | RAG (_Retrieval-Augmented_) |
|----------|------------------------|-----------------------------|
| Thời điểm lấy tài liệu | **Trước** khi nhận truy vấn – nạp sẵn | **Ngay** khi có truy vấn – truy xuất động |
| Độ trễ | Thấp, vì không phải truy xuất ngoài | Cao hơn (phụ thuộc hệ thống tìm kiếm) |
| Yêu cầu bộ nhớ | Cao hơn (lưu tài liệu trong RAM / context) | Thấp hơn |
| Phù hợp | Bộ câu hỏi lặp lại, dữ liệu ít thay đổi | Kiến thức lớn, thay đổi liên tục |

---

## Tự khám phá thêm

• Sửa nội dung trong `contextCache` để thấy tác động.
• Điều chỉnh `similarityThreshold` để kiểm chứng độ nhạy.
• Thay thế hàm embedding giả bằng API thật (OpenAI, SentenceTransformers…).

---

## Tác giả & liên hệ

Kho lưu trữ thuộc quyền quản lý của **admin@nguyenhongquan.com**.  Mọi góp ý, câu hỏi hoặc hợp tác vui lòng email trực tiếp.

Chúc bạn học vui – *Code là hiểu!* 🚀
