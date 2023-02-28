import HttpClient from '../api/HttpClient';

export const objListCustomer=async(page,limite)=>{
    return HttpClient.get(`/Customer/List?Pagina=${page}&Limite=${limite}`).then((resultado)=>resultado).catch((error)=>{console.error(error)});
}

export const AddCustomer=async(entity)=>{
    return HttpClient.post('/Customer/Register',entity).then((resultado)=>resultado).catch((error)=>{console.error(error)});
}

export const RemoveCustomer=async(id)=>{
    return HttpClient.post('/Customer/Delete',id).then((resultado)=>resultado).catch((error)=>{console.error(error)});
}

export const UpdateCustomer=async(entity)=>{
    return HttpClient.put('/Customer/Update',entity).then((resultado)=>resultado).catch((error)=>{console.error(error)});
}




