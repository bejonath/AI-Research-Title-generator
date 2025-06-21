from langchain_ollama import OllamaEmbeddings
from langchain_chroma import Chroma
from langchain_core.documents import Document
import pandas as pd
import os

df = pd.read_csv("arxiv_data_210930-054931.csv")
embeddings = OllamaEmbeddings(model="twine/mxbai-embed-xsmall-v1")

db_location = "chroma_db"
add_document = not os.path.exists(db_location)

if add_document:
    documents = []
    ids = []

    for i, row in df.iterrows():
        content = f"{row['titles']} {row['abstracts']}"
        document = Document(page_content=content, metadata={"id": str(i)})
        documents.append(document)
        ids.append(str(i))

    vector_store = Chroma.from_documents(
        documents=documents,
        embedding=embeddings,
        collection_name="arxiv_papers",
        persist_directory=db_location,
    )

else:
    vector_store = Chroma(
        collection_name="arxiv_papers",
        persist_directory=db_location,
        embedding_function=embeddings
    )

print("Number of documents in Chroma DB:", len(vector_store.get()["documents"]))

# Export retriever
retriever = vector_store.as_retriever(
    search_type="mmr",  
    search_kwargs={"k": 10, "lambda_mult": 0.5}  
)
__all__ = ["retriever"]





