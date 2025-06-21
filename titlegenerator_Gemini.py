from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from vectordb import retriever
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import PromptTemplate
import os
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")

app = FastAPI()

# Allow CORS for your frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"],  # Or specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TitleRequest(BaseModel):
    abstract: str
    title_length: str
    style: str


@app.post("/generate-title")
def generate_title(req: TitleRequest):
    docs = retriever.invoke(req.abstract)
    model = ChatGoogleGenerativeAI(model="gemini-2.5-flash", google_api_key=api_key)

    prompt = """You are a expert in generating good titles for research papers, generate
    a {style}, {title_length} title from the user's abstract
    ---
    context: {docs}
    ---
    here is the abstract from the user: {abstract}
    ---
    Output ONLY the generated title and nothing else.
    Title: """

    prompt = PromptTemplate(
        template=prompt,
        input_variables=["style", "title_length", "docs", "abstract"]
    )

    chain = prompt | model
       
    output = chain.invoke({"style": req.style, "title_length": req.title_length, "docs": docs, "abstract": req.abstract})

    return {"title": output.content.strip().split("Title:")[-1].strip()}



