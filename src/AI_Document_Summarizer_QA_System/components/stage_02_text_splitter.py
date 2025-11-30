from langchain_text_splitters import RecursiveCharacterTextSplitter

class TextSplitter:
    """
    Clean + split text efficiently. Prevent chunk explosion.
    """

    def __init__(self, chunk_size=1500, chunk_overlap=200):
        self.splitter = RecursiveCharacterTextSplitter(
            chunk_size=chunk_size,
            chunk_overlap=chunk_overlap,
            separators=["\n\n", "\n", ". ", "? ", "! ", " "],
        )

    def clean_text(self, text: str):
        """Remove garbage empty lines, headers, whitespace blocks."""
        text = text.strip()
        return text if len(text) > 50 else ""  # ignore trash

    def split_text(self, text: str):
        text = self.clean_text(text)

        if not text:
            return []

        return self.splitter.split_text(text)

    def split_documents(self, docs):
        if isinstance(docs, str):
            docs = [docs]

        all_chunks = []
        for doc in docs:
            cleaned = self.clean_text(doc)
            if cleaned:
                chunks = self.splitter.split_text(cleaned)
                all_chunks.extend(chunks)

        return all_chunks
