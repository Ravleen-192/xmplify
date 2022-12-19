import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';

const Playout = Loadable(lazy(() => import('./pllayout')));
const Pladdnp = Loadable(lazy(() => import('./plAddNP')));
const Pladdns = Loadable(lazy(() => import('./plAddNS')));

const plRoutes = [
  { path: '/Pipelinemgmt/default', element: <Playout />, auth: authRoles.admin },
  { path: '/Pipelinemgmt/pladdnp', element: <Pladdnp />, auth: authRoles.admin },
  { path: '/Pipelinemgmt/pladdns', element: <Pladdns />, auth: authRoles.admin },
];

export default plRoutes;
