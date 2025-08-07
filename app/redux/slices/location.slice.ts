import { createSlice } from '@reduxjs/toolkit'
import { TypeLocation } from '../../types/typeLocationPagination';

const initialState = {
    locations: [] as TypeLocation[],
}

const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {
        setLocations: (state, action) => {
            state.locations = action.payload;
        },
    }
})
export const { setLocations } = locationSlice.actions;
export default locationSlice.reducer;