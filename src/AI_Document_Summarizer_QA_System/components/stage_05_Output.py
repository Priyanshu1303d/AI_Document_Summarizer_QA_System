import re
from typing import List, Dict
from langchain_groq import ChatGroq
from dotenv import load_dotenv
from langchain_core.prompts import ChatPromptTemplate

load_dotenv()

class OutputFormatter:
    """
    Cleans, normalizes, and prepares final output for UI or API.
    """

    @staticmethod
    def clean_text(text: str) -> str:
        if not text:
            return ""

        text = re.sub(r"\s+", " ", text)
        text = text.strip()
        return text

    @staticmethod
    def format_sources(sources: List[str]) -> List[str]:
        cleaned = []
        for src in sources:
            src = re.sub(r"\s+", " ", src).strip()
            cleaned.append(src[:500] + "..." if len(src) > 500 else src)
        return cleaned

    def build_response(self, answer: str, sources: List[str], summary=None) -> Dict:
        return {
            "summary": summary,
            "answer": self.clean_text(answer),
            "sources": self.format_sources(sources)
        }


class SummaryGenerator:
    """
    Generates short, medium, and detailed summaries using Groq-powered Llama 3.3.
    """

    def __init__(self, groq_api_key: str):
        self.llm = ChatGroq(
            model_name="llama-3.3-70b-versatile",
            temperature=0.2,
            groq_api_key=groq_api_key
        )

        self.short_prompt = ChatPromptTemplate.from_template(
            """
                Provide a short 4-6 sentence TL;DR summary of the document:

                Document:
                {content}

                TL;DR Summary:
            """
        )

        self.medium_prompt = ChatPromptTemplate.from_template(
            """
                Summarize the document in 3 sections:
                1. Overview
                2. Key Concepts
                3. Important Steps

                Document:
                {content}

                Structured Summary:
            """
         )

        self.detailed_prompt = ChatPromptTemplate.from_template(
            """
                Create a detailed, multi-level summary of the document with the following structure:

                # Title
                ## Overview
                ## Section-wise Breakdown
                ## Key Ideas
                ## Methods / Steps
                ## Example Use-Cases
                ## Final Takeaways (TL;DR)

                Document Content:
                {content}

                Detailed Summary:
            """
        )

    def _generate(self, prompt, content: str) -> str:
        formatted = prompt.format(content=content[:20000])
        response = self.llm.invoke(formatted)
        return response.content

    def short_summary(self, content: str) -> str:
        return self._generate(self.short_prompt, content)

    def medium_summary(self, content: str) -> str:
        return self._generate(self.medium_prompt, content)
    

    def detailed_summary(self, content: str) -> str:
        return self._generate(self.detailed_prompt, content)

    def generate_all(self, content: str) -> Dict:
        """
        Returns:
        {
            "short": "...",
            "medium": "...",
            "detailed": "..."
        }
        """
        return {
            "short": self.short_summary(content),
            "medium": self.medium_summary(content),
            "detailed": self.detailed_summary(content)
        }
