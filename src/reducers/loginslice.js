import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    user: {},
    isAuthenticated: false,
};
const loginslice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = JSON.parse(localStorage.getItem('user'));
            state.isAuthenticated = true;
        },
        setIsAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload;
        },
    },
});

export const { setUser, setIsAuthenticated } = loginslice.actions;
export default loginslice.reducer;
export const loginAsync = (user) => {
    //console.log("loginaasync")
    return async (dispatch) => {
        const response = await fetch('http://localhost:8080/authenticate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
        const res = await response.json();
        if (res.success) {
            dispatch(setUser(user));
            dispatch(setIsAuthenticated(true));
            localStorage.setItem('user',JSON.stringify(user));
            localStorage.setItem('token', res.token);
        } 

    };
};
export const checkAuth = () => {
    return async (dispatch) => {
        const token = localStorage.getItem('token');
        if (token) {
            const response = await fetch('http://localhost:8080/checkAuth', {
                method: 'GET',
                headers: {
                    Authorization: token,
                },
            });
            const res = await response.json();
            if (res.success) {
                //dispatch(setUser(res.user));
                dispatch(setIsAuthenticated(true));
                
            }
        }
    };
};

export const addUser = (user) => {
    console.log("adduser loginslice")
    return async (dispatch) => {
        const response = await fetch('http://localhost:8080/adduser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
        // dispatch(getMovies());
    };
};

