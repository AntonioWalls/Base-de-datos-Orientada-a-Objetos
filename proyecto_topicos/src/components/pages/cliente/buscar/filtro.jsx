import { Button, Row, Col, Form } from 'react-bootstrap';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate

import InputField from '../../../common/root/componentes/Input';

const FiltroCliente = ({ onFilter }) => {
    const navigate = useNavigate(); // Hook de navegación
    const filtrosDefault = {
        Nombre: '',
        Habilitado: true,
        Sucursal: '' // Nuevo campo para Sucursal
    };
    const [filtro, setFiltro] = useState({ ...filtrosDefault });

    const HandleFilterSubmit = () => {
        // Lógica de filtrado
        onFilter(filtro);

        // Redireccionar según la sucursal seleccionada
        if (filtro.Sucursal === 'Sucursal HMO') {
            navigate('/clientesA'); // Redirige a la página de Sucursal HMO
        } else if (filtro.Sucursal === 'Sucursal GYS') {
            navigate('/clienteB'); // Redirige a la página de Sucursal GYS
        }
    };

    const HandleRestablecer = () => {
        setFiltro(filtrosDefault);
        onFilter(filtrosDefault);
    };

    return (
        <section className="bg-light app-filters">
            <Form>
                <Row className="align-items-end">

                    {/* Añadir select para Sucursales */}
                    <Col sm={3}>
                        <Form.Group controlId="Sucursal">
                            <Form.Label>Sucursal</Form.Label>
                            <Form.Control 
                                as="select" 
                                value={filtro.Sucursal} 
                                onChange={(e) => setFiltro({ ...filtro, Sucursal: e.target.value })}
                            >
                                <option value="">Selecciona una Sucursal</option>
                                <option value="Sucursal HMO">Sucursal HMO</option>
                                <option value="Sucursal GYS">Sucursal GYS</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>

                    <Col sm={1}>
                        <Button
                            className="btn btn-sm btn-primary"
                            style={{ height: "30px", marginBottom: "4px" }}
                            type="button"
                            variant="white"
                            onClick={() => HandleRestablecer()}
                        >
                            Restablecer
                        </Button>
                    </Col>

                    <Col sm={1}>
                        <Button
                            className="btn btn-sm btn-primary"
                            style={{ width: "80px", height: "30px", marginBottom: "4px", marginInline: '1rem' }}
                            type="button"
                            variant="primary"
                            onClick={() => HandleFilterSubmit()}
                        >
                            Filtrar
                        </Button>
                    </Col>
                </Row>
            </Form>
        </section>
    );
};

export default FiltroCliente;
