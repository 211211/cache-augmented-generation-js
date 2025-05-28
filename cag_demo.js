// Mô phỏng một mô hình ngôn ngữ lớn (LLM) với bộ nhớ ngữ cảnh
class CacheAugmentedLLM {
  constructor() {
    // Bộ nhớ cache chứa toàn bộ tài liệu đã được nạp trước
    this.contextCache = {};
    this.loadContextCache();
  }

  loadContextCache() {
    /**
     * Nạp trước toàn bộ tài liệu vào bộ nhớ ngữ cảnh.
     * Ở đây, chúng ta giả lập một tập tài liệu về công nghệ AI.
     */
    this.contextCache = {
      "AI basics":
        "Artificial Intelligence (AI) is the simulation of human intelligence processes by machines, especially computer systems. It includes learning, reasoning, and self-correction.",
      "LLM definition":
        "Large Language Models (LLMs) are AI models trained on vast datasets to understand and generate human-like text.",
      "CAG overview":
        "Cache Augmented Generation (CAG) is a method to pre-load relevant documents into an LLM's context memory to reduce latency and improve response time.",
      "RAG vs CAG":
        "Unlike Retrieval-Augmented Generation (RAG), which retrieves documents in real-time, CAG pre-loads data into memory for faster access.",
    };
    console.log("Context cache loaded with predefined documents.");
  }

  generateResponse(query) {
    /**
     * Tạo câu trả lời dựa trên dữ liệu đã được nạp trước trong bộ nhớ cache.
     * Không cần truy xuất dữ liệu bên ngoài.
     */
    console.log(`Processing query: ${query}`);
    // Tìm kiếm thông tin liên quan trong cache
    for (const [topic, content] of Object.entries(this.contextCache)) {
      if (
        topic.toLowerCase().includes(query.toLowerCase()) ||
        content.toLowerCase().includes(query.toLowerCase())
      ) {
        return `Response from cache:\n${content}`;
      }
    }
    return "Sorry, I couldn't find relevant information in the cached context for your query.";
  }
}

// Demo sử dụng CacheAugmentedLLM
function main() {
  // Khởi tạo mô hình với bộ nhớ cache đã được nạp trước
  const llm = new CacheAugmentedLLM();

  // Mô phỏng một số truy vấn từ người dùng
  const queries = [
    "What is AI?",
    "Explain CAG",
    "Difference between RAG and CAG",
    "What is quantum computing?",
  ];

  // Xử lý từng truy vấn
  queries.forEach((query) => {
    const response = llm.generateResponse(query);
    console.log(`\nQuery: ${query}`);
    console.log(response);
    console.log("-".repeat(50));
  });
}

// Chạy chương trình
main();
