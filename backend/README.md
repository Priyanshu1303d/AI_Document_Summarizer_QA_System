---
title: Doc Summarizer Backend
emoji: 📄
colorFrom: blue
colorTo: green
sdk: docker
pinned: false
app_port: 7860
---
# 📄 AI Document Summarizer & Q/A System

### **Full-Stack RAG Application — FastAPI + Next.js + Pinecone + Groq**

A complete Retrieval-Augmented Generation (RAG) system that can **ingest multiple PDFs**, index them intelligently, perform **semantic search**, answer questions using **Groq Llama 3.3**, and generate **multi-level summaries**.
Includes a **Next.js 14 frontend**, **FastAPI backend**, and a **modular, DVC-tracked pipeline**.

Built for **enterprise document automation**, **research assistants**, and **intelligent PDF reading agents**.

---

# ⚡ Key Features

### 📤 **PDF Ingestion**

* Upload **multiple large PDFs**
* Extract & clean text
* Byte-level PDF loading (no temp files required)

### ✂️ **Smart Text Chunking**

* Recursive Character Splitter
* Configurable chunk size & overlap
* Respects semantic boundaries

### 🧠 **Vector Embeddings & Storage**

* Embeddings: `all-MiniLM-L6-v2` (384-dim)
* Vector DB: **Pinecone Serverless**
* Auto-detect & auto-create index on first run

### 🔍 **Retrieval Pipeline**

* Semantic similarity search
* Noise filtering
* Top-k contextual retrieval

### 🤖 **Groq-Powered LLM**

* Llama 3.3 + Groq inference
* Ultra-fast, low-latency responses
* Streaming support (frontend)

### 📝 **Summarization Engine**

Three modes:

* **Short** — TL;DR
* **Medium** — Structured
* **Detailed** — Section-wise breakdown

### 🧼 **Output Formatter**

* Cleans sources
* Styles answers for UI
* Removes duplicated citations

### 🌐 **Full Frontend**

Built with:

* **Next.js 14 (App Router)**
* **TailwindCSS**
* **shadcn/ui**
* **Framer Motion**
* **File drag-and-drop**, **chat UI**, **smooth scrolling**, **scrollbar hidden**

### 🧬 **Threaded Chat System**

* Each chat session has a unique **thread ID**
* Chat memory stored per-thread
* Stateless backend, stateful UI

---

# 🛠️ Tech Stack

| Layer        | Technology                                        |
| ------------ | ------------------------------------------------- |
| Frontend     | Next.js 14, TailwindCSS, shadcn/ui, Framer Motion |
| Backend API  | FastAPI                                           |
| Embeddings   | HuggingFace MiniLM (384-dim)                      |
| Vector Store | Pinecone Serverless                               |
| LLM          | Groq Llama 3.3                                    |
| Pipeline     | DVC                                               |
| Language     | Python 3.10                                       |

---

# 📂 Project Structure

```
AI_Document_Summarizer_QA_System/
├── Data/                                 # PDFs for pipeline testing
├── research/                             # Jupyter experiments
├── pipelines/                            # DVC pipeline scripts
│   ├── load_docs.py
│   ├── split_text.py
│   ├── index_store.py
│   └── test_rag.py
├── src/
│   └── AI_Document_Summarizer_QA_System/
│       ├── components/
│       │   ├── stage_01_document_loader.py
│       │   ├── stage_02_text_splitter.py
│       │   ├── stage_03_store_index.py
│       │   ├── stage_04_RAG.py
│       │   └── stage_05_Output.py
│       ├── utils/
│       └── logging/
├── api/
│   └── routes.py                         # FastAPI Routes
├── templates/
├── app.py / main.py                      # FastAPI App Entry
├── dvc.yaml
├── requirements.txt
├── Dockerfile
└── README.md
```

---

# ⚙️ Installation

### 1. Clone the repo

```bash
git clone https://github.com/Priyanshu1303d/AI_Document_Summarizer_QA_System.git
cd AI_Document_Summarizer_QA_System/backend
```

### 2. Install backend dependencies

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

### 3. Setup environment variables (`.env`)

```env
PINECONE_API_KEY=your_key
PINECONE_INDEX_NAME=doc-index
PINECONE_REGION=us-east-1
GROQ_API_KEY=your_groq_key


APP_HOST=0.0.0.0
APP_PORT=8000
DEBUG=true
```
### (Or You can copy from `.env.example` to `.env` file and put your key in it)


### 4. Run FastAPI backend

```bash
uvicorn app:app --reload
```

### (Run Backend First then frontend)

---

# 🌐 Frontend (Next.js)

Navigate to `frontend/`:

```bash
cd frontend
npm install
npm run dev
```

Open:
👉 [http://localhost:3000](http://localhost:3000)

### (Run Backend First then frontend)

Pages:

* `/upload` — PDF Upload
* `/chat` — RAG Chat Interface
* `/summaries` — Summary Generator

---

# 🔀 DVC Pipeline

Run the whole pipeline:

```bash
dvc repro
```

Stages:

| Stage          | Description              |
| -------------- | ------------------------ |
| stage_01_load  | Load & parse PDFs        |
| stage_02_split | Chunk documents          |
| stage_03_index | Embed + Pinecone storage |
| stage_04_test  | Retrieval + QA test      |

---

# 🚀 API Endpoints

| Endpoint     | Method | Description                       |
| ------------ | ------ | --------------------------------- |
| `/upload`    | POST   | Upload & index PDFs               |
| `/ask`       | GET    | Ask RAG questions                 |
| `/summarize` | POST   | Summaries (short/medium/detailed) |

---

# 🧪 Example Query

Request:

```http
GET /ask?query=What is the document about?
```

Response:

```json
{
  "answer": "The document contains internship projects such as AI Image Generator and Document Q/A...",
  "sources": [...]
}
```

---

# 🌟 Why This Project Stands Out

This system reflects **real-world AI engineering skills**:

* Complete RAG pipeline
* Multi-file ingestion
* Pinecone vector DB integration
* Next.js 14 UI
* FastAPI backend with clean modular architecture
* Streaming + threaded chat
* DVC reproducibility
* Fully production-deployable (Docker supported)


---

# 📄 License

MIT License.

---

# ✍️ Author

**Priyanshu Kumar Singh**
⭐ GitHub: [https://github.com/Priyanshu1303d](https://github.com/Priyanshu1303d)

---