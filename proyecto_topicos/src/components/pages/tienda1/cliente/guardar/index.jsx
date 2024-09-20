import { Form, Button, Col, Row, Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import React from 'react';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import * as Yup from 'yup';

import { agregarCliente } from '../../../../../redux/actions/actionClienteA';
import InputField from '../../../../common/root/componentes/Input';

const GuardarCliente = ({ onCancel }) => {
    const dispatch = useDispatch();

    // Valores iniciales del formulario
    const initialValues = {
        idCliente: '',
        nomP: '',
        apP: '',
        apM: '',
        calle: '',
        num: '',
        col: '',
        ciudad: '',
        estado: '',
        cp: '',
        correo: '',
        telefono: '',
        rfc: '',
        fechaReg: '',
        idSucursal: '',
    };

    const validationSchema = Yup.object({
        nomP: Yup.string().required('Es requerido'),
        apP: Yup.string().required('Es requerido'),
        apM: Yup.string().required('Es requerido'),
        calle: Yup.string().required('Es requerido'),
        num: Yup.number().required('Es requerido').positive('Debe ser un número positivo'),
        col: Yup.string().required('Es requerido'),
        ciudad: Yup.string().required('Es requerido'),
        estado: Yup.string().required('Es requerido'),
        pais: Yup.string().required('Es requerido'),
        cp: Yup.number().required('Es requerido').positive('Debe ser un número positivo'),
        correo: Yup.string().email('Email inválido').required('Es requerido'),
        telefono: Yup.string().required('Es requerido'),
        rfc: Yup.string().required('Es requerido'),
        fechaReg: Yup.date().required('Es requerido'),
    });

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // Generar un número aleatorio entre 1 y 1000
            const randomId = Math.floor(Math.random() * 1000) + 1;
            values.idCliente = randomId;
            values.idSucursal = 2;
            console.log(values);
            dispatch(agregarCliente(values))
                .then((response) => {
                    console.log(response);
                    if (!response.error) {
                        Swal.fire({
                            title: "Guardado Correcto",
                            text: "El cliente se guardó correctamente",
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
                    Nuevo Cliente
                </h2>
                <Form onSubmit={formik.handleSubmit}>
                    <Col md={12}>
                        <InputField
                            controlId="nomP"
                            label="Nombre:"
                            type="text"
                            name="nomP"
                            formik={formik}
                        />
                    </Col>

                    <Col md={12}>
                        <InputField
                            controlId="apP"
                            label="Apellido Paterno:"
                            type="text"
                            name="apP"
                            formik={formik}
                        />
                    </Col>

                    <Col md={12}>
                        <InputField
                            controlId="apM"
                            label="Apellido Materno:"
                            type="text"
                            name="apM"
                            formik={formik}
                        />
                    </Col>

                    <Col md={12}>
                        <InputField
                            controlId="calle"
                            label="Calle:"
                            type="text"
                            name="calle"
                            formik={formik}
                        />
                    </Col>

                    <Col md={12}>
                        <InputField
                            controlId="num"
                            label="Número:"
                            type="number"
                            name="num"
                            formik={formik}
                        />
                    </Col>

                    <Col md={12}>
                        <InputField
                            controlId="col"
                            label="Colonia:"
                            type="text"
                            name="col"
                            formik={formik}
                        />
                    </Col>

                    <Col md={12}>
                        <InputField
                            controlId="ciudad"
                            label="Ciudad:"
                            type="text"
                            name="ciudad"
                            formik={formik}
                        />
                    </Col>

                    <Col md={12}>
                        <InputField
                            controlId="estado"
                            label="Estado:"
                            type="text"
                            name="estado"
                            formik={formik}
                        />
                    </Col>

                    <Col md={12}>
                        <InputField
                            controlId="pais"
                            label="País:"
                            type="text"
                            name="pais"
                            formik={formik}
                        />
                    </Col>

                    <Col md={12}>
                        <InputField
                            controlId="cp"
                            label="Código Postal:"
                            type="number"
                            name="cp"
                            formik={formik}
                        />
                    </Col>

                    <Col md={12}>
                        <InputField
                            controlId="telefono"
                            label="Teléfono:"
                            type="text"
                            name="telefono"
                            formik={formik}
                        />
                    </Col>

                    <Col md={12}>
                        <InputField
                            controlId="rfc"
                            label="RFC:"
                            type="text"
                            name="rfc"
                            formik={formik}
                        />
                    </Col>

                    <Col md={12}>
                        <InputField
                            controlId="correo"
                            label="Correo:"
                            type="email"
                            name="correo"
                            formik={formik}
                        />
                    </Col>

                    <Col md={12}>
                        <InputField
                            controlId="fechaReg"
                            label="Fecha de Registro:"
                            type="date"
                            name="fechaReg"
                            formik={formik}
                        />
                    </Col>

                    <Col md={12} style={{ paddingTop: "10px" }}>
                        <div className="mt-3 d-flex justify-content-end">
                            <Button
                                className='mx-3'
                                variant="danger"
                                onClick={handleCancel}>
                                Cancelar
                            </Button>
                            <Button
                                className=''
                                variant="primary"
                                type="submit">
                                Guardar
                            </Button>
                        </div>
                    </Col>
                </Form>

            </Row>
        </Container>
    );
};

export default GuardarCliente;
