<div align="center">

<!-- Animated Typing Header -->
<a href="https://git.io/typing-svg"><img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=700&size=28&duration=3000&pause=1000&color=8B5CF6&center=true&vCenter=true&multiline=true&repeat=true&width=700&height=100&lines=%E2%9A%96%EF%B8%8F+LexFlow;Graph-Augmented+Compliance+Intelligence" alt="Typing SVG" /></a>

<br/>

<img src="https://img.shields.io/badge/V--RAR_Engine-Deterministic_Compliance-blueviolet?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjEwIi8+PHBhdGggZD0iTTkgMTJsMyAzIDYtNiIvPjwvc3ZnPg==" alt="V-RAR Badge"/>

<br/><br/>

<!-- Tech Badges Row 1 -->
<img src="https://img.shields.io/badge/React-19.1-61DAFB?style=flat-square&logo=react&logoColor=white" alt="React"/>
<img src="https://img.shields.io/badge/Vite-7.0-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite"/>
<img src="https://img.shields.io/badge/Node.js-20-339933?style=flat-square&logo=node.js&logoColor=white" alt="Node.js"/>
<img src="https://img.shields.io/badge/Express-4.21-000000?style=flat-square&logo=express&logoColor=white" alt="Express"/>
<img src="https://img.shields.io/badge/Python-3.12-3776AB?style=flat-square&logo=python&logoColor=white" alt="Python"/>
<img src="https://img.shields.io/badge/FastAPI-0.115-009688?style=flat-square&logo=fastapi&logoColor=white" alt="FastAPI"/>

<br/>

<!-- Tech Badges Row 2 -->
<img src="https://img.shields.io/badge/Neo4j-Aura-008CC1?style=flat-square&logo=neo4j&logoColor=white" alt="Neo4j"/>
<img src="https://img.shields.io/badge/spaCy-3.8-09A3D5?style=flat-square&logo=spacy&logoColor=white" alt="spaCy"/>
<img src="https://img.shields.io/badge/Supabase-Auth-3ECF8E?style=flat-square&logo=supabase&logoColor=white" alt="Supabase"/>
<img src="https://img.shields.io/badge/Docker-Containerized-2496ED?style=flat-square&logo=docker&logoColor=white" alt="Docker"/>
<img src="https://img.shields.io/badge/Railway-Deployed-0B0D0E?style=flat-square&logo=railway&logoColor=white" alt="Railway"/>
<img src="https://img.shields.io/badge/Vercel-Frontend-000000?style=flat-square&logo=vercel&logoColor=white" alt="Vercel"/>

<br/><br/>

<!-- Navigation -->
[`Overview`](#-overview) · [`Architecture`](#-architecture) · [`V-RAR Engine`](#-the-v-rar-engine) · [`NLP Pipeline`](#-nlp-pipeline) · [`Knowledge Graph`](#-regulatory-knowledge-graph) · [`Quick Start`](#-quick-start) · [`API`](#-api-reference) · [`Research`](#-research-paper)

<br/>

<!-- Metrics Bar -->
<table>
<tr>
<td align="center"><strong>89.4%</strong><br/><sub>Rule Matching Accuracy</sub></td>
<td align="center"><strong>3.8s</strong><br/><sub>Avg. Processing Time</sub></td>
<td align="center"><strong>11.6%</strong><br/><sub>False Positive Rate</sub></td>
<td align="center"><strong>79</strong><br/><sub>Graph Relationships</sub></td>
<td align="center"><strong>3</strong><br/><sub>Regulatory Frameworks</sub></td>
</tr>
</table>

</div>

---

## 📖 Overview

> **LexFlow** is a polyglot microservices platform that automates the verification of financial documents against securities regulations from **SEBI** (India) and the **SEC** (United States). It introduces **Vectorless Retrieval-Augmented Reasoning (V-RAR)** — a deterministic graph-traversal algorithm that delivers explainable, auditable compliance analysis without the hallucination risks of LLM-based inference.

<br/>

<table>
<tr>
<td width="50%">

### ❌ The Problem
- Manual reviews take **2–4 hours** per document
- Human reviewers **miss omissions** in 100+ page filings
- Subjective interpretations → **inconsistent** results
- No audit trail linking regulations to sections
- SEBI LODR amended **47 times** since 2015
- LLMs **hallucinate** compliance data

</td>
<td width="50%">

### ✅ The LexFlow Solution
- Processes documents in **< 4 seconds**
- **19 mandatory rules** checked automatically
- **100% deterministic** — same doc = same score
- Full **graph-path audit trail** for every violation
- Knowledge graph updated via **Cypher scripts**
- **Zero hallucination** — pure mathematical logic

</td>
</tr>
</table>

<br/>

| Metric | Manual Review | LexFlow |
|--------|:------------:|:-------:|
| Time per document | 2–4 hours | **3.8 seconds** |
| Consistency | Variable | **Deterministic** |
| Audit trail | None | **Full graph path** |
| Scalability | Linear (staff) | **Horizontal (microservices)** |
| Cost per document | $200–500 | **< $0.01** |
| Hallucination risk | N/A | **Zero** |

---

## 🏗 Architecture

```
                              ┌─────────────────────────────────────────────┐
                              │              CLOUD INFRASTRUCTURE           │
 ┌──────────────┐             │                                             │
 │              │   HTTPS     │  ┌─────────────────┐   HTTP    ┌──────────────────┐
 │    USER      │────────────▶│  │  Node.js/Express │─────────▶│  Python/FastAPI   │
 │   BROWSER    │             │  │   Backend API    │          │   NLP Service     │
 │              │◀────────────│  │                  │◀─────────│                   │
 └──────────────┘   JSON      │  │  • JWT Auth      │  JSON    │  • PDF Extraction │
        │                     │  │  • V-RAR Engine  │          │  • spaCy NER      │
        │                     │  │  • Doc Manager   │          │  • Section Detect │
   ┌────▼─────┐               │  └────────┬────────┘          │  • Keyword Match  │
   │  Vercel  │               │           │                    └──────────────────┘
   │   CDN    │               │    Bolt   │   REST                   Railway
   │  React/  │               │   (TLS)   │                     Container #2
   │  Vite    │               │           │
   └──────────┘               │  ┌────────▼────────┐   ┌──────────────────┐
                              │  │    Neo4j Aura    │   │    Supabase      │
                              │  │                  │   │                  │
                              │  │  77 Nodes        │   │  • PostgreSQL    │
                              │  │  79 Edges        │   │  • JWT Auth      │
                              │  │  3 Regulations   │   │  • User Mgmt     │
                              │  └─────────────────┘   └──────────────────┘
                              └─────────────────────────────────────────────┘
```

<details>
<summary><b>📋 Complete Tech Stack Table</b></summary>
<br/>

| Layer | Technology | Version | Purpose |
|:------|:----------|:--------|:--------|
| 🎨 **Frontend** | React + Vite | 19.1 / 7.0 | SPA with glassmorphism dark-mode dashboard |
| 🎨 **Styling** | Vanilla CSS | — | CSS Variables, glassmorphism, micro-animations |
| 🎨 **Icons** | Lucide React | 1.8 | Tree-shakeable SVG icon components |
| 🎨 **Routing** | React Router DOM | 7.14 | Client-side SPA navigation |
| ⚙️ **Backend** | Node.js + Express | 20 / 4.21 | REST API, middleware chain, V-RAR engine |
| ⚙️ **Upload** | Multer | latest | In-memory PDF handling (no disk I/O) |
| ⚙️ **Security** | Helmet + CORS | latest | HTTP hardening + origin policy |
| 🧠 **NLP** | Python + FastAPI | 3.12 / 0.115 | Document processing microservice |
| 🧠 **NER** | spaCy (en_core_web_sm) | 3.8 | Named Entity Recognition (memory-optimized) |
| 🧠 **PDF** | pdfplumber | 0.11 | Spatial bounding-box text extraction |
| 🗄️ **Graph DB** | Neo4j Aura | 5.x | Regulatory knowledge graph (Cypher/Bolt) |
| 🔐 **Auth** | Supabase | latest | PostgreSQL + JWT authentication |
| ☁️ **Frontend Host** | Vercel | — | Global edge CDN |
| ☁️ **Backend Host** | Railway | — | Dockerized container deployment |

</details>

---

## 🧠 The V-RAR Engine

<div align="center">

> **Vectorless Retrieval-Augmented Reasoning** — the core algorithmic innovation that replaces stochastic LLM inference with deterministic graph mathematics.

</div>

### Algorithm Flow

```
 ┌──────────────────────────────────────────────────────────────────────┐
 │                        V-RAR EXECUTION PIPELINE                      │
 │                                                                      │
 │  STEP 1 │ GRAPH QUERY                                               │
 │         │ Regulation →[APPLIES_TO]→ DocType →[HAS_SECTION]→ Section │
 │         │           →[REQUIRES]→ Requirement →[HAS_KEYWORD]→ Keyword│
 │         ▼                                                            │
 │  STEP 2 │ DEDUPLICATION                                             │
 │         │ Merge rules sharing the same regulation:section key        │
 │         ▼                                                            │
 │  STEP 3 │ MULTI-SIGNAL SCORING                                      │
 │         │ ┌────────────────────────────────────────────────┐        │
 │         │ │  🔑 Keyword Match         →  +30 confidence   │        │
 │         │ │  📄 Section Title Match   →  +40 confidence   │        │
 │         │ │  🏷️  Category Match       →  +25 confidence   │        │
 │         │ │  📝 Raw Text Fallback     →  +10 confidence   │        │
 │         │ └────────────────────────────────────────────────┘        │
 │         ▼                                                            │
 │  STEP 4 │ THRESHOLD CLASSIFICATION                                  │
 │         │ confidence ≥ 25  →  ✅ PASSED                              │
 │         │ confidence < 25  →  ❌ VIOLATION + severity + remediation  │
 │         ▼                                                            │
 │  STEP 5 │ FINAL SCORE                                               │
 │         │ Compliance = (rules_passed / rules_total) × 100           │
 └──────────────────────────────────────────────────────────────────────┘
```

### Why V-RAR Over Alternatives?

| Capability | Rule-Based Systems | LLM / Vector-RAG | **LexFlow V-RAR** |
|:-----------|:------------------:|:-----------------:|:------------------:|
| Deterministic output | ✅ | ❌ | ✅ |
| Structural awareness | ❌ | Partial | ✅ |
| Explainable reasoning | Partial | ❌ | ✅ `graph paths` |
| Regulatory hierarchy | ❌ | ❌ | ✅ |
| Full audit trail | ❌ | ❌ | ✅ |
| Cost per document | Low | High (GPU) | **Low (CPU)** |
| False positive rate | High (~18%) | Medium | **Low (11.6%)** |
| Hallucination risk | None | **High** | **None** |

---

## 🔬 NLP Pipeline

The Python FastAPI microservice processes PDFs through **4 sequential stages**:

```
   PDF Upload
       │
       ▼
 ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
 │   STAGE 1   │───▶│   STAGE 2   │───▶│   STAGE 3   │───▶│   STAGE 4   │
 │             │    │             │    │             │    │             │
 │ pdfplumber  │    │ spaCy NER   │    │ 19 Regex    │    │ 105-Term    │
 │ Spatial     │    │ Chunked     │    │ Patterns    │    │ Dictionary  │
 │ Extraction  │    │ Processing  │    │ Detection   │    │ Scan        │
 └─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
     ~1.2s              ~1.4s              ~0.1s              ~0.1s
```

| Stage | Engine | Extracts |
|:------|:-------|:---------|
| **PDF Extraction** | `pdfplumber` | Full text from memory byte-stream (no disk I/O) |
| **Named Entity Recognition** | `spaCy en_core_web_sm` | ORG, MONEY, DATE, PERCENT, LAW, PERSON, GPE |
| **Section Detection** | `19 Regex patterns` | SEC Items, SEBI Regulations, ALL-CAPS headings |
| **Keyword Extraction** | `Curated dictionary` | 105 terms across 9 categories (Risk, Financial, Governance, etc.) |

<details>
<summary><b>🔧 Memory Optimizations (Railway Free Tier)</b></summary>
<br/>

- spaCy pipeline components `parser`, `tagger`, `lemmatizer`, `attribute_ruler` **disabled** → 60% RAM reduction
- Documents processed in **150,000-character chunks** → prevents OOM on 300+ page PDFs
- PDF loaded from `io.BytesIO` memory stream → zero disk writes

</details>

---

## 📊 Regulatory Knowledge Graph

<div align="center">

```
          ┌──────────┐          ┌──────────────┐
          │Regulation│─APPLIES─▶│DocumentType   │
          └────┬─────┘    TO    └──────────────┘
               │
          HAS_SECTION
               │
          ┌────▼─────┐          ┌──────────────┐
          │ Section  │─REQUIRES▶│ Requirement  │
          └────┬─────┘          └──────┬───────┘
               │                       │
         LEADS_TO_                HAS_KEYWORD
         VIOLATION                     │
               │                ┌──────▼───────┐
          ┌────▼─────┐          │   Keyword    │
          │Violation │          └──────────────┘
          └──────────┘
```

</div>

| Metric | Count |
|:-------|------:|
| Regulations | **3** |
| Document Types | **6** |
| Mandatory Sections | **19** |
| Requirements | **12** |
| Violations | **12** |
| Keywords | **25** |
| Total Nodes | **77** |
| Total Relationships | **79** |

<details>
<summary><b>📜 Covered Regulations (Click to expand)</b></summary>
<br/>

| Regulation | Jurisdiction | Authority | Sections Encoded |
|:-----------|:------------|:----------|:-----------------|
| **SEBI LODR 2015** | 🇮🇳 India | SEBI | Reg 17, 21, 27, 30, 32, 33, 34, 46 |
| **SEC Form 10-K** | 🇺🇸 United States | SEC | Item 1, 1A, 2, 3, 7, 8, 9A, 11 |
| **SEBI ICDR 2018** | 🇮🇳 India | SEBI | Reg 26, 26(1)(a), 26(1)(b) |

**Violation Severity Distribution:** 3 Critical · 5 High · 4 Medium

</details>

---

## 🚀 Quick Start

### Prerequisites

```
Node.js ≥ 18  ·  Python ≥ 3.10  ·  Docker (optional)
```

### Setup

```bash
# Clone the repository
git clone https://github.com/Apollonartemius/lexflow.git
cd lexflow
cp .env.example .env    # Configure your keys
```

<table>
<tr>
<td width="33%">

#### ⚙️ Backend
```bash
cd backend
npm install
node src/index.js
# → localhost:3001
```

</td>
<td width="33%">

#### 🧠 NLP Service
```bash
cd nlp-service
pip install -r requirements.txt
python -m spacy download en_core_web_sm
uvicorn app.main:app --reload
# → localhost:8000
```

</td>
<td width="33%">

#### 🎨 Frontend
```bash
cd frontend
npm install
npm run dev
# → localhost:5173
```

</td>
</tr>
</table>

<details>
<summary><b>🐳 Docker (Neo4j local)</b></summary>

```bash
docker-compose up -d
# Neo4j Browser → localhost:7474
# Bolt protocol → localhost:7687
# Load: schema.cypher → regulations.cypher
```
</details>

---

## ☁️ Deployment

| Service | Platform | Method |
|:--------|:---------|:-------|
| 🎨 Frontend | **Vercel** | `npx vercel --prod` from `/frontend` |
| ⚙️ Backend | **Railway** | GitHub auto-deploy · `node:20-alpine` Docker |
| 🧠 NLP Service | **Railway** | GitHub auto-deploy · `python:3.12-slim` Docker |
| 🗄️ Graph DB | **Neo4j Aura** | Free cluster · seed via Cypher scripts |
| 🔐 Auth | **Supabase** | Managed PostgreSQL + JWT |

<details>
<summary><b>🔑 Environment Variables</b></summary>

```env
# Neo4j Aura
NEO4J_URI=neo4j+s://your-instance.databases.neo4j.io
NEO4J_USER=neo4j
NEO4J_PASSWORD=your-password
NEO4J_DATABASE=neo4j

# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Services
NLP_SERVICE_URL=http://localhost:8000
BACKEND_PORT=3001
FRONTEND_URL=http://localhost:5173

# Frontend (VITE_ prefix required)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_API_URL=http://localhost:3001
```
</details>

---

## 📡 API Reference

| Method | Endpoint | Auth | Description |
|:------:|:---------|:----:|:------------|
| `POST` | `/api/auth/signup` | — | User registration |
| `POST` | `/api/auth/login` | — | User login → JWT |
| `GET` | `/api/auth/profile` | 🔐 | Current user profile |
| `POST` | `/api/documents/upload` | 🔐 | Upload PDF → NLP + V-RAR analysis |
| `GET` | `/api/documents` | 🔐 | List all user documents |
| `GET` | `/api/documents/:id` | 🔐 | Full document detail + compliance |
| `POST` | `/api/documents/:id/reanalyze` | 🔐 | Re-trigger analysis |
| `GET` | `/api/compliance/regulations` | 🔐 | All regulations from graph |
| `GET` | `/api/compliance/rules` | 🔐 | Rules filtered by document type |
| `GET` | `/api/dashboard/stats` | 🔐 | Aggregated metrics + service health |
| `GET` | `/api/health` | — | Liveness check |
| `GET` | `/api/health/debug` | — | Deep diagnostics |

---

## 📈 Performance

<div align="center">

| Metric | LexFlow | Benchmark |
|:-------|:-------:|:---------:|
| Rule Matching Accuracy | **89.4%** | Manual: 76% |
| NER Precision | **87.2%** | Baseline: 71% |
| Processing Time | **3.8 sec/doc** | Manual: ~45 min |
| False Positive Rate | **11.6%** | Industry: ~18% |

</div>

<details>
<summary><b>⏱️ Latency Breakdown</b></summary>

| Operation | Time |
|:----------|-----:|
| PDF upload (client → backend) | ~200ms |
| NLP pipeline (4 stages) | ~2.7s |
| Neo4j graph query | ~50ms |
| V-RAR scoring engine | ~5ms |
| **Total end-to-end** | **~3.8s** |

</details>

---

## 🗺️ Roadmap

- [ ] 🤖 **Legal-BERT Integration** — Fine-tuned transformer for semantic rule matching with feedback-driven retraining
- [ ] 🌍 **Global Regulatory Expansion** — MiFID II, Companies Act 2013, IFRS + live API sync with SEBI/SEC
- [ ] 🏢 **Enterprise RBAC** — Role-based access control for multi-tenant corporate deployments
- [ ] 🔍 **OCR Layer** — Tesseract/AWS Textract for scanned image-based PDFs
- [ ] 📈 **Temporal Tracking** — Historical compliance trends + predictive alerting
- [ ] 🕸️ **Graph Visualizer** — Interactive D3.js regulatory knowledge graph explorer

---

## 📄 Research Paper

<table>
<tr>
<td>

> **LexFlow: An Automated Multi-Jurisdictional Compliance Analysis Engine for Financial Documents Using NLP and Graph Databases**
>
> *Published — JETIR, April 2026*
>
> **Keywords:** Named Entity Recognition · Knowledge Graph · Neo4j · SEBI · SEC · RegTech · Graph Database · V-RAR

</td>
</tr>
</table>

<details>
<summary><b>📚 Key References</b></summary>

1. SEBI — *SEBI (LODR) Regulations, 2015*
2. SEC — *Form 10-K Annual Report, 2024*
3. Araci, D. — *FinBERT: Financial Sentiment Analysis* (arXiv:1908.10063)
4. Chalkidis, I. et al. — *LEGAL-BERT* (EMNLP 2020)
5. Honnibal, M. — *spaCy 2: NLU with Bloom Embeddings*
6. Robinson, I. — *Graph Databases* (O'Reilly, 2015)
7. Lewis, P. et al. — *Retrieval-Augmented Generation* (NeurIPS 2020)
8. Palmirani, M. et al. — *LegalRuleML* (Springer, 2011)

</details>

---

## 👥 Authors

<table>
<tr>
<td align="center"><strong>Inzamam Ul Haque Haidery</strong><br/><sub>haideryinzamam2005@gmail.com</sub></td>

</tr>
</table>

<div align="center">
<sub>Department of Artificial Intelligence · Vishwakarma University, Pune</sub>
</div>

---

## 📜 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for details.

---

<div align="center">

<br/>

**⚖️ LexFlow** — *Because compliance shouldn't take hours when it can take seconds.*

<br/>

<img src="https://img.shields.io/badge/Made_with-☕_and_Graph_Traversal-8B5CF6?style=for-the-badge" alt="Made with"/>

</div>
