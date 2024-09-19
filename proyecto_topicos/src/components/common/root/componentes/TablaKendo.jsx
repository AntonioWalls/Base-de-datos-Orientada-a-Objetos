import { orderBy } from "@progress/kendo-data-query";
import React, { useState } from "react";
import {
  Grid,
  GridColumn as Column,
  GridToolbar
} from '@progress/kendo-react-grid';
import { BotonEditar, BotonNuevo, BotonEliminar } from "./Botones";
import { style } from '../../../../constants/Constantes.js';

const initialDataState = {
    skip: 0,
    take: 10,
};

const TablaKendo = (
    {
        ordenamientoInicial,
        data,
        funcionNuevo,
        funcionEditar,
        funcionEliminar,
        estructuraTabla,
        verNuevo = true,
        verModificar = true,
        verEliminar = true,
        conAcciones = true
    }
) => {
    const [pagina, setPagina] = useState(initialDataState);
    const [ordenamiento, setOrdenamiento] = React.useState(ordenamientoInicial);
    const [tamanoPagina, setTamanoPagina] = useState();

    // Metodo de Paginacion
    const cambioPagina = (event) => {
        const targetEvent = event.targetEvent;
        const take =
            targetEvent.value === "All" ? data.length : event.page.take;
        if (targetEvent.value) {
            setTamanoPagina(targetEvent.value);
        }
        setPagina({
            ...event.page,
            take,
        });
    };

    // Función general para manejar editar y eliminar
    const handleAction = (actionType, id) => {
        console.log(`ID ${actionType}:`, id); // Imprime la ID en consola
        if (actionType === 'editar') {
            funcionEditar(id); // id es el campo genérico
        } else if (actionType === 'eliminar') {
            funcionEliminar(id); // id es el campo genérico
        }
    };

    return (
        <>
            <Grid
                sortable={true}
                sort={ordenamiento}
                onSortChange={(e) => {
                    setOrdenamiento(e.sort);
                }}
                data={orderBy(data.slice(pagina.skip, pagina.take + pagina.skip), ordenamiento)}
                skip={pagina.skip}
                take={pagina.take}
                total={data.length}
                pageable={{
                    buttonCount: 3,
                    pageSizes: [5, 10, 15, "All"],
                    pageSizeValue: tamanoPagina,
                }}
                onPageChange={cambioPagina}
            >
                <GridToolbar>
                    { verNuevo ? 
                        <BotonNuevo
                            accion={() => funcionNuevo()}
                        />
                    : null }
                </GridToolbar>

                {estructuraTabla.columns.map((item) => (
                    <Column field={item.field} title={item.title} key={item.key} filter="text" filterCell={{ operator: "contains" }} cell={item.cell ? item.cell : null} />
                ))}
                
                { conAcciones ? 
                    <Column field="Acciones" title="Acciones" width="120px" cell={({ dataItem }) => (
                        <td style={style.acciones}>
                            { verModificar ? 
                                <BotonEditar
                                    accion={() => handleAction('editar', dataItem.id)} // Se usa el campo id genérico
                                />
                            : null }
                            
                            { verEliminar ? 
                                <BotonEliminar 
                                    accion={() => handleAction('eliminar', dataItem.id)}  // Se usa el campo id genérico
                                />
                            : null }
                        </td>
                    )}/>
                : null}
            </Grid>
        </>
    );
}

export default TablaKendo;
