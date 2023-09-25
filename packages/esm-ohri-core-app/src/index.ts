import { defineConfigSchema, getAsyncLifecycle, getSyncLifecycle, provide } from '@openmrs/esm-framework';
import {
  createOHRIPatientChartSideNavLink,
  createOHRIDashboardLink,
  PatientListTable,
} from '@ohri/openmrs-esm-ohri-commons-lib';
import {
  appointmentsDashboardMeta,
  homeDashboardMeta,
  dispensingDashboardMeta,
  serviceQueuesDashboardMeta,
  patientChartDivider_dashboardMeta,
} from './dashboard.meta';
import { createDashboardLink } from './dashboard/create-dashboard-link.component';

export const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

const moduleName = '@ohri/openmrs-esm-ohri-core-app';

const options = {
  featureName: 'ohri-core',
  moduleName,
};

export const root = getAsyncLifecycle(() => import('./root'), options);

export const dashboardNavMenu = getAsyncLifecycle(() => import('./dashboard/side-menu/side-menu.component'), options);

export const homeWidgetDbLink = getSyncLifecycle(createDashboardLink(homeDashboardMeta), options);

export const homeWidgetDashboard = getAsyncLifecycle(() => import('./home-widgets/home-widgets.component'), options);

export const ohriClinicalViewsDivider = getSyncLifecycle(
  createOHRIPatientChartSideNavLink(patientChartDivider_dashboardMeta),
  options,
);

// Audit these
export const patientList = getSyncLifecycle(PatientListTable, {
  featureName: 'home',
  moduleName,
});

export const ohriNavItems = getAsyncLifecycle(
  () => import('./ohri-dashboard/side-menu/ohri-dashboard-side-nav.component'),
  {
    featureName: 'nav-items',
    moduleName,
  },
);

export const appointmentsLink = getSyncLifecycle(createOHRIDashboardLink(appointmentsDashboardMeta), options);
export const appointmentsDashboard = getAsyncLifecycle(
  () => import('./appointments/appointments-dashboard.component'),
  {
    featureName: 'appointments-dashboard',
    moduleName,
  },
);

export const dispensingLink = getSyncLifecycle(createOHRIDashboardLink(dispensingDashboardMeta), options);
export const dispensingDashboard = getAsyncLifecycle(() => import('./dispensing/dispensing-dashboard.component'), {
  featureName: 'dispensing-dashboard',
  moduleName,
});

export const serviceQueuesLink = getSyncLifecycle(createOHRIDashboardLink(serviceQueuesDashboardMeta), options);
export const serviceQueuesDashboard = getAsyncLifecycle(
  () => import('./service-queues/service-queues-dashboard.component'),
  {
    featureName: 'service-queues-dashboard',
    moduleName,
  },
);

export function startupApp() {
  defineConfigSchema(moduleName, {});
}
