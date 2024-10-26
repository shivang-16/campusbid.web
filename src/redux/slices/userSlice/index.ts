
import { createSlice } from "@reduxjs/toolkit";
import { UserDataProps } from "@/helpers/types/index"

export interface UserProps {
  user: UserDataProps | null;
}

const initialState: UserProps = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userData: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { userData } = userSlice.actions;

export default userSlice.reducer;
