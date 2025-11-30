import os
from fastapi import APIRouter, UploadFile, File
from AI_Document_Summarizer_QA_System.components.stage_01_document_loader import DocumentLoader
from AI_Document_Summarizer_QA_System.components.stage_02_text_splitter import TextSplitter
from AI_Document_Summarizer_QA_System.components.stage_03_store_index import VectorIndex
from AI_Document_Summarizer_QA_System.components.stage_04_RAG import RAGPipeline
from AI_Document_Summarizer_QA_System.components.stage_05_Output import SummaryGenerator, OutputFormatter
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

loader = DocumentLoader()
splitter = TextSplitter()
indexer = VectorIndex()
rag = RAGPipeline()
formatter = OutputFormatter()

groq_key = os.getenv("GROQ_API_KEY")
summarizer = SummaryGenerator(groq_key)

@router.post("/upload")
async def upload_files(files: list[UploadFile] = File(...)):
    all_texts = []

    for file in files:
        if file.content_type != "application/pdf":
            continue

        content = await file.read()
        temp_path = f"temp_{file.filename}"

        with open(temp_path, "wb") as f:
            f.write(content)

        docs = loader.load(temp_path)
        os.remove(temp_path)

        cleaned_docs = [d for d in docs if d and d.strip()]
        if not cleaned_docs:
            continue

        all_texts.extend(cleaned_docs)

    if not all_texts:
        return {"error": "No valid PDFs detected or all files were empty."}

    chunks = splitter.split_documents(all_texts)
    indexer.add_documents(chunks)

    return {
        "status": "indexed",
        "files_processed": len(files),
        "valid_documents": len(all_texts),
        "chunks_created": len(chunks)
    }

@router.get("/ask")
def ask_question(query: str):
    result = rag.ask(query)
    return formatter.build_response(result["answer"], result["sources"])


@router.post("/summarize")
def summarize_document(mode: str, content: str):
    if mode == "short":
        summary = summarizer.short_summary(content)
    elif mode == "medium":
        summary = summarizer.medium_summary(content)
    else:
        summary = summarizer.detailed_summary(content)

    return {"summary": summary}
