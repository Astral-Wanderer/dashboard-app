
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Status } from '../types';

interface UiState {
  searchText: string;
  statusFilter: Status | 'ALL';
  selectedProject: string | null;
  sidebarCollapsed: boolean;
  taskModalOpen: boolean;
}

const initialState: UiState = {
  searchText: '',
  statusFilter: 'ALL',
  selectedProject: null,
  sidebarCollapsed: false,
  taskModalOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
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
} = uiSlice.actions;

export default uiSlice.reducer;
