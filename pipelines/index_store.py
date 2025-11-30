import json
from AI_Document_Summarizer_QA_System.components.stage_03_store_index import VectorIndex

with open("artifacts/chunks.json", "r", encoding="utf-8") as f:
    chunks = json.load(f)

indexer = VectorIndex()
indexer.add_documents([c["chunk"] for c in chunks])

with open("artifacts/index_done.txt", "w") as f:
    f.write("OK")

print("✔ Pinecone indexing complete.")
