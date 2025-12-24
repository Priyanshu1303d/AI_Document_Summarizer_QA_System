from setuptools import setup, find_packages

with open("README.md", "r", encoding="utf-8") as f:
    long_description = f.read()

__version__ = "0.0.1"

PROJECT_NAME = "AI_Document_Summarizer_QA_System"
REPO_NAME = "AI_Document_Summarizer_QA_System"
AUTHOR_USER_NAME = "Priyanshu1303d"
AUTHOR_EMAIL = "Priyanshu1303d@gmail.com"

setup(
    name=PROJECT_NAME,
    version=__version__,
    author=AUTHOR_USER_NAME,
    author_email=AUTHOR_EMAIL,
    description="AI Document Summarizer and Q/A System using RAG & LLMs",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url=f"https://github.com/{AUTHOR_USER_NAME}/{REPO_NAME}",
    project_urls={
        "Bug Tracker": f"https://github.com/{AUTHOR_USER_NAME}/{REPO_NAME}/issues"
    },
    package_dir={"": "src"},
    packages=find_packages(where="src"),
    install_requires=[],
)
