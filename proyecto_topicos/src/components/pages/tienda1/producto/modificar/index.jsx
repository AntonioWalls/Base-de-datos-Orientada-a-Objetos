import { Form, Button, Col, Row, Container } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import * as Yup from 'yup';

// Importa las acciones relacionadas con productos
import { obtenerProducto, editarProducto } from '../../../../../redux/actions/actionProductoA';
import InputField from '../../../../common/root/componentes/Input';

const ModificarProducto = ({ onCancel, idProducto }) => {
    const dispatch = useDispatch();
    const [producto, setProducto] = useState(null);

    useEffect(() => {
        console.log('ID recibida:', idProducto); // Imprime la ID en consola
        if (idProducto) {
            dispatch(obtenerProducto(idProducto))
                .then((response) => {
                    console.log('Producto obtenido:', response.payload); // Imprime el producto obtenido en consola
                    const data = response.payload.response;

                    setProducto(data);
                    formik.setValues({
                        codBarra: data.codBarra || '',
                        precCom: data.precCom || '',
                        precVen: data.precVen || '',
                        cantV: data.cantV || '',
                        descr: data.descr || '',
                        cantMl: data.cantMl || '',
                        stockMin: data.stockMin || '',
                        stockMax: data.stockMax || ''
                    });
                });
        }
    }, [dispatch, idProducto]);

    const initialValues = {
        idProd: '',
        codBarra: '',
        precCom: '',
        precVen: '',
        cantV: '',
        descr: '',
        cantMl: '',
        stockMin: '',
        stockMax: ''
    };

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object({
            codBarra: Yup.number().required('Es requerido'),
            precCom: Yup.number().required('Es requerido').positive('Debe ser un número positivo'),
            precVen: Yup.number().required('Es requerido').positive('Debe ser un número positivo'),
            cantV: Yup.number().required('Es requerido').integer('Debe ser un número entero'),
            descr: Yup.string().required('Es requerido').max(250, 'Debe tener como máximo 250 caracteres'),
            cantMl: Yup.number().required('Es requerido').integer('Debe ser un número entero'),
            stockMin: Yup.number().required('Es requerido').integer('Debe ser un número entero'),
            stockMax: Yup.number().required('Es requerido').integer('Debe ser un número entero'),
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

export default ModificarProducto;
