import React,{useEffect,useState} from 'react'
import { Grid,Typography, Avatar, makeStyles,CircularProgress,Button } from '@material-ui/core'
import firebase from '../firebase/firebase'
import userImagen from "../imagen/user.png"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';



const estilos=makeStyles((theme)=>({


    root:{

        " & .MuiButton-containedPrimary:hover" :{
            backgroundColor: "#303f9f00",
            color:"#5fcccf",
            border:"1px solid"
        },

    },



    tituloGeneral:{

        fontWeight:"700",
        fontFamily:"Lato",
        fontSize:"27px"
        },                     
        divTituloGeneral:{
                margin:"55px auto",
                width:"85vw"
        },
        textNoDisponible:{


            fontFamily:"Nunito",
            color:"#808080"

    },

    divCircular:{
        marginTop:"100px",
        width:"inherit"

    },
    circular:{
        height:"72px !important",
        width:"72px !important",
        display:"block",
        margin:"auto"
        },


}))




const Usuarios = () => {

 const clases=estilos()   

 // solicitud maxima de usarios 
const usuariosSolicitados=3
//usuarios mostrados
const usuariosMostrados=2

const [usuarios, setusuarios] = useState([])
const [ultimo, setultimo] = useState()
const [vacio, setvacio] = useState(false)
const usuariosRef=firebase.db.collection("usuarios")

const [cargando, setcargando] = useState(false)


    const listAllUsers =async()=> {
    
        
    // crear nueva lista 
        let  nuevalista=[]
        await usuariosRef.orderBy("nombre","asc").get().then(doc=>{
            //console.log(doc.docs)
            //   reducir a uno la lista 
 
            //    for(let i=0;i<)    
                let tamaño=doc.docs.length
               
                for(let i=0;i<tamaño-1;i++){

                    console.log(doc.docs[i].data())
                    nuevalista.push(doc.docs[i].data())
                }

                setultimo(doc.docs[usuariosMostrados-1].id)
    
                if(tamaño==usuariosSolicitados){
                            setvacio(false)
                    }else{
                            setvacio(true)
                    } 
        })
         setusuarios(nuevalista)
         setcargando(false)   

    }
    

    const pedirMas =async()=> {
    
        try{
                        // crear nueva lista 
                            let  nuevalista=[]


                            await usuariosRef.doc(ultimo).get().then(async(doc)=>{
                                  
                            await usuariosRef.orderBy("nombre","asc").startAfter(doc).get().then(doc=>{
                                //console.log(doc.docs)
                                //   reducir a uno la lista 
                                console.log("paso por aca")
                                //    for(let i=0;i<)    
                                    let tamaño=doc.docs.length

                                console.log(tamaño)
                               
                                console.log(doc.docs[0].data())
                                if(tamaño==usuariosSolicitados){
                                    for(let i=0;i<tamaño-1;i++){
                                        console.log(i)
                                        console.log(doc.docs[i].data())
                                        nuevalista.push(doc.docs[i].data())
                                            
                                    }
                                }else{
                                    for(let i=0;i<=tamaño-1;i++){
                                        console.log(i)
                                        console.log(doc.docs[i].data())
                                        nuevalista.push(doc.docs[i].data())
                                            
                                    }
                                }



                                    // insertar el ultimos
                                
                                    setultimo(doc.docs[usuariosMostrados-1].id)
                    
                                    if(tamaño==usuariosSolicitados){
                                                setvacio(false)
                                        }else{
                                                setvacio(true)
                                        } 
                            })

                             })
                            setusuarios((usuarios)=>[...usuarios,...nuevalista])
                            setcargando(false)   


                        }catch(error){console.log(error)}
                    
        }
        

    useEffect(() => {
           // Start listing users from the beginning, 1000 at a time.
      setcargando(true)     
      listAllUsers();

    }, [])







    return (
       
        <Grid className={clases.root} container>
            <Grid xs={12} md={1}>

            </Grid>
            <Grid xs={12} md={10}>
                        
    


                    <div className={clases.divTituloGeneral}>
                         <Typography variant="h4" className={clases.tituloGeneral}>
                                Lista de Usuarios
                        </Typography>
                </div>





                    <div>

                   
                                {
                                cargando?
                                <div className={clases.divCircular} >
                                <CircularProgress className={clases.circular}></CircularProgress>
                                </div> 
                                :
                                
                                
                                usuarios.length ?
                                   
                                   <>
                                       {
                                    usuarios.map(doc=>(
                                        
                                     
                                        <Grid container>
                                            
                                                    <Grid xs={4}>
                                                    <div >
                                                        {doc.photoURL==null?
                                                             
                                                             <Avatar style={{margin:"auto"}} src={userImagen}></Avatar>
                                                             :
                                                   
                                                             <Avatar  style={{margin:"auto"}} src={`${doc.photoURL}`}></Avatar>

                                                        }                                        
                                                    
                                                    </div>
                                            </Grid>
                                            <Grid xs={4}>
                                                    {doc.nombre}
                                            </Grid>

                                            <Grid xs={4}>
                                                    {doc.correo}
                                            </Grid>

                                               <Grid xs={12}>
                                                    <hr></hr>
                                                </Grid>            
                                          
                                        </Grid>
                                    )
                                  )   
                                  
                                  }



{/*                                                                     
                                {vacio==false &&

                                <Typography align="center">
                                <Button 
                                        endIcon={<ExpandMoreIcon></ExpandMoreIcon>}
                                        variant ="contained"
                                        color="primary"

                                onClick={()=>{
                                    pedirMas()
                                }} >
                                ver mas

                                        </Button> 
                                </Typography>   }                      */}




                                  </> 
                                
                                
                                :

                                <Grid xs={12}>
                                        <Typography className={clases.
                              textNoDisponible
                               } align="center" variant="h4">
                                        No hay registros
                              </Typography>          
                           

                                 </Grid>
                                
                                
                                }





                    </div>


            </Grid>

            <Grid xs={12} md={1}>

            </Grid>


        </Grid>
    )
}

export default Usuarios
