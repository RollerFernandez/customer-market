import React, { Fragment, useState,useEffect} from 'react'
import Breadcrumb from '../common/breadcrumb';
import Modal from 'react-responsive-modal';
import 'react-toastify/dist/ReactToastify.css';
import {objListModel,DeleteModel,objListModelSql} from '../../actions/ModelActions';
import { useHistory } from 'react-router-dom';

import ReactTable from 'react-table';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-table/react-table.css';

import SweetAlert from 'react-bootstrap-sweetalert';

const ListModel=(props)=>{

    let history = useHistory();

    const [state,setState]=useState(false);
    const [models,setModels]=useState([]);
    const [modelItem,setModelItem]=useState([]);

    const [mensaje,setMensaje]                = useState('');
    const [alert,setAlert]                    = useState(false);
    const [alertError,setAlertError]          = useState(false);
    const [alertConfirm,setAlertConfirm]           = useState(false);

    const columns = [
        {  
            Header: 'Nombre',  
            accessor:   'modName',
            style:{
                textAlign: 'center',
                width:'20'
            } 
       }
       ,{  
            Header: 'Categoria',  
            //accessor: 'branName',
            style:{
                textAlign: 'left'
            },
            Cell: (row) => {
                return <div>{row.original.catName}</div>
            }  
       }
       ,{  
        Header: 'Marca',  
        //accessor: 'branName',
        style:{
            textAlign: 'left'
        },
        Cell: (row) => {
            return <div>{row.original.braName}</div>
        }  
   },
       {
            Header: <b>Acciones</b>,
            id: 'delete',
            accessor: str => "delete",
            Cell: (row) => (
                    <div>
                        <span  onClick={()=>alertRemove(row)}  data-toggle="tooltip" style={{cursor:'pointer'}} data-placement="left" title="Eliminar">
                            <i className="fa fa-trash" style={{ width: 35, fontSize: 20, padding: 11, color: '#e4566e' }}></i>
                        </span>
                        <span onClick={()=>editModelo(row)} data-toggle="tooltip" style={{cursor:'pointer'}} data-placement="left" title="Editar" >
                            <i className="fa fa-pencil" style={{ width: 35, fontSize: 20, padding: 11,color:'rgb(40, 167, 69)' }}></i>
                        </span>
                        {/* <span onClick={()=>addModelSlider(row)}  data-toggle="tooltip" style={{cursor:'pointer'}} data-placement="left" title="Agregar Slider">
                            <i className="fa fa-plus" style={{ width: 35, fontSize: 20, padding: 11,color:'gray' }}></i>
                        </span> */}
                    </div>
                    ),
                    style: {
                        textAlign: 'center'
                    },
                    sortable: false
            }
    ]  


    const getModels=()=>{
        objListModelSql().then(response=>{
            setModels(response[0].data);
            console.log(' ver marcas ',response[0].data);
        })
    }

    useEffect(() => {
        getModels();
    }, [])

    const editModelo = e =>{
        console.log('ver ',e.original);
        history.push("/models/edit-model",e.original);
       
    }

    const newModelo = () =>{
        history.push("/models/add-model");
       
    }

    const addModelSlider = e =>{
        console.log('ver ',e.original);
        history.push("/models/add-model-slider",e.original);
       
    }

    const openAlertClose =()=>{
		setAlert(false);
        // history.push("/products/physical/marcas");
        // console.log('entro a cerrar ');
    }

    const openAlertCloseConfirm = ()=>{
        setAlertConfirm(false)
    }

    const confirmRemove=()=>{
        setAlertConfirm(false);
        DeleteModel(modelItem.original).then(response=>{
            setMensaje('Se elimino Correctamente');
            setAlert(true);
            getModels();
        }).catch((Error) => {
            // if (Error.response.status === 400) {
            //     setMensaje(Error.response.data.errores);
            //     setAlertError(true);
            // } else {
                setMensaje("Error al registrar en el servidor");
                setAlertError(true);
            //}
            console.log(' ver errror ',Error);
        });
    }

    const alertRemove=(row)=>{
        setModelItem(row);
        setMensaje('Esta seguro que desea eliminar?');
        setAlertConfirm(true);
        
    }

        const { open } = state;
        return (
            <Fragment>
                <Breadcrumb title="Modelos" parent="Register" />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5>Lista Modelos</h5>
                                </div>
                                <div className="card-body">
                                    <div className="btn-popup pull-right">

                                        <button type="button" className="btn btn-primary" onClick={newModelo} data-toggle="modal" data-original-title="test" data-target="#exampleModal"> <i className="fa fa-plus" ></i> Nuevo Modelo</button>
                                       
                                    </div>
                                    <div className="clearfix"></div>
                                    <div id="basicScenario" className="product-physical">
                      
                                        <ReactTable
                                            data={models}
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
                    warning
                    title="Aviso"
                    btnSize="sm"
                    show={alertConfirm}
                    showCancel
                    confirmBtnText="Si"
                    cancelBtnText="Cancelar"
                    confirmBtnBsStyle="primary"
                    cancelBtnBsStyle="danger"
                    confirmBtnStyle={{color:"white"}}
                    onConfirm={confirmRemove}
                    onCancel={openAlertCloseConfirm}>
                    {mensaje}
                </SweetAlert>
                </div>
            </Fragment>
        )
    }

export default ListModel;

