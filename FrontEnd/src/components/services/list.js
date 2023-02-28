import React, { Fragment, useState, useEffect } from 'react'
import Breadcrumb from '../common/breadcrumb';
import 'react-toastify/dist/ReactToastify.css';
import { objListModel, DeleteModel } from '../../actions/ModelActions';
import { objListServiceVehicle,DowloadExcel,objListServiceVehicleSql } from '../../actions/ServiceVehicleActions';
import { useHistory } from 'react-router-dom';

import ReactTable from 'react-table';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-table/react-table.css';

import SweetAlert from 'react-bootstrap-sweetalert';

const ListServices = (props) => {

    let history = useHistory();

    const [serviceVehicles, setServiceVehicles] = useState([]);

    const [mensaje, setMensaje] = useState('');
    const [alert, setAlert] = useState(false);
    const [alertError, setAlertError] = useState(false);
    const [alertConfirm, setAlertConfirm] = useState(false);

    const columns = [

        {
            Header: 'Tipo',
            accessor: 'modName',
            style: {
                textAlign: 'left',
                width: '20'
            },
            Cell: (row) => {
                return <div>{row.original.sehType === 'RE' ? 'Repuesto' : 'Mantenimiento'}</div>
            }
        },
        {
            Header: 'Marca',
            accessor: 'modName',
            style: {
                textAlign: 'center',
                width: '20'
            },
            Cell: (row) => {
                return <div>{row.original.braName}</div>
            }
        },
        {
            Header: 'Modelo',
            accessor: 'modName',
            style: {
                textAlign: 'center',
                width: '20'
            },
            Cell: (row) => {
                return <div>{row.original.modName}</div>
            }
        },
        {
            Header: 'Tipo de Servicio',
            accessor: 'modName',
            style: {
                textAlign: 'center',
                width: '20'
            },
            Cell: (row) => {
                return <div>{row.original.serName}</div>
            }
        },
        {
            Header: 'Nombre y Apellidos',
            accessor: 'modName',
            style: {
                textAlign: 'center',
                width: '20'
            },
            Cell: (row) => {
                return <div>{`${row.original.useName} ${row.original.useLastname}`}</div>
            }
        },
        {
            Header: 'Email',
            accessor: 'modName',
            style: {
                textAlign: 'center',
                width: '20'
            },
            Cell: (row) => {
                return <div>{row.original.useEmail}</div>
            }
        },
        {
            Header: <b>Acciones</b>,
            id: 'delete',
            accessor: str => "delete",
            Cell: (row) => (
                <div>
                    <span onClick={viewService} data-toggle="tooltip" style={{ cursor: 'pointer' }} data-placement="left" title="Editar" >
                        <i className="fa fa-search" style={{ width: 35, fontSize: 20, padding: 11, color: 'red' }}></i>
                    </span>

                </div>
            ),
            style: {
                textAlign: 'center'
            },
            sortable: false
        }
    ]

    useEffect(() => {
        console.log('entro');
        getServiceVehicles();
    }, [])

    const getServiceVehicles = () => {
        objListServiceVehicleSql().then(response => {
            console.log(' ver lista servicios ', response[0].data);
            setServiceVehicles(response[0].data);
            
        })
    }

    const downloadExcel=()=>{

        let requestModel={
            modId: 0
        };
        
        DowloadExcel(requestModel,{responseType: 'blob'}).then(response=>{
            console.log(' descargar vehiculo ',response[0]);
            const url = window.URL.createObjectURL(new Blob([response[0].data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'Reporte de Servicios.xlsx');
            document.body.appendChild(link);
            link.click();
        })
    }

    const viewService = e => {
        console.log('ver ', e.original);
        setMensaje('Error al visualizar');
        setAlertError(true);
    }


    const openAlertClose = () => {
        setAlert(false);
        // history.push("/products/physical/marcas");
        // console.log('entro a cerrar ');
    }

    const openAlertErrorClose = () => {
        setAlertError(false);
        // history.push("/products/physical/marcas");
        // console.log('entro a cerrar ');
    }

    return (
        <Fragment>
            <Breadcrumb title="Servicios" parent="Servicios" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                <h5>Lista Solicitud de Servicios</h5>
                            </div>
                            <div className="card-body">
                                <div className="btn-popup pull-right">

                                    <button type="button" className="btn btn-success" onClick={downloadExcel} data-toggle="modal" data-original-title="test" data-target="#exampleModal"> <i className="fa fa-file-excel-o" aria-hidden="true"></i> Descargar Lista</button>

                                </div>
                                <div className="clearfix"></div>
                                <div id="basicScenario" className="product-physical">

                                    <ReactTable
                                        data={serviceVehicles}
                                        columns={columns}
                                        defaultPageSize={5}
                                        showPagination={true}
                                        className='-striped -highlight'

                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <SweetAlert
                    success
                    show={alert}
                    title="Aviso"
                    btnSize="sm"
                    onConfirm={openAlertClose}>
                    {mensaje}
                </SweetAlert>

                <SweetAlert
                    key='errorAlert'
                    error
                    show={alertError}
                    title="Aviso"
                    btnSize="sm"
                    onConfirm={openAlertErrorClose}>
                    {mensaje}
                </SweetAlert>

            </div>
        </Fragment>
    )
}

export default ListServices;

