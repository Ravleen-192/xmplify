export const navigations = [
  { name: 'Home', path: '/dashboard/default', icon: 'dashboard' },
  // { label: 'PAGES', type: 'label' },
  {
    name: 'Session/Auth',
    icon: 'security',
    children: [
      { name: 'Sign in', iconText: 'SI', path: '/session/signin' },
      { name: 'Sign up', iconText: 'SU', path: '/session/signup' },
      { name: 'Forgot Password', iconText: 'FP', path: '/session/forgot-password' },
      { name: 'Error', iconText: '404', path: '/session/404' },
    ],
  },
  //{ label: 'Products', type: 'label' },
  {
    name: 'Pipeline Management',
    icon: 'launch',
    /*badge: { value: '30+', color: 'secondary' },*/
    children: [
      { name: 'Pipeline', path: '/pipelinemgmt/default', iconText: 'A' },
      { name: 'Process', path: '/dashboard/default', iconText: 'B' },
      { name: 'Process Step', path: '/dashboard/default', iconText: 'C' },
    ],
  },
  {
    name: 'Data Quality Management',
    icon: 'high_quality',
    children: [{ name: 'Controls', path: '/dashboard/default', iconText: 'Q' }],
  },
  {
    name: 'Data Lineage',
    icon: 'hdr_strong',
    children: [
      { name: 'Source Level', path: '/dashboard/default', iconText: 'S' },

      { name: 'Table Level', path: '/dashboard/default', iconText: 'T' },
    ],
  },
  {
    name: 'Operations view',
    icon: 'trending_up',
    children: [
      { name: 'Status', path: '/dashboard/default', iconText: 'S' },

      { name: 'Logs', path: '/dashboard/default', iconText: 'T' },
      { name: 'Notifications', path: '/dashboard/default', iconText: 'T' },
    ],
  },
];
