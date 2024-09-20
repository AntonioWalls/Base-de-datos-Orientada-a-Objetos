import { Form, Button, Col, Row, Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import React, { useEffect } from 'react'; // Importa useEffect junto con React
import { useSelector } from 'react-redux'; // Importa useSelector para acceder al estado
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import * as Yup from 'yup';

import { agregarCliente } from '../../../../../redux/actions/actionClienteB';
import { listarSucursal } from '../../../../../redux/actions/actionSucursalB';
import InputField from '../../../../common/root/componentes/Input';

const GuardarCliente = ({ onCancel }) => {
    const dispatch = useDispatch();
    const { sucursales } = useSelector(state => state.listarSucursal);

    // Valores iniciales del formulario
    const initialValues = {
        idCliente: '',    // INT NOT NULL
        nomP: '',         // VARCHAR(30)
        apP: '',          // VARCHAR(30)
        apM: '',          // VARCHAR(30)
        calle: '',        // VARCHAR(50)
        num: '',          // INT
        col: '',          // VARCHAR(50)
        ciudad: '',       // VARCHAR(30)
        estado: '',       // VARCHAR(30)
        pais: '',         // VARCHAR(30)
        cp: '',           // INT
        correo: '',       // VARCHAR(50)
        telefono: '',     // VARCHAR(10)
        rfc: '',          // VARCHAR(13)
        fechaReg: '',     // DATE
        idSucursal: 2     // Fijo a 2
    };

    useEffect(() => {
        dispatch(listarSucursal());
    }, [dispatch]);

    const validationSchema = Yup.object({
        idCliente: Yup.number().required('Es requerido'),  // INT NOT NULL
        nomP: Yup.string().max(30, 'Máximo 30 caracteres').required('Es requerido'),  // VARCHAR(30)
        apP: Yup.string().max(30, 'Máximo 30 caracteres').required('Es requerido'),   // VARCHAR(30)
        apM: Yup.string().max(30, 'Máximo 30 caracteres').required('Es requerido'),   // VARCHAR(30)
        calle: Yup.string().max(50, 'Máximo 50 caracteres').required('Es requerido'),  // VARCHAR(50)
        num: Yup.number().required('Es requerido').positive('Debe ser un número positivo'),  // INT
        col: Yup.string().max(50, 'Máximo 50 caracteres').required('Es requerido'),    // VARCHAR(50)
        ciudad: Yup.string().max(30, 'Máximo 30 caracteres').required('Es requerido'), // VARCHAR(30)
        estado: Yup.string().max(30, 'Máximo 30 caracteres').required('Es requerido'), // VARCHAR(30)
        pais: Yup.string().max(30, 'Máximo 30 caracteres').required('Es requerido'),   // VARCHAR(30)
        cp: Yup.number().required('Es requerido').positive('Debe ser un número positivo'),  // INT
        correo: Yup.string().email('Email inválido').max(50, 'Máximo 50 caracteres').required('Es requerido'), // VARCHAR(50)
        telefono: Yup.string().length(10, 'Debe tener 10 dígitos').required('Es requerido'), // VARCHAR(10)
        rfc: Yup.string().length(13, 'Debe tener 13 caracteres').required('Es requerido'),   // VARCHAR(13)
        fechaReg: Yup.date().required('Es requerido') // DATE
    });

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // Generar un número aleatorio entre 1 y 1000
            const randomId = Math.floor(Math.random() * 1000) + 1;
            values.idCliente = randomId;
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
        <Container className="d-flex justify-content-center">
            <Row>
                <h2>Nuevo Cliente</h2>
                <Form onSubmit={formik.handleSubmit}>
                    {/* Campos de cliente */}
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

                    {/* Campo para seleccionar la sucursal */}
                    <Col md={12}>
                        <Form.Group controlId="id_sucursal">
                            <Form.Label>Sucursal:</Form.Label>
                            <Form.Control
                                as="select"
                                name="id_sucursal"
                                value={formik.values.id_sucursal}
                                onChange={(e) => {
                                    formik.setFieldValue('id_sucursal', 2); // Forzar el valor de id_sucursal a 2
                                }}
                            >
                                <option value="">Selecciona una sucursal</option>
                                {sucursales.map((sucursal) => (
                                    <option key={sucursal.id} value={sucursal.id}>
                                        {sucursal.raz_soc}
                                    </option>
                                ))}
                            </Form.Control>
                            {formik.errors.id_sucursal && formik.touched.id_sucursal ? (
                                <div className="text-danger">{formik.errors.id_sucursal}</div>
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

export default GuardarCliente;
