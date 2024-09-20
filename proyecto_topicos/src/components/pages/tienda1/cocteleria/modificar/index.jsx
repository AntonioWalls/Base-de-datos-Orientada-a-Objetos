import { Form, Button, Col, Row, Container } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import * as Yup from 'yup';

// Importa las acciones relacionadas con sucursal
import { obtenerCocteleria, editarCocteleria } from '../../../../../redux/actions/actionCocteleriaA';
import InputField from '../../../../common/root/componentes/Input';

const ModificarCocteleria = ({ onCancel, idCoct }) => {
    const dispatch = useDispatch();
    const [coctel, setCocteleria] = useState(null);

    useEffect(() => {
        console.log('ID recibida:', idCoct); // Imprime la ID en consola
        if (idCoct) {
            dispatch(obtenerCocteleria(idCoct))
                .then((response) => {
                    console.log('Coctelería obtenida:', response.payload); // Imprime la coctelería obtenida en consola
                    const data = response.payload.response;

                    // Formatear los datos si es necesario
                    const formatData = (data) => ({
                        idCoct: data.idCoct || '',
                        nombre: data.nombre || '',
                        mezcla: data.mezcla || '',
                        descr: data.descr || '',
                        precVent: data.precVent || ''
                    });

                    setCocteleria(data);
                    formik.setValues(formatData(data));
                });
        }
    }, [dispatch, idCoct]);


    // Valores iniciales del formulario
    const initialValues = {
        idCoct: '', // ID de coctelería
        nombre: '', // Nombre
        mezcla: '', // Mezcla
        descr: '', // Descripción
        precVent: '' // Precio de venta
    };

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object({
            nombre: Yup.string().required('Es requerido'),
            mezcla: Yup.string().required('Es requerido'),
            descr: Yup.string().required('Es requerido'),
            precVent: Yup.number().required('Es requerido').positive('Debe ser un número positivo')
        }),
        onSubmit: (values) => {
            dispatch(editarCocteleria(values))
                .then((response) => {
                    if (!response.error) {
                        Swal.fire({
                            title: "Actualización Correcta",
                            text: "El coctel se actualizó correctamente",
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
                <h2>Editar Coctel</h2>
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

export default ModificarCocteleria;
