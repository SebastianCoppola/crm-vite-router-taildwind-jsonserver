export async function obtenerClientes(){
    let respuesta = await fetch(import.meta.env.VITE_API_URL)
    let resultado = await respuesta.json()

    return resultado
}

export async function obtenerCliente(id){
    let respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`)
    let resultado = await respuesta.json()

    return resultado
}

export async function agregarCliente(data){
    try{
        const respuesta = await fetch(import.meta.env.VITE_API_URL, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {'Content-Type':'application/json'}
        })
        await respuesta.json()
    }catch(e){
        console.log(e)
    }
}

export async function editarCliente(idCliente, data){
    try{
        const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${idCliente}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {'Content-Type':'application/json'}
        })
        await respuesta.json()
    }catch(e){
        console.log(e)
    }
}

export async function eliminarCliente(idCliente){
    try{
        const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${idCliente}`, {
            method: 'DELETE',
        })
        await respuesta.json()
    }catch(e){
        console.log(e)
    }
}