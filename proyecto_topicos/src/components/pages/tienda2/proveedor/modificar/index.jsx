import { Form, Button, Col, Row, Container } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import * as Yup from 'yup';

// Importa las acciones relacionadas con sucursal
import { obtenerProveedor, editarProveedor } from '../../../../../redux/actions/actionProveedorB';
import InputField from '../../../../common/root/componentes/Input';

const ModificarProveedor = ({ onCancel, idProveedor }) => {
    const dispatch = useDispatch();
    const [proveedor, setProveedor] = useState(null);

    useEffect(() => {
        console.log('ID recibida:', idProveedor); // Imprime la ID del proveedor en consola
        if (idProveedor) {
            dispatch(obtenerProveedor(idProveedor))
                .then((response) => {
                    console.log('Proveedor obtenido:', response.payload); // Imprime el proveedor obtenido en consola
                    const data = response.payload.response;

                    setProveedor(data);
                    formik.setValues({
                        idProv: data.idProv || '',
                        razSoc: data.razSoc || '',
                        calle: data.calle || '',
                        num: data.num || '',
                        col: data.col || '',
                        ciudad: data.ciudad || '',
                        estado: data.estado || '',
                        pais: data.pais || '',
                        cp: data.cp || '',
                        telProv: data.telProv || '',
                        rfc: data.rfc || '',
                        correoProv: data.correoProv || ''
                    });
                });
        }
    }, [dispatch, idProveedor]);

    const initialValues = {
        idProv: '',         // Nuevo campo
        razSoc: '',
        rfc: '',
        calle: '',
        num: '',
        col: '',
        ciudad: '',
        estado: '',
        pais: '',
        cp: '',
        telProv: '',        // Nuevo campo
        correoProv: '',     // Nuevo campo
    };

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object({
            razSoc: Yup.string().required('Es requerido'),
            rfc: Yup.string().required('Es requerido').length(13, 'El RFC debe tener 13 caracteres'),
            calle: Yup.string().required('Es requerido'),
            num: Yup.number().required('Es requerido').positive('Debe ser un número positivo'),
            col: Yup.string().required('Es requerido'),
            ciudad: Yup.string().required('Es requerido'),
            estado: Yup.string().required('Es requerido'),
            pais: Yup.string().required('Es requerido'),
            cp: Yup.number().required('Es requerido').positive('Debe ser un número positivo'),
            telProv: Yup.string().required('Es requerido').length(10, 'El teléfono debe tener 10 dígitos'),
            correoProv: Yup.string().email('Email inválido').required('Es requerido'),
        }),
        onSubmit: (values) => {
            dispatch(editarProveedor(values))
                .then((response) => {
                    if (!response.error) {
                        Swal.fire({
                            title: "Actualización Correcta",
                            text: "El proveedor se actualizó correctamente",
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
                <h2>Editar Proveedor</h2>
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
                            controlId="rfc"
                            label="RFC:"
                            type="text"
                            name="rfc"
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
                            controlId="telProv"
                            label="Teléfono:"
                            type="text"
                            name="telProv"
                            formik={formik}
                        />
                    </Col>

                    <Col md={12}>
                        <InputField
                            controlId="correoProv"
                            label="Correo:"
                            type="email"
                            name="correoProv"
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

export default ModificarProveedor;
