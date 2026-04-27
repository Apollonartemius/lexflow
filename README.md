<p align="center">
  <img src="https://img.shields.io/badge/LexFlow-V--RAR%20Engine-blueviolet?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjEwIi8+PHBhdGggZD0iTTkgMTJsMyAzIDYtNiIvPjwvc3ZnPg==" alt="LexFlow Badge"/>
</p>

<h1 align="center">⚖️ LexFlow</h1>

<p align="center">
  <strong>AI-Powered Financial Document Compliance Engine</strong><br/>
  <em>Vectorless Retrieval-Augmented Reasoning (V-RAR) · Neo4j Knowledge Graphs · NLP Pipeline</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react" alt="React"/>
  <img src="https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js" alt="Node.js"/>
  <img src="https://img.shields.io/badge/Python-FastAPI-009688?style=flat-square&logo=fastapi" alt="FastAPI"/>
  <img src="https://img.shields.io/badge/Neo4j-Aura-008CC1?style=flat-square&logo=neo4j" alt="Neo4j"/>
  <img src="https://img.shields.io/badge/Supabase-Auth-3ECF8E?style=flat-square&logo=supabase" alt="Supabase"/>
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=flat-square" alt="License"/>
</p>

<p align="center">
  <a href="#-architecture">Architecture</a> •
  <a href="#-key-innovation-v-rar">V-RAR</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#%EF%B8%8F-deployment">Deployment</a> •
  <a href="#-research-paper">Research</a>
</p>

---

## 📖 Overview

**LexFlow** automates the verification of financial documents against securities regulations from **SEBI** (India) and the **SEC** (United States). It introduces a novel **Vectorless Retrieval-Augmented Reasoning (V-RAR)** architecture that combines a multi-stage NLP pipeline with a Neo4j property graph encoding regulatory knowledge — delivering **explainable, deterministic, and auditable** compliance analysis without the opacity of LLM inference.

### The Problem

| Challenge | Impact |
|-----------|--------|
| Manual compliance reviews take **2–4 hours** per document | Unsustainable at scale |
| Human reviewers miss subtle omissions in 100+ page filings | **Error-prone** results |
| Different reviewers apply subjective interpretations | **Inconsistent** assessments |
| No structured audit trail linking regulations to document sections | **Opaque** decision process |
| SEBI LODR alone has been amended **47 times** since 2015 | Manual processes can't keep pace |

### The Solution

LexFlow processes financial documents in **under 4 seconds**, checking them against **19 compliance rules** spanning 3 major regulations (SEBI LODR 2015, SEC Form 10-K, SEBI ICDR 2018), producing severity-classified violations with actionable remediation suggestions.

| Metric | Manual Review | LexFlow |
|--------|--------------|---------|
| Time per document | 2–4 hours | **3–4 seconds** |
| Consistency | Variable | **Deterministic** |
| Audit trail | None | **Full graph path** |
| Scalability | Linear (staff) | **Horizontal (microservices)** |
| Cost per document | $200–500 | **< $0.01** |

---

## 🏗 Architecture

```
┌──────────────────┐     ┌──────────────────────┐     ┌──────────────────────┐
│   React / Vite   │────▶│  Node.js / Express   │────▶│  Python / FastAPI    │
│    (Frontend)    │     │     (Backend API)     │     │   (NLP Service)      │
│                  │     │                      │     │                      │
│  • Dashboard     │     │  • Auth (Supabase)   │     │  • PDF Extraction    │
│  • Upload UI     │     │  • Doc Management    │     │  • NER (spaCy)       │
│  • Compliance    │     │  • V-RAR Engine      │     │  • Section Detection │
│    Reports       │     │  • Dashboard Stats   │     │  • Keyword Extraction│
└──────────────────┘     └─────────┬────────────┘     └──────────────────────┘
                                   │
                    ┌──────────────┴──────────────┐
                    │                             │
              ┌─────▼─────┐               ┌──────▼──────┐
              │  Neo4j     │               │  Supabase   │
              │  Aura      │               │             │
              │            │               │  • Auth     │
              │ Regulatory │               │  • Users    │
              │ Knowledge  │               │  • Storage  │
              │ Graph      │               │             │
              └────────────┘               └─────────────┘
```

### Tech Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Frontend** | React + Vite | 19.x / 7.x | SPA with compliance dashboard |
| **Backend** | Node.js + Express | 20.x / 4.x | REST API + V-RAR engine |
| **NLP Service** | Python + FastAPI | 3.12 / 0.115.x | Document processing pipeline |
| **NER** | spaCy | 3.8.x | Named Entity Recognition |
| **PDF** | pdfplumber | 0.11.x | Spatial text extraction |
| **Graph DB** | Neo4j Aura | 5.x | Regulatory knowledge graph |
| **Auth** | Supabase | — | Authentication + JWT |
| **Frontend Hosting** | Vercel | — | Global CDN |
| **Backend Hosting** | Railway | — | Container deployment |

---

## 🧠 Key Innovation: V-RAR

**Vectorless Retrieval-Augmented Reasoning** replaces traditional vector similarity search with **deterministic graph traversal** over a structured knowledge graph.

### How It Works

```
Step 1 ─ Graph Query
    Regulation → APPLIES_TO → DocumentType → HAS_SECTION → Section → REQUIRES → Requirement

Step 2 ─ Deduplication
    Merge rules sharing the same regulation:section key

Step 3 ─ Multi-Signal Matching
    ┌─────────────────────────────────────────────────────┐
    │  Signal A: Keyword Match          → +30 confidence  │
    │  Signal B: Section Title Match    → +40 confidence  │
    │  Signal C: Category Match         → +25 confidence  │
    │  Signal D: Raw Text Search        → +10 confidence  │
    └─────────────────────────────────────────────────────┘

Step 4 ─ Classification
    confidence ≥ 25  →  ✅ PASSED
    confidence < 25  →  ❌ VIOLATION (severity + remediation from graph)

Step 5 ─ Scoring
    Compliance Score = (passed / total) × 100
```

### Why Not LLMs or Vector-RAG?

| Feature | Rule-Based | LLM / RAG | **LexFlow (V-RAR)** |
|---------|-----------|-----------|---------------------|
| Deterministic output | ✅ | ❌ | ✅ |
| Structural awareness | ❌ | Partial | ✅ |
| Explainable reasoning | Partial | ❌ | ✅ (graph paths) |
| Regulatory hierarchy | ❌ | ❌ | ✅ |
| Audit trail | ❌ | ❌ | ✅ |
| Cost per document | Low | High | **Low** |
| False positive rate | High | Medium | **Low (11.6%)** |

---

## 📊 Regulatory Knowledge Graph

The Neo4j property graph encodes financial regulations as interconnected entities:

```
6 Node Types:  Regulation · DocumentType · Section · Requirement · Violation · Keyword
5 Relationships:  APPLIES_TO · HAS_SECTION · REQUIRES · LEADS_TO_VIOLATION · HAS_KEYWORD
```

| Metric | Count |
|--------|-------|
| Regulations | 3 (SEBI LODR 2015, SEC Form 10-K, SEBI ICDR 2018) |
| Document Types | 6 |
| Mandatory Sections | 19 |
| Requirements | 12 |
| Violations | 12 |
| Keywords | 25 |
| **Total Relationships** | **79** |

### Covered Regulations

| Regulation | Jurisdiction | Sections |
|------------|-------------|----------|
| **SEBI LODR 2015** | India | Reg 17, 21, 27, 30, 32, 33, 34, 46 |
| **SEC Form 10-K** | United States | Item 1, 1A, 2, 3, 7, 8, 9A, 11 |
| **SEBI ICDR 2018** | India | Reg 26, 26(1)(a), 26(1)(b) |

---

## 🔬 NLP Pipeline

The NLP service processes PDFs through **4 sequential stages**:

| Stage | Engine | Description |
|-------|--------|-------------|
| **1. PDF Extraction** | pdfplumber | Spatial bounding-box text extraction preserving layout |
| **2. Named Entity Recognition** | spaCy `en_core_web_sm` | ORG, MONEY, DATE, PERCENT, LAW, PERSON, GPE |
| **3. Section Detection** | Regex (19 patterns) | SEC items, SEBI regulations, ALL-CAPS headings, domain-specific |
| **4. Keyword Extraction** | Curated dictionary | 105 terms across 9 regulatory categories |

**Memory Optimized:** spaCy runs with disabled `parser`, `tagger`, `lemmatizer` pipelines and processes documents in 150K character chunks to prevent OOM on constrained cloud environments.

**Document type classification** uses a weighted scoring algorithm to identify: Annual Report, 10-K Filing, 10-Q Filing, Quarterly Report, IPO Prospectus, and Corporate Governance Report.

---

## 🚀 Quick Start

### Prerequisites

- Node.js ≥ 18
- Python ≥ 3.10
- Docker (optional, for local Neo4j)

### 1. Clone & Setup

```bash
git clone https://github.com/Apollonartemius/lexflow.git
cd lexflow
cp .env.example .env   # Edit with your keys
```

### 2. Backend

```bash
cd backend
npm install
node src/index.js      # Runs on :3001
```

### 3. NLP Service

```bash
cd nlp-service
pip install -r requirements.txt
python -m spacy download en_core_web_sm
uvicorn app.main:app --reload   # Runs on :8000
```

### 4. Frontend

```bash
cd frontend
npm install
npm run dev            # Runs on :5173
```

### 5. Neo4j (Optional — Docker)

```bash
docker-compose up -d   # Runs on :7474 (browser) + :7687 (bolt)
# Load seed data via Neo4j Browser:
#   Run schema.cypher then regulations.cypher
```

---

## ☁️ Deployment

| Service | Platform | Config |
|---------|----------|--------|
| Frontend | **Vercel** | `cd frontend && npx vercel --prod` |
| Backend | **Railway** | Connect GitHub repo, set env vars |
| NLP Service | **Railway** | Separate service, uses Dockerfile |
| Neo4j | **Neo4j Aura** | Free cluster, run seed Cypher scripts |
| Auth | **Supabase** | Managed PostgreSQL + auth |

### Environment Variables

```env
# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Neo4j
NEO4J_URI=neo4j+s://your-instance.databases.neo4j.io
NEO4J_USER=neo4j
NEO4J_PASSWORD=your-password
NEO4J_DATABASE=neo4j

# NLP Service
NLP_SERVICE_URL=http://localhost:8000

# Backend
BACKEND_PORT=3001
FRONTEND_URL=http://localhost:5173

# Frontend (prefix with VITE_)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_API_URL=http://localhost:3001
```

---

## 📡 API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/auth/signup` | No | User registration |
| `POST` | `/api/auth/login` | No | User login |
| `POST` | `/api/documents/upload` | Yes | Upload + analyze PDF |
| `GET` | `/api/documents` | Yes | List user documents |
| `GET` | `/api/documents/:id` | Yes | Document details + compliance |
| `GET` | `/api/dashboard/stats` | Yes | Aggregated dashboard statistics |
| `GET` | `/api/compliance/regulations` | Yes | All regulations from graph |
| `GET` | `/api/compliance/rules` | Yes | Rules by document type |
| `GET` | `/api/health` | No | Service health check |
| `GET` | `/api/health/debug` | No | Deep diagnostics (Neo4j, NLP, Supabase) |

---

## 📈 Evaluation Results

Tested on real-world financial documents including SEC Form 8-K filings and compliance reports:

| Metric | Score | Benchmark |
|--------|-------|-----------|
| Rule Matching Accuracy | **89.4%** | Manual: 76% |
| NER Precision (spaCy) | **87.2%** | Baseline: 71% |
| Avg. Processing Time | **3.8 sec/doc** | Manual: ~45 min |
| False Positive Rate | **11.6%** | Industry: ~18% |

### System Latency Breakdown

| Operation | Latency |
|-----------|---------|
| PDF upload (client → backend) | ~200ms |
| NLP processing (text + NER + sections + keywords) | ~2–3s |
| Neo4j graph query | ~50ms |
| V-RAR compliance scoring | ~5ms |
| **Total end-to-end** | **~3–4s** |

---

## 🗺️ Future Work

- 🤖 **Semantic Model Enhancement** — Replace spaCy with fine-tuned Legal-BERT for deeper semantic rule matching, with a feedback loop for continuous model improvement
- 🌍 **Global Regulatory API Integration** — Expand the knowledge graph to MiFID II (Europe), Companies Act 2013 (India), and IFRS, with live API connections to SEBI, SEC, and regulatory bodies worldwide for auto-updating regulations
- 🏢 **Enterprise Infrastructure** — Real-time WebSocket-based document streaming and role-based access control (RBAC) for multi-tenant corporate deployments
- 🔍 **OCR Integration** — Tesseract/AWS Textract support for scanned image-based PDFs
- 📈 **Temporal Compliance Tracking** — Historical compliance trends and predictive alerting

---

## 📄 Research Paper

This project is based on the research paper:

> **LexFlow: An Automated Multi-Jurisdictional Compliance Analysis Engine for Financial Documents Using NLP and Graph Databases**
>
> *Inzamam Ul Haque Haidery · Anmol Gadade · Rishikesh Kotgirwar*
> *Department of Artificial Intelligence, Vishwakarma University, Pune*
>
> **Keywords:** Named Entity Recognition, Knowledge Graph, Neo4j, SEBI, SEC, RegTech, Graph Database

### Key References

1. SEBI (2015). *SEBI (Listing Obligations and Disclosure Requirements) Regulations, 2015.*
2. SEC (2024). *Form 10-K: Annual Report under Section 13/15(d) of the Securities Exchange Act of 1934.*
3. Araci, D. (2019). *FinBERT: Financial Sentiment Analysis with Pre-Trained Language Models.* arXiv:1908.10063
4. Chalkidis, I., et al. (2020). *LEGAL-BERT: The Muppets Straight Out of Law School.* EMNLP 2020
5. Honnibal, M., & Montani, I. (2017). *spaCy 2: NLU with Bloom Embeddings, CNNs and Incremental Parsing.*
6. Robinson, I., et al. (2015). *Graph Databases: New Opportunities for Connected Data.* O'Reilly Media
7. Lewis, P., et al. (2020). *Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks.* NeurIPS 2020
8. Palmirani, M., et al. (2011). *LegalRuleML: XML-based Rules and Norms.* Springer

---

## 👥 Authors

| Name | Email |
|------|-------|
| **Inzamam Ul Haque Haidery** | 31230475@vupune.ac.in |
| **Anmol Gadade** | 31230193@vupune.ac.in |
| **Rishikesh Kotgirwar** | 31230141@vupune.ac.in |

**Department of Artificial Intelligence, Vishwakarma University, Pune**

---

## 📜 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  <strong>⚖️ LexFlow</strong> — <em>Because compliance shouldn't take hours when it can take seconds.</em>
</p>
