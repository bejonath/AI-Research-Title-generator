from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from langchain.prompts.chat import ChatPromptTemplate
from langchain_ollama.llms import OllamaLLM
from vectordb import retriever

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
    model = OllamaLLM(model="mistral:7b-instruct")
    template = """You are a expert in generating good titles for research papers, generate
    a {{req.style}}, {{req.title_length}}title from the user's abstract
    ---
    context: {docs}
    ---
    here is the abstract from the user: {abstract}
    ---
    Output ONLY the generated title and nothing else.
    Title: """
    prompt = ChatPromptTemplate.from_template(template)
    chain = prompt | model
    docs = retriever.invoke(req.abstract)
    output = chain.invoke({"docs": docs, "abstract": req.abstract})
    # Only return the generated title
    return {"title": output.strip().split("Title:")[-1].strip()}



