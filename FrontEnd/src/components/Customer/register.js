
import React, { useState, useEffect,Fragment } from 'react';
import Breadcrumb from '../common/breadcrumb';
import { AvField, AvForm } from 'availity-reactstrap-validation';
import {AddCustomer} from '../../actions/CustomerActions';


import { useHistory } from 'react-router-dom';

import SweetAlert from 'react-bootstrap-sweetalert';

const RegisterCustomer=(props)=>{

    let history = useHistory();

    const [mensaje,setMensaje]            = useState('');
    const [alert,setAlert]                = useState(false);
    const [alertError,setAlertError]      = useState(false);

    const [customer, setCustomer]     = useState({
        Name:'',
        LastName:'',
        Address:'',
        CellPhone:'',
        Email:'',
    });

    const resetRegistro=()=>{
        setCustomer({
            Name:'',
            LastName:'',
            Address:'',
            CellPhone:'',
            Email:'',
        })
    }

    const handleChange=(e)=>{
        const {name, value} = e.target;
        setCustomer(anterior=>({
            ...anterior, 
            [name]: value 
        }))

    }

    const handleCancel=()=>{
        history.push("/Customer/list");
     }

    const saveCustomer=(e)=>{
        e.preventDefault();

        AddCustomer(customer).then(response=>{

            if (response.data.sucess) {
                setMensaje('Registered Successfully');
                setAlert(true);
                // handleCancel();
                resetRegistro();

            }else{
               setMensaje('An error occurred to error');
               setAlertError(true);
            }
        })
    }

    const openAlertClose =()=>{
		setAlert(false);
    }

        return (
            <Fragment>
                <Breadcrumb title="Register" parent="Customer" />

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5>New Customer</h5>
                                </div>
                                <div className="card-body">
                                    <div className="row product-adding">
                                    <div className="col-xl-7">
                                            <AvForm className="needs-validation add-product-form" >
                                                <div className="form form-label-center">
                                                    <div className="form-group mb-3 row">
                                                        <label className="col-xl-3 col-sm-4 mb-0">Name :</label>
                                                        <div className="col-xl-8 col-sm-7">
                                                        <AvField className="form-control" value={customer.Name} onChange={handleChange} name="Name" id="Name" type="text" required />
                                                        </div>
                                                        <div className="valid-feedback">Looks good!</div>
                                                    </div>

                                                    <div className="form-group mb-3 row">
                                                        <label className="col-xl-3 col-sm-4 mb-0">Last Name :</label>
                                                        <div className="col-xl-8 col-sm-7">
                                                            <AvField className="form-control" value={customer.LastName} onChange={handleChange} name="LastName" id="LastName" type="text" required />
                                                        </div>
                                                        <div className="valid-feedback">Looks good!</div>
                                                    </div>


                                                    <div className="form-group mb-3 row">
                                                        <label className="col-xl-3 col-sm-4 mb-0">Address :</label>
                                                        <div className="col-xl-8 col-sm-7">
                                                            <AvField className="form-control" value={customer.Address} onChange={handleChange} name="Address" id="Address" type="text" required />
                                                        </div>
                                                        <div className="valid-feedback">Looks good!</div>
                                                    </div>
                                                   
                                                    <div className="form-group mb-3 row">
                                                        <label className="col-xl-3 col-sm-4 mb-0">Phone Number :</label>
                                                        <div className="col-xl-8 col-sm-7">
                                                            <AvField className="form-control" value={customer.CellPhone} onChange={handleChange} name="CellPhone" id="CellPhone" type="text" required />
                                                        </div>
                                                        <div className="valid-feedback">Looks good!</div>
                                                    </div>

                                                    <div className="form-group mb-3 row">
                                                        <label className="col-xl-3 col-sm-4 mb-0">Email :</label>
                                                        <div className="col-xl-8 col-sm-7">
                                                            <AvField className="form-control" value={customer.Email} onChange={handleChange} name="Email" id="Email" type="text" required />
                                                        </div>
                                                        <div className="valid-feedback">Looks good!</div>
                                                    </div>
                                                </div>
                                                <div className="offset-xl-3 offset-sm-4">
                                                    <button type="submit" onClick={saveCustomer} className="btn btn-primary">Save</button>
                                                    <button type="button" onClick={handleCancel} className="btn btn-light">Cancel</button>
                                                </div>
                                            </AvForm>


                                            <SweetAlert
                                                success
                                                show={alert}
                                                title="Aviso"
                                                btnSize="sm"
                                                onConfirm={openAlertClose}>
                                                {mensaje}
                                            </SweetAlert>

                                            <SweetAlert
                                                error
                                                show={alertError}
                                                title="Aviso"
                                                btnSize="sm"
                                                onConfirm={openAlertClose}>
                                                {mensaje}
                                            </SweetAlert>
                                        </div>
                                        <div className="col-xl-5">
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
export default RegisterCustomer;
