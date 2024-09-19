// Acciones asincrónicas para Venta
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const listarVenta = createAsyncThunk(
    "venta/listarVenta",
    async () => {
      try {
        const resp = await axios.get('http://localhost:12630/api/VentaInstancia1/Lista');
        return resp.data;
      } catch (error) {
        return null;
      }
    }
  );
  
  export const obtenerVenta = createAsyncThunk(
    "venta/obtenerVenta",
    async (id, { rejectWithValue }) => {
      try {
        const resp = await axios.get(`http://localhost:12630/api/VentaInstancia1/Obtener/${id}`);
        return resp.data;
      } catch (error) {
        return rejectWithValue(`Error: ${error.message}`);
      }
    }
  );
  
  export const agregarVenta = createAsyncThunk(
    "venta/agregarVenta",
    async (data, { rejectWithValue }) => {
      try {
        const resp = await axios.post('http://localhost:12630/api/VentaInstancia1/Guardar', data);
        return resp.data;
      } catch (error) {
        return rejectWithValue(`Error: ${error.message}`);
      }
    }
  );
  
  export const eliminarVenta = createAsyncThunk(
    "venta/eliminarVenta",
    async (id, { rejectWithValue }) => {
      try {
        const resp = await axios.delete(`http://localhost:12630/api/VentaInstancia1/Eliminar?idVenta=${id}`);
        return resp.data;
      } catch (error) {
        return rejectWithValue(`Error: ${error.message}`);
      }
    }
  );
  
  export const editarVenta = createAsyncThunk(
    "venta/editarVenta",
    async (data, { rejectWithValue }) => {
      try {
        const resp = await axios.put('http://localhost:12630/api/VentaInstancia1/Editar', data);
        return resp.data;
      } catch (error) {
        return rejectWithValue(`Error: ${error.message}`);
      }
    }
  );
  