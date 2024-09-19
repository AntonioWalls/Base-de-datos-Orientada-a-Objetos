import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Acciones asincrónicas para Cliente
export const listarCliente = createAsyncThunk(
    "cliente/listarCliente",
    async () => {
      try {
        const resp = await axios.get('http://localhost:12630/api/ClienteInstancia1/Lista');
        return resp.data;
      } catch (error) {
        return null;
      }
    }
  );
  
  export const obtenerCliente = createAsyncThunk(
    "cliente/obtenerCliente",
    async (id, { rejectWithValue }) => {
      try {
        const resp = await axios.get(`http://localhost:12630/api/ClienteInstancia1/Obtener/${id}`);
        return resp.data;
      } catch (error) {
        return rejectWithValue(`Error: ${error.message}`);
      }
    }
  );
  
  export const agregarCliente = createAsyncThunk(
    "cliente/agregarCliente",
    async (data, { rejectWithValue }) => {
      try {
        const resp = await axios.post('http://localhost:12630/api/ClienteInstancia1/Guardar', data);
        return resp.data;
      } catch (error) {
        return rejectWithValue(`Error: ${error.message}`);
      }
    }
  );
  
  export const eliminarCliente = createAsyncThunk(
    "cliente/eliminarCliente",
    async (id, { rejectWithValue }) => {
      try {
        const resp = await axios.delete(`http://localhost:12630/api/ClienteInstancia1/Eliminar?idCliente=${id}`);
        return resp.data;
      } catch (error) {
        return rejectWithValue(`Error: ${error.message}`);
      }
    }
  );
  
  export const editarCliente = createAsyncThunk(
    "cliente/editarCliente",
    async (data, { rejectWithValue }) => {
      try {
        const resp = await axios.put('http://localhost:12630/api/ClienteInstancia1/Editar', data);
        return resp.data;
      } catch (error) {
        return rejectWithValue(`Error: ${error.message}`);
      }
    }
  );
  