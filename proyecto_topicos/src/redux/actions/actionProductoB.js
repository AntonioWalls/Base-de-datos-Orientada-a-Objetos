import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Acciones asincrónicas para Producto
export const listarProducto = createAsyncThunk(
    "producto/listarProducto",
    async () => {
      try {
        const resp = await axios.get('http://localhost:12630/api/ProductoInstancia2/Lista');
        console.log(resp.data);
        return resp.data;
      } catch (error) {
        return null;
      }
    }
  );
  
  export const obtenerProducto = createAsyncThunk(
    "producto/obtenerProducto",
    async (id, { rejectWithValue }) => {
      try {
        const resp = await axios.get(`http://localhost:12630/api/ProductoInstancia2/Obtener/${id}`);
        return resp.data;
      } catch (error) {
        return rejectWithValue(`Error: ${error.message}`);
      }
    }
  );
  
  export const agregarProducto = createAsyncThunk(
    "producto/agregarProducto",
    async (data, { rejectWithValue }) => {
      try {
        const resp = await axios.post('http://localhost:12630/api/ProductoInstancia2/Guardar', data);
        return resp.data;
      } catch (error) {
        return rejectWithValue(`Error: ${error.message}`);
      }
    }
  );
  
  export const eliminarProducto = createAsyncThunk(
    "producto/eliminarProducto",
    async (id, { rejectWithValue }) => {
      try {
        const resp = await axios.delete(`http://localhost:12630/api/ProductoInstancia2/Eliminar?idProducto=${id}`);
        return resp.data;
      } catch (error) {
        return rejectWithValue(`Error: ${error.message}`);
      }
    }
  );
  
  export const editarProducto = createAsyncThunk(
    "producto/editarProducto",
    async (data, { rejectWithValue }) => {
      try {
        const resp = await axios.put('http://localhost:12630/api/ProductoInstancia2/Editar', data);
        return resp.data;
      } catch (error) {
        return rejectWithValue(`Error: ${error.message}`);
      }
    }
  );
  