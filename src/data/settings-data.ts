// ── Settings Categories & Schemas ──────────────────────────────

export interface SettingsSchema {
  id: string
  name: string
  description: string
  overrides?: number
}

export interface SettingsCategory {
  id: string
  name: string
  description: string
  group: 'data' | 'platform'
  icon: string // SVG path data
  schemas: SettingsSchema[]
}

export const settingsCategories: SettingsCategory[] = [
  // ── Data ────────────────────────────────────────────────────
  {
    id: 'collect-capture',
    name: 'Collect and capture',
    description: 'Configure data collection from OneAgent, cloud integrations, and external data sources.',
    group: 'data',
    icon: 'M22 12h-4l-3 9L9 3l-3 9H2',
    schemas: [
      { id: 'general-monitoring', name: 'General monitoring settings', description: 'Configure OneAgent behavior and monitoring defaults', overrides: 3 },
      { id: 'business-events', name: 'Business events', description: 'Capture custom events tied to business outcomes' },
      { id: 'cloud-virtualization', name: 'Cloud and virtualization', description: 'Monitor AWS, Azure, GCP, and Kubernetes environments' },
      { id: 'data-privacy', name: 'Data privacy', description: 'Control data masking, retention, and GDPR compliance' },
      { id: 'dev-observability', name: 'Observability for Developers', description: 'Enable developer-focused spans, logs, and debugging tools', overrides: 1 },
      { id: 'distributed-tracing', name: 'Distributed tracing', description: 'Track requests across services and microservices' },
      { id: 'infrastructure', name: 'Infrastructure', description: 'Monitor hosts, processes, and network performance' },
      { id: 'log-monitoring', name: 'Log monitoring', description: 'Ingest, parse, and analyze log data' },
      { id: 'mainframe', name: 'Mainframe', description: 'Connect z/OS systems and CICS transactions' },
      { id: 'rum', name: 'Real User Monitoring', description: 'Track user sessions, actions, and frontend performance' },
      { id: 'synthetic', name: 'Synthetic Monitoring', description: 'Create browser and HTTP monitors for uptime testing' },
      { id: 'opentelemetry', name: 'OpenTelemetry', description: 'Ingest traces, metrics, and logs via OTLP' },
    ],
  },
  {
    id: 'process',
    name: 'Process and contextualize',
    description: 'Control how data flows through OpenPipeline and gets enriched.',
    group: 'data',
    icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z',
    schemas: [
      { id: 'openpipeline', name: 'OpenPipeline', description: 'Configure data processing pipelines and routing rules' },
      { id: 'enrichment', name: 'Data enrichment', description: 'Add context and metadata to incoming signals' },
      { id: 'tagging', name: 'Tagging rules', description: 'Define automatic and manual tagging strategies' },
    ],
  },
  {
    id: 'storage',
    name: 'Storage',
    description: 'Manage data retention and bucket storage.',
    group: 'data',
    icon: 'M21 12c0 1.66-4 3-9 3s-9-1.34-9-3',
    schemas: [
      { id: 'retention', name: 'Data retention', description: 'Configure retention periods per data type' },
      { id: 'buckets', name: 'Bucket management', description: 'Create and manage storage buckets' },
    ],
  },
  {
    id: 'segmentation',
    name: 'Segmentation',
    description: 'Organize entities into business contexts and scopes.',
    group: 'data',
    icon: 'M12 2a10 10 0 000 20M12 2v20',
    schemas: [
      { id: 'segments', name: 'Segments', description: 'Create and manage data segments' },
      { id: 'access-control', name: 'Access control', description: 'Configure segment-level access permissions' },
    ],
  },
  {
    id: 'analyze-alert',
    name: 'Analyze and Alert',
    description: 'Set up alerts, notifications, and AI-powered insights.',
    group: 'data',
    icon: 'M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9',
    schemas: [
      { id: 'anomaly-detection', name: 'Anomaly detection', description: 'Configure performance thresholds and anomaly rules' },
      { id: 'alerting-profiles', name: 'Alerting profiles', description: 'Define alerting rules and notification channels' },
      { id: 'notifications', name: 'Notification channels', description: 'Manage Slack, email, PagerDuty, and webhook integrations' },
      { id: 'problem-detection', name: 'Problem detection', description: 'Fine-tune problem detection sensitivity' },
    ],
  },
  // ── Platform ────────────────────────────────────────────────
  {
    id: 'general',
    name: 'General',
    description: 'Manage access control, teams, and platform updates.',
    group: 'platform',
    icon: 'M12 12m-3 0a3 3 0 106 0 3 3 0 10-6 0',
    schemas: [
      { id: 'preferences', name: 'Preferences', description: 'User interface and display preferences' },
      { id: 'updates', name: 'Platform updates', description: 'Manage OneAgent and ActiveGate versions' },
    ],
  },
  {
    id: 'connections',
    name: 'Connections',
    description: 'Connect to cloud providers and third-party services.',
    group: 'platform',
    icon: 'M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6',
    schemas: [
      { id: 'aws', name: 'AWS connection', description: 'Connect and monitor AWS accounts' },
      { id: 'azure', name: 'Azure connection', description: 'Connect and monitor Azure subscriptions' },
      { id: 'gcp', name: 'Google Cloud', description: 'Connect and monitor GCP projects' },
      { id: 'api-tokens', name: 'API tokens', description: 'Manage API access tokens' },
    ],
  },
  {
    id: 'apps',
    name: 'Apps',
    description: 'Install, configure, and manage Dynatrace apps.',
    group: 'platform',
    icon: 'M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z',
    schemas: [],
  },
  {
    id: 'internal',
    name: 'Internal',
    description: 'Internal platform configuration and developer tools.',
    group: 'platform',
    icon: 'M2 2h20v8H2zM2 14h20v8H2z',
    schemas: [],
  },
]

// ── Overrides Data ────────────────────────────────────────────

export interface OverrideEntity {
  id: string
  name: string
  entityId: string
  type: 'host-group' | 'k8s-cluster' | 'host'
  customizedFields: string
  actions: ('edit' | 'reset')[]
}

export const overrideEntities: OverrideEntity[] = [
  { id: 'o1', name: 'HOST_GROUP-CWS-1-IG-1-HG', entityId: 'HOST_GROUP-530F73EC2754E115', type: 'host-group', customizedFields: 'CPU threshold (90% → 95%)', actions: ['edit', 'reset'] },
  { id: 'o2', name: 'HOST_GROUP-CWS-2-IG-1-HG', entityId: 'HOST_GROUP-694F3F51778C5584', type: 'host-group', customizedFields: 'Memory threshold, Disk space', actions: ['edit', 'reset'] },
  { id: 'o3', name: 'HOST_GROUP-CWS-4-IG-1-HG', entityId: 'HOST_GROUP-E7FBBCF7B1467174', type: 'host-group', customizedFields: 'CPU threshold (90% → 85%)', actions: ['edit', 'reset'] },
  { id: 'o4', name: 'Google Kubernetes Engine', entityId: 'KUBERNETES_CLUSTER-A387S0880D349ADD', type: 'k8s-cluster', customizedFields: 'CPU threshold, Memory threshold', actions: ['edit', 'reset'] },
  { id: 'o5', name: 'argocd', entityId: 'CLOUD_APPLICATION_NAMESPACE-C89E211983E5EA', type: 'k8s-cluster', customizedFields: 'Detection disabled', actions: ['edit', 'reset'] },
  { id: 'o6', name: 'HOST-IG-5-50048', entityId: 'HOST-D0BA814EC4703A45', type: 'host', customizedFields: 'CPU threshold (90% → 95%)', actions: ['edit', 'reset'] },
  { id: 'o7', name: 'HOST-IG-5-50080', entityId: 'HOST-97A73E49AAC9ADA9', type: 'host', customizedFields: 'Memory threshold, Disk space', actions: ['edit', 'reset'] },
  { id: 'o8', name: 'HOST-IG-5-50038', entityId: 'HOST-0E3D44EF2878109C', type: 'host', customizedFields: 'CPU threshold (90% → 85%)', actions: ['edit', 'reset'] },
]
