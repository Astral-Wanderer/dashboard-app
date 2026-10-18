import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Status } from '../types';

// defines which UI Data Redux should store
interface UiState {
  searchText: string;
  statusFilter: Status | 'ALL';
  selectedProject: string | null;
  sidebarCollapsed: boolean;
  taskModalOpen: boolean;
}

// states the initial values
const initialState: UiState = {
  searchText: '',
  statusFilter: 'ALL',
  selectedProject: null,
  sidebarCollapsed: false,
  taskModalOpen: false,
};

// creates the Redux slice for the user interface
const uiSlice = createSlice({
  name: 'ui',
  initialState,
  // define how these values can be changed
  reducers: {
    setSearchText(state, action: PayloadAction<string>) {
      state.searchText = action.payload;
    },
    setStatusFilter(state, action: PayloadAction<Status | 'ALL'>) {
      state.statusFilter = action.payload;
    },
    setSelectedProject(state, action: PayloadAction<string | null>) {
      state.selectedProject = action.payload;
    },
    toggleSidebar(state) {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    openTaskModal(state) {
      state.taskModalOpen = true;
    },
    closeTaskModal(state) {
      state.taskModalOpen = false;
    },
  },
});

export const {
  setSearchText,
  setStatusFilter,
  setSelectedProject,
  toggleSidebar,
  openTaskModal,
  closeTaskModal
} = uiSlice.actions; // provides the corresponding actions

export default uiSlice.reducer;
