// Mô phỏng một mô hình ngôn ngữ lớn (LLM) với bộ nhớ ngữ cảnh và vector store
class CacheAugmentedLLM {
  constructor() {
    // Bộ nhớ cache chứa tài liệu và vector tương ứng
    this.contextCache = {};
    // Ngưỡng độ tương đồng để xác định hit cache (85%)
    this.similarityThreshold = 0.85;
    this.loadContextCache();
  }

  loadContextCache() {
    /**
     * Nạp trước toàn bộ tài liệu vào bộ nhớ ngữ cảnh cùng với vector giả lập.
     * Vector ở đây là mảng số đại diện cho tài liệu (trong thực tế, vector này được tạo bởi mô hình embedding).
     */
    this.contextCache = {
      "AI basics": {
        content:
          "Artificial Intelligence (AI) is the simulation of human intelligence processes by machines, especially computer systems. It includes learning, reasoning, and self-correction.",
        vector: [0.9, 0.1, 0.2, 0.3], // Vector giả lập cho AI basics
      },
      "LLM definition": {
        content:
          "Large Language Models (LLMs) are AI models trained on vast datasets to understand and generate human-like text.",
        vector: [0.8, 0.2, 0.3, 0.4], // Vector giả lập cho LLM definition
      },
      "CAG overview": {
        content:
          "Cache Augmented Generation (CAG) is a method to pre-load relevant documents into an LLM's context memory to reduce latency and improve response time.",
        vector: [0.3, 0.7, 0.4, 0.2], // Vector giả lập cho CAG overview
      },
      "RAG vs CAG": {
        content:
          "Unlike Retrieval-Augmented Generation (RAG), which retrieves documents in real-time, CAG pre-loads data into memory for faster access.",
        vector: [0.4, 0.6, 0.5, 0.1], // Vector giả lập cho RAG vs CAG
      },
    };
    console.log("Context cache loaded with predefined documents and vectors.");
  }

  // Hàm tính cosine similarity giữa hai vector
  calculateCosineSimilarity(vec1, vec2) {
    if (vec1.length !== vec2.length) return 0;
    let dotProduct = 0;
    let magnitude1 = 0;
    let magnitude2 = 0;

    for (let i = 0; i < vec1.length; i++) {
      dotProduct += vec1[i] * vec2[i];
      magnitude1 += vec1[i] * vec1[i];
      magnitude2 += vec2[i] * vec2[i];
    }

    magnitude1 = Math.sqrt(magnitude1);
    magnitude2 = Math.sqrt(magnitude2);

    if (magnitude1 === 0 || magnitude2 === 0) return 0;
    return dotProduct / (magnitude1 * magnitude2);
  }

  // Hàm giả lập tạo vector cho truy vấn (trong thực tế, dùng mô hình embedding)
  generateQueryVector(query) {
    /**
     * Tạo vector giả lập cho truy vấn dựa trên nội dung truy vấn.
     * Trong thực tế, vector này được tạo bởi một mô hình embedding như BERT.
     */
    if (query.toLowerCase().includes("ai")) {
      return [0.85, 0.15, 0.25, 0.35]; // Gần với AI basics
    } else if (
      query.toLowerCase().includes("cag") &&
      !query.toLowerCase().includes("rag")
    ) {
      return [0.25, 0.75, 0.35, 0.15]; // Gần với CAG overview
    } else if (
      query.toLowerCase().includes("rag") ||
      query.toLowerCase().includes("difference")
    ) {
      return [0.35, 0.65, 0.45, 0.05]; // Gần với RAG vs CAG
    } else {
      return [0.1, 0.1, 0.1, 0.1]; // Không liên quan đến tài liệu nào
    }
  }

  generateResponse(query) {
    /**
     * Tạo câu trả lời dựa trên dữ liệu trong vector store.
     * So sánh vector của truy vấn với vector của tài liệu trong cache.
     */
    console.log(`Processing query: ${query}`);
    const queryVector = this.generateQueryVector(query);
    let bestMatch = null;
    let highestSimilarity = 0;

    // Tìm tài liệu có độ tương đồng cao nhất
    for (const [topic, data] of Object.entries(this.contextCache)) {
      const similarity = this.calculateCosineSimilarity(
        queryVector,
        data.vector
      );
      console.log(`Similarity with "${topic}": ${similarity.toFixed(3)}`);
      if (similarity > highestSimilarity) {
        highestSimilarity = similarity;
        bestMatch = { topic, content: data.content };
      }
    }

    // Kiểm tra ngưỡng 85% để xác định hit cache
    if (highestSimilarity >= this.similarityThreshold) {
      return `Hit cache (Similarity: ${highestSimilarity.toFixed(
        3
      )}):\nResponse from cache for "${bestMatch.topic}":\n${
        bestMatch.content
      }`;
    } else {
      return `Miss cache (Similarity: ${highestSimilarity.toFixed(
        3
      )}):\nSorry, no relevant information found in cache with sufficient accuracy.`;
    }
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
