import { Form, Button, Col, Row, Container } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import * as Yup from 'yup';

// Importa las acciones relacionadas con sucursal
import { obtenerProducto, editarProducto } from '../../../../../redux/actions/actionProductoB';
import InputField from '../../../../common/root/componentes/Input';

const ModificarProducto = ({ onCancel, idProducto }) => {
    const dispatch = useDispatch();
    const [producto, setProducto] = useState(null);

    useEffect(() => {
        console.log('ID recibida:', idProducto); // Imprime la ID en consola
        if (idProducto) {
            dispatch(obtenerProducto(idProducto))
                .then((response) => {
                    console.log('Producto obtenida:', response.payload); // Imprime la sucursal obtenida en consola
                    const data = response.payload.response;

                    setProducto(data);
                    formik.setValues({
                        cod_barra: data.cod_barra || '',
                        prec_com: data.prec_com || '',
                        prec_ven: data.prec_ven || '',
                        cant_v: data.cant_v || '',
                        descr: data.descr || '',
                        cant_ml: data.cant_ml || '',
                        stock_min: data.stock_min || '',
                        stock_max: data.stock_max || '',
                    });
                });
        }
    }, [dispatch, idProducto]);

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

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object({
            cod_barra: Yup.number().required('Es requerido'),
            prec_com: Yup.number().required('Es requerido').positive('Debe ser un número positivo'),
            prec_ven: Yup.number().required('Es requerido').positive('Debe ser un número positivo'),
            cant_v: Yup.number().required('Es requerido').integer('Debe ser un número entero'),
            descr: Yup.string().required('Es requerido').max(250, 'Debe tener como máximo 250 caracteres'),
            cant_ml: Yup.number().required('Es requerido').integer('Debe ser un número entero'),
            stock_min: Yup.number().required('Es requerido').integer('Debe ser un número entero'),
            stock_max: Yup.number().required('Es requerido').integer('Debe ser un número entero'),
        }),
        onSubmit: (values) => {
            dispatch(editarProducto(values))
                .then((response) => {
                    if (!response.error) {
                        Swal.fire({
                            title: "Actualización Correcta",
                            text: "El producto se actualizó correctamente",
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
                <h2>Editar Producto</h2>
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

export default ModificarProducto;
