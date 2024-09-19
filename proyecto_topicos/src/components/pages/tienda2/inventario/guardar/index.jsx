import { Form, Button, Col, Row, Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import React from 'react';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import * as Yup from 'yup';

import { agregarSucursal } from '../../../../../redux/actions/actionSucursalB';
import InputField from '../../../../common/root/componentes/Input';

const GuardarSucursal = ({ onCancel }) => {
    const dispatch = useDispatch();

    // Valores iniciales del formulario
    const initialValues = {
        idSucursal: '',
        razSoc: '',
        calle: '',
        num: '',
        col: '',
        ciudad: '',
        estado: '',
        pais: '',
        cp: '',
        presup: '',
        telefonoSuc: '',
        rfc: '',
        correo: '',
        fechaAp: ''
    };

    const validationSchema = Yup.object({
        razSoc: Yup.string().required('Es requerido'),
            calle: Yup.string().required('Es requerido'),
            num: Yup.string().required('Es requerido'),
            col: Yup.string().required('Es requerido'),
            ciudad: Yup.string().required('Es requerido'),
            estado: Yup.string().required('Es requerido'),
            pais: Yup.string().required('Es requerido'),
            cp: Yup.string().required('Es requerido'),
            presup: Yup.number().required('Es requerido').positive('Debe ser un número positivo'),
            telefonoSuc: Yup.string().required('Es requerido'),
            rfc: Yup.string().required('Es requerido'),
            correo: Yup.string().email('Email inválido').required('Es requerido'),
            fechaAp: Yup.date().required('Es requerido')
    });

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // Generar un número aleatorio entre 1 y 1000
            const randomId = Math.floor(Math.random() * 1000) + 1;
            values.idSucursal = randomId;
            console.log(values);
            dispatch(agregarSucursal(values))
                .then((response) => {
                    console.log(response);
                    if (!response.error) {
                        Swal.fire({
                            title: "Guardado Correcto",
                            text: "La sucursal se guardó correctamente",
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
                    Nueva Sucursal
                </h2>
                <Form onSubmit={formik.handleSubmit}>
                <Col md={12}>
                        <InputField
                            controlId="razSoc"
                            label="Razón Social:"
                            type="text"
                            name="razSoc"
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
                            type="text"
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
                            type="text"
                            name="cp"
                            formik={formik}
                        />
                    </Col>

                    <Col md={12}>
                        <InputField
                            controlId="presup"
                            label="Presupuesto:"
                            type="number"
                            name="presup"
                            formik={formik}
                        />
                    </Col>

                    <Col md={12}>
                        <InputField
                            controlId="telefonoSuc"
                            label="Teléfono:"
                            type="text"
                            name="telefonoSuc"
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
                            controlId="fechaAp"
                            label="Fecha de Apertura:"
                            type="date"
                            name="fechaAp"
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

export default GuardarSucursal;
