# Vismart Studio — Admin OS & Human-Approved Quotation Portal
## Complete Architectural Planning & System Blueprint (Master Specification)

---

## 🎯 1. Executive Purpose & Philosophy

Vismart Studio operates under one unbreakable business principle:
> **"CONSULT FIRST. UNDERSTAND FULLY. DEMONSTRATE VALUE. QUOTE LAST."**

The **Vismart Studio Admin Portal** is the studio owner's command cockpit. It bridges the gap between the visitor's initial interaction with the **Vismart AI Project Consultant** and the issuance of a legally sound, profitable, **Human-Approved Final Quotation**.

### Why the AI Never Issues Final Quotes Alone:
- In software development, premature automated quotes create scope creep or underpriced jobs.
- The AI's job is **Intelligent Scoping**: discovering pain points, asking clarifying questions, showing matching demos, and compiling a structured **Project Blueprint**.
- The Studio Owner's job is **Commercial Governance**: reviewing technical feasibility, setting milestone payments, verifying third-party costs (AWS/Shopify/APIs), and approving the final binding quotation.

---

## 🔄 2. The 8-State Project Lifecycle State Machine

```
[State 1: Consultation Started]
       │
       ▼ (AI conducts multi-turn conversation)
[State 2: Requirements Gathering]
       │
       ▼ (Value Demo shown & approved)
[State 3: Project Blueprint Ready]
       │
       ▼ (Client reviews & confirms requirements)
[State 4: Blueprint Submitted to Owner Queue] ─── (Stored in Database / Local Storage)
       │
       ▼ (Studio Owner opens Admin Portal)
[State 5: Owner Review & Quote Drafting] ──── (Custom scope, margin & milestone setup)
       │
       ▼ (Owner clicks "Approve & Issue Final Quotation")
[State 6: Final Quotation Delivered] ──────── (Delivered via WhatsApp / PDF / Email)
       │
       ├──► [State 7A: Revision Requested] ─── (Scope adjusted, new revision issued)
       ├──► [State 7B: Declined] ───────────── (Polite archive with follow-up reminder)
       └──► [State 7C: Accepted & Advance Paid]
                   │
                   ▼
       [State 8: In Production & 100% Code Handover]
```

---

## 🗄️ 3. Database Schema & Data Contracts

### A. Table: `project_briefs`
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | UUID (PK) | Unique brief identifier |
| `visitor_id` | VARCHAR(64) | Anonymous visitor fingerprint / session ID |
| `client_name` | VARCHAR(120) | Client full name |
| `client_phone` | VARCHAR(25) | WhatsApp / Phone number |
| `client_email` | VARCHAR(120) | Email address for official PDF quotation |
| `business_name` | VARCHAR(150) | Client brand or company name |
| `industry` | VARCHAR(80) | E.g. Restaurant, Clinic, Contractor, B2B |
| `primary_goals` | JSONB | Array of target objectives selected |
| `pain_points` | JSONB | Core business bottlenecks identified |
| `selected_demo_id`| VARCHAR(60) | Demo prototype tested by client |
| `essential_features`| JSONB | Must-have features agreed in consultation |
| `optional_features` | JSONB | Scope expansion items for Phase 2 |
| `indicative_budget` | VARCHAR(60) | Price range shown to visitor during chat |
| `timeline_expectation`| VARCHAR(60)| E.g. 7-12 business days |
| `client_inputs_needed`| JSONB | Content, photos, domain status |
| `conversation_transcript`| JSONB | Full chronological AI chat log |
| `status` | ENUM | `blueprint_ready`, `submitted_to_owner`, `under_review`, `quoted`, `accepted`, `in_progress`, `delivered` |
| `created_at` | TIMESTAMPTZ | Timestamp of first interaction |
| `updated_at` | TIMESTAMPTZ | Timestamp of last status change |

### B. Table: `final_quotations`
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | UUID (PK) | Quotation Number (e.g. `VIS-2026-084`) |
| `brief_id` | UUID (FK) | Reference to `project_briefs.id` |
| `scope_summary` | TEXT | Final approved deliverables outline |
| `included_deliverables`| JSONB | Itemized deliverables list |
| `excluded_items` | JSONB | Explicit scope boundaries (prevents disputes) |
| `currency` | VARCHAR(3) | `INR` or `USD` |
| `base_price` | NUMERIC(10,2) | Core development fee |
| `tax_amount` | NUMERIC(10,2) | GST / applicable sales taxes |
| `third_party_estimates`| JSONB | Domain, Hosting, WhatsApp API actuals |
| `payment_milestones`| JSONB | E.g. `[{"phase": "Advance Kickoff", "pct": 40}, {"phase": "Prototype Approval", "pct": 30}, {"phase": "Live Handover", "pct": 30}]` |
| `warranty_days` | INT | Default 30 days post-launch support |
| `ownership_guarantee`| BOOLEAN | True (100% Code & Domain Handover) |
| `approved_by` | VARCHAR(80) | Studio Owner username / signature |
| `approved_at` | TIMESTAMPTZ | Time stamp of human approval |
| `expires_at` | TIMESTAMPTZ | Quotation validity (usually 14 days) |
| `pdf_url` | TEXT | Generated professional PDF link |

---

## 🖥️ 4. Admin Portal UI Structure & Wireframes

### Screen 1: The Executive Pipeline Kanban (`/admin/pipeline`)
Columns:
1. **New Blueprints (Unreviewed):** Visitors who completed the AI consultation and requested a quotation.
2. **Review & Scoping:** Studio owner inspecting requirements, verifying third-party APIs.
3. **Quotation Issued:** Human-approved quote dispatched via WhatsApp & Email.
4. **Active Sprints:** Accepted projects in active development.
5. **Delivered & Care:** Finished builds with 30-day warranty and monthly care retainers.

### Screen 2: Detailed Blueprint Inspector (`/admin/briefs/:id`)
- **Left Panel:** Complete AI Conversation Transcript (Read exactly what the client said in their own words).
- **Middle Panel:** Structured Project Blueprint (Editable fields: Goals, Features, Budget expectation).
- **Right Panel:** 1-Click Quotation Generator:
  - Preset Package Selector (`Starter`, `Business Growth`, `Custom E-commerce`, `Scale Web App`).
  - Add / remove deliverables.
  - Set Milestone breakdown (e.g. 50% Kickoff, 50% Handover).
  - Preview Quotation PDF.
  - Buttons: **[Approve & Dispatch on WhatsApp]** and **[Download Branded PDF]**.

### Screen 3: WhatsApp Dispatch Automation Contract
Pre-formatted message sent directly from Admin to Client:
```
Namaste [Client Name] Ji!
Vismart Studio me aapka swagat hai.

Humne aapke project [Business Name - Industry] ka Project Blueprint dhyan se review kar liya hai. 
Aapke requirement ke anusar hamara formal, human-approved quotation taiyar hai:

📋 Project: [Solution Architecture Title]
⏱️ Timeline: [X Working Days]
💰 Approved Quotation: [₹XX,XXX / $X,XXX] (Milestone-based)
🔑 100% Source Code & Domain Ownership Guaranteed.

Aapka formal quotation document yahan dekh sakte hain:
🔗 [Link to Branded Quotation Portal]

Kya hum kal 15-minute ka ₹0 Advance Scoping Call schedule karein taaki hum live prototype planning shuru kar sakein?

Warm regards,
Vismart Studio Engineering Team
```

---

## 🚀 5. Implementation Roadmap (Phases)

| Phase | Deliverable | Status |
| :--- | :--- | :--- |
| **Phase 1** | Smart Welcome Assistant & Guided Consultation on Public Website | **IN PROGRESS** |
| **Phase 2** | Interactive "Your Project Blueprint" Generator with Local Draft Persistence | **COMPLETED** |
| **Phase 3** | Local Admin Inspection Dashboard (`/admin` drawer with review queue) | **NEXT** |
| **Phase 4** | PostgreSQL / Supabase Schema Migration with Auth | **SCHEDULED** |
| **Phase 5** | Automated Branded PDF Quotation Generator & Growth OS Webhook Sync | **SCHEDULED** |

---
*Created for Vismart Studio Architectural Governance.*
