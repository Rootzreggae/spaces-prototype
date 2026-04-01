export interface NavItem {
  id: string
  label: string
  path: string
  prototypeSrc: string
  description?: string
}

export interface NavSection {
  role: string
  label: string
  icon: string
  items: NavItem[]
}

export const navigation: NavSection[] = [
  {
    role: 'central-team',
    label: 'Central Team',
    icon: '🏛',
    items: [
      {
        id: 'command-center',
        label: 'Environments & Spaces',
        path: '/central-team/dashboard',
        prototypeSrc: '/prototypes-spaces/command-center/spaces-command-center.html',
        description: 'Management hub for all Spaces across environments',
      },
      {
        id: 'create-wizard',
        label: 'Create Space',
        path: '/central-team/create',
        prototypeSrc: '/prototypes-spaces/creation/spaces-creation-wizard-v5-refined.html',
        description: '4-step guided Space creation wizard',
      },
      {
        id: 'ranking-conflict',
        label: 'Conflict Resolution',
        path: '/central-team/ranking',
        prototypeSrc: '/prototypes-spaces/ranking/spaces-ranking-conflict.html',
        description: 'Resolve overlapping signal matchers between Spaces',
      },
      {
        id: 'signal-explained',
        label: 'Signal Conflicts',
        path: '/central-team/signals',
        prototypeSrc: '/prototypes-spaces/ranking/signal-conflict-explained.html',
        description: 'How signal assignment and ranking works',
      },
      {
        id: 'migration',
        label: 'Migration Wizard',
        path: '/central-team/migration',
        prototypeSrc: '/prototypes-spaces/migration/migrate-welcome.html',
        description: 'Migrate from legacy system to Spaces',
      },
      {
        id: 'onboarding-central',
        label: 'Onboarding (Central)',
        path: '/central-team/onboarding',
        prototypeSrc: '/prototypes-spaces/onboarding/onboarding-central-team.html',
        description: 'Post-creation onboarding for central teams',
      },
    ],
  },
  {
    role: 'space-admin',
    label: 'Space Admin',
    icon: '⚙',
    items: [
      {
        id: 'settings-env',
        label: 'Settings (Environment)',
        path: '/space-admin/settings-env',
        prototypeSrc: '/prototypes-settings/settings-redesign/mockup-1-tenant-settings.html',
        description: 'Environment-scoped settings with horizontal toolbar',
      },
      {
        id: 'settings-space',
        label: 'Settings (Space)',
        path: '/space-admin/settings-space',
        prototypeSrc: '/prototypes-settings/settings-redesign/mockup-2-space-settings.html',
        description: 'Space-scoped settings view',
      },
      {
        id: 'entity-settings',
        label: 'Entity Settings',
        path: '/space-admin/entity',
        prototypeSrc: '/prototypes-settings/settings-redesign/entity-settings.html',
        description: 'Entity-specific configuration drill-down',
      },
      {
        id: 'space-home',
        label: 'Space Home',
        path: '/space-admin/home',
        prototypeSrc: '/prototypes-settings/space-home/current/practitioner-flow.html',
        description: 'Space landing page with sidebar navigation',
      },
      {
        id: 'unified-nav',
        label: 'Unified Navigation',
        path: '/space-admin/nav',
        prototypeSrc: '/prototypes-settings/unified-navigation/integrated-prototype-v3.html',
        description: 'Settings hub with horizontal nav redesign',
      },
    ],
  },
  {
    role: 'practitioner',
    label: 'Practitioner',
    icon: '👤',
    items: [
      {
        id: 'switcher-simplified',
        label: 'Space Switcher',
        path: '/practitioner/switcher',
        prototypeSrc: '/prototypes-spaces/switcher/space-switcher-simplified.html',
        description: 'Minimal Space switching dropdown',
      },
      {
        id: 'switcher-tabs',
        label: 'Switcher (Tabs)',
        path: '/practitioner/switcher-tabs',
        prototypeSrc: '/prototypes-spaces/switcher/space-switcher-with-tabs.html',
        description: 'Tab-based Space navigation',
      },
      {
        id: 'onboarding-end-user',
        label: 'Onboarding (End User)',
        path: '/practitioner/onboarding',
        prototypeSrc: '/prototypes-spaces/onboarding/onboarding-end-user.html',
        description: 'First-time practitioner experience',
      },
      {
        id: 'onboarding-admin',
        label: 'Onboarding (Space Admin)',
        path: '/practitioner/onboarding-admin',
        prototypeSrc: '/prototypes-spaces/onboarding/onboarding-space-admin.html',
        description: 'Space admin onboarding flow',
      },
      {
        id: 'sharing',
        label: 'Sharing Dialog',
        path: '/practitioner/sharing',
        prototypeSrc: '/prototypes-explorations/sharing-dialog/variant-c-drawer-progressive.html',
        description: 'Progressive drawer for sharing content to Spaces',
      },
    ],
  },
]
