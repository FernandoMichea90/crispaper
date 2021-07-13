import React, { useEffect,useState } from 'react'
import Firebase from '../firebase/firebase'
import { Typography,makeStyles,Grid,CircularProgress } from '@material-ui/core'
import Paper from "../Componetes/Paper"
import EtiquetasIcon from '@material-ui/icons/LocalOffer';
import { useHistory } from 'react-router-dom';




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
const recientes=props.recientes
const valorados=props.valorados



// buscar etiquetas 

const buscaretiquetas=async()=>{

 setcargando(true)   
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
 armarpaper(lista)
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
                          
                            Tags
                        </Typography> 


             </div>  


                {!cargando?
                
                
                  paper.length!=0?
                
                paper.map(paper=>(

                    <div>

                        <div className={clases.divEtiqueta} >

                         
                                <Typography   className={clases.texto} variant="h4" align="left">
                                <EtiquetasIcon color="primary"/>
                                    {paper.tag}

                                </Typography>
                              
                         </div>     


                        {!paper.lista.length ?


                                <div className={clases.divReg} >
                                 <Typography variant="h5" align="center"
                            className={clases.texto}
                                 >
                          
                            No   se encontraron registros
                        </Typography> 
                                </div>  
                       
                            :

                               paper.lista.map(a=>(

                                <Paper Paper={a} ></Paper>

                                
                               )) 

                               
                        }

                     

                        </div>      

                ))
                
                :
              
                <div style={{width:"inherit"}}>
                <Typography className={clases.
                    textNoDisponible
                     }  align="center" variant="h4">
                              No ahi registros
                    </Typography>          
                    </div>


                
                :
                
                <div className={clases.divCircular} >
                    <CircularProgress className={clases.circular}></CircularProgress>
                </div>
                
                }




        </div>
    )
}

export default Etiquetas
