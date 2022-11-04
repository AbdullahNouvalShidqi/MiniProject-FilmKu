import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        userData: {
            id: '',
            username: '',
            email: ''
        },
        userList: []
    },
    reducers: {
        signUpOrLogin(state, action){
            state.userData = action.payload; 
            state.isLoggedIn = true;
        },
        setUserList(state, action){
            state.userList = action.payload;
        },
        addUserList(state, action){
            state.userList = [...state.userList, action.payload]
        },
        logOut(state){
            state.isLoggedIn = false;
            state.userData = {
                id: '',
                username: '',
                email: ''
            };
            state.userList = [];
        }
    }
});

export const { signUpOrLogin, setUserList, addUserList, logOut } = userSlice.actions;

export const getUserState = (state) => state.user.isLoggedIn;

export const getUserData = (state) => state.user.userData;

export const getUserList = (state) => state.user.userList;

export default userSlice.reducer;