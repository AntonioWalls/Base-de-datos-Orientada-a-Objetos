import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Acciones asincrónicas para Inventario
export const listarInventario = createAsyncThunk(
    "inventario/listarInventario",
    async () => {
      try {
        const resp = await axios.get('http://localhost:12630/api/Inventarios/Lista');
        return resp.data;
      } catch (error) {
        return null;
      }
    }
  );
  
  export const obtenerInventario = createAsyncThunk(
    "inventario/obtenerInventario",
    async (id, { rejectWithValue }) => {
      try {
        const resp = await axios.get(`http://localhost:12630/api/Inventarios/Obtener/${id}`);
        return resp.data;
      } catch (error) {
        return rejectWithValue(`Error: ${error.message}`);
      }
    }
  );
  
  export const agregarInventario = createAsyncThunk(
    "inventario/agregarInventario",
    async (data, { rejectWithValue }) => {
      try {
        const resp = await axios.post('http://localhost:12630/api/Inventarios/Guardar', data);
        return resp.data;
      } catch (error) {
        return rejectWithValue(`Error: ${error.message}`);
      }
    }
  );
  
  export const eliminarInventario = createAsyncThunk(
    "inventario/eliminarInventario",
    async (id, { rejectWithValue }) => {
      try {
        const resp = await axios.delete(`http://localhost:12630/api/Inventarios/Eliminar?idInventario=${id}`);
        return resp.data;
      } catch (error) {
        return rejectWithValue(`Error: ${error.message}`);
      }
    }
  );
  
  export const editarInventario = createAsyncThunk(
    "inventario/editarInventario",
    async (data, { rejectWithValue }) => {
      try {
        const resp = await axios.put('http://localhost:12630/api/Inventarios/Editar', data);
        return resp.data;
      } catch (error) {
        return rejectWithValue(`Error: ${error.message}`);
      }
    }
  );
  