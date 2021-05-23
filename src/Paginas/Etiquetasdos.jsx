import React, { useEffect,useState } from 'react'
import Firebase from '../firebase/firebase'
import { Typography,makeStyles,Grid,CircularProgress } from '@material-ui/core'
import Paper from "../Componetes/Paper"
import EtiquetasIcon from '@material-ui/icons/LocalOffer';
import { useHistory } from 'react-router-dom';
import Paperdos from "../Componetes/Paperdos"




const estilos=makeStyles((theme)=>({
    texto:{
        fontFamily:"nunito",
        fontWeight:"300"

    },
    divTag:{

        padding:"50px 0px"
    },
    divEtiqueta:{

        margin:"29px auto",
        width:"75vw"

    },
    divReg:{

        margin:"45px auto",
        width:"75vw"

    },
    divCircular:{
        marginTop:"100px"

    },
    circular:{
        height:"72px !important",
        width:"72px !important",
        display:"block",
        margin:"auto"
        }

        ,textNoDisponible:{


            fontFamily:"Nunito",
            color:"#808080"
        } }
))



const Etiquetas = (props) => {
 
const clases=estilos()    
const [etiquetas, setetiquetas] = useState([])
const [paper, setpaper] = useState([])
const [cargando, setcargando] = useState(false)
const [changeLike, setChangeLike] = useState({
    cambio:false,
    idEtiqueta:null,
    paper:null


})
const recientes=props.recientes
const valorados=props.valorados



// buscar etiquetas 

const buscaretiquetas=async()=>{
 setcargando(true)   
 await Firebase.db.collection("etiquetas").onSnapshot(manejarSnapshot)
}

// buscar etiquetas 

const buscaretiquetasdos=async()=>{
    //setcargando(true)   
    await Firebase.db.collection("etiquetas").onSnapshot(manejarSnapshot)
   }
function manejarSnapshot(snapshot){

    const lista =snapshot.docs.map(doc=>{

        return {

            id:doc.id,
            ...doc.data()
        }


    })

 setetiquetas(lista)
 setcargando(false)
 //armarpaper(lista)
 //segunda lista return true 

}
// armar paper 

const armarpaper=async (lista)=>{


    let armar =[]

    await Promise.all(lista.map(async(valor)=>{
        
        var prueba=await consulta(valor.descripcion)
          
            armar.push(prueba)
       
        //   return armar 
                      
        }))
     
console.log(armar)
armar.sort((a,b)=> (a.cantidad<b.cantidad) ? 1 : -1 )
console.log(armar)
setpaper(armar)
 setcargando(false)
//    const testdos=ordenarpaper(test)
//    console.log(testdos)     
}

const armarconsultrecientes=(lista)=>{

    lista.sort((a,b)=>(a.subida<b.subida)?1:-1)
    return lista 


}
const armarconsultvalorados=(lista)=>{

    lista.sort((a,b)=>(a.likes<b.likes)?1:-1)
    return lista 


}
 const consulta =async(etiquetas,res)=>{
    try {
        

       

     var consulta = await Firebase.db.collection("paper").where("etiquetas", "array-contains", etiquetas).get()
         

    
    // var consulta = await Firebase.db.collection("paper").where("etiquetas", "array-contains", etiquetas).get()
  
   var consult=consulta.docs.map(doc=>{

        return {

            id:doc.id,
            ...doc.data()
        }

   
    })

         

    if(recientes){

        var consult =  armarconsultrecientes(consult)
}
if(valorados){

    var consult =  armarconsultvalorados(consult)
}


    
        res={
           tag:etiquetas,
           lista:consult,
           cantidad:consult.length
        }
       
      return res 
    } catch (error) {
     return {}
    }

 } 

useEffect(async() => {

    const {valor}=props.match.params

 
    if(valor){

        setcargando(true)
        setetiquetas(valor)
          
    var consulta = await Firebase.db.collection("paper").where("etiquetas", "array-contains", valor).get()
  
    var consult=consulta.docs.map(doc=>{
 
         return {
 
             id:doc.id,
             ...doc.data()
         }
 
    
     })



 if(recientes){

        var consult =  armarconsultrecientes(consult)
}
if(valorados){

    var consult =  armarconsultvalorados(consult)
}


     var res={
        tag:valor,
        lista:consult,
        cantidad:consult.length
     }
       
     setpaper([res])
     
     setcargando(false)
         
    
    }else{ 
    buscaretiquetas()
    }


}, [props])


    return (



     
        <div style={{marginTop:"88px"}} >


            
    
            <div className={clases.divTag} >
                    <Typography variant="h3" align="center"
                            className={clases.texto}
                    >
                          
                            Etiquetas 
                        </Typography> 


             </div>  

            {
                !cargando?
                <div>
                        {etiquetas.length!=0&&
                                <div>
                                    {
                                         etiquetas.map(tag=>(
                                <div key={tag.id} >
                                    <div className={clases.divEtiqueta} >
                         
                                    <Typography   className={clases.texto} variant="h4" align="left">
                                    <EtiquetasIcon color="primary"/>
                                        {tag.descripcion}
    
                                    </Typography>
                                  
                                      </div>     
                                      <div>
                                         
                                   
                                                <div  >
                                                    
                                                    <div>
                                                        <Paperdos id={tag.id}  changeLike={changeLike} setChangeLike={setChangeLike}   etiquetas={tag} buscaretiquetas={buscaretiquetas}   ></Paperdos>
                                                    </div>  
                                                    </div>
                        
                                                    
                                                    
                                        
                                      </div>  
                                      </div>
    
                                )
                                )}
                                </div>
                        }


                </div>:

                         <div>
                                <div className={clases.divCircular} >
                                        <CircularProgress className={clases.circular}></CircularProgress>
                                    </div>
                        </div>

            }


                  
            
        </div>
    )
}

export default Etiquetas
