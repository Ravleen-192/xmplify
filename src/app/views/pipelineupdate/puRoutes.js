import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';

const PlUpdate = Loadable(lazy(() => import('./plupdate')));

const puRoutes = [
  { path: '/pipelineupdate/default', element: <PlUpdate />, auth: authRoles.admin },
];

export default puRoutes;
