import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';

const PlCreate = Loadable(lazy(() => import('./plcreate')));

const pcRoutes = [
  { path: '/pipelinecreate/default', element: <PlCreate />, auth: authRoles.admin },
];

export default pcRoutes;
