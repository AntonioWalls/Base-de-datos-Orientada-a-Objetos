import { Form, Button, Col, Row, Container } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux'; // Importa useSelector para acceder al estado
import Swal from 'sweetalert2';
import * as Yup from 'yup';

// Importa las acciones relacionadas con sucursal
import { obtenerVenta, editarVenta } from '../../../../../redux/actions/actionVentaB';
import { listarSucursal } from '../../../../../redux/actions/actionSucursalB';
import InputField from '../../../../common/root/componentes/Input';

const ModificarVenta = ({ onCancel, idVenta }) => {
    const dispatch = useDispatch();
    const [venta, setVenta] = useState(null);
    const { sucursales } = useSelector(state => state.listarSucursal);

    useEffect(() => {
        console.log('ID recibida:', idVenta); // Imprime la ID en consola
        if (idVenta) {
            dispatch(obtenerVenta(idVenta))
                .then((response) => {
                    console.log('Venta obtenida:', response.payload); // Imprime la sucursal obtenida en consola
                    const data = response.payload.response;

                    // Formatear la fecha a 'YYYY-MM-DD' si no es nulo
                    const formatFecha = (fecha) => {
                        if (fecha) {
                            const date = new Date(fecha);
                            return date.toISOString().split('T')[0];
                        }
                        return '';
                    };

                    setVenta(data);
                    formik.setValues({
                        id_venta: data.id_venta || '',          // INT
                        fecha_venta: formatFecha(data.fecha_venta) || '',  // DATE (formateada)
                        subtotal: data.subtotal || '',           // MONEY
                        iva: data.iva || '',                     // MONEY
                        total: data.total || '',                 // MONEY
                        met_pago: data.met_pago || '',           // VARCHAR(20)
                        id_sucursal: data.id_sucursal || ''      // INT
                    });

                });
        }
    }, [dispatch, idVenta]);

    const initialValues = {
        id_venta: '',       // INT NOT NULL
        fecha_venta: '',    // DATE
        subtotal: '',       // MONEY
        iva: '',            // MONEY
        total: '',          // MONEY
        met_pago: '',       // VARCHAR(20)
        id_sucursal: ''     // INT NOT NULL
    };

    useEffect(() => {
        dispatch(listarSucursal());
    }, [dispatch]);


    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object({
            id_venta: Yup.number().required('Es requerido').positive('Debe ser un número positivo'),
            fecha_venta: Yup.date().required('Es requerido'),
            subtotal: Yup.number().required('Es requerido').positive('Debe ser un número positivo'),
            iva: Yup.number().required('Es requerido').positive('Debe ser un número positivo'),
            total: Yup.number().required('Es requerido').positive('Debe ser un número positivo'),
            met_pago: Yup.string().oneOf(['Efectivo', 'Banco'], 'Método de pago inválido').required('Es requerido'),
            id_sucursal: Yup.number().required('Es requerido').positive('Debe ser un número positivo')
        }),
        onSubmit: (values) => {
            dispatch(editarVenta(values))
                .then((response) => {
                    if (!response.error) {
                        Swal.fire({
                            title: "Actualización Correcta",
                            text: "La venta se actualizó correctamente",
                            icon: "success",
                            showCancelButton: false,
                            confirmButtonText: "Aceptar",
                        });
                        LimpiarCampos();
                    }
                });
        },
        enableReinitialize: true
    });

    const LimpiarCampos = () => {
        formik.resetForm();
        onCancel();
    };

    const handleCancel = () => {
        LimpiarCampos();
    }

    return (
        <Container className='d-flex justify-content-center'>
            <Row>
                <h2>Editar Venta</h2>
                <Form onSubmit={formik.handleSubmit}>
                    <Col md={12}>
                        <InputField
                            controlId="id_venta"
                            label="ID Venta:"
                            type="number"
                            name="id_venta"
                            formik={formik}
                        />
                    </Col>

                    <Col md={12}>
                        <InputField
                            controlId="fecha_venta"
                            label="Fecha de Venta:"
                            type="date"
                            name="fecha_venta"
                            formik={formik}
                        />
                    </Col>

                    <Col md={12}>
                        <InputField
                            controlId="subtotal"
                            label="Subtotal:"
                            type="number"
                            name="subtotal"
                            formik={formik}
                        />
                    </Col>

                    <Col md={12}>
                        <InputField
                            controlId="iva"
                            label="IVA:"
                            type="number"
                            name="iva"
                            formik={formik}
                        />
                    </Col>

                    <Col md={12}>
                        <InputField
                            controlId="total"
                            label="Total:"
                            type="number"
                            name="total"
                            formik={formik}
                        />
                    </Col>

                    <Col md={12}>
                        <label htmlFor="met_pago">Método de Pago:</label>
                        <select
                            id="met_pago"
                            name="met_pago"
                            value={formik.values.met_pago}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={formik.touched.met_pago && formik.errors.met_pago ? 'input-error' : ''}
                        >
                            <option value="" label="Seleccione el método de pago" />
                            <option value="Efectivo" label="Efectivo" />
                            <option value="Banco" label="Banco" />
                        </select>
                        {formik.touched.met_pago && formik.errors.met_pago ? (
                            <div className="error">{formik.errors.met_pago}</div>
                        ) : null}
                    </Col>

                    {/* Campo para seleccionar la sucursal */}
                    <Col md={12}>
                        <Form.Group controlId="id_sucursal">
                            <Form.Label>Sucursal:</Form.Label>
                            <Form.Control
                                as="select"
                                name="id_sucursal"
                                value={formik.values.id_sucursal}
                                onChange={formik.handleChange}
                            >
                                <option value="">Selecciona una sucursal</option>
                                {sucursales.map((sucursal) => (
                                    <option key={sucursal.id} value={sucursal.id}>
                                        {sucursal.raz_soc}
                                    </option>
                                ))}
                            </Form.Control>
                            {formik.errors.id_sucursal && formik.touched.id_sucursal ? (
                                <div className="text-danger">{formik.errors.id_sucursal}</div>
                            ) : null}
                        </Form.Group>
                    </Col>

                    <Col md={12} style={{ paddingTop: "10px" }}>
                        <div className="mt-3 d-flex justify-content-end">
                            <Button
                                className="mx-3"
                                variant="danger"
                                onClick={handleCancel}
                            >
                                Cancelar
                            </Button>
                            <Button
                                variant="primary"
                                type="submit"
                            >
                                Guardar
                            </Button>
                        </div>
                    </Col>
                </Form>
            </Row>
        </Container>
    );
};

export default ModificarVenta;
