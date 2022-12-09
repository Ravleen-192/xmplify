import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';

const Playout = Loadable(lazy(() => import('./pllayout')));


const plRoutes = [
  { path: '/Pipelinemgmt/default', element: <Playout />, auth: authRoles.admin },
 
];

export default plRoutes;
