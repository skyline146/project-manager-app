import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ModalStateInterface {
    isActive: boolean
    type: string,
    action: string,
    id: string,
}

const initialState: ModalStateInterface = {
    isActive: false,
    type: '',
    action: '',
    id: ''
}

export const modalSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        showModal: (state, action: PayloadAction<{type: string, action: string, id?: string}>) => {
            const {type, id} = action.payload;

            state.isActive = true;

            state.type = type;
            state.action = action.payload.action;

            if (id) {
                state.id = id;
            }
        },

        hideModal: (state) => {
            state.isActive = false;
        }
    }
});

export const { showModal, hideModal } = modalSlice.actions;

export default modalSlice.reducer