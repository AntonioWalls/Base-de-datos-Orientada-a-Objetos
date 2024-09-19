import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Acciones asincrónicas para Empleado
export const listarEmpleado = createAsyncThunk(
    "empleado/listarEmpleado",
    async () => {
      try {
        const resp = await axios.get('http://localhost:12630/api/EmpleadoInstancia1/Lista');
        return resp.data;
      } catch (error) {
        return null;
      }
    }
  );
  
  export const obtenerEmpleado = createAsyncThunk(
    "empleado/obtenerEmpleado",
    async (id, { rejectWithValue }) => {
      try {
        const resp = await axios.get(`http://localhost:12630/api/EmpleadoInstancia1/Obtener/${id}`);
        return resp.data;
      } catch (error) {
        return rejectWithValue(`Error: ${error.message}`);
      }
    }
  );
  
  export const agregarEmpleado = createAsyncThunk(
    "empleado/agregarEmpleado",
    async (data, { rejectWithValue }) => {
      try {
        const resp = await axios.post('http://localhost:12630/api/EmpleadoInstancia1/Guardar', data);
        return resp.data;
      } catch (error) {
        return rejectWithValue(`Error: ${error.message}`);
      }
    }
  );
  
  export const eliminarEmpleado = createAsyncThunk(
    "empleado/eliminarEmpleado",
    async (id, { rejectWithValue }) => {
      try {
        const resp = await axios.delete(`http://localhost:12630/api/EmpleadoInstancia1/Eliminar?idEmpleado=${id}`);
        return resp.data;
      } catch (error) {
        return rejectWithValue(`Error: ${error.message}`);
      }
    }
  );
  
  export const editarEmpleado = createAsyncThunk(
    "empleado/editarEmpleado",
    async (data, { rejectWithValue }) => {
      try {
        const resp = await axios.put('http://localhost:12630/api/EmpleadoInstancia1/Editar', data);
        return resp.data;
      } catch (error) {
        return rejectWithValue(`Error: ${error.message}`);
      }
    }
  );
  