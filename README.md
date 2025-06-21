# Research Paper Title Generator

<p align="left">
  <img src="https://img.shields.io/badge/Python-3.10%2B-blue?logo=python" alt="Python">
  <img src="https://img.shields.io/badge/FastAPI-async-green?logo=fastapi" alt="FastAPI">
  <img src="https://img.shields.io/badge/Ollama-Local%20LLM-4B8BBE?logo=data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjRkZGIiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiI+PHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTAgMThjLTQuNDIgMC04LTMuNTgtOC04czMuNTgtOCA4LTggOCAzLjU4IDggOC0zLjU4IDgtOCA4eiIvPjwvc3ZnPg==" alt="Ollama">
  <img src="https://img.shields.io/badge/Gemini-Google%20GenAI-4285F4?logo=google" alt="Gemini">
  <img src="https://img.shields.io/badge/Mistral%20AI-7B%20Instruct-8A2BE2" alt="Mistral AI">
  <img src="https://img.shields.io/badge/ChromaDB-Vector%20DB-FAC858?logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAxMiAxMiI+PHJlY3Qgd2lkdGg9IjEyIiBoZWlnaHQ9IjEyIiBmaWxsPSIjRkZGIi8+PHJlY3Qgd2lkdGg9IjQiIGhlaWdodD0iNCIgeD0iNCIgeT0iNCIgZmlsbD0iIzAwMCIvPjwvc3ZnPg==" alt="ChromaDB">
  <img src="https://img.shields.io/badge/LangChain-Framework-yellowgreen" alt="LangChain">
</p>


Generate impactful, context-aware research paper titles using advanced AI models. This project supports both cloud-based (Gemini) and local (Ollama) LLMs, for high-quality, relevant title suggestions.

## Features
- Generate research paper titles from abstracts using AI
- Choose between Google Gemini API (cloud) or Ollama (local) LLMs
- Fast semantic search with Chroma vector database
- Easy-to-use REST API (FastAPI backend)
- Frontend ready for local development

---

## Getting Started

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd Research-Paper-Title-Generator
```

### 2. Install Python Dependencies
Install all required Python packages:
```bash
pip install -r requirements.txt
```

---

### 3. Generate the Vector Database
Before using the title generator, you must create the Chroma vector database from your research abstracts:
```bash
python vectordb.py
```
- This only needs to be run once (unless you delete the `chroma_db` folder).
- If you add new data or remove the database, rerun this command.

---

## Backend: Title Generation API
You can run the backend in two modes:

### Option A: Using Gemini (Cloud)
1. **Set up your Gemini API key:**
   - Create a `.env` file in the project root:
     ```env
     GEMINI_API_KEY=your_google_gemini_api_key_here
     ```
2. **Start the FastAPI server:**
   ```bash
   uvicorn titlegenerator_Gemini:app --reload
   ```

### Option B: Using Ollama (Local)
1. **Install the required Ollama model:**
   - Make sure you have [Ollama](https://ollama.com/) installed and running.
   - Download the model specified in `titlegenerator_Ollama.py` (e.g., `mistral:7b-instruct`):
     ```bash
     ollama pull mistral:7b-instruct
     ```
2. **Start the FastAPI server:**
   ```bash
   uvicorn titlegenerator_Ollama:app --reload
   ```

---

## Frontend Setup
1. Navigate to your frontend directory (if separate).
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

---

## Usage
- The backend will return a generated title based on your abstract, style, and length preferences.

---

## Notes
- For Gemini, ensure your API key is valid and has sufficient quota.
- For Ollama, ensure the model is downloaded and the Ollama server is running locally.
- If you delete or update the vector database, rerun `python vectordb.py`.

