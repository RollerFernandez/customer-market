import React, { useState,useEffect, Fragment } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const DatatableConfig=(props)=>{


    const [state,setState]=useState({
        checkedValues: [],
        myData: []
    });

    
    console.log(' ver marcas props ',props.myData)

  const  selectRow = (e, i) => {
        if (!e.target.checked) {
            setState({
                checkedValues: state.checkedValues.filter((item, j) => i !== item)
            });
        } else {
            state.checkedValues.push(i);
            setState({
                checkedValues: state.checkedValues
            })
        }
    }

  const  handleRemoveRow = () => {
        const selectedValues = state.checkedValues;
        const updatedData = state.myData.filter(function (el) {
            return selectedValues.indexOf(el.id) < 0;
        });
        
        setState({
            myData: updatedData
        })
        toast.success("Successfully Deleted !")
    };

  const  renderEditable = (cellInfo) => {
        return (
            <div
                style={{ backgroundColor: "#fafafa" }}
                contentEditable
                suppressContentEditableWarning
                onBlur={e => {
                    const data = [...state.myData];
                    data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
                    setState({ myData: data });
                }}
                dangerouslySetInnerHTML={{
                    __html: state.myData[cellInfo.index][cellInfo.column.id]
                }}
            />
        );
    }

  const  Capitalize=(str)=> {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }




    useEffect(() => {
        setState(anterior=>({
            ...anterior, 
            myData:props.myData
        }))
    }, [])

   // render() {
        const { pageSize, myClass, multiSelectOption, pagination } = props;
        const { myData } = state

        console.log(' ver myData ',myData);
        // const columns = [];

        const columns = [{  
            Header: 'Logo',  
            //accessor:   'braImg',
            style:{
                textAlign: 'center',
                width:'20'
            },
            Cell: (row) => {
                return <div><img style={{width:60,height:50}} src={row.original.braImg}/></div>
              },  
           },{  
           Header: 'Nombre',  
           accessor: 'braName',
           style:{
               textAlign: 'left'
           }    
           }]  

        for (var key in myData[0]) {

            let editable = renderEditable
            if (key === "braImg") {
                editable = null;
            }
            if (key === "braName") {
                editable = null;
            }
            if(key === "order_status"){
                editable = null;
            }

            // columns.push(
            //     {
            //         Header: <b>{Capitalize(key.toString())}</b>,
            //         accessor: key,
            //         Cell: editable,
            //         style: {
            //             textAlign: 'center'
            //         }
            //     });
        }

        if (multiSelectOption == true) {
            columns.push(
                {
                    Header: <button className="btn btn-danger btn-sm btn-delete mb-0 b-r-4"
                        onClick={
                            (e) => {
                                if (window.confirm('Are you sure you wish to delete this item?'))
                                    handleRemoveRow()
                            }}>Delete</button>,
                    id: 'delete',
                    accessor: str => "delete",
                    sortable: false,
                    style: {
                        textAlign: 'center'
                    },
                    Cell: (row) => (
                        <div>
                            <span >
                                <input type="checkbox" name={row.original.id} defaultChecked={state.checkedValues.includes(row.original.id)}
                                    onChange={e => selectRow(e, row.original.id)} />
                            </span>
                        </div>
                    ),
                    accessor: key,
                    style: {
                        textAlign: 'center'
                    }
                }
            )
        } else {
            columns.push(
                {
                    Header: <b>Acciones</b>,
                    id: 'delete',
                    accessor: str => "delete",
                    Cell: (row) => (
                        <div>
                            <span onClick={() => {
                                if (window.confirm('Are you sure you wish to delete this item?')) {
                                    let data = myData;
                                    data.splice(row.index, 1);
                                    setState({ myData: data });
                                }
                                toast.success("Successfully Deleted !")

                            }}>
                                <i className="fa fa-trash" style={{ width: 35, fontSize: 20, padding: 11, color: '#e4566e' }}
                                ></i>
                            </span>

                        <span ><i className="fa fa-pencil" style={{ width: 35, fontSize: 20, padding: 11,color:'rgb(40, 167, 69)' }}></i></span>
                        <span><i className="fa fa-plus" style={{ width: 35, fontSize: 20, padding: 11,color:'gray' }}></i></span>
                    </div>
                ),
                style: {
                    textAlign: 'center'
                },
                sortable: false
            }
        )
        }

        return (
            <Fragment>
                <ReactTable
                    data={state.myData}
                    columns={columns}
                    defaultPageSize={pageSize}
                    className={myClass}
                    showPagination={pagination}
                />
                <ToastContainer />
            </Fragment>
        )
    }

export default DatatableConfig;
