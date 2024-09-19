import { Form, Button, Col, Row, Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import React from 'react';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import * as Yup from 'yup';

import InputField from '../../../../common/root/componentes/Input';
import { agregarProducto } from '../../../../../redux/actions/actionProductoB';

const GuardarProducto = ({ onCancel }) => {
    const dispatch = useDispatch();

    // Valores iniciales del formulario
    const initialValues = {
        id_prod: '',
        cod_barra: '',
        prec_com: '',
        prec_ven: '',
        cant_v: '',
        descr: '',
        cant_ml: '',
        stock_min: '',
        stock_max: '',
    };

    const validationSchema = Yup.object({
        cod_barra: Yup.number().required('Es requerido'),
        prec_com: Yup.number().required('Es requerido').positive('Debe ser un número positivo'),
        prec_ven: Yup.number().required('Es requerido').positive('Debe ser un número positivo'),
        cant_v: Yup.number().required('Es requerido').integer('Debe ser un número entero'),
        descr: Yup.string().required('Es requerido').max(250, 'Debe tener como máximo 250 caracteres'),
        cant_ml: Yup.number().required('Es requerido').integer('Debe ser un número entero'),
        stock_min: Yup.number().required('Es requerido').integer('Debe ser un número entero'),
        stock_max: Yup.number().required('Es requerido').integer('Debe ser un número entero'),
    });

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // Generar un número aleatorio entre 1 y 1000
            const randomId = Math.floor(Math.random() * 1000) + 1;
            values.id_prod = randomId;
            console.log(values);
            dispatch(agregarProducto(values))
                .then((response) => {
                    console.log(response);
                    if (!response.error) {
                        Swal.fire({
                            title: "Guardado Correcto",
                            text: "El producto se guardó correctamente",
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
                    Nuevo Producto
                </h2>
                <Form onSubmit={formik.handleSubmit}>
                    <Col md={12}>
                        <InputField
                            controlId="cod_barra"
                            label="Código de Barras:"
                            type="number"
                            name="cod_barra"
                            formik={formik}
                        />
                    </Col>

                    <Col md={12}>
                        <InputField
                            controlId="prec_com"
                            label="Precio de Compra:"
                            type="number"
                            name="prec_com"
                            formik={formik}
                        />
                    </Col>

                    <Col md={12}>
                        <InputField
                            controlId="prec_ven"
                            label="Precio de Venta:"
                            type="number"
                            name="prec_ven"
                            formik={formik}
                        />
                    </Col>

                    <Col md={12}>
                        <InputField
                            controlId="cant_v"
                            label="Cantidad Vendida:"
                            type="number"
                            name="cant_v"
                            formik={formik}
                        />
                    </Col>

                    <Col md={12}>
                        <InputField
                            controlId="descr"
                            label="Descripción:"
                            type="text"
                            name="descr"
                            formik={formik}
                        />
                    </Col>

                    <Col md={12}>
                        <InputField
                            controlId="cant_ml"
                            label="Cantidad en Mililitros:"
                            type="number"
                            name="cant_ml"
                            formik={formik}
                        />
                    </Col>

                    <Col md={12}>
                        <InputField
                            controlId="stock_min"
                            label="Stock Mínimo:"
                            type="number"
                            name="stock_min"
                            formik={formik}
                        />
                    </Col>

                    <Col md={12}>
                        <InputField
                            controlId="stock_max"
                            label="Stock Máximo:"
                            type="number"
                            name="stock_max"
                            formik={formik}
                        />
                    </Col>

                    <Col md={12} style={{ paddingTop: "10px" }}>
                        <div className="mt-3 d-flex justify-content-end">
                            <Button className="mx-3" variant="danger" onClick={handleCancel}>
                                Cancelar
                            </Button>
                            <Button variant="primary" type="submit">
                                Guardar
                            </Button>
                        </div>
                    </Col>
                </Form>
            </Row>
        </Container>
    );
};

export default GuardarProducto;
