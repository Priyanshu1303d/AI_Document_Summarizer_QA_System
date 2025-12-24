import json
from src.AI_Document_Summarizer_QA_System.components.stage_02_text_splitter import TextSplitter

with open("artifacts/raw_text.json", "r", encoding="utf-8") as f:
    docs = json.load(f)

splitter = TextSplitter()
all_chunks = []

for d in docs:
    chunks = splitter.split_text(d["content"])
    for c in chunks:
        all_chunks.append({"file": d["file"], "chunk": c})

with open("artifacts/chunks.json", "w", encoding="utf-8") as f:
    json.dump(all_chunks, f, indent=2, ensure_ascii=False)

print("✔ Total chunks:", len(all_chunks))
