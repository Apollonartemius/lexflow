<<<<<<< HEAD
# lexflow
=======
# 🧠 LexFlow — Financial Document Compliance Engine

AI-powered platform that analyzes financial documents for regulatory compliance using NLP + graph-based reasoning.

## Architecture

```
Frontend (React/Vite) → Backend (Node/Express) → NLP Service (Python/FastAPI)
                                ↓
                        Neo4j Graph DB (Regulations)
                        Supabase (Auth + Storage)
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite, React Router |
| Backend | Node.js, Express, Neo4j Driver |
| NLP | Python, FastAPI, spaCy, pdfplumber |
| Graph DB | Neo4j (regulations + compliance rules) |
| Auth/Storage | Supabase |

## Quick Start (Local)

### 1. Backend
```bash
cd backend
cp .env.example .env  # edit with your keys
npm install
node src/index.js     # runs on :3001
```

### 2. NLP Service
```bash
cd nlp-service
pip install -r requirements.txt
python -m spacy download en_core_web_sm
uvicorn app.main:app --reload  # runs on :8000
```

### 3. Frontend
```bash
cd frontend
npm install
npm run dev  # runs on :5173
```

### 4. Neo4j (Optional — Docker)
```bash
docker-compose up -d  # runs on :7474 (browser) + :7687 (bolt)
# Load seed data via Neo4j Browser
```

## Deployment

### Frontend → Vercel
```bash
cd frontend
npx vercel --prod
```
Set env vars in Vercel dashboard:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`  
- `VITE_API_URL` (your backend URL)

### Backend → Railway
```bash
cd backend
# Push to GitHub, connect repo to Railway
# Set env vars in Railway dashboard
```

### NLP Service → Railway (separate service)
```bash
cd nlp-service
# Push to GitHub, connect repo to Railway
# Uses Dockerfile for build
```

### Neo4j → Neo4j Aura
1. Create free cluster at https://neo4j.com/cloud/aura/
2. Run `schema.cypher` then `regulations.cypher` via Neo4j Browser
3. Update `NEO4J_URI` in backend env

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/signup | Register |
| POST | /api/auth/login | Login |
| POST | /api/documents/upload | Upload + analyze PDF |
| GET | /api/documents | List documents |
| GET | /api/documents/:id | Document details |
| GET | /api/compliance/regulations | All regulations |
| GET | /api/compliance/rules | Rules by doc type |
| GET | /api/dashboard/stats | Dashboard stats |

## Compliance Engine

Uses **Vectorless Retrieval-Augmented Reasoning**:
1. NLP extracts text, entities, sections, keywords from PDF
2. Graph traversal finds applicable regulations
3. Rule matching compares document content against requirements
4. Missing sections are flagged with severity + suggested fixes

## License

MIT
>>>>>>> fce5bca (feat: LexFlow v1.0 - Financial Document Compliance Engine)
