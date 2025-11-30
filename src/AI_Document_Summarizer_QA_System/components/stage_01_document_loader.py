import os
from pathlib import Path
from typing import List
from dotenv import load_dotenv
from langchain_community.document_loaders import PyPDFLoader

load_dotenv()

class DocumentLoader:
    """
    Loads single or multiple PDF documents from:
    - A file path
    - A directory containing many PDFs
    """

    def load_single_pdf(self, pdf_path: str):
        if not os.path.exists(pdf_path):
            raise FileNotFoundError(f"PDF not found: {pdf_path}")

        loader = PyPDFLoader(pdf_path)
        pages = loader.load()

        text = "\n".join([p.page_content for p in pages])
        return text

    def load_multiple_pdfs(self, folder_path: str) -> List[str]:
        if not os.path.exists(folder_path):
            raise FileNotFoundError(f"Folder does not exist: {folder_path}")

        pdf_files = list(Path(folder_path).glob("*.pdf"))

        if len(pdf_files) == 0:
            raise ValueError("No PDF files found in the given folder.")

        all_texts = []

        for pdf in pdf_files:
            loader = PyPDFLoader(str(pdf))
            pages = loader.load()
            text = "\n".join([p.page_content for p in pages])
            all_texts.append(text)

        return all_texts

    def load(self, path: str):
        """
        Auto-detect:
        - PDF file → load_single_pdf()
        - Folder  → load_multiple_pdfs()
        """
        if os.path.isfile(path) and path.endswith(".pdf"):
            return self.load_single_pdf(path)

        elif os.path.isdir(path):
            return self.load_multiple_pdfs(path)

        else:
            raise ValueError("Path must be a PDF file or a folder containing PDFs.")