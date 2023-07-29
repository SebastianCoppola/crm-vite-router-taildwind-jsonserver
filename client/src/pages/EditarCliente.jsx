import { Form, redirect, useActionData, useLoaderData, useNavigate } from 'react-router-dom'
import { obtenerCliente, editarCliente } from '../api/clientes'
import Error from '../components/Error'
import Formulario from '../components/FOrmulario'

export async function loader({params}){
    const cliente = await obtenerCliente(params.idCliente)
    if(Object.values(cliente).length === 0){
        throw new Response('',{
            status:404,
            statusText: 'No hay Resultados'
        })
    }
    return cliente
}

export async function action({request, params}){
    //Datos:
    let formData = await request.formData()
    let datos = Object.fromEntries(formData)
    let email = formData.get('email')
    //Validación:
    let errores = []
    if(Object.values(datos).includes('')){
        errores.push('Todos los campos son obligatorios.')
    }
    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])")
    if(!regex.test(email)){
        errores.push('El email no es válido.')
    }
    //Return
    if(Object.keys(errores).length){
        return errores
    }
    
    await editarCliente(params.idCliente, datos)
    return redirect('/')
}

const EditarCliente = () => {
    const cliente = useLoaderData()
    const navigate = useNavigate()
    const errores = useActionData()

    return (
        <> 
            <div className="flex justify-between align-center">
                <div>
                    <h1 className='font-black text-4xl text-blue-900'>Editar CLiente</h1>
                    <p className='mt-3'>A continuación podrás modificar los datos de un cliente. </p>
                </div>
                <button 
                    className="bg-blue-800 text-white px-3 py-1 font-bold uppercase h-10"
                    onClick={() => navigate(-1)}
                >Volver</button>
            </div>

            <div className='bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20'>
                {errores?.length && errores.map((error, i)=> <Error key={i}>{error}</Error>)}
                <Form method='post' noValidate action={action}>
                    <Formulario cliente={cliente} />
                    <input 
                        type='submit'
                        className='mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg'
                        value='Guardar Cambios'
                    />
                </Form>
            </div>

        </>
    )
}

export default EditarCliente