import React from 'react';
import { Patients } from './Patients';

  //Como traemos la data con los props, debemos iterar el array
export const ListPacients = ({pacientes, setPaciente, eliminarPaciente}) => { // este prop(pacientes) viene desde App

 
  
  return (
    <div className='md:w-1/2 lg:w-3/5 md:h-screen overflow-y-scroll'>
      {pacientes && pacientes.length ? (
        <>
           <h1 className='font-black text-3xl text-center'>Listado de pacientes</h1>
           <p className='text-xl mt-5 mb-10 text-center'>
             Administra tus  
             <span className='text-indigo-600 font-bold'> pacientes y citas</span>
           </p>
     
           {pacientes.map((paciente )=>{
             return(
               <Patients
                 key={paciente.id} //este id se genera dentro del objeto y función que hicimos en el form
                 paciente={paciente}
                 setPaciente={setPaciente}//prop para el botón editar
                 eliminarPaciente={eliminarPaciente}
               />
             )
           })}
        </>
     
      )
      : (
        <>
        <h1 className='font-black text-3xl text-center'>No hay pacientes</h1>
           <p className='text-xl mt-5 mb-10 text-center'>
                Agrega pacientes para verlos 
             <span className='text-indigo-600 font-bold'> en esta sección</span>
           </p>
        </>
      )}
      
   
      
      
    </div>
  )
}

