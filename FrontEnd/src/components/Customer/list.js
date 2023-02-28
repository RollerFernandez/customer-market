import React, { Fragment, useState,useEffect} from 'react'
import Breadcrumb from '../common/breadcrumb';
import Modal from 'react-responsive-modal';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';

import ReactTable from 'react-table';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-table/react-table.css';
import {objListarAlumno,RemoveAlumno} from '../../actions/AlumnoActions';
import {objListCustomer,RemoveCustomer} from '../../actions/CustomerActions';



import SweetAlert from 'react-bootstrap-sweetalert';


const ListAlumno=(props)=>{

    let history                              =   useHistory();
             
    const [state,setState]                   =   useState(false);
    const [sliders,setSliders]               =   useState([]);
    const [sliderItem,setSliderItem]         =   useState([]);

    const [mensaje,setMensaje]                =  useState('');
    const [alert,setAlert]                    =  useState(false);
    const [alertError,setAlertError]          =  useState(false);
    const [alertConfirm,setAlertConfirm]      =  useState(false);
    const [alumnos,setAlumnos]                  =  useState([]);
    const [customer,setCustomer]                  =  useState([]);

    const columns = [
        {  
            Header: 'Name',  
            style:{
                textAlign: 'center'
            }, 
            Cell: (row) => {
                return <div>{row.original.Name}</div>
            }    
        },
        {  
            Header: 'Last Name',  
            style:{
                textAlign: 'center'
            }, 
            Cell: (row) => {
                return <div>{row.original.LastName}</div>
            }    
        },
        {  
            Header: 'Phone Number',   
            style:{
                textAlign: 'center'
            }, 
            Cell: (row) => {
                return <div>{row.original.CellPhone}</div>
            }    
        },
        {  
            Header: 'Email',   
            style:{
                textAlign: 'center'
            }, 
            Cell: (row) => {
                return <div>{row.original.Email}</div>
            }    
        },
        {
            Header: <b>Actions</b>,
            id: 'delete',
            accessor: str => "delete",
            Cell: (row) => (
                    <div>
                        <span onClick={()=>alertRemove(row)}  data-toggle="tooltip" style={{cursor:'pointer'}} data-placement="left" title="Eliminar">
                            <i className="fa fa-trash" style={{ width: 35, fontSize: 20, padding: 11, color: '#e4566e' }}></i>
                        </span>
                        <span onClick={()=>update(row)} data-toggle="tooltip" style={{cursor:'pointer'}} data-placement="left" title="Editar" >
                            <i className="fa fa-pencil" style={{ width: 35, fontSize: 20, padding: 11,color:'rgb(40, 167, 69)' }}></i>
                        </span>
                    </div>
                    ),
                    style: {
                        textAlign: 'center'
                    },
                    sortable: false
            }
    ]  

    const getCustomers=()=>{

        objListCustomer(1,80).then(response=>{
            setCustomer(response.data.data.items);
        });
    }

    useEffect(() => {
        getCustomers();
    }, [])

    const update = e =>{
        history.push("/Customer/update",e.original);
    }

    const newCustomer = () =>{
        history.push("/Customer/register");
    }

    const openAlertCloseConfirm = ()=>{
        setAlertConfirm(false)
    }

    const openAlertClose =()=>{
		setAlert(false);
    }

    const alertRemove=(row)=>{
        setSliderItem(row);
        setMensaje('Are you sure you want to delete?');
        setAlertConfirm(true);
        
    }

    const confirmRemove=()=>{
        setAlertConfirm(false);
        RemoveCustomer(sliderItem.original).then(response=>{

            if (response.data.sucess) {
                setMensaje('successfully deleted');
                setAlert(true);
                getCustomers();
            }else{
                setMensaje('Could not delete record');
                setAlertError(true);
            }

        }).catch((Error) => {
                setMensaje("An error occurred while processing");
                setAlertError(true);
        });
    }

        const { open } = state;
        return (
            <Fragment>
                <Breadcrumb title="Customer" parent="Register" />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5>List of Customer</h5>
                                </div>
                                <div className="card-body">
                                    <div className="btn-popup pull-right">

                                        <button type="button" className="btn btn-primary" onClick={newCustomer} data-toggle="modal" data-original-title="test" data-target="#exampleModal"> <i className="fa fa-plus" ></i> New Customer</button>
                                       
                                    </div>
                                    <div className="clearfix"></div>
                                    <div id="basicScenario" className="product-physical">
                      
                                        <ReactTable
                                            data={customer}
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
                        style={{color:'black'}}
                        confirmBtnStyle={{paddingLeft:'50px',paddingRight:'50px',borderRadius:'15px',backgroundColor:'black'}}
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

export default ListAlumno;

