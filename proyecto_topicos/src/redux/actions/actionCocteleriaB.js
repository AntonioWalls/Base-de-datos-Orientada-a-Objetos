import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// Acciones asincrónicas para Coctelería
export const listarCocteleria = createAsyncThunk(
    "cocteleria/listarCocteleria",
    async () => {
      try {
        const resp = await axios.get('http://localhost:12630/api/CocteleriaInstancia2/Lista');
        console.log(resp.data);
        return resp.data;
      } catch (error) {
        return null;
      }
    }
  );
  
  export const obtenerCocteleria = createAsyncThunk(
    "cocteleria/obtenerCocteleria",
    async (id, { rejectWithValue }) => {
      try {
        const resp = await axios.get(`http://localhost:12630/api/CocteleriaInstancia2/Obtener/${id}`);
        return resp.data;
      } catch (error) {
        return rejectWithValue(`Error: ${error.message}`);
      }
    }
  );
  
  export const agregarCocteleria = createAsyncThunk(
    "cocteleria/agregarCocteleria",
    async (data, { rejectWithValue }) => {
      try {
        const resp = await axios.post('http://localhost:12630/api/CocteleriaInstancia2/Guardar', data);
        return resp.data;
      } catch (error) {
        return rejectWithValue(`Error: ${error.message}`);
      }
    }
  );
  
  export const eliminarCocteleria = createAsyncThunk(
    "cocteleria/eliminarCocteleria",
    async (id, { rejectWithValue }) => {
      try {
        const resp = await axios.delete(`http://localhost:12630/api/CocteleriaInstancia2/Eliminar?idCocteleria=${id}`);
        return resp.data;
      } catch (error) {
        return rejectWithValue(`Error: ${error.message}`);
      }
    }
  );
  
  export const editarCocteleria = createAsyncThunk(
    "cocteleria/editarCocteleria",
    async (data, { rejectWithValue }) => {
      try {
        const resp = await axios.put('http://localhost:12630/api/CocteleriaInstancia2/Editar', data);
        return resp.data;
      } catch (error) {
        return rejectWithValue(`Error: ${error.message}`);
      }
    }
  );
  