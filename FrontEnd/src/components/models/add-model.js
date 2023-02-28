
import React, { useState, useEffect,Fragment } from 'react';
import Breadcrumb from '../common/breadcrumb';
import CKEditors from "react-ckeditor-component";
import { AvField, AvForm } from 'availity-reactstrap-validation';
import one from '../../assets/images/pro3/1.jpg';
import user from '../../assets/images/user.png';
import {AddModel,AddPhoto} from '../../actions/ModelActions';
import {objListBrand} from '../../actions/BrandActions';
import {objListCategory} from '../../actions/CategoryActions';

import { useHistory } from 'react-router-dom';

import SweetAlert from 'react-bootstrap-sweetalert';

import { obtenerDataImagen } from '../../actions/ImagenActions';

const Add_Modelo=(props)=>{

    let history = useHistory();

    const [mensaje,setMensaje]              = useState('');
    const [alert,setAlert]                  = useState(false);
    const [alertError, setAlertError]       = useState(false);

    const [categories,setCategories]        = useState([]);
    const [brands,setBrands]=useState([]);
    
    const [model, setModel]     = useState({
        BraId   :'',
        CatId   :'',
        ModName :'',
        ModFile :'',
        ModFileS:'',
    });

    const resetRegistro=()=>{
        setModel({
            BraId   :'',
            CatId   :'',
            ModName :'',
            ModFile :'',
            ModFileS:'',
        })
    }

    const handleChange=(e)=>{
        const {name, value} = e.target;
        setModel(anterior=>({
            ...anterior, 
            [name]: value 
        }))

        console.log(' ver registros',value);

    }

    const handleCancel=()=>{
        history.push("/models/modelos");
     }

    const saveModel=(e)=>{
        e.preventDefault();
        //console.log(' ver modelo ',model);
        AddModel(model).then(response=>{
            setMensaje('Registrado Correctamente');
            setAlert(true);
            resetRegistro();
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
    }

    const getBrands=()=>{
        objListBrand().then(response=>{
            setBrands(response[0].data);
        })
    }

    const getCategories=()=>{
        objListCategory().then(response=>{
            setCategories(response[0].data);
            console.log(' ver modelos ',response[0].data);
        })
    }

    useEffect(() => {
        getCategories();
        getBrands();
    }, []);

    const openAlertCloseError = () => {
        setAlertError(false);
      };

    const uploadFile = event => {
        const archivo = event.target.files[0];
        obtenerDataImagen(archivo).then((respuesta) => {
            setModel(anterior=>({
                ...anterior, 
                ModFile: respuesta.nombre, 
                ModFileS: respuesta.data, 
            }))

        });

        
    }

        return (
            <Fragment>
                <Breadcrumb title="Registrar Modelo" parent="Modelo" />

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5>Nueva Modelo</h5>
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
                                                        {/* <ul className="file-upload-product">
                                                            {
                                                                state.dummyimgs.map((res, i) => {
                                                                    return (
                                                                        <li key={i}>
                                                                            <div className="box-input-file">
                                                                                <input className="upload" type="file" onChange={(e) => _handleImgChange(e, i)} />
                                                                                <img src={res.img} style={{ width: 50, height: 50 }} />
                                                                                <a id="result1" onClick={(e) => _handleSubmit(e.target.id)}></a>
                                                                            </div>
                                                                        </li>
                                                                    )
                                                                })
                                                            }
                                                        </ul> */}
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
                                                            <AvField className="form-control" value={model.ModName} onChange={handleChange} name="ModName" id="ModName" type="text" required />
                                                        </div>
                                                        <div className="valid-feedback">Looks good!</div>
                                                    </div>

                                                    {/* <div className="form-group  mb-3 row">
                                                        <label htmlFor="message-text" className="col-xl-3 col-sm-4 mb-0">Logo :</label>
                                                        <div className="col-xl-8 col-sm-7">
                                                            <input className="form-control" id="validationCustom01" onChange={_handleImgChangeUpload} type="file" required/>
                                                        </div>
                                                    </div> */}

                                                    <div className="form-group mb-3 row">
                                                        <label className="col-xl-3 col-sm-4 mb-0"><span>*</span> Marca:</label>
                                                        <div className="col-xl-8 col-sm-7">
                                                        <select className="form-control" required="" onChange={handleChange} value={model.BraId} name="BraId">
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
                                                        <select className="form-control" required="" onChange={handleChange} value={model.CatId} name="CatId">
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

export default Add_Modelo;
