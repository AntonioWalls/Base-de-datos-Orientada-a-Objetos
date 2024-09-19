import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// Acciones asincrónicas para Proveedor
export const listarProveedor = createAsyncThunk(
    "proveedor/listarProveedor",
    async () => {
      try {
        const resp = await axios.get('http://localhost:12630/api/ProveedoresInstancia1/Lista');
        return resp.data;
      } catch (error) {
        return null;
      }
    }
  );
  
  export const obtenerProveedor = createAsyncThunk(
    "proveedor/obtenerProveedor",
    async (id, { rejectWithValue }) => {
      try {
        const resp = await axios.get(`http://localhost:12630/api/ProveedoresInstancia1/Obtener/${id}`);
        return resp.data;
      } catch (error) {
        return rejectWithValue(`Error: ${error.message}`);
      }
    }
  );
  
  export const agregarProveedor = createAsyncThunk(
    "proveedor/agregarProveedor",
    async (data, { rejectWithValue }) => {
      try {
        const resp = await axios.post('http://localhost:12630/api/ProveedoresInstancia1/Guardar', data);
        return resp.data;
      } catch (error) {
        return rejectWithValue(`Error: ${error.message}`);
      }
    }
  );
  
  export const eliminarProveedor = createAsyncThunk(
    "proveedor/eliminarProveedor",
    async (id, { rejectWithValue }) => {
      try {
        const resp = await axios.delete(`http://localhost:12630/api/ProveedoresInstancia1/Eliminar?idProveedor=${id}`);
        return resp.data;
      } catch (error) {
        return rejectWithValue(`Error: ${error.message}`);
      }
    }
  );
  
  export const editarProveedor = createAsyncThunk(
    "proveedor/editarProveedor",
    async (data, { rejectWithValue }) => {
      try {
        const resp = await axios.put('http://localhost:12630/api/ProveedoresInstancia1/Editar', data);
        return resp.data;
      } catch (error) {
        return rejectWithValue(`Error: ${error.message}`);
      }
    }
  );
  