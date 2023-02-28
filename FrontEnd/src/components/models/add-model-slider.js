//import React, { Component,Fragment } from 'react';


import React, { useState, useEffect,Fragment } from 'react';
import Breadcrumb from '../../components/common/breadcrumb';
import CKEditors from "react-ckeditor-component";
import { AvField, AvForm } from 'availity-reactstrap-validation';
import one from '../../assets/images/pro3/1.jpg';  
import user from '../../assets/images/user.png';
import {AddBrand,AddPhoto} from '../../actions/BrandActions';


import Slider from 'react-slick';
import stats from '../../assets/images/dashboard/stats.png';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useHistory } from 'react-router-dom';

import SweetAlert from 'react-bootstrap-sweetalert';

const Add_Model_Slider=(props)=>{

    let history = useHistory();

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        cssEase: "linear"
    };

    const [mensaje,setMensaje]  = useState('');
    const [alert,setAlert]      = useState(false);
    
    const [brandImage, setBrandImage]     = useState([]);
    const [brand, setBrand]     = useState([]);

       
        // BmaId:'',
        // BraId:'',
        // BmaImgurl:'',
        // BmaPublicid:''

    const [state,setState]      = useState({
            quantity: 1,
            file: '',
            dummyimgs: [
                { img: user },
                { img: user },
                { img: user },
                { img: user },
                { img: user },
            ]
    });


    useEffect(() => {
        
    }, [brand.BraImg])

    const resetRegistro=()=>{
        setBrand({
            BraName:'',
            BraImg:'',
            BraPublicid:'',
            BrandImage:[]
        })
    }

    const handleChange=(e)=>{
        const {name, value} = e.target;
        setBrand(anterior=>({
            ...anterior, 
            [name]: value 
        }))

        console.log(' ver registros',value);

    }

    const handleCancel=()=>{
        history.push("/models/modelos");
     }

    const saveBrand=(e)=>{
        e.preventDefault();
       // AddBrand(brand).then(response=>{
            setMensaje('Registrado Correctamente');
            setAlert(true);
         //   resetRegistro();
           // console.log('registro conrectamente');
        //})
    }

    //image upload
   const _handleSubmit=(e)=> {
        e.preventDefault();

    }

   const _handleImgChange=(e, i)=> {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];
        const { dummyimgs } = this.state;

        reader.onloadend = () => {
            dummyimgs[i].img = reader.result;
            this.setState({
                file: file,
                dummyimgs,
            });
        }
        reader.readAsDataURL(file)
    }

    const _handleImgChangeUpload=(e)=> {
        e.preventDefault();

        let file = e.target.files[0];

        var formData = new FormData();
        formData.append('file',file);

        AddPhoto(formData).then(response=>{

            console.log(' ver respuesta ',response[0].data)
            setBrand(anterior=>({
                ...anterior, 
                BraImg: response[0].data.url,
                BraPublicid:response[0].data.publicId 
            }))
        });
    }

    const openAlertClose =()=>{
		setAlert(false);
    }

    //render() {
        return (
            <Fragment>
                <Breadcrumb title="Add Slider" parent="Models" />

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5>Nuevo Slider Modelo</h5>
                                </div>
                                <div className="card-body">
                                    <div className="row product-adding">
                                        <div className="col-xl-5">
                                            <div className="add-product">
                                                <div className="row">
                                                    <div className="col-xl-9 xl-50 col-sm-6 col-9 card-center">
                                                    <div className="card bg-primary">
                                                        <Slider className="single-item" {...settings}>
                                                            <div>
                                                                <div className="svg-icon">
                                                                    <img src="https://www.toyotaperu.com.pe/sites/default/files/miniatura_rav4_0.png" className="Img-fluid" ></img>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div className="svg-icon">
                                                                    <img src="https://www.toyotaperu.com.pe/sites/default/files/Auto-CHR-escogetutoyota-2_0.png" className="Img-fluid" ></img>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div className="svg-icon">
                                                                    <img src="https://11uk91uj5h62os2u61c0s6o1-wpengine.netdna-ssl.com/wp-content/uploads/2020/08/4runner-sr5.png" className="Img-fluid" ></img>
                                                                </div>
                                                            </div>
                                                        </Slider >
                                                        </div>
                                                    </div>
                                                    {/* <div className="col-xl-3 xl-50 col-sm-6 col-3">
                                                        <ul className="file-upload-product">
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
                                                        </ul>
                                                    </div> */}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-7">
                                            <AvForm className="needs-validation add-product-form" >
                                                <div className="form form-label-center">
                                                    {/* <div className="form-group mb-3 row">
                                                        <label className="col-xl-3 col-sm-4 mb-0">Nombre :</label>
                                                        <div className="col-xl-8 col-sm-7">
                                                            <AvField className="form-control" value={brand.BraName} onChange={handleChange} name="BraName" id="BraName" type="text" required />
                                                        </div>
                                                        <div className="valid-feedback">Looks good!</div>
                                                    </div> */}

                                                    <div className="form-group  mb-3 row">
                                                        <label htmlFor="message-text" className="col-xl-3 col-sm-4 mb-0">Slider 1 :</label>
                                                        <div className="col-xl-8 col-sm-7">
                                                            <input className="form-control" id="validationCustom01" onChange={_handleImgChangeUpload} type="file" required/>
                                                        </div>
                                                    </div>

                                                    <div className="form-group  mb-3 row">
                                                        <label htmlFor="message-text" className="col-xl-3 col-sm-4 mb-0">Slider 2 :</label>
                                                        <div className="col-xl-8 col-sm-7">
                                                            <input className="form-control" id="validationCustom02" onChange={_handleImgChangeUpload} type="file" required/>
                                                        </div>
                                                    </div>

                                                    <div className="form-group  mb-3 row">
                                                        <label htmlFor="message-text" className="col-xl-3 col-sm-4 mb-0">Slider 3 :</label>
                                                        <div className="col-xl-8 col-sm-7">
                                                            <input className="form-control" id="validationCustom03" onChange={_handleImgChangeUpload} type="file" required/>
                                                        </div>
                                                    </div>

                                                    <div className="form-group  mb-3 row">
                                                        <label htmlFor="message-text" className="col-xl-3 col-sm-4 mb-0">Slider 4 :</label>
                                                        <div className="col-xl-8 col-sm-7">
                                                            <input className="form-control" id="validationCustom04" onChange={_handleImgChangeUpload} type="file" required/>
                                                        </div>
                                                    </div>

                                                    <div className="form-group  mb-3 row">
                                                        <label htmlFor="message-text" className="col-xl-3 col-sm-4 mb-0">Slider 5 :</label>
                                                        <div className="col-xl-8 col-sm-7">
                                                            <input className="form-control" id="validationCustom05" onChange={_handleImgChangeUpload} type="file" required/>
                                                        </div>
                                                    </div>
                                                   
                                                </div>
                                                <div className="offset-xl-3 offset-sm-4">
                                                    <button type="submit" onClick={saveBrand} className="btn btn-primary">Guardar</button>
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
//}

export default Add_Model_Slider;
