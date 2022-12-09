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
      { name: 'Pipeline', path:'/pipelinemgmt/default', iconText: 'A' },
      { name: 'Process', path: '/material/expansion-panel', iconText: 'B' },
      { name: 'Process Step', path: '/material/checkbox', iconText: 'C' },

    ],
  },
  {
    name: 'Data Quality Management',
    icon: 'high_quality',
    children: [{ name: 'Controls', path: '/charts/echarts', iconText: 'Q' },

    ],
  },
  {
    name: 'Data Lineage',
    icon: 'hdr_strong',
    children: [

      { name: 'Source Level', path: '/charts/echarts', iconText: 'S' },

      { name: 'Table Level', path: '/material/table', iconText: 'T' },
    ],

  },
  {
    name: 'Operations view',
    icon: 'trending_up',
    children: [

      { name: 'Status', path: '/charts/echarts', iconText: 'S' },

      { name: 'Logs', path: '/material/table', iconText: 'T' },
      { name: 'Notifications', path: '/material/table', iconText: 'T' },
    ],

  },
];
