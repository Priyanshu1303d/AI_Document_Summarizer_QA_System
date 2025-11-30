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

DOCUMENT_STORE = []

@router.post("/upload")
async def upload_files(files: list[UploadFile] = File(...)):
    all_texts = []



    for file in files:
        if file.content_type != "application/pdf":
            continue

        pdf_bytes = await file.read()

        try:
            text = loader.load_pdf_bytes(pdf_bytes)
        except Exception as e:
            continue

        if text and text.strip():
            all_texts.append(text)
            DOCUMENT_STORE.append(text)

    if len(all_texts) == 0:
        return {"error": "No valid PDFs detected."}

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
def summarize_document(mode: str):
    # Ensure a document exists
    if len(DOCUMENT_STORE) == 0:
        return {"error": "No documents uploaded yet."}

    content = "\n".join(DOCUMENT_STORE)

    if mode == "short":
        summary = summarizer.short_summary(content)
    elif mode == "medium":
        summary = summarizer.medium_summary(content)
    else:
        summary = summarizer.detailed_summary(content)

    return {"summary": summary}