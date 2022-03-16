import {useState, useEffect} from 'react'
import { Header } from './components/Header' 
import { Form } from './components/Form' 
import { ListPacients } from './components/ListPacients'


function App() {
const [pacientes, setPacientes] =useState([])
const [paciente, setPaciente] = useState({})

//Para detectar si hay data en el Storage y no se pierda los cambios al recargar el Nav
useEffect(()=>{
  const obtenerLocalStorage =()=>{
    const pacientesLS = JSON.parse(localStorage.getItem('pacientes')) ?? []
    setPacientes(pacientesLS);
  }
  obtenerLocalStorage()
},[])

//Guardando los datos del form en el localStorage
//El localStorage solo recibe strings, por eso toca convertir el array a string
useEffect(()=>{
  localStorage.setItem("pacientes", JSON.stringify(pacientes))
},[pacientes])

//Función para el botón eliminar
const eliminarPaciente = (id) =>{
  const pacientesActualizado = pacientes.filter(paciente => paciente.id !== id)
  setPacientes(pacientesActualizado)
} 

return (
    <div className="container mx-auto mt-20">
      
      <Header />
    <div className='mt-12 md:flex'>
    <Form
     pacientes={pacientes}
     setPacientes={setPacientes} //Pasando PROPS
     paciente={paciente}
     setPaciente={setPaciente}
    />

    <ListPacients 
    pacientes={pacientes} //prop para llamar los datos, del form, desde la memoria a la pantalla
    setPaciente = {setPaciente}
    eliminarPaciente = {eliminarPaciente}
    />
    </div>
      <input type="text" />
    </div>
  )
}

export default App
