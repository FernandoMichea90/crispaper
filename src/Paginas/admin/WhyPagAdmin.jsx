import React,{useState,useEffect} from 'react'
import {Grid,TextField,Button} from '@material-ui/core'
import Estilos from '../../Componetes/Estilos'
import AdminComponentes from './AdminComponentes'
import FuncionesFirebase from '../../Funciones/FuncionesFirebase'
import Swal from 'sweetalert2'
import Cargando from '../../Componetes/Cargando'







const WhyPagAdmin = (props) => {
    const estilos=Estilos()
    const [cargando, setcargando] = useState(true)
    const [cargandoGuardar, setcargandoGuardar] = useState(false)
    const [principal, setPrincipal] = useState({
        titulo:'',descripcion:''
    })
    const [componente, setcomponente] = useState([])
    const actualizarStatePrincipal=(e)=>{
        e.preventDefault()
        setPrincipal({...principal,
        [e.target.name]:e.target.value
        })
    }
const armarLista=async()=>{
      let listaComp=[]
      let compUno=await FuncionesFirebase.pedirComponenteUno()
      let compDos=await FuncionesFirebase.pedirComponenteDos()
      let compTres=await FuncionesFirebase.pedirComponenterTres()
      listaComp.push(compUno,compDos,compTres)
      setcomponente(listaComp)
      setcargando(false)
}
const editarCabeza=async()=>{
    setcargandoGuardar(true)
    try{
        await FuncionesFirebase.editarCabeza(principal)
            Swal.fire(
                'Exito!',
                'Los cambios se realizaron con exito',
                "success"

            )
            setcargandoGuardar(false)
    }
    catch(e){
        console.log("hubo en un error")
    }
}
    useEffect(async() => {
            let consultaCabeza=await FuncionesFirebase.pedirCabeza()
             setPrincipal(consultaCabeza)
            //peticiones a la base de datos
            armarLista()
             //setPrincipal(prin)      
            // setcomponente(list)         
           
    }, [])
    return (
        <div className={estilos.cajaAdminWhy} >
            <Grid container>
                <Grid  sm={2} xs={12}> </Grid>
                <Grid sm={8} xs={12}>


                {cargando ?
                    <Cargando></Cargando>
                    :

                
                    <>
                     {cargandoGuardar ?
                        <Cargando></Cargando>
                        :
                        <>  
                    <TextField 
                        variant='outlined'
                        label='Titulo'
                        name="titulo"
                        fullWidth
                        onChange={actualizarStatePrincipal}
                        value={principal.titulo}
                    >

                    </TextField>
                    <TextField 
                        variant='outlined'
                        label='Descripcion'
                        name='descripcion'
                        fullWidth
                        multiline
                        onChange={actualizarStatePrincipal}
                        rowsMax={8}
                        value={principal.descripcion}
        
                    ></TextField>
                

                <Button
                    className={estilos.botonVerde}
                     onClick={()=>{
                         editarCabeza()
                     }}       
                >

                        Guardar        
                </Button>
                </> }
                 {componente.map((doc,index)=>(
 
                        <AdminComponentes key={doc.titulo} index={index} componente={doc}  componentes={componente} >
                                            
                        </AdminComponentes>        


                 ))
                 }               
            
                    
                </>  
            }
                </Grid>
                <Grid sm={2} xs={12}></Grid>
            </Grid>


        </div>
    )
}

export default WhyPagAdmin
