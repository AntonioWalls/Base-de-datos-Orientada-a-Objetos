import { Form, Button, Col, Row, Container } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import * as Yup from 'yup';

// Importa las acciones relacionadas con sucursal
import { obtenerCliente, editarCliente } from '../../../../../redux/actions/actionClienteB';
import InputField from '../../../../common/root/componentes/Input';

const ModificarCliente = ({ onCancel, idCliente }) => {
    const dispatch = useDispatch();
    const [cliente, setCliente] = useState(null);

    useEffect(() => {
        console.log('ID recibida:', idCliente); // Imprime la ID en consola
        if (idCliente) {
            dispatch(obtenerCliente(idCliente))
                .then((response) => {
                    console.log('Cliente obtenida:', response.payload); // Imprime la sucursal obtenida en consola
                    const data = response.payload.response;

                    // Formatear la fecha a 'YYYY-MM-DD' si no es nulo
                    const formatFecha = (fecha) => {
                        if (fecha) {
                            const date = new Date(fecha);
                            return date.toISOString().split('T')[0];
                        }
                        return '';
                    };

                    setCliente(data);
                    formik.setValues({
                        idCliente: data.idCliente || '',
                        nomP: data.nomP || '',
                        apP: data.apP || '',
                        apM: data.apM || '',
                        calle: data.calle || '',
                        num: data.num || '',
                        col: data.col || '',
                        ciudad: data.ciudad || '',
                        estado: data.estado || '',
                        pais: data.pais || '',
                        cp: data.cp || '',
                        correo: data.correo || '',
                        telefono: data.telefono || '',
                        rfc: data.rfc || '',
                        fechaReg: formatFecha(data.fechaReg),
                        idSucursal: data.idSucursal || '',
                    });
                });
        }
    }, [dispatch, idCliente]);

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

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object({
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
        }),
        onSubmit: (values) => {
            dispatch(editarCliente(values))
                .then((response) => {
                    if (!response.error) {
                        Swal.fire({
                            title: "Actualización Correcta",
                            text: "El cliente se actualizó correctamente",
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
                <h2>Editar Cliente</h2>
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

export default ModificarCliente;
