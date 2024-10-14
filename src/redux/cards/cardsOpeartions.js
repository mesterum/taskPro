import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const URL = 'https://taskpro-app-bcac9d37037a.herokuapp.com/'

export const addCard = createAsyncThunk(
  "cards/addCard",
  async ({ boardName, id, title}, thunkAPI) => {
    try {

      const response = await axios.post(`${URL}api/boards/${boardName}/column/${id}`, {title});
      if (response.status !== 200) {
        throw new Error('Failed to add card');
      }
      return response.data;
    } catch (e) {
      console.log(`${URL}api/boards/${boardName}/column/${id}`)
      console.error("Error adding card: response", e.response );
      console.error("Error adding card: data",  e.response.data );
      console.error("Error adding card: messaje",  e.message);
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);


export const deleteCard = createAsyncThunk(
  'cards/deleteCard',
  async ({ cardId, columnId }, thunkAPI) => {
    try {
      await axios.delete();
      return { cardId, columnId };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editCard = createAsyncThunk(
  'cards/editCard',
  async ({ cardId, editedCard }, thunkAPI) => {
    try {
      const { data } = await axios.patch(
        
        editedCard
      );

      return { card: data.card, columnId: editedCard.column };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);