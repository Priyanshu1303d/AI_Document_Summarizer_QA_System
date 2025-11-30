from pinecone import Pinecone, ServerlessSpec
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_pinecone import PineconeVectorStore
import os
from dotenv import load_dotenv

load_dotenv()

class VectorIndex:
    def __init__(self):
        api_key = os.getenv("PINECONE_API_KEY")
        index_name = os.getenv("PINECONE_INDEX_NAME", "doc-index")

        if not api_key:
            raise ValueError("❌ PINECONE_API_KEY missing in .env")

        # Initialize client
        self.pc = Pinecone(api_key=api_key)

        # List existing
        existing = self.pc.list_indexes().names()

        # Create index if needed
        if index_name not in existing:
            print(f"⚠ Index '{index_name}' not found — creating...")
            self.pc.create_index(
                name=index_name,
                dimension=384,
                metric="cosine",
                spec=ServerlessSpec(
                    cloud="aws",
                    region="us-east-1"     # MUST MATCH FREE TIER
                )
            )
            print(f"✔ Index created: {index_name}")
        else:
            print(f"✔ Index exists: {index_name}")

        # Connect
        self.index = self.pc.Index(index_name)

        # Embeddings
        self.embeddings = HuggingFaceEmbeddings(
            model_name="sentence-transformers/all-MiniLM-L6-v2"
        )

        # VectorStore
        self.vectorstore = PineconeVectorStore(
            index=self.index,
            embedding=self.embeddings
        )

    def add_documents(self, chunks: list[str]):
        if not chunks:
            return {"status": "no_chunks"}

        # Add to Pinecone
        self.vectorstore.add_texts(chunks)

        return {"status": "success", "chunks_added": len(chunks)}
