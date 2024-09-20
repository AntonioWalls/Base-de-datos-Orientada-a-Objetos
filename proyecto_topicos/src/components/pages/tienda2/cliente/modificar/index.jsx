import { Form, Button, Col, Row, Container } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import * as Yup from 'yup';

// Importa las acciones relacionadas con cliente y sucursal
import { obtenerCliente, editarCliente } from '../../../../../redux/actions/actionClienteB';
import { listarSucursal } from '../../../../../redux/actions/actionSucursalB';
import InputField from '../../../../common/root/componentes/Input';

const ModificarCliente = ({ onCancel, id_Cliente }) => {
    const dispatch = useDispatch();
    const [cliente, setCliente] = useState(null);
    const { sucursales = [] } = useSelector(state => state.listarSucursal || {});

    useEffect(() => {
        if (id_Cliente) {
            console.log("ID del cliente que se va a obtener:", id_Cliente);
            dispatch(obtenerCliente(id_Cliente))
    .then((response) => {
        console.log("Respuesta del cliente:", response);
        const data = response.payload.response;

        const formatFecha = (fecha) => {
            if (fecha) {
                const date = new Date(fecha);
                return date.toISOString().split('T')[0];
            }
            return '';
        };

        if (data) {
            setCliente(data);
            formik.setValues({
                idCliente: data.idCliente || 0,
                nomP: data.nomP || 'string',
                apP: data.apP || 'string',
                apM: data.apM || 'string',
                calle: data.calle || 'string',
                num: data.num || 0,
                col: data.col || 'string',
                ciudad: data.ciudad || 'string',
                estado: data.estado || 'string',
                pais: data.pais || 'string',
                cp: data.cp || 0,
                correo: data.correo || 'string',
                telefono: data.telefono || 'string',
                rfc: data.rfc || 'string',
                fechaReg: formatFecha(data.fechaReg),
                idSucursal: data.idSucursal || 1
            });
        } else {
            console.error("No se encontraron datos del cliente.");
        }
    });
        }

        dispatch(listarSucursal()); // Carga las sucursales disponibles
    }, [dispatch, id_Cliente]);

    const formik = useFormik({
        initialValues: {
            idCliente: 0,
            nomP: 'string',
            apP: 'string',
            apM: 'string',
            calle: 'string',
            num: 0,
            col: 'string',
            ciudad: 'string',
            estado: 'string',
            pais: 'string',
            cp: 0,
            correo: 'string',
            telefono: 'string',
            rfc: 'string',
            fechaReg: '2024-09-19T00:00:00',
            idSucursal: 0
        },
        validationSchema: Yup.object({
            nomP: Yup.string().max(30, 'Máximo 30 caracteres').required('Es requerido'),
            apP: Yup.string().max(30, 'Máximo 30 caracteres').required('Es requerido'),
            apM: Yup.string().max(30, 'Máximo 30 caracteres').required('Es requerido'),
            calle: Yup.string().max(50, 'Máximo 50 caracteres').required('Es requerido'),
            num: Yup.number().required('Es requerido').positive('Debe ser un número positivo'),
            col: Yup.string().max(50, 'Máximo 50 caracteres').required('Es requerido'),
            ciudad: Yup.string().max(30, 'Máximo 30 caracteres').required('Es requerido'),
            estado: Yup.string().max(30, 'Máximo 30 caracteres').required('Es requerido'),
            pais: Yup.string().max(30, 'Máximo 30 caracteres').required('Es requerido'),
            cp: Yup.number().required('Es requerido').positive('Debe ser un número positivo'),
            correo: Yup.string().email('Email inválido').max(50, 'Máximo 50 caracteres').required('Es requerido'),
            telefono: Yup.string().length(10, 'Debe tener 10 dígitos').required('Es requerido'),
            rfc: Yup.string().length(13, 'Debe tener 13 caracteres').required('Es requerido'),
            fechaReg: Yup.date().required('Es requerido')
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
        <Container className="d-flex justify-content-center">
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
                            controlId="correo"
                            label="Correo:"
                            type="email"
                            name="correo"
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
                            controlId="fechaReg"
                            label="Fecha de Registro:"
                            type="date"
                            name="fechaReg"
                            formik={formik}
                        />
                    </Col>

                    {/* Campo para mostrar la sucursal sin permitir cambios */}
                    <Col md={12}>
                        <Form.Group controlId="idSucursal">
                            <Form.Label>Sucursal:</Form.Label>
                            <Form.Control
                                as="select"
                                name="idSucursal"
                                value={formik.values.idSucursal}
                                onChange={formik.handleChange}
                                disabled // Deshabilita el campo para evitar cambios
                            >
                                {sucursales.map((sucursal) => (
                                    <option key={sucursal.id} value={sucursal.id}>
                                        {sucursal.raz_soc}
                                    </option>
                                ))}
                            </Form.Control>
                            {formik.errors.idSucursal && formik.touched.idSucursal ? (
                                <div className="text-danger">{formik.errors.idSucursal}</div>
                            ) : null}
                        </Form.Group>
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
