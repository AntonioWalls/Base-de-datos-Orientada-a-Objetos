import { Form, Button, Col, Row, Container } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import * as Yup from 'yup';

// Importa las acciones relacionadas con sucursal
import { obtenerSucursal, editarSucursal } from '../../../../../redux/actions/actionSucursalB';
import InputField from '../../../../common/root/componentes/Input';

const ModificarSucursal = ({ onCancel, idSucursal }) => {
    const dispatch = useDispatch();
    const [sucursal, setSucursal] = useState(null);

    useEffect(() => {
        console.log('ID recibida:', idSucursal); // Imprime la ID en consola
        if (idSucursal) {
            dispatch(obtenerSucursal(idSucursal))
                .then((response) => {
                    console.log('Sucursal obtenida:', response.payload); // Imprime la sucursal obtenida en consola
                    const data = response.payload.response;
                    
                    // Formatear la fecha a 'YYYY-MM-DD' si no es nulo
                    const formatFecha = (fecha) => {
                        if (fecha) {
                            const date = new Date(fecha);
                            return date.toISOString().split('T')[0];
                        }
                        return '';
                    };

                    setSucursal(data);
                    formik.setValues({
                        idSucursal: data.idSucursal || '',
                        razSoc: data.razSoc || '',
                        calle: data.calle || '',
                        num: data.num || '',
                        col: data.col || '',
                        ciudad: data.ciudad || '',
                        estado: data.estado || '',
                        pais: data.pais || '',
                        cp: data.cp || '',
                        presup: data.presup || '',
                        telefonoSuc: data.telefonoSuc || '',
                        rfc: data.rfc || '',
                        correo: data.correo || '',
                        fechaAp: formatFecha(data.fechaAp)
                    });
                });
        }
    }, [dispatch, idSucursal]);

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

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object({
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
        }),
        onSubmit: (values) => {
            dispatch(editarSucursal(values))
                .then((response) => {
                    if (!response.error) {
                        Swal.fire({
                            title: "Actualización Correcta",
                            text: "La sucursal se actualizó correctamente",
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
                <h2>Editar Sucursal</h2>
                <Form onSubmit={formik.handleSubmit}>
                    {/* Campos del formulario */}
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

export default ModificarSucursal;
