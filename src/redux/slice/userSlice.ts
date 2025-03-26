import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "user",
    initialState: {
        firstName: "",
        lastName: "",
        isAuthenticated: false
    },
    reducers: {
        login: (state, action) => {
            state.firstName = action.payload;
            state.lastName = action.payload;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.firstName = "";
            state.lastName = "";
            state.isAuthenticated = false;
        },
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;