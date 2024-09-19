import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// Acciones asincrónicas para Coctelería
export const listarCocteleria = createAsyncThunk(
    "cocteleria/listarCocteleria",
    async () => {
      try {
        const resp = await axios.get('http://localhost:12630/api/CocteleriaInstancia1/Lista');
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
        const resp = await axios.get(`http://localhost:12630/api/CocteleriaInstancia1/Obtener/${id}`);
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
        const resp = await axios.post('http://localhost:12630/api/CocteleriaInstancia1/Guardar', data);
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
        const resp = await axios.delete(`http://localhost:12630/api/CocteleriaInstancia1/Eliminar?idCocteleria=${id}`);
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
        const resp = await axios.put('http://localhost:12630/api/CocteleriaInstancia1/Editar', data);
        return resp.data;
      } catch (error) {
        return rejectWithValue(`Error: ${error.message}`);
      }
    }
  );
  