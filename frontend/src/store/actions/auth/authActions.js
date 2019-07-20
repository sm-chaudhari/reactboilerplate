import {
    AUTH_SUCCESS,
    AUTH_FAIL,
    AUTH_END,
    AUTH_START,
    CLEAN_UP,
    SIGN_OUT
} from "./authTypes";

// to send api request
import axios from 'axios';

// Root api
import { ROOT_API } from "../../../config/config";

// signup action creator
export const signUp = data => async (dispatch) => {
    dispatch({
        type: AUTH_START
    })
    try {
        let req_data = {
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            password: data.password
        }

        const res = await axios.put(`${ROOT_API}/auth/signup`, { ...req_data });
        localStorage.setItem('token', res.data.token)
        dispatch({
            type: AUTH_SUCCESS,
            payload: { token: res.data.token }
        })
    } catch (error) {
        dispatch({
            type: AUTH_FAIL,
            payload: error.message
        })
    }
    dispatch({
        type: AUTH_END
    })
}

// signout action creator
export const signOut = (_) => async (dispatch) => {
    try {
        localStorage.removeItem('token');
        dispatch({
            type: SIGN_OUT
        })
    } catch (error) {
        console.error(error);
    }
}

// Login action creator
export const logIn = data => async (dispatch) => {
    dispatch({
        type: AUTH_START
    })
    try {
        let req_data = {
            email: data.email,
            password: data.password
        }
        const res = await axios.post(`${ROOT_API}/auth/login`, { ...req_data });
        localStorage.setItem('token', res.data.token)
        dispatch({
            type: AUTH_SUCCESS,
            payload: { token: res.data.token }
        })
    } catch (error) {

        dispatch({
            type: AUTH_FAIL,
            payload: error.message
        })
    }
    dispatch({
        type: AUTH_END
    })
}

// cleanup messages action creator
export const clean = (_) => async (dispatch) => {
    dispatch({
        type: CLEAN_UP
    })
}