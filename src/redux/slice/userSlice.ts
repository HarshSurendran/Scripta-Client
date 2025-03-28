import { createSlice } from "@reduxjs/toolkit"

interface UserState {
    firstName: string;
    lastName: string;
    email: string;
    phone: number;
    dob: string;
    image: string;
    interestedCategories: string[];
    isAuthenticated: boolean;
}

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
    } as UserState,
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
        addInterestCategories: (state, action ) => {
            state.interestedCategories = [...state.interestedCategories, ...action.payload.interestedCategories];
        }
    },
});

export const { login, logout, addInterestCategories } = userSlice.actions;
export default userSlice.reducer;