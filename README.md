# Cache-Augmented Generation (CAG) – JavaScript Teaching Repository

Welcome!  This mini-repository is intentionally **didactic**: every file is a self-contained lesson that incrementally introduces the idea of _Cache-Augmented Generation_ (CAG) – a technique in which we preload relevant documents into an LLM’s context so the model can answer many questions **without performing a live retrieval step**.

The code is kept short, dependency-free and thoroughly logged so that you can run each script with plain Node and _see_ what is happening at every phase.

```bash
# run any demo
node cag_demo.js
```

---

## File Tour

| File | Pedagogical Focus | Key Concepts Introduced |
|------|-------------------|-------------------------|
| **cag_demo.js** | 🍏 _“Hello CAG”_ – the smallest viable example | • Pre-loaded text cache<br>• Linear string matching |
| **cag_demo_with_vector_store.js** | 🍊 Adds semantic search via fake embeddings | • Document vectors<br>• Cosine similarity<br>• Similarity threshold (`0.85` default) |
| **cache_augmented_llm.js** | 🍎 Modularises the code into a reusable `CacheAugmentedLLM` class and layers extra features | • Embedding-function injection<br>• Vector-store plug-in stub<br>• Query-result cache (performance)<br>• Runtime similarity-threshold tuning |
| **cache_augmented_llm_with_search.js** | 🍉 Separates the pipeline even further to highlight each sub-step | • Dedicated helpers: `vectorizeQuery` & `searchVectorStore`<br>• Clear trace of _vectorise ➜ search ➜ answer_ |

> **Tip for educators** – Because each successive file only adds a single conceptual leap, you can walk learners through the scripts one after another, live-coding small deltas or using `git diff` to highlight the change.

---

## Suggested Learning Path

1. **Run `cag_demo.js`** to observe basic string matching and discuss its limitations (lexical vs semantic).
2. **Move to `cag_demo_with_vector_store.js`** to show how embeddings plus cosine similarity overcome those limits.
3. **Graduate to `cache_augmented_llm.js`** for a conversation about real-world concerns: external vector stores, plug-able embeddings and caching for latency.
4. **Finish with `cache_augmented_llm_with_search.js`** to underline the standard retrieval pipeline that underpins most production systems.

---

## Why CAG instead of RAG?

Retrieval-Augmented Generation (RAG) fetches documents _at query time_. CAG pre-loads a carefully selected subset into the model’s context (or fast in-memory vector store), trading memory for speed.  This repo lets students experiment with that trade-off before touching heavyweight libraries or cloud services.

---

## Running the demos

All scripts rely only on the Node.js standard library.

```bash
# Execute a script
node cache_augmented_llm.js

# View verbose logs for learning
NODE_OPTIONS="--trace-warnings" node cache_augmented_llm_with_search.js
```

Feel free to modify the **`contextCache`** objects, tweak the **`similarityThreshold`**, or replace the fake embedding function with your own model to explore further.

---

Happy learning – and happy caching! 🎉

---

## Repository owner

This repository and all provided assets are maintained by **admin@nguyenhongquan.com**.

