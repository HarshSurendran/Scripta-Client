import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "user",
    initialState: {
        firstName: "",
        lastName: "",
        email: "",
        phone: 0,
        dob: "",
        image: "",
        interestedCategories: [],
        isAuthenticated: false
    },
    reducers: {
        login: (state, action) => {
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.email = action.payload.email;
            state.phone = action.payload.phone;
            state.dob = action.payload.dob;
            state.image = action.payload.image;
            state.interestedCategories = action.payload.interestedCategories;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.firstName = "";
            state.lastName = "";
            state.email = "";
            state.phone = 0;
            state.dob = "";
            state.image = "";  
            state.interestedCategories = [];
            state.isAuthenticated = false;
        },
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;