import type { RootState } from '../app/store';

// selectors encapsulate how state is read
// keeping selectors in a seperate file allows them to be shared across components
export const selectSearchText = (s: RootState) => s.ui.searchText;
export const selectStatusFilter = (s: RootState) => s.ui.statusFilter;
export const selectSelectedProject = (s: RootState) => s.ui.selectedProject;
export const selectSidebarCollapsed = (s: RootState) => s.ui.sidebarCollapsed;
export const selectTaskModalOpen = (s: RootState) => s.ui.taskModalOpen;
