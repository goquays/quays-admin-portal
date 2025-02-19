import { PetDetailsPayload } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PetDetailsSliceState {
  petDetailsPayload: PetDetailsPayload;
  indexOfPetToEdit: number;
  isEditing: boolean;
}

const initialState: PetDetailsSliceState = {
  // petDetailsPayload: JSON.parse(
  //   getCookie(PET_DETAILS_PAYLOAD) ||
  //     JSON.stringify({
  //       petDetailList: [],
  //     }),
  // ),
  petDetailsPayload: { petDetailList: [] },
  indexOfPetToEdit: 0,
  isEditing: false,
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
    resetPetDetails: (state) => {
      state.petDetailsPayload = {
        petDetailList: [],
      };
    },
    setIsEditing: (state, action: PayloadAction<boolean>) => {
      state.isEditing = action.payload;
    },
  },
});

export default petDetailsSlice;
export const { updatePetDetails, updateIndexToEdit, resetPetDetails, setIsEditing } = petDetailsSlice.actions;
