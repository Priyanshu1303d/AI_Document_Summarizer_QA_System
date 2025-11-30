import os
from pathlib import Path
import logging

logging.basicConfig(level=logging.INFO, format="[%(asctime)s] : %(message)s")

project_name = "AI_Document_Summarizer_QA_System"

list_of_files = [
    ".env",
    ".env.example",
    "README.md",
    "requirements.txt",
    "main.py",
    "dvc.yaml",
    "Dockerfile",
    ".gitignore",
    "setup.py",

    f"src/{project_name}/__init__.py",
    f"src/{project_name}/components/__init__.py",
    f"src/{project_name}/components/stage_01_document_loader.py",
    f"src/{project_name}/components/stage_02_text_splitter.py",
    f"src/{project_name}/components/stage_03_store_index.py",
    f"src/{project_name}/components/stage_04_RAG.py",
    f"src/{project_name}/components/stage_05_Output.py",

    f"src/{project_name}/utils/__init__.py",
    f"src/{project_name}/utils/prompt.py",

    "templates/assets/.gitkeep",
    "templates/pages/chat.py",
    "templates/app.py",

    "research/trial.ipynb",
    "Data"
]

for i in list_of_files:
    file_path = Path(i)
    folder, filename = os.path.split(file_path)

    if folder != "":
        os.makedirs(folder, exist_ok=True)
        logging.info(f"Folder created: {folder}")

    if (not file_path.exists()) or (file_path.stat().st_size == 0):
        with open(file_path, "w") as f:
            pass
        logging.info(f"Created empty file: {file_path}")

    else:
        logging.info(f"File already exists: {file_path}")
