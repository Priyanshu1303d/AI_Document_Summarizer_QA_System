from langchain_huggingface import HuggingFaceEmbeddings
from pinecone import Pinecone, ServerlessSpec
from dotenv import load_dotenv
import os

load_dotenv()

class VectorIndex:
    def __init__(self):
        api_key = os.getenv("PINECONE_API_KEY")
        index_name = os.getenv("PINECONE_INDEX_NAME", "doc-index")
        region = "us-east-1"

        self.pc = Pinecone(api_key=api_key)
        self.index_name = index_name

        self.embeddings = HuggingFaceEmbeddings(
            model_name="sentence-transformers/all-MiniLM-L6-v2"
        )

        if index_name not in self.pc.list_indexes().names():
            self.pc.create_index(
                name=index_name,
                dimension=384,  # important!
                metric="cosine",
                spec=ServerlessSpec(cloud="aws", region=region)
            )

        self.index = self.pc.Index(index_name)

        from langchain_pinecone import PineconeVectorStore
        self.vectorstore = PineconeVectorStore(
            index=self.index,
            embedding=self.embeddings
        )

    def add_documents(self, chunks: list[str]):
        self.vectorstore.add_texts(chunks)
        return {"status": "success", "chunks_added": len(chunks)}
