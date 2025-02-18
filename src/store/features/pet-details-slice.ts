import { PET_DETAILS_PAYLOAD } from "@/constants";
import { PetDetailsPayload } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCookie } from "cookies-next";

export interface PetDetailsSliceState {
  petDetailsPayload: PetDetailsPayload | null;
  indexOfPetToEdit: number;
}

const initialState: PetDetailsSliceState = {
  petDetailsPayload: JSON.parse(getCookie(PET_DETAILS_PAYLOAD) || "{}"),
  indexOfPetToEdit: 0,
};

const petDetailsSlice = createSlice({
  name: "pet-details",
  initialState,
  reducers: {
    updatePetDetails: (state, action: PayloadAction<PetDetailsPayload>) => {
      state.petDetailsPayload = action.payload;
    },
    updateIndexToEdit: (state, action: PayloadAction<number>) => {
      state.indexOfPetToEdit = action.payload;
    },
  },
});

export default petDetailsSlice;
export const { updatePetDetails, updateIndexToEdit } = petDetailsSlice.actions;
