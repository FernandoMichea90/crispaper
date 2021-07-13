import React, { useEffect,useState ,useContext} from 'react'
import Firebase from '../firebase/firebase'
import { Typography,makeStyles,Grid,CircularProgress,Button } from '@material-ui/core'
import Paper from "../Componetes/Paper"
import EtiquetasIcon from '@material-ui/icons/LocalOffer';
import { useHistory } from 'react-router-dom';
import Paperdos from "../Componetes/Papertres"
import { UsuarioContext } from '../Provedores/UsuarioContext';
import {actualizarPaper,ActualizarPaperEnEtiquetas} from '../Funciones/PaperDoc'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';





const estilos=makeStyles((theme)=>({
    
    root:{

        "& .botonEtiqueta":{
            background:"#ffffff",
            color:"#212121 !important",
            marginTop:"10px",
            fontSize:"27px",
            fontFamily:"nunito",
            "&:hover": {
                background:"#36cbce",
                color:"#ffffff!important",
             },
        
        },
        "& .botonEtiqueta .MuiSvgIcon-root":{
            color:"#36cbce"
        },
        
        "& .botonEtiqueta:hover .MuiSvgIcon-root":{
            color:"#ffffff"
        },
        

        " & .MuiButton-containedPrimary:hover" :{
            backgroundColor: "#303f9f00",
            color:"#5fcccf",
            border:"1px solid"
        },

    },
    
    texto:{
        fontFamily:"nunito",
        fontWeight:"300",
    


    },textoDos:{
        fontFamily:"nunito",
        fontWeight:"300",
        textTransform:"uppercase"


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
const history=useHistory()

const usuario =useContext(UsuarioContext)
// guardar el valor 
const [elvalor, setelvalor] = useState()
// state etiquet para pedir mas 
const [etiquetarray, setetiquetarray] = useState([])
const [etiquetas, setetiquetas] = useState([])
const [pedirmas, setpedirmas] = useState(false)
const [paper, setpaper] = useState([])
const [cargando, setcargando] = useState(false)
const [ultimo, setultimo] = useState(0)
const [changeLike, setChangeLike] = useState({
    cambio:false,
    idEtiqueta:null,
    paper:null


})
const recientes=props.recientes
const valorados=props.valorados
//  crear nuevo state para el  el nuevo arreglo 
const [paperArray, setpaperArray] = useState([])
// buscar etiquetas 
const buscaretiquetas=async()=>{
 setcargando(true)   
 
  const lista  =await Firebase.db.collection("etiquetas").get()

  const listados = await Promise.all(lista.docs.map(async(doc)=>{
            //console.log(doc.data())
            // etiqueta 
             let etiqueta= {id:doc.id,
                 ...doc.data()}
            console.log(etiqueta)  
            //mapear etiqueta 
             let listatres=[] 
             
                    if (valorados){
                        listatres=await Firebase.db.collection("etiquetas").doc(etiqueta.id).collection("paper").orderBy("likes","desc").limit(2).get()
                    }else{

                                if(recientes){
                                    listatres=await Firebase.db.collection("etiquetas").doc(etiqueta.id).collection("paper").orderBy("subida","desc").limit(2).get()


                                }else{

                                    listatres=await Firebase.db.collection("etiquetas").doc(etiqueta.id).collection("paper").limit(2).get()
                                } 
                    }

             
             const listacuatro= listatres.docs.map(doc=>{
                    return {
                        id:doc.id,
                        ...doc.data(),
                        click:false,
                    }  
             }
             )       
             console.log(listacuatro)
             return{
                etiquetas:etiqueta,
                paper:listacuatro

            }
                // return {
                //     id:doc.id,
                //     ...doc.data()
                // }
            }))  
                         
  console.log(listados)        
  setpaperArray(listados)  
  setcargando(false)


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


const armarconsultrecientes=(lista)=>{
    lista.sort((a,b)=>(a.subida<b.subida)?1:-1)
    return lista 
}
const armarconsultvalorados=(lista)=>{

    lista.sort((a,b)=>(a.likes<b.likes)?1:-1)
    return lista 

}
const megusta=(valor)=>{
        console.log(valor)
        megustacuatro(valor)
}
// Éste va a ser el me gusta sin validar usuario
const megustaSinValidarUsuario=(paperNuevo)=>{

    // recorrer arreglo en donde esta etiqueta y paper 'paperArray'
    //crear nueva constante del paper
    const nuevoPaperArray=paperArray.map(paperMap=>{

                    //recorrer solo arreglo paper 
                    //paperMap = paper[]
                    console.log(paperArray)
                     let paper=paperMap.paper.map((paperNew)=>{
                                //validar que los paper coincidan 
                                if(paperNew.id==paperNuevo.id){
                                    console.log(paperMap.etiquetas.id)

                                        //

                                    return paperNuevo
                                } else{
                                    return paperNew
                                }       
                        })                
                // crear nuevo objeto con  la etiqueta y el paper 
                let nuevoObjeto={
                    etiquetas:paperMap.etiquetas,
                    paper:paper   
                }
                //retornar objeto  
                return nuevoObjeto
    })
// insertar  paperArray
  setpaperArray(nuevoPaperArray)

    
}


const pedirMore=()=>{
    listaconid(elvalor,true)    
}



const megustacuatro=async(valor)=>{ 
    setcargando(true)
    if(usuario==null) {
            return history.push("/login")
    }
    // prueba de las funciones 
    //const valorRenovado=  await RetornarPaper(valor.id)
    //valor=valorRenovado
    if(valor.haVotado==undefined){                    
            var antiguoHaVotado=[]
    }else{
            var antiguoHaVotado=valor.haVotado
    }                      
    // nuevo paper 
    let newPaper={}
    let nuevaLista=[]
    if(antiguoHaVotado.includes(usuario.uid)){ 
            antiguoHaVotado=antiguoHaVotado.filter(function(obj){
                    return obj!==usuario.uid
            })
            let megusta=valor.likes-1 
             newPaper={
                    ...valor,
                     likes:megusta,
                    haVotado:antiguoHaVotado
            }
             //listaPaperdos(newPaper,megusta,antiguoHaVotado)
            //await firebase.db.collection("paper").doc(valor.id).update(nuevoPaper)
            //RenovarPaperMapEtiqueta(nuevoPaper)
            // 
            nuevaLista= megustacinco(newPaper,megusta,antiguoHaVotado)
    console.log(newPaper)
 }else{ 
    // alert("no incluido")
 const nuevoHaVotado = [...antiguoHaVotado, usuario.uid];
 console.log(nuevoHaVotado)
 let megusta=valor.likes+1   
 

 // crear variable de paper 

 newPaper={
    ...valor,
     likes:megusta,
    haVotado:nuevoHaVotado
}
nuevaLista=megustacinco(newPaper,megusta,nuevoHaVotado)
console.log(newPaper,megusta,nuevoHaVotado)
//listaPaperdos(newPaper,megusta,nuevoHaVotado)
//await firebase.db.collection("paper").doc(valor.id).update(nuevoPaper)

//RenovarPaperMapEtiqueta(nuevoPaper)



    //        let arreglo=paper 
    //        setpaper([])

    // const nuevoPaper=arreglo.map(papel=>{
    //    if(valor.id==papel.id){



             
    //         return{
    //                 ...papel,
    //                 likes:1
    //         }

    //    }

    //    return papel

    // })

    // setpaper(nuevoPaper)

}

console.log(nuevaLista)
setpaperArray(nuevaLista)
setcargando(false)
 actualizarPaper(newPaper)
 ActualizarPaperEnEtiquetas(newPaper)
// buscaretiquetas()
// props.setChangeLike({
//         cambio:true,
//         idEtiqueta:props.id,
//         paper:newPaper
//     })


         




}



const  megustacinco=(valor,megusta,nuevosvotos)=>{

  const nuevaLista =paperArray.map(doc=>{

                console.log(doc)
                  const nuevaListaDos=doc.paper.map(doc=>{
                        console.log(doc)
                                if(valor.id==doc.id){

                               
                                    return {
                                        ...valor,
                                        likes:megusta,
                                        haVotado:nuevosvotos       
                                    }
                            }



                            return doc


                    })


                   return {
                       etiquetas:doc.etiquetas,
                       paper:nuevaListaDos
                   }

  })

  return nuevaLista


}




const listaconid=async(valor,ruta)=>{

    setcargando(true)
        setetiquetas(valor)
        setpedirmas(true)
          

    if(ruta){
        
        var consulta = await Firebase.db.collection("etiquetas").doc(valor).collection("paper").orderBy("id","desc").startAfter(ultimo).limit(5).get()


    }else{
        var consulta = await Firebase.db.collection("etiquetas").doc(valor).collection("paper").orderBy("id","desc").limit(5).get()
        }

    var consult=consulta.docs.map(doc=>{
 
         return {
 
             id:doc.id,
             ...doc.data()
         }
 
    
     })

     console.log(consult)

     // guardar en el state la etiqueta 
     
     setetiquetarray(antiguo=>[...antiguo,...consult])


     if(consult.length){
        let nuevoultimo=consult[consult.length-1].id
                 console.log(nuevoultimo)
                if(nuevoultimo!=undefined){
                    setultimo(consult[consult.length-1].id)
                    
                }

    }
     

// console.log(consult)

// armar consulta del nuevo arreglo 

const etiquet = await Firebase.db.collection("etiquetas").doc(valor).get().then((doc)=>{
    // console.log(doc.id)
    // console.log(doc.data())
    return{
        id:doc.id,
        ...doc.data()

    }

})

console.log(etiquet)


// armar el objeto 

const nuevoObjeto={
    etiquetas:etiquet,
    paper:consult
}

console.log(nuevoObjeto)

let prueba=[]
prueba.push(nuevoObjeto)
setpaperArray(prueba)
setcargando(false)

//  if(recientes){
//          alert("prueba")
//         var consult =  armarconsultrecientes(consult)
// }
// if(valorados){

     
    //     var consult =  armarconsultvalorados(consult)
    // }


    //      var res={
    //         tag:valor,
    //         lista:consult,
    //         cantidad:consult.length
    //      }
        
    //      setpaper([res])
        
    //      setcargando(false)
            

    }

    
    useEffect(async() => {
    
        const {valor}=props.match.params



    

        if(valor){
            setelvalor(valor)
            listaconid(valor,false)
        
        }else{ 
        //alert("prueba")
        buscaretiquetas()
        setpedirmas(false)
        }


    }, [props])


        return (



        
            <div className={clases.root}  >


                
        
                <div className={clases.divTag} >
                        <Typography variant="h3" align="center"
                                className={clases.texto}
                        >
                            
                                Tags
                            </Typography> 


                </div>  

                {
                    !cargando?
                    <div>
                            {paperArray.length!=0?
                                    <div>
                                        {
                                        paperArray.map(paper=>(
                                    <div  >
                                        <div id="etiqueta" className={clases.divEtiqueta} >
                            
                                    <Typography   className={clases.textoDos} variant="h4" align="left">
                                        <EtiquetasIcon color="primary"/>
                                            {paper.etiquetas !=undefined&&
                                            
                                            paper.etiquetas.descripcion}
        
                                        </Typography> 



                                            {/* <Button id="etiqueta" size="large"

                                            className="botonEtiqueta"
                                            startIcon={<EtiquetasIcon/>}
                                            >
                                            {paper.etiquetas !=undefined&&
                                        
                                        paper.etiquetas.descripcion}
                                        </Button> */}

                                  
                                      </div>     
                                      <div>



                                         
                                   
                                                <div  >
                                                    
                                                    {paper.etiquetas !=undefined&&
                                                    paper.paper.length!=0?
                                                               paper.paper.map(doc=>(
                                                             <div>
                                                                <Paperdos  paper={doc}  buscaretiquetas={buscaretiquetas}   length={paper.paper.length}   changeLike={changeLike} setChangeLike={setChangeLike}   megusta={megusta} cambiarLike={megustaSinValidarUsuario}  ></Paperdos>
                                                                         
                                                            
                                                            
                                                             </div>   
                                                
                                                            ))

                                                            

                                                                



               
                                                               


                                                :
                                                
                                                <Typography className={clases.
                                                    textNoDisponible
                                                     } align="center" variant="h5">
                                                              No hay registros
                                                    </Typography>          


                                                }

                                                </div>




                                                { 
                                                    pedirmas?
                                                
                                                    <Typography align="center">
                                                    <Button 
                                                            endIcon={<ExpandMoreIcon></ExpandMoreIcon>}
                                                            variant ="contained"
                                                            color="primary"
                                                           onClick={()=>pedirMore()}
                                                       
                                                    
                                                    >
                                                    see more
                                                            </Button> 
                                                 </Typography>
                                                    :
                                                paper.etiquetas.contar >2&&
                                                
                                                <Typography align="center">
                                                                <Button 
                                                                        endIcon={<ExpandMoreIcon></ExpandMoreIcon>}
                                                                        variant ="contained"
                                                                        color="primary"
                                                                        href= {`/tag/${paper.etiquetas.id}`}
                                                                   
                                                                
                                                                >
                                                                see more
                                                                        </Button> 
                                                </Typography>   }             


                                                
                                                    {/* <div>
                                                        <Paperdos id={tag.id}  changeLike={changeLike} setChangeLike={setChangeLike}   etiquetas={tag} buscaretiquetas={buscaretiquetas}   ></Paperdos>
                                                    </div>   */}
                                               
                        
                                                    
                                                    
                                        
                                      </div>  
                                      </div>
    
                                )
                                )
                                
                                




                                
                                
                                }







                                </div>
                        
                    :
                    <div style={{width:"inherit"}}>
                    <Typography className={clases.
                        textNoDisponible
                         }  align="center" variant="h4">
                                  No ahi registros
                        </Typography>          
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
