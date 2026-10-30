import type { ResearchDossier, UserProfile, DocumentItem, ReportItem } from '../types/jurisprudence';

export const mockUser: UserProfile = {
  name: "Legal Researcher",
  role: "Research Specialist",
  organization: "Sri Lanka Legal Research Institute",
  userType: "Researcher",
  email: "researcher@legallens.local",
};

export const mockDossier: ResearchDossier = {
  id: "RES-2025-001",
  docketId: "RES-2025-001",
  title: "Unilateral Salary Reduction and Termination Analysis",
  sessionTerm: "Research Session 2025",
  jurisdiction: "Sri Lanka: Labour Law & Dispute Precedents",
  indexedCount: 65, // Realistic MVP synthetic dataset count (30-50 judgments, 15-20 statutes)
  indexedTimeSeconds: 4.2,
  corroboratedCount: 3,
  ambiguitiesCount: 1,
  confidenceScore: 92,
  appellateAlignment: "3 Authorities Found",
  executiveRatio: "Reducing essential contract allowances without employee consent can be treated as unfair constructive termination under Section 31B of the Industrial Disputes Act.",
  executiveProse: "Relevant case precedents show that employers cannot simply reduce fixed salary allowances that form a regular part of pay. Continuing to work while submitting a written protest protects the employee from losing their right to claim constructive termination.",
  findings: [
    {
      id: "f-1",
      number: "01",
      title: "Reduction of Fixed Salary and Allowances",
      status: "Verified",
      summary: "A 30% reduction in regular monthly allowances is a serious breach of contract. Regular car and performance allowances are treated as core salary rather than optional bonuses.",
      citationText: "Simulated Case: Ceylon Tobacco v. Ilangaratne [Simulated 1989]",
      quotePageRef: "Source Passage (p. 34)",
      passageIndex: 1
    },
    {
      id: "f-2",
      number: "02",
      title: "Written Protest Prevents Loss of Legal Rights",
      status: "Verified",
      summary: "Continuing to work while immediately submitting a written objection protects the employee's claim, proving they did not agree to the pay reduction.",
      citationText: "Simulated Case: Brown & Co. v. Fernando [Simulated 2004]",
      quotePageRef: "Source Passage (p. 122)",
      passageIndex: 2
    },
    {
      id: "f-3",
      number: "03",
      title: "Correct Forum: Labour Tribunal Jurisdiction",
      status: "Procedural Rule",
      summary: "While general business closures may require Commissioner General approval under TEWA, constructive termination claims are heard directly by the Labour Tribunal under IDA Section 31B.",
      citationText: "Simulated Scenario: Colombo Labour Tribunal • IDA Sec. 31B",
      quotePageRef: "Statute Section",
      passageIndex: 3
    }
  ],
  statutes: [
    {
      actName: "Industrial Disputes Act No. 43 of 1950",
      section: "Section 31B(1)(a)",
      summary: "Gives the Labour Tribunal full authority to award fair compensation or relief when employment is terminated unfairly.",
      isSimulated: true
    },
    {
      actName: "Termination of Employment of Workmen Act (TEWA No. 45 of 1971)",
      section: "Section 2(1)",
      summary: "Prohibits terminating workers for non-disciplinary reasons without prior written consent from the worker or approval from the Labour Commissioner.",
      isSimulated: true
    },
    {
      actName: "Payment of Gratuity Act No. 12 of 1983",
      section: "Sections 5 & 6",
      summary: "Calculates end-of-service gratuity based on the full last-drawn salary before any unauthorized reductions.",
      isSimulated: true
    }
  ],
  precedents: [
    {
      id: "p-1",
      caseName: "Ceylon Tobacco Co. v. Ilangaratne (Simulated Example)",
      citation: "[Simulated SLLR Reference: 1989]",
      year: 1989,
      court: "Supreme Court of Sri Lanka (Simulated)",
      bench: "Fernando, J., Mark Fernando, J.",
      ratio: "An employer cannot unilaterally cut regular allowances under the guise of reorganization. Regular allowances form an essential part of the contract.",
      verbatimQuote: "An employer cannot unilaterally vary terms of remuneration to the detriment of a workman under the guise of an administrative restructuring. Where allowances have attained certainty and regular receipt, they merge into the contract.",
      pageReference: "Volume 1, Page 34",
      status: "Verified",
      isSynthetic: true
    },
    {
      id: "p-2",
      caseName: "Brown & Co. v. Fernando (Simulated Example)",
      citation: "[Simulated SLLR Reference: 2004]",
      year: 2004,
      court: "Court of Appeal of Sri Lanka (Simulated)",
      bench: "Sripavan, J.",
      ratio: "Working under protest does not mean the employee agreed to the reduction. Workers are not required to quit immediately before seeking legal remedy.",
      verbatimQuote: "Silence may imply consent, but a prompt letter of reservation of rights preserves the cause of action in its entirety. A worker does not need to quit immediately before claiming constructive dismissal.",
      pageReference: "Volume 2, Page 122",
      status: "Verified",
      isSynthetic: true
    },
    {
      id: "p-3",
      caseName: "Hayleys Ltd. v. De Silva (Simulated Example)",
      citation: "[Simulated SLLR Reference: 1994]",
      year: 1994,
      court: "Supreme Court of Sri Lanka (Simulated)",
      bench: "Kulatunga, J., Dheeraratne, J.",
      ratio: "Removing major benefits that make up more than 25% of total pay has the same effect as dismissing the employee.",
      verbatimQuote: "A substantial deprivation of transport facilities essential to executive duties functions equivalently to formal discharge.",
      pageReference: "Volume 1, Page 302",
      status: "Verified",
      isSynthetic: true
    }
  ],
  caveatTitle: "Important Observation: Nature of Allowances in Clause 8.2",
  caveatText: "Please check Clause 8.2 of the sample agreement carefully. If the vehicle allowance required fuel receipts rather than being paid unconditionally every month, the employer may argue it was an operational reimbursement rather than part of fixed salary.",
  updatedAt: "Research Session • Updated 10 minutes ago",
  isSyntheticDataset: true
};

export const mockRecentDockets = [
  {
    docketNumber: "RES-2025-001",
    subject: "Unilateral Salary Reduction and Constructive Termination",
    jurisdiction: "Labour Tribunals & Appellate Precedents",
    sllrPrecedents: 3,
    status: "Verified",
    date: "14 Oct 2025",
    confidence: "92%"
  },
  {
    docketNumber: "RES-2025-002",
    subject: "TEWA Non-Disciplinary Termination Approval Process",
    jurisdiction: "Labour Commissioner & TEWA",
    sllrPrecedents: 2,
    status: "In Progress",
    date: "09 Oct 2025",
    confidence: "88%"
  },
  {
    docketNumber: "RES-2025-003",
    subject: "End-of-Service Gratuity Calculation Following Salary Disputes",
    jurisdiction: "Labour Tribunal",
    sllrPrecedents: 4,
    status: "Verified",
    date: "28 Sep 2025",
    confidence: "95%"
  }
];

export const mockDocuments: DocumentItem[] = [
  {
    id: "doc-1",
    title: "Sample Executive Employment Agreement",
    category: "Contracts",
    uploadedAt: "12 Oct 2025",
    fileSize: "1.4 MB",
    ocrVerified: true,
    docketRef: "RES-2025-001",
    isSynthetic: true
  },
  {
    id: "doc-2",
    title: "Sample Employee Protest Letter (Salary Reduction)",
    category: "Submissions",
    uploadedAt: "14 Oct 2025",
    fileSize: "480 KB",
    ocrVerified: true,
    docketRef: "RES-2025-001",
    isSynthetic: true
  },
  {
    id: "doc-3",
    title: "Industrial Disputes Act No. 43 of 1950 (Extract)",
    category: "Acts",
    uploadedAt: "01 Sep 2025",
    fileSize: "3.8 MB",
    ocrVerified: true,
    isSynthetic: false
  },
  {
    id: "doc-4",
    title: "Sample Labour Tribunal Application Form",
    category: "Case Briefs",
    uploadedAt: "16 Oct 2025",
    fileSize: "920 KB",
    ocrVerified: true,
    docketRef: "RES-2025-001",
    isSynthetic: true
  }
];

export const mockReports: ReportItem[] = [
  {
    id: "rep-1",
    title: "Research Report: Constructive Termination Under Industrial Disputes Act",
    docketNumber: "RES-2025-001",
    forum: "Labour Law Research Review",
    dateGenerated: "14 Oct 2025",
    summary: "Structured research report analyzing whether unilateral reduction of allowances constitutes unfair termination, with linked case passages.",
    status: "Generated Report",
    isSynthetic: true
  },
  {
    id: "rep-2",
    title: "Advisory Summary: Prior Consent Requirements Under TEWA",
    docketNumber: "RES-2025-002",
    forum: "Employment Law Study",
    dateGenerated: "10 Oct 2025",
    summary: "Summary of statutory rules regarding employer applications to the Commissioner General of Labour.",
    status: "Draft",
    isSynthetic: true
  }
];
