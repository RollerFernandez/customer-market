import HttpClient from '../api/HttpClient';

export const objListarAlumno=async(page,limite)=>{
    const resultado=HttpClient.get(`/Alumno?Pagina=${page}&Limite=${limite}`);
    return await Promise.all([resultado]);
}

export const AddAlumno=async(entity)=>{
    const resultado=HttpClient.post('/Alumno',entity);
    return await Promise.all([resultado]);
}

export const RemoveAlumno=async(id)=>{
    const resultado=HttpClient.post('/Alumno/',id);
    return await Promise.all([resultado]);
}

export const EditarAlumno=async(Id,entity)=>{
    const resultado=HttpClient.put('/Alumno/'+Id,entity);
    return await Promise.all([resultado]);
}




