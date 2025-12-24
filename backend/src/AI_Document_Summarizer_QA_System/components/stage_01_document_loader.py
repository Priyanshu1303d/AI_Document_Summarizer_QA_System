import os
from pathlib import Path
from typing import List
from dotenv import load_dotenv
from pypdf import PdfReader
import io

load_dotenv()

class DocumentLoader:
    """
    Supports:
    - Loading PDF from PATH
    - Loading PDF from BYTES (FastAPI upload)
    - Loading ALL PDFs from a folder
    """

    def load_pdf_path(self, pdf_path: str) -> str:
        if not os.path.exists(pdf_path):
            raise FileNotFoundError(f"PDF not found: {pdf_path}")

        reader = PdfReader(pdf_path)
        text = " ".join([page.extract_text() or "" for page in reader.pages])
        return text

    def load_pdf_bytes(self, data: bytes) -> str:
        """
        Reads PDF directly from bytes (FastAPI upload)
        """
        try:
            reader = PdfReader(io.BytesIO(data))
            text = " ".join([page.extract_text() or "" for page in reader.pages])
            return text
        except Exception as e:
            raise RuntimeError(f"Error reading PDF bytes: {e}")

    def load_folder(self, folder_path: str) -> List[str]:
        if not os.path.isdir(folder_path):
            raise FileNotFoundError(f"Folder does not exist: {folder_path}")

        pdf_files = list(Path(folder_path).glob("*.pdf"))
        if not pdf_files:
            raise ValueError("No PDFs found in folder.")

        all_docs = []
        for pdf in pdf_files:
            reader = PdfReader(str(pdf))
            text = " ".join([page.extract_text() or "" for page in reader.pages])
            all_docs.append(text)

        return all_docs

    def load(self, path: str):
        """
        Auto-detect:
        - PDF file → load_pdf_path
        - Folder → load_folder
        """
        if os.path.isfile(path) and path.lower().endswith(".pdf"):
            return self.load_pdf_path(path)

        if os.path.isdir(path):
            return self.load_folder(path)

        raise ValueError("Path must be a PDF file or folder containing PDFs.")

    def list_pdfs(self, folder: str) -> List[str]:
        if not os.path.exists(folder):
            raise FileNotFoundError(f"Folder not found: {folder}")

        return [
            os.path.join(folder, f)
            for f in os.listdir(folder)
            if f.lower().endswith(".pdf")
        ]
