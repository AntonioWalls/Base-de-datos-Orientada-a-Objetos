import { Form, Button, Col, Row, Container } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import * as Yup from 'yup';

// Importa las acciones relacionadas con empleados y sucursales
import { obtenerEmpleado, editarEmpleado } from '../../../../../redux/actions/actionEmpleadoB';
import { obtenerSucursal } from '../../../../../redux/actions/actionSucursalB';
import InputField from '../../../../common/root/componentes/Input';

const ModificarEmpleado = ({ onCancel, idEmpleado }) => {
    const dispatch = useDispatch();
    const [empleado, setEmpleado] = useState(null);
    const [sucursales, setSucursales] = useState([]);

    // Obtener sucursales del estado
    const sucursalesState = useSelector((state) => state.sucursales); // Asegúrate de que 'sucursales' esté en el estado

    useEffect(() => {
        if (idEmpleado) {
            dispatch(obtenerEmpleado(idEmpleado))
                .then((response) => {
                    const data = response.payload.response;
                    setEmpleado(data);
                    formik.setValues({
                        idEmpleado: data.idEmpleado || '',
                        nom_p: data.nom_p || '',
                        ap_p: data.ap_p || '',
                        ap_m: data.ap_m || '',
                        calle: data.calle || '',
                        num: data.num || '',
                        col: data.col || '',
                        ciudad: data.ciudad || '',
                        estado: data.estado || '',
                        pais: data.pais || '',
                        cp: data.cp || '',
                        tel_emp: data.tel_emp || '',
                        correo_emp: data.correo_emp || '',
                        curp: data.curp || '',
                        rfc: data.rfc || '',
                        nss: data.nss || '',
                        fecha_alta: data.fecha_alta ? new Date(data.fecha_alta).toISOString().split('T')[0] : '',
                        emp_status: data.emp_status || '',
                        puesto: data.puesto || '',
                        sueldo: data.sueldo || '',
                        id_sucursal: data.id_sucursal || ''
                    });
                });
        }
    }, [dispatch, idEmpleado]);

    useEffect(() => {
        // Cargar las sucursales cuando el componente se monta
        dispatch(obtenerSucursal())
            .then((response) => {
                setSucursales(response.payload.response || []);
            });
    }, [dispatch]);

    const initialValues = {
        idEmpleado: '',
        nom_p: '',
        ap_p: '',
        ap_m: '',
        calle: '',
        num: '',
        col: '',
        ciudad: '',
        estado: '',
        pais: '',
        cp: '',
        tel_emp: '',
        correo_emp: '',
        curp: '',
        rfc: '',
        nss: '',
        fecha_alta: '',
        emp_status: '',
        puesto: '',
        sueldo: '',
        id_sucursal: ''
    };

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object({
            nom_p: Yup.string().required('Es requerido'),
            ap_p: Yup.string().required('Es requerido'),
            ap_m: Yup.string().required('Es requerido'),
            calle: Yup.string().required('Es requerido'),
            num: Yup.number().required('Es requerido').positive('Debe ser un número positivo'),
            col: Yup.string().required('Es requerido'),
            ciudad: Yup.string().required('Es requerido'),
            estado: Yup.string().required('Es requerido'),
            pais: Yup.string().required('Es requerido'),
            cp: Yup.number().required('Es requerido').positive('Debe ser un número positivo'),
            tel_emp: Yup.string().required('Es requerido'),
            correo_emp: Yup.string().email('Email inválido').required('Es requerido'),
            curp: Yup.string().required('Es requerido'),
            rfc: Yup.string().required('Es requerido'),
            nss: Yup.string().required('Es requerido'),
            fecha_alta: Yup.date().required('Es requerido'),
            emp_status: Yup.string().required('Es requerido'),
            puesto: Yup.string().required('Es requerido'),
            sueldo: Yup.number().required('Es requerido').positive('Debe ser un número positivo'),
            id_sucursal: Yup.number().required('Es requerido')
        }),
        onSubmit: (values) => {
            dispatch(editarEmpleado(values))
                .then((response) => {
                    if (!response.error) {
                        Swal.fire({
                            title: "Actualización Correcta",
                            text: "El empleado se actualizó correctamente",
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
                <h2>Editar Empleado</h2>
                <Form onSubmit={formik.handleSubmit}>
                    <Col md={12}>
                        <InputField
                            controlId="nom_p"
                            label="Nombre:"
                            type="text"
                            name="nom_p"
                            formik={formik}
                        />
                    </Col>

                    <Col md={12}>
                        <InputField
                            controlId="ap_p"
                            label="Apellido Paterno:"
                            type="text"
                            name="ap_p"
                            formik={formik}
                        />
                    </Col>

                    <Col md={12}>
                        <InputField
                            controlId="ap_m"
                            label="Apellido Materno:"
                            type="text"
                            name="ap_m"
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
                            controlId="tel_emp"
                            label="Teléfono:"
                            type="text"
                            name="tel_emp"
                            formik={formik}
                        />
                    </Col>

                    <Col md={12}>
                        <InputField
                            controlId="correo_emp"
                            label="Correo:"
                            type="email"
                            name="correo_emp"
                            formik={formik}
                        />
                    </Col>

                    <Col md={12}>
                        <InputField
                            controlId="curp"
                            label="CURP:"
                            type="text"
                            name="curp"
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
                            controlId="nss"
                            label="NSS:"
                            type="text"
                            name="nss"
                            formik={formik}
                        />
                    </Col>

                    <Col md={12}>
                        <InputField
                            controlId="fecha_alta"
                            label="Fecha de Alta:"
                            type="date"
                            name="fecha_alta"
                            formik={formik}
                        />
                    </Col>

                    <Col md={12}>
                        <InputField
                            controlId="emp_status"
                            label="Estatus del Empleado:"
                            type="text"
                            name="emp_status"
                            formik={formik}
                        />
                    </Col>

                    <Col md={12}>
                        <InputField
                            controlId="puesto"
                            label="Puesto:"
                            type="text"
                            name="puesto"
                            formik={formik}
                        />
                    </Col>

                    <Col md={12}>
                        <InputField
                            controlId="sueldo"
                            label="Sueldo:"
                            type="number"
                            name="sueldo"
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
                                onChange={formik.handleChange}
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

export default ModificarEmpleado;
