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

  // Hàm giả lập tạo vector cho truy vấn (sẽ được ghi đè sau)
  generateQueryVector(query) {
    // Placeholder, sẽ được ghi đè trong implementEmbeddingModel
    return [0.1, 0.1, 0.1, 0.1];
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

    // Kiểm tra ngưỡng để xác định hit cache
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

// Tích hợp Vector Store
function integrateRealVectorStore(llm) {
  console.log(
    "Integrating with a real vector store (e.g., Pinecone, Weaviate)..."
  );
  console.log("Connected to in-memory vector store simulation.");
  const newDocument = {
    content:
      "Vector stores are databases designed to store and search embeddings efficiently.",
    vector: [0.5, 0.5, 0.3, 0.2],
  };
  llm.contextCache["Vector Store Basics"] = newDocument;
  console.log(
    "New document 'Vector Store Basics' added to in-memory vector store."
  );
  return "Vector store integration setup complete.";
}

// Tích hợp Embedding Model
function implementEmbeddingModel(llm) {
  console.log(
    "Implementing embedding model (e.g., OpenAI Embeddings, SentenceTransformers)..."
  );
  llm.generateQueryVector = function (query) {
    const lowerQuery = query.toLowerCase();
    if (lowerQuery.includes("ai")) {
      console.log("Embedding: Query matches 'AI' topic.");
      return [0.85, 0.15, 0.25, 0.35];
    } else if (lowerQuery.includes("cag") && !lowerQuery.includes("rag")) {
      console.log("Embedding: Query matches 'CAG' topic.");
      return [0.25, 0.75, 0.35, 0.15];
    } else if (
      lowerQuery.includes("rag") ||
      lowerQuery.includes("difference")
    ) {
      console.log("Embedding: Query matches 'RAG vs CAG' topic.");
      return [0.35, 0.65, 0.45, 0.05];
    } else if (lowerQuery.includes("vector") || lowerQuery.includes("store")) {
      console.log("Embedding: Query matches 'Vector Store' topic.");
      return [0.5, 0.5, 0.3, 0.2];
    } else {
      console.log("Embedding: No relevant topic match found.");
      return [0.1, 0.1, 0.1, 0.1];
    }
  };
  console.log("In-memory embedding model simulation implemented.");
  return "Embedding model setup complete.";
}

// Tối ưu hóa hiệu suất
function optimizePerformance(llm) {
  console.log(
    "Optimizing performance with Approximate Nearest Neighbors (ANN) search simulation..."
  );
  llm.queryResultCache = {};
  const originalGenerateResponse = llm.generateResponse;
  llm.generateResponse = function (query) {
    if (this.queryResultCache[query]) {
      console.log(`Processing query: ${query} (from query result cache)`);
      return this.queryResultCache[query];
    }
    const response = originalGenerateResponse.call(this, query);
    this.queryResultCache[query] = response;
    return response;
  };
  console.log("Query result caching implemented for performance optimization.");
  return "Performance optimization setup complete.";
}

// Điều chỉnh ngưỡng similarity
function adjustSimilarityThreshold(llm, newThreshold) {
  console.log(`Adjusting similarity threshold to: ${newThreshold}`);
  if (newThreshold < 0 || newThreshold > 1) {
    throw new Error("Similarity threshold must be between 0 and 1.");
  }
  llm.similarityThreshold = newThreshold;
  console.log(
    `Similarity threshold updated to ${newThreshold} in LLM instance.`
  );
  return `Similarity threshold adjusted to ${newThreshold}.`;
}

// Demo sử dụng CacheAugmentedLLM
function main() {
  const llm = new CacheAugmentedLLM();
  console.log("=== Starting Cache-Augmented LLM Demo ===\n");

  console.log("=== Step 1: Integrating Vector Store ===");
  console.log(integrateRealVectorStore(llm));
  console.log("\n");

  console.log("=== Step 2: Implementing Embedding Model ===");
  console.log(implementEmbeddingModel(llm));
  console.log("\n");

  console.log("=== Step 3: Optimizing Performance ===");
  console.log(optimizePerformance(llm));
  console.log("\n");

  console.log("=== Step 4: Adjusting Similarity Threshold ===");
  console.log(adjustSimilarityThreshold(llm, 0.9));
  console.log("\n");

  console.log("=== Step 5: Processing User Queries ===");
  const queries = [
    "What is AI?",
    "Explain CAG",
    "Difference between RAG and CAG",
    "What is a vector store?",
    "What is quantum computing?",
    "What is AI?",
  ];
  queries.forEach((query) => {
    const response = llm.generateResponse(query);
    console.log(`\nQuery: ${query}`);
    console.log(response);
    console.log("-".repeat(50));
  });

  console.log("=== Step 6: Testing with Lower Similarity Threshold ===");
  console.log(adjustSimilarityThreshold(llm, 0.5));
  console.log("\nRe-running query to demonstrate threshold impact:");
  const testQuery = "What is quantum computing?";
  const response = llm.generateResponse(testQuery);
  console.log(`\nQuery: ${testQuery}`);
  console.log(response);
  console.log("-".repeat(50));

  console.log("=== End of Cache-Augmented LLM Demo ===");
}

// Chạy chương trình chính
main();
