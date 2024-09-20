import { Form, Button, Col, Row, Container } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux'; // Importa useSelector para acceder al estado
import Swal from 'sweetalert2';
import * as Yup from 'yup';

// Importa las acciones relacionadas con sucursal
import { obtenerVenta, editarVenta } from '../../../../../redux/actions/actionVentaB';
import InputField from '../../../../common/root/componentes/Input';

const ModificarVenta = ({ onCancel, idVenta }) => {
    const dispatch = useDispatch();
    const [venta, setVenta] = useState(null);

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
                        idVenta: data.idVenta || '',          // INT
                        fechaVenta: formatFecha(data.fechaVenta) || '',  // DATE (formateada)
                        subtotal: data.subtotal || '',           // MONEY
                        iva: data.iva || '',                     // MONEY
                        total: data.total || '',                 // MONEY
                        metPago: data.metPago || '',           // VARCHAR(20)
                        idSucursal: data.idSucursal || ''      // INT
                    });

                });
        }
    }, [dispatch, idVenta]);

    const initialValues = {
        idVenta: '',       // INT NOT NULL
        fechaVenta: '',    // DATE
        subtotal: '',       // MONEY
        iva: '',            // MONEY
        total: '',          // MONEY
        metPago: '',       // VARCHAR(20)
        idSucursal: ''     // INT NOT NULL
    };


    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object({
            fechaVenta: Yup.date().required('Es requerido'),
            subtotal: Yup.number().required('Es requerido').positive('Debe ser un número positivo'),
            iva: Yup.number().required('Es requerido').positive('Debe ser un número positivo'),
            total: Yup.number().required('Es requerido').positive('Debe ser un número positivo'),
            metPago: Yup.string().required('Es requerido'),
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
                            controlId="fechaVenta"
                            label="Fecha de Venta:"
                            type="date"
                            name="fechaVenta"
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
                        <InputField
                            controlId="metPago"
                            label="Método de Pago:"
                            type="text"
                            name="metPago"
                            formik={formik}
                        />
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
