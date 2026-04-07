// ── Environments & Spaces ──────────────────────────────────────

export interface Space {
  id: string
  name: string
  slug: string
  members: number
  entities: number
  lastModified: string
}

export interface Environment {
  id: string
  name: string
  status: 'running' | 'stopped'
  type: 'production' | 'staging' | 'development'
  spaces: Space[]
  totalMembers: number
  totalEntities: number
}

/** Environments start with zero spaces — spaces are added via the wizard */
export const environments: Environment[] = [
  {
    id: 'lg2324ef',
    name: 'Production',
    status: 'running',
    type: 'production',
    totalMembers: 847,
    totalEntities: 8400,
    spaces: [],
  },
  {
    id: 'stg7789ab',
    name: 'Staging',
    status: 'running',
    type: 'staging',
    totalMembers: 289,
    totalEntities: 4200,
    spaces: [],
  },
  {
    id: 'dev4456cd',
    name: 'Development',
    status: 'running',
    type: 'development',
    totalMembers: 111,
    totalEntities: 2600,
    spaces: [],
  },
]

// ── Tags (for Space creation wizard) ──────────────────────────

export interface TagValue {
  value: string
  hosts: number
  services: number
}

export interface DetectedTag {
  name: string
  label: string
  values: TagValue[]
  description: string
}

export const detectedTags: DetectedTag[] = [
  {
    name: 'k8s.namespace.name',
    label: 'Kubernetes namespace',
    description: 'Commonly used for team boundaries',
    values: [
      { value: 'mobile-payments', hosts: 12, services: 34 },
      { value: 'infrastructure', hosts: 45, services: 89 },
      { value: 'frontend-web', hosts: 8, services: 23 },
      { value: 'data-pipeline', hosts: 15, services: 42 },
    ],
  },
  {
    name: 'aws.account_ID',
    label: 'AWS account identifier',
    description: 'One account per team or business unit',
    values: [
      { value: '123456789012', hosts: 34, services: 67 },
      { value: '987654321098', hosts: 22, services: 45 },
    ],
  },
  {
    name: 'dt.cost.costcenter',
    label: 'Business cost center code',
    description: 'Maps to finance cost attribution',
    values: [
      { value: 'CC-MOBILE', hosts: 18, services: 41 },
      { value: 'CC-PLATFORM', hosts: 52, services: 93 },
      { value: 'CC-SECURITY', hosts: 11, services: 28 },
    ],
  },
]

// ── Groups (for Space creation wizard) ─────────────────────────

export interface Group {
  id: string
  name: string
  members: number
  created: string
  suggested?: boolean
}

export const groups: Group[] = [
  { id: 'grp-1', name: 'Mobile Platform Team', members: 24, created: 'Dec 2025', suggested: true },
  { id: 'grp-2', name: 'Payment Services', members: 18, created: 'Sep 2024', suggested: true },
  { id: 'grp-3', name: 'Mobile QA', members: 8, created: 'Nov 2024', suggested: true },
  { id: 'grp-4', name: 'Infrastructure Team', members: 34, created: 'Mar 2024' },
  { id: 'grp-5', name: 'DevOps Engineers', members: 12, created: 'Jun 2024' },
  { id: 'grp-6', name: 'Security Analysts', members: 9, created: 'Aug 2024' },
  { id: 'grp-7', name: 'SRE Team', members: 15, created: 'Jan 2025' },
  { id: 'grp-8', name: 'Frontend Engineers', members: 22, created: 'Apr 2024' },
  { id: 'grp-9', name: 'Data Engineering', members: 11, created: 'Jul 2024' },
  { id: 'grp-10', name: 'Platform Admins', members: 6, created: 'Feb 2024' },
]

// ── Practitioner data ──────────────────────────────────────────

export interface PractitionerSpace {
  name: string
  environment: string
  color: string
}

export const practitionerSpaces: PractitionerSpace[] = [
  { name: 'Payments', environment: 'Production', color: '#22c55e' },
  { name: 'Infrastructure', environment: 'Production', color: '#3b82f6' },
  { name: 'Frontend', environment: 'Staging', color: '#f59e0b' },
]

export interface Problem {
  id: string
  title: string
  status: 'open' | 'resolved'
  severity: 'critical' | 'warning' | 'info'
  timestamp: string
  entity: string
}

export const spaceProblems: Problem[] = [
  { id: 'P-2024001', title: 'High error rate on payment-gateway', status: 'open', severity: 'critical', timestamp: '12 min ago', entity: 'payment-gateway' },
  { id: 'P-2024002', title: 'Memory leak in checkout-service', status: 'open', severity: 'warning', timestamp: '2 hours ago', entity: 'checkout-service' },
  { id: 'P-2024003', title: 'Slow response time on /api/transactions', status: 'resolved', severity: 'info', timestamp: '5 hours ago', entity: 'transaction-api' },
]

// ── Segments (per Space) ───────────────────────────────────────

export interface Segment {
  id: string
  name: string
  color: string
  matcher: string
  entityCount: number
}

/** Segments mapped by Space name */
export const spaceSegments: Record<string, Segment[]> = {
  Payments: [
    { id: 'seg-pay-prod', name: 'Production', color: '#00d4aa', matcher: 'env == "prod"', entityCount: 34 },
    { id: 'seg-pay-stg', name: 'Staging', color: '#ffb224', matcher: 'env == "staging"', entityCount: 12 },
    { id: 'seg-pay-gw', name: 'Payment Gateway', color: '#1496ff', matcher: 'service.name startsWith "payment-"', entityCount: 8 },
  ],
  Infrastructure: [
    { id: 'seg-infra-prod', name: 'Production', color: '#00d4aa', matcher: 'env == "prod"', entityCount: 89 },
    { id: 'seg-infra-onprem', name: 'On-Prem', color: '#a78bfa', matcher: 'cloud.provider == "none"', entityCount: 23 },
    { id: 'seg-infra-aws', name: 'AWS', color: '#ffb224', matcher: 'cloud.provider == "aws"', entityCount: 45 },
  ],
  Frontend: [
    { id: 'seg-fe-web', name: 'Web Apps', color: '#1496ff', matcher: 'application.type == "web"', entityCount: 15 },
    { id: 'seg-fe-mobile', name: 'Mobile', color: '#ff4d6a', matcher: 'application.type == "mobile"', entityCount: 6 },
  ],
}

export interface DashboardTile {
  id: string
  name: string
  lastViewed: string
  owner: string
}

export const spaceDashboards: DashboardTile[] = [
  { id: 'db-1', name: 'Kubernetes Node Health', lastViewed: '2 hours ago', owner: 'Platform Team' },
  { id: 'db-2', name: 'Payment Gateway Metrics', lastViewed: '30 min ago', owner: 'Payments Team' },
  { id: 'db-3', name: 'API Latency Overview', lastViewed: '1 day ago', owner: 'SRE Team' },
  { id: 'db-4', name: 'Error Budget Tracker', lastViewed: '3 hours ago', owner: 'Payments Team' },
]
