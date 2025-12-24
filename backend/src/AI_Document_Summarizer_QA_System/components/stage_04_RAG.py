import os
from dotenv import load_dotenv

from langchain_pinecone import PineconeVectorStore
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from langchain_huggingface import HuggingFaceEmbeddings

load_dotenv()


class RAGPipeline:
    """
    Modern RAG pipeline using LCEL (recommended for new LangChain versions).
    """

    def __init__(self):

        self.index_name = os.getenv("PINECONE_INDEX_NAME", "doc-index")
        groq_api = os.getenv("GROQ_API_KEY")

        if not groq_api:
            raise ValueError("GROQ_API_KEY missing in .env")


        self.embeddings = HuggingFaceEmbeddings(
            model_name="sentence-transformers/all-MiniLM-L6-v2"
        )


        self.llm = ChatGroq(
            model_name="llama-3.3-70b-versatile",
            temperature=0.1,
            groq_api_key=groq_api
        )


        self.vectorstore = PineconeVectorStore.from_existing_index(
            index_name=self.index_name,
            embedding=self.embeddings
        )


        self.retriever = self.vectorstore.as_retriever(
            search_type="similarity",
            search_kwargs={"k": 3}
        )


        self.prompt = ChatPromptTemplate.from_template(
            """
                You are an AI assistant specialized in reading PDF content.

                Use ONLY the context below to answer the question.
                If relevant information is not in the context, say:
                "The document does not contain this information."

                Context:
                {context}

                --- INSTRUCTIONS ---
                • Read the entire context carefully.
                • Identify which section of the document corresponds to the question.
                • Answer concisely and ONLY from the PDF.

                Question:
                {question}

                Answer:
            """
        )

    def ask(self, question: str):
        """
        Execute RAG: retrieve -> inject to prompt -> generate answer
        """

        docs = self.retriever.invoke(question)
        context = "\n".join([doc.page_content for doc in docs])


        prompt_msg = self.prompt.format(context=context, question=question)


        answer = self.llm.invoke(prompt_msg)

        return {
            "answer": answer.content,
            "sources": [doc.page_content for doc in docs],
        }
