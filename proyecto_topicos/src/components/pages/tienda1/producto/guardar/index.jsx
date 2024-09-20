import { Form, Button, Col, Row, Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import React from 'react';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import * as Yup from 'yup';

import InputField from '../../../../common/root/componentes/Input';
import { agregarProducto } from '../../../../../redux/actions/actionProductoA';

const GuardarProducto = ({ onCancel }) => {
    const dispatch = useDispatch();

    // Valores iniciales del formulario
    const initialValues = {
        idProd: '',
        codBarra: '',
        precCom: '',
        precVen: '',
        cantV: '',
        descr: '',
        cantMl: '',
        stockMin: '',
        stockMax: '',
        idCat: '2',  // Cambiado a idCat
        idSubcat: '3' // Cambiado a idSubcat
    };

    const validationSchema = Yup.object({
        codBarra: Yup.number().required('Es requerido'),
        precCom: Yup.number().required('Es requerido').positive('Debe ser un número positivo'),
        precVen: Yup.number().required('Es requerido').positive('Debe ser un número positivo'),
        cantV: Yup.number().required('Es requerido').integer('Debe ser un número entero'), // Cambio en CantV
        descr: Yup.string().required('Es requerido').max(250, 'Debe tener como máximo 250 caracteres'),
        cantMl: Yup.number().required('Es requerido').integer('Debe ser un número entero'),
        stockMin: Yup.number().required('Es requerido').integer('Debe ser un número entero'), // Cambio en stockMin
        stockMax: Yup.number().required('Es requerido').integer('Debe ser un número entero'),
    });

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // Generar un número aleatorio entre 1 y 1000
            const randomId = Math.floor(Math.random() * 1000) + 1;
            values.idProd = randomId;
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
                            controlId="codBarra"
                            label="Código de Barras:"
                            type="number"
                            name="codBarra"
                            formik={formik}
                        />
                    </Col>

                    <Col md={12}>
                        <InputField
                            controlId="precCom"
                            label="Precio de Compra:"
                            type="number"
                            name="precCom"
                            formik={formik}
                        />
                    </Col>

                    <Col md={12}>
                        <InputField
                            controlId="precVen"
                            label="Precio de Venta:"
                            type="number"
                            name="precVen"
                            formik={formik}
                        />
                    </Col>

                    <Col md={12}>
                        <InputField
                            controlId="cantV"
                            label="Cantidad Vendida:"
                            type="number"
                            name="cantV"
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
                            controlId="cantMl"
                            label="Cantidad en Mililitros:"
                            type="number"
                            name="cantMl"
                            formik={formik}
                        />
                    </Col>

                    <Col md={12}>
                        <InputField
                            controlId="stockMin"
                            label="Stock Mínimo:"
                            type="number"
                            name="stockMin"
                            formik={formik}
                        />
                    </Col>

                    <Col md={12}>
                        <InputField
                            controlId="stockMax"
                            label="Stock Máximo:"
                            type="number"
                            name="stockMax"
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
