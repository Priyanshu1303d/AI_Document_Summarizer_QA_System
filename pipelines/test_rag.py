import json
from AI_Document_Summarizer_QA_System.components.stage_04_RAG import RAGPipeline
from AI_Document_Summarizer_QA_System.components.stage_05_Output import SummaryGenerator, OutputFormatter
import os

rag = RAGPipeline()

test_q = "Give a brief overview of the documents."
ans = rag.ask(test_q)

out = {
    "question": test_q,
    "answer": ans["answer"],
    "sources": ans["sources"]
}

with open("artifacts/test_output.json", "w", encoding="utf-8") as f:
    json.dump(out, f, indent=2, ensure_ascii=False)

print("✔ RAG pipeline test complete.")
