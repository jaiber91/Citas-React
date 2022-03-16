import React from 'react'
import {useState, useEffect} from 'react'
import { Error } from './Error'


export const Form = ({pacientes, setPacientes, paciente, setPaciente /*Este prop viene del componente FORM */ } )  => {
  const [nombre, setNombre] = useState('')
  const [propietario, setPropietario] = useState('')
  const [email, setEmail] = useState('')
  const [fecha, setFecha] = useState('')
  const [sintomas, setSintomas] = useState('')

   //Mostrando un mensaje de error en el form 
  const [error, setError] = useState(false)
  
//Este hook y su logica es para darle funcionalidad al botón editar
  useEffect(()=>{
    if (Object.keys (paciente).length > 0) {
      setNombre(paciente.nombre)
      setPropietario(paciente.propietario)
      setEmail(paciente.email)
      setFecha(paciente.fecha)
      setSintomas(paciente.sintomas)
    }
  },[paciente])

  //Función para generar el ID del array de PACIENTES que se muestra en pantalla
  //Esto se hace para no usar el INDEX del array, es una mala practica
  const generarId = () =>{
    const random = Math.random().toString(36).substr(2)
    const fecha = Date.now().toString(36)

    return random + fecha
  }

   const handleSubmit = (e) =>{
    e.preventDefault()

    //Validación del formulario
    if ([nombre, propietario, email, fecha, sintomas].includes('')) {
      console.log("Falta llenar un campo");
      setError(true)
      return

    }
    setError(false) //Para quitar el mensaje de error cuando todos los campos están llenos
    
    //Creando objeto de pacientes
    const objetoPaciente = {
      nombre,
      propietario, 
      email, 
      fecha, 
      sintomas
    }


    //Para editar el registro y para detectar un nuevo registro;
    if (paciente.id) {
      //Editando Registro
      objetoPaciente.id = paciente.id
      const pacientesActualizado = pacientes.map(pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState)
      
      setPacientes(pacientesActualizado)
      setPaciente({})
    
    }else{
      //Nuevo Registro
      objetoPaciente.id = generarId()
      setPacientes([...pacientes, objetoPaciente])
    }


    

    //Limpiando o reiniciando el FORM
    setNombre('')
    setPropietario('')
    setEmail('')
    setFecha('')
    setSintomas('')
  }
  return (
    <div className='ml-8 md:w-1/2 lg:w-2/5'>
      <h2 className='font-black text-3xl text-center'>Seguimiento pacientes</h2>
      <p className='text-lg mt-5 text-center mb-10'>
        Añade tus pacientes y <span className='text-indigo-600 font-bold '>Administralos</span>
      </p>

      <form  onSubmit={handleSubmit} className='bg-white shadow-md rounded-lg py-10 px-5 mb-10' >
        {error && <Error mensaje="Todos los campos son obligatorios" /> } 

        <div className='mb-5'>
          <label htmlFor='mascota' className='block text-green-700 uppercase font-bold'> Nombre de la mascota</label>
          <input 
          id='mascota'
          type="text" 
          placeholder='Nombre de la mascota'
          className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className='mb-5'>
          <label htmlFor='propietario' className='block text-green-700 uppercase font-bold'> Nombre del propietario</label>
          <input 
          id='propietario'
          type="text" 
          placeholder='Nombre del propietario'
          className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
          value={propietario}
          onChange={(e) => setPropietario(e.target.value)}
          />
        </div>

        <div className='mb-5'>
          <label htmlFor='email' className='block text-green-700 uppercase font-bold'>Email de contacto</label>
          <input 
          id='email'
          type="email" 
          placeholder='Email de contacto'
          className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className='mb-5'>
          <label htmlFor='alta' className='block text-green-700 uppercase font-bold'>Alta</label>
          <input 
          id='alta'
          type="date" 
          className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          />
        </div>

        <div className='mb-5'>
          <label htmlFor='sintomas' className='block text-green-700 uppercase font-bold'>Sintomas</label>
         <textarea
          id="sintomas" 
          className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md' 
          placeholder='Describe los síntomas'
          value={sintomas}
          onChange={(e) => setSintomas(e.target.value)}
          >
              
         </textarea>
        </div>
        <input type="submit" value={paciente.id ? 'Editar Paciente' : 'Agregar Paciente'} className='bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all' />
          {/*El ternario que está en el Value, es para cambiar el nombre del boton, cuando encuentre un Id */}
      </form>
    </div>
  )
}
