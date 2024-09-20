import { Form, Button, Col, Row, Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import React, { useEffect } from 'react'; // Importa useEffect junto con React
import { useSelector } from 'react-redux'; // Importa useSelector para acceder al estado
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import * as Yup from 'yup';

import InputField from '../../../../common/root/componentes/Input';
import { agregarVenta } from '../../../../../redux/actions/actionVentaA';

const GuardarVenta = ({ onCancel }) => {
    const dispatch = useDispatch();

    // Valores iniciales del formulario
    const initialValues = {
        idVenta: '',       // INT NOT NULL
        fechaVenta: '',    // DATE
        subtotal: '',       // MONEY
        iva: '',            // MONEY
        total: '',          // MONEY
        metPago: '',       // VARCHAR(20)
        idSucursal: ''     // INT NOT NULL
    };

    const validationSchema = Yup.object({
        fechaVenta: Yup.date().required('Es requerido'),
        subtotal: Yup.number().required('Es requerido').positive('Debe ser un número positivo'),
        iva: Yup.number().required('Es requerido').positive('Debe ser un número positivo'),
        total: Yup.number().required('Es requerido').positive('Debe ser un número positivo'),
        metPago: Yup.string().required('Es requerido'),
    });


    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // Generar un número aleatorio entre 1 y 1000
            const randomId = Math.floor(Math.random() * 1000) + 1;
            values.idVenta = randomId;
            values.idSucursal = 2;
            console.log(values);
            dispatch(agregarVenta(values))
                .then((response) => {
                    console.log(response);
                    if (!response.error) {
                        Swal.fire({
                            title: "Guardado Correcto",
                            text: "La venta se guardó correctamente",
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
                <h2>
                    Nueva Venta
                </h2>
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

export default GuardarVenta;
