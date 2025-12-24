import json
from src.AI_Document_Summarizer_QA_System.components.stage_01_document_loader import DocumentLoader

loader = DocumentLoader()

# Load ALL PDFs inside Data/
texts = []
for file in loader.list_pdfs("Data"):
    txt = loader.load(file)
    texts.append({"file": file, "content": txt})

with open("artifacts/raw_text.json", "w", encoding="utf-8") as f:
    json.dump(texts, f, indent=2, ensure_ascii=False)

print("✔ Loaded documents:", len(texts))
