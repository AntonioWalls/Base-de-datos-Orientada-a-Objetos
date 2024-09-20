import { Form, Button, Col, Row, Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import React from 'react';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import * as Yup from 'yup';

import InputField from '../../../../common/root/componentes/Input';
import { agregarCocteleria } from '../../../../../redux/actions/actionCocteleriaA';

const GuardarCocteleria = ({ onCancel }) => {
    const dispatch = useDispatch();

    // Valores iniciales del formulario
    const initialValues = {
        idCoct: '', // ID de coctelería
        nombre: '', // Nombre
        mezcla: '', // Mezcla
        descr: '', // Descripción
        precVent: '' // Precio de venta
    };

    const validationSchema = Yup.object({
        nombre: Yup.string().required('Es requerido'),
        mezcla: Yup.string().required('Es requerido'),
        descr: Yup.string().required('Es requerido'),
        precVent: Yup.number().required('Es requerido').positive('Debe ser un número positivo')
    });


    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // Generar un número aleatorio entre 1 y 1000
            const randomId = Math.floor(Math.random() * 1000) + 1;
            values.idCoct = randomId;
            console.log(values);
            dispatch(agregarCocteleria(values))
                .then((response) => {
                    console.log(response);
                    if (!response.error) {
                        Swal.fire({
                            title: "Guardado Correcto",
                            text: "El coctel se guardó correctamente",
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
                    Nuevo coctel
                </h2>
                <Form onSubmit={formik.handleSubmit}>

                    <Col md={12}>
                        <InputField
                            controlId="nombre"
                            label="Nombre:"
                            type="text"
                            name="nombre"
                            formik={formik}
                        />
                    </Col>

                    <Col md={12}>
                        <InputField
                            controlId="mezcla"
                            label="Mezcla:"
                            type="text"
                            name="mezcla"
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
                            controlId="precVent"
                            label="Precio de Venta:"
                            type="number"
                            name="precVent"
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

export default GuardarCocteleria;
