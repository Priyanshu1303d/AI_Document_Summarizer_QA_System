# 📄 AI Document Summarizer & Q/A System — RAG Pipeline (Pinecone + Groq)

A production-ready Retrieval-Augmented Generation (RAG) system capable of:

* Ingesting **single or multiple PDFs**
* Splitting them into high-quality overlapping chunks
* Embedding and storing vectors in **Pinecone**
* Answering questions with **Groq-powered Llama 3.3**
* Generating **short, medium, and detailed summaries**
* Producing **clean, formatted responses** for API/UI integration

This project demonstrates a complete, modular, DVC-tracked pipeline suitable for **enterprise document automation**, **research assistants**, or **intelligent PDF reading agents**.

---

## ✨ Features

* 📚 **Multi-Document Loader** (PDF → text)
* 🔪 **Recursive Text Splitter** with configurable chunking
* 🧠 **Embedding Generator** using free HuggingFace MiniLM (384 dims)
* 📦 **Vector Storage** in Pinecone with serverless spec
* 🔍 **Retriever** using semantic similarity search
* 🤖 **Groq LLM** for ultra-fast inference (Llama 3.3)
* 📝 **Three-level Summary Generator**

  * TL;DR
  * Structured
  * Detailed multi-section
* 🧼 **Output Formatter** for clean responses
* 🔗 **Full RAG Pipeline** combining retrieval + generation
* ⚙️ **Modular Architecture** ready for FastAPI deployment
* 📁 **DVC Integration** for reproducible stages

---

## 🛠️ Tech Stack

| Component         | Technology                           |
| ----------------- | ------------------------------------ |
| Embeddings        | all-MiniLM-L6-v2 (HuggingFace)       |
| Vector Store      | Pinecone (serverless)                |
| LLM               | Groq — Llama 3.3                     |
| Pipeline Tracking | DVC                                  |
| Runtime           | Python 3.10                          |
| Orchestration     | Modular component-based architecture |
| UI (Upcoming)     | FastAPI + Next.js                    |

---

## 📂 Project Structure

```
AI_Document_Summarizer_QA_System/
├── Data/
│   └── <your PDFs>
├── research/
├── src/
│   └── AI_Document_Summarizer_QA_System/
│       ├── components/
│       │   ├── stage_01_document_loader.py
│       │   ├── stage_02_text_splitter.py
│       │   ├── stage_03_store_index.py
│       │   ├── stage_04_RAG.py
│       │   └── stage_05_Output.py
│       ├── logging/
│       ├── utils/
├── templates/
├── .env
├── .env.example
├── .gitignore
├── Dockerfile
├── dvc.yaml
├── LICENSE
├── main.py
├── README.md
├── requirements.txt
├── setup.py
└── template.py
```

---

## 📦 Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Priyanshu1303d/AI_Document_Summarizer_QA_System.git
cd AI_Document_Summarizer_QA_System
```

### 2️⃣ Create and activate a virtual environment

```bash
python -m venv .venv
# Windows
.venv\Scripts\activate
# Linux/Mac
source .venv/bin/activate
```

### 3️⃣ Install dependencies

```bash
pip install -r requirements.txt
```

### 4️⃣ Configure your `.env`

```env
PINECONE_API_KEY=your_key
PINECONE_REGION=us-east-1
PINECONE_INDEX_NAME=ai-document-index

GROQ_API_KEY=your_groq_key
```

### (Or You can simply copy and paste from .env.example to .env and add your api keys in it)

(HuggingFace MiniLM embeddings do **not** require any API key.)

---

## 🔀 Pipeline Breakdown (DVC Stages)

| Stage | Component                     | Purpose                               |
| ----- | ----------------------------- | ------------------------------------- |
| 01    | `stage_01_document_loader.py` | Load PDFs into clean text             |
| 02    | `stage_02_text_splitter.py`   | Convert text → overlapping chunks     |
| 03    | `stage_03_store_index.py`     | Embed + store chunks in Pinecone      |
| 04    | `stage_04_RAG.py`             | Retrieve → LLM generate answer        |
| 05    | `stage_05_Output.py`          | Generate summaries + clean formatting |

---

## 🚀 Usage

### 👉 Run the full pipeline

```bash
dvc repro
```

### 👉 Test RAG and Summaries in `trial.ipynb`

You can run:

* Short / medium / detailed summaries
* Custom QA
* Retrieval checks
* Multi-file ingestion

Example:

```python
rag = RAGPipeline()
rag.ask("What is the third project described in the document?")
```

Generate summaries:

```python
summaries = summarizer.generate_all(text)
```

---

## 🧪 Example Query

**User Question:**

> “What is the third capstone project mentioned in the document?”

**Model Answer:**

> "The third capstone project described in the document is the **AI Image Generator**, which generates images using Stable Diffusion or DALL·E…"

**Retrieved Sources:**
(Shortened and cleaned automatically)

---

## 🌟 Why This Project Matters

This system demonstrates the **exact skills required for modern AI engineering roles**:

* Building RAG pipelines end-to-end
* Managing embeddings, vector stores, and retrieval
* Using fast open-weight LLMs (Groq)
* Modular backend engineering
* Clean architecture + reproducibility (DVC)
* Preparing for production deployment (FastAPI + Docker)

Perfect for roles involving:

✔ AI automation
✔ Document intelligence
✔ LLM engineering
✔ Backend ML systems

---

## 🤝 Contributing

Feel free to open issues or submit PRs. Clean, modular code is always welcome.

---

## 📄 License

This project is licensed under the **MIT License**.

---

## ✍️ Author

**Priyanshu Kumar Singh**
⭐ GitHub: [https://github.com/Priyanshu1303d](https://github.com/Priyanshu1303d)

---

