// Acciones asincrónicas
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const listarSucursal = createAsyncThunk(
  "sucursal/listarSucursal",
  async () => {
    try {
      const resp = await axios.get('http://localhost:12630/api/SucursalesInstancia2/Lista');
      console.log(resp.data); // Añade esto para ver la estructura de los datos
      return resp.data;
    } catch (error) {
      return null;
    }
  }
);

export const obtenerSucursal = createAsyncThunk(
  "sucursal/obtenerSucursal",
  async (id, { rejectWithValue }) => {
    try {
      const resp = await axios.get(`http://localhost:12630/api/SucursalesInstancia2/Obtener/${id}`);
      return resp.data;
    } catch (error) {
      return rejectWithValue(`Error: ${error.message}`);
    }
  }
);

export const agregarSucursal = createAsyncThunk(
  "sucursal/agregarSucursal",
  async (data, { rejectWithValue }) => {
    try {
      const resp = await axios.post('http://localhost:12630/api/SucursalesInstancia2/Guardar', data);
      console.log(resp.data);
      return resp.data;
    } catch (error) {
      return rejectWithValue(`Error: ${error.message}`);
    }
  }
);

export const eliminarSucursal = createAsyncThunk(
  "sucursal/eliminarSucursal",
  async (id, { rejectWithValue }) => {
    try {
      const resp = await axios.delete(`http://localhost:12630/api/SucursalesInstancia2/Eliminar?idSucursal=${id}`);
      return resp.data;
    } catch (error) {
      return rejectWithValue(`Error: ${error.message}`);
    }
  }
);

export const editarSucursal = createAsyncThunk(
  "sucursal/editarSucursal",
  async (data, { rejectWithValue }) => {
    try {
      const resp = await axios.put('http://localhost:12630/api/SucursalesInstancia2/Editar', data); // Eliminar la concatenación del id
      return resp.data;
    } catch (error) {
      return rejectWithValue(`Error: ${error.message}`);
    }
  }
);
