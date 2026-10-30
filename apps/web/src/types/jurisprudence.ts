export interface PrecedentItem {
  id: string;
  caseName: string;
  citation: string;
  year: number;
  court: string;
  bench: string;
  ratio: string;
  verbatimQuote: string;
  pageReference: string;
  status: 'Verified' | 'Procedural Rule' | 'Caution' | 'Overruled';
  isSynthetic?: boolean;
}

export interface SubstantiveFinding {
  id: string;
  number: string;
  title: string;
  status: 'Verified' | 'Procedural Rule' | 'Caution';
  summary: string;
  citationText: string;
  quotePageRef: string;
  passageIndex: number;
}

export interface StatutoryFrameworkItem {
  actName: string;
  section: string;
  summary: string;
  isSimulated?: boolean;
}

export interface ResearchDossier {
  id: string;
  docketId: string;
  title: string;
  sessionTerm: string;
  jurisdiction: string;
  indexedCount: number;
  indexedTimeSeconds: number;
  corroboratedCount: number;
  ambiguitiesCount: number;
  confidenceScore: number;
  appellateAlignment: string;
  executiveRatio: string;
  executiveProse: string;
  findings: SubstantiveFinding[];
  statutes: StatutoryFrameworkItem[];
  precedents: PrecedentItem[];
  caveatTitle: string;
  caveatText: string;
  updatedAt: string;
  isSyntheticDataset: boolean;
}

export interface UserProfile {
  name: string;
  role: string;
  organization: string;
  userType: 'Researcher' | 'Student' | 'Lawyer' | 'Academic';
  email: string;
}

export interface DocumentItem {
  id: string;
  title: string;
  category: 'Contracts' | 'Acts' | 'Submissions' | 'Case Briefs';
  uploadedAt: string;
  fileSize: string;
  ocrVerified: boolean;
  docketRef?: string;
  isSynthetic?: boolean;
}

export interface ReportItem {
  id: string;
  title: string;
  docketNumber: string;
  forum: string;
  dateGenerated: string;
  summary: string;
  status: 'Generated Report' | 'Draft';
  isSynthetic?: boolean;
}
