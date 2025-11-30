from langchain_text_splitters import RecursiveCharacterTextSplitter

class TextSplitter:
    """
    Splits long text or multiple documents into chunks.
    Works with both single string or list of strings.
    """

    def __init__(self, chunk_size=800, chunk_overlap=200):
        self.splitter = RecursiveCharacterTextSplitter(
            chunk_size=chunk_size,
            chunk_overlap=chunk_overlap,
            separators=["\n\n", "\n", ".", " ", ""]
        )

    def split_text(self, text: str):
        """
        Splits a single document/string into chunks.
        """
        if not text or len(text.strip()) == 0:
            raise ValueError("Cannot split empty text.")

        chunks = self.splitter.split_text(text)
        return chunks

    def split_documents(self, docs):
        """
        Accepts:
        - a single string (1 document)
        - a list of strings (multiple documents)
        """
        if isinstance(docs, str):
            docs = [docs]

        all_chunks = []
        for doc in docs:
            chunks = self.split_text(doc)
            all_chunks.extend(chunks)

        return all_chunks
