
import React, { useState, useEffect,Fragment } from 'react';
import Breadcrumb from '../common/breadcrumb';
import CKEditors from "react-ckeditor-component";
import { AvField, AvForm } from 'availity-reactstrap-validation';
import one from '../../assets/images/pro3/1.jpg';
import user from '../../assets/images/user.png';
import {EditModel,AddPhoto} from '../../actions/ModelActions';
import {objListBrand} from '../../actions/BrandActions';
import {objListCategory} from '../../actions/CategoryActions';

import { useHistory } from 'react-router-dom';

import SweetAlert from 'react-bootstrap-sweetalert';

import { obtenerDataImagen } from '../../actions/ImagenActions';

const Edit_Modelo=(props)=>{

    let history = useHistory();
    console.log(' ver categorias ',history.location.state);

    const [mensaje,setMensaje]              = useState('');
    const [alert,setAlert]                  = useState(false);
    const [alertError, setAlertError]       = useState(false);

    

    const [categories,setCategories]        = useState([]);
    const [brands,setBrands]=useState([]);
    
    const [model, setModel]     = useState({
        modId   :'',
        catId   :'',
        modName :'',
        modFile :'',
        modFileS:''
    });

    const resetRegistro=()=>{
        setModel({
            modId:'',
            catId:'',
            modName:''
        })
    }

    const handleChange=(e)=>{
        const {name, value} = e.target;
        setModel(anterior=>({
            ...anterior, 
            [name]: value 
        }))
    }

    const handleCancel=()=>{
        history.push("/models/modelos");
     }

    const saveModel=(e)=>{
        e.preventDefault();
        EditModel(model).then(response=>{
            setMensaje('Registrado Correctamente');
            setAlert(true);
            //resetRegistro();
            console.log('registro conrectamente');
        }).catch(error=>{
            setMensaje('error al procesar');
            setAlertError(true);
          });
    }

   const _handleSubmit=(e)=> {
        e.preventDefault();

    }

    const _handleImgChangeUpload=(e)=> {
        e.preventDefault();

        let file = e.target.files[0];

        var formData = new FormData();
        formData.append('file',file);

        AddPhoto(formData).then(response=>{

            console.log(' ver respuesta ',response[0].data)
            // setBrand(anterior=>({
            //     ...anterior, 
            //     BraImg: response[0].data.url,
            //     PublicId:response[0].data.publicId 
            // }))
        });
    }

    const openAlertClose =()=>{
		setAlert(false);
        history.push("/models/modelos");
    }

    const getBrands=()=>{
        objListBrand().then(response=>{
            setBrands(response[0].data);
        })
    }

    useEffect(() => {
        setModel(props.history.location.state);
        getBrands();
        getCategories();
    }, []);


    const openAlertCloseError = () => {
        setAlertError(false);
      };

    const getCategories=()=>{
        objListCategory().then(response=>{
            setCategories(response[0].data);
            console.log(' ver modelos ',response[0].data);
        })
    }

    const uploadFile = event => {
        const archivo = event.target.files[0];
        obtenerDataImagen(archivo).then((respuesta) => {
            setModel(anterior=>({
                ...anterior, 
                modFile: respuesta.nombre, 
                modFileS: respuesta.data, 
            }))

        });

        
    }

        return (
            <Fragment>
                <Breadcrumb title="Modificar Modelo" parent="Modelo" />

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5>Editar Modelo</h5>
                                </div>
                                <div className="card-body">
                                    <div className="row product-adding">
                                        <div className="col-xl-5">
                                            <div className="add-product">
                                                <div className="row">
                                                    <div className="col-xl-9 xl-50 col-sm-6 col-9">
                                                        {/* <img src={brand.BraImg==='' ? one:brand.BraImg} alt="" className="img-fluid image_zoom_1 blur-up lazyloaded" /> */}
                                                    </div>
                                                    <div className="col-xl-3 xl-50 col-sm-6 col-3">
                                                      
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-7">
                                            <AvForm className="needs-validation add-product-form" >
                                                <div className="form form-label-center">
                                                    <div className="form-group mb-3 row">
                                                        <label className="col-xl-3 col-sm-4 mb-0">Nombre :</label>
                                                        <div className="col-xl-8 col-sm-7">
                                                            <AvField className="form-control" value={model.modName} onChange={handleChange} name="modName" id="modName" type="text" required />
                                                        </div>
                                                        <div className="valid-feedback">Looks good!</div>
                                                    </div>

                                                    <div className="form-group mb-3 row">
                                                        <label className="col-xl-3 col-sm-4 mb-0"><span>*</span> Marca:</label>
                                                        <div className="col-xl-8 col-sm-7">
                                                        <select className="form-control" required="" onChange={handleChange} value={model.braId} name="braId">
                                                            <option value="">--Select--</option>
                                                            {brands.map((bra) => (
                                                                <option key={bra.braId} value={bra.braId}>{bra.braName}</option>
                                                            ))}
                                                        </select>
                                                        </div>
                                                    </div>

                                                                                                      
                                                    <div className="form-group mb-3 row">
                                                        <label className="col-xl-3 col-sm-4 mb-0"><span>*</span> Categoria:</label>
                                                        <div className="col-xl-8 col-sm-7">
                                                        <select className="form-control" required="" onChange={handleChange} value={model.catId} name="catId">
                                                            <option value="">--Select--</option>
                                                            {categories.map((cat) => (
                                                                <option key={cat.catId} value={cat.catId}>{cat.catName}</option>
                                                            ))}
                                                        </select>
                                                        </div>
                                                    </div>

                                                    <div className="form-group  mb-3 row">
                                                        <label htmlFor="message-text" className="col-xl-3 col-sm-4 mb-0"><span>*</span> Catalogo  :</label>
                                                        <div className="col-xl-8 col-sm-7">
                                                            <input className="form-control" onChange={uploadFile} type="file" required/>
                                                        </div>
                                                    </div>
                                                   
                                                </div>
                                                <div className="offset-xl-3 offset-sm-4">
                                                    <button type="submit" onClick={saveModel} className="btn btn-primary">Guardar</button>
                                                    <button type="button" onClick={handleCancel} className="btn btn-light">Cancelar</button>
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
                                                onConfirm={openAlertCloseError}
                                                >
                                                {mensaje}
                                            </SweetAlert>
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

export default Edit_Modelo;
