import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Notiflix from "notiflix";

const API_URL = 'https://taskpro-app-bcac9d37037a.herokuapp.com/';

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post(`${API_URL}api/auth/register`, credentials)

      console.log(res.data);
      if (res.status === 201) {
        console.log('Registartion successfully!')
      }
      return res.data;
    } catch (error) {
     if (error.response && error.response.status === 409) {
        Notiflix.Notify.failure('Email already registered!');
      } 
      console.log(error);
     return thunkAPI.rejectWithValue(error.response.data);
  };
  }
);

export const logIn = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await axios.post(`${API_URL}api/auth/login`, credentials);
      const { token } = data;
     setAuthHeader(token);
      console.log(data);
      console.log(token)
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


export const logOut = createAsyncThunk(
    'auth/logout',
    async (_, thunkAPI) => {
    try {
      await axios.get(`${API_URL}api/auth/logout`) 
      clearAuthHeader();
      console.log('log out')
  } catch (error) {
    console.log(error)
    return thunkAPI.rejectWithValue(error.message);
  }
});


export const refreshUser = createAsyncThunk(
  'auth/currentUser',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`${API_URL}api/auth/current`)
        return res.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );


