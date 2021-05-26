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

        " & .MuiButton-containedPrimary:hover" :{
            backgroundColor: "#303f9f00",
            color:"#5fcccf",
            border:"1px solid"
        },


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
        marginTop:"50px",
        marginBottom:"129px"

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
//state etiquet 
const [etiquet, setetiquet] = useState([])
// guardar el valor 
const [elvalor, setelvalor] = useState()
// state etiquet para pedir mas 
const [etiquetarray, setetiquetarray] = useState([])
const [etiquetas, setetiquetas] = useState([])
const [pedirmas, setpedirmas] = useState(false)
const [paper, setpaper] = useState([])
const [cargando, setcargando] = useState(false)
const [cargandodos, setcargandodos] = useState(false)
const [esconderboton, setesconderboton] = useState(false)

const [changeLike, setChangeLike] = useState({
    cambio:false,
    idEtiqueta:null,
    paper:null


})
const recientes=props.recientes
const valorados=props.valorados
//  crear nuevo state para el  el nuevo arreglo 
const [paperArray, setpaperArray] = useState([])
const [ultimo, setultimo] = useState(0)
const {id} =props.match.params


const limite=5
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
                        ...doc.data()
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




const megusta=(valor)=>{

    
        megustacuatro(valor)


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
    
 const nuevoHaVotado = [...antiguoHaVotado, usuario.uid];
 console.log(nuevoHaVotado)
 let megusta=valor.likes+1   
 newPaper={
    ...valor,
     likes:megusta,
    haVotado:nuevoHaVotado
}
nuevaLista=megustacinco(newPaper,megusta,nuevoHaVotado)
console.log(newPaper,megusta,nuevoHaVotado)

}

console.log(nuevaLista)
setetiquetarray(nuevaLista)
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


  const nuevaLista =etiquetarray.map(doc=>{
                                if(valor.id==doc.id){  
                                    return {
                                        ...valor,
                                        likes:megusta,
                                        haVotado:nuevosvotos       
                                    }
                            }else{
                                return{...doc}
                            }
                    })


  return nuevaLista


}




const listaconid=async(valor,ruta)=>{

   
    // guardar la etiqueta que se esta buscando 
    setetiquetas(valor)
    // ¿sera necesario ?
      setpedirmas(true)

    //esconder el button 
    setesconderboton(false) 
          


            if(recientes){
                var consulta = await Firebase.db.collection("etiquetas").doc(valor).collection("paper").orderBy("subida","desc").limit(limite).get()


            }else{

                if(valorados){

                    var consulta = await Firebase.db.collection("etiquetas").doc(valor).collection("paper").orderBy("likes","desc").limit(limite).get()

                }else{
                    var consulta = await Firebase.db.collection("etiquetas").doc(valor).collection("paper").orderBy("id","desc").limit(limite).get()

                }

            }



    var consult=consulta.docs.map(doc=>{
 
         return {
 
             id:doc.id,
             ...doc.data()
         }
 
    
     })
     // guardar en el state la etiqueta 
     setetiquetarray(consult)
     if(consult.length){
        let nuevoultimo=consult[consult.length-1].id
                 console.log(nuevoultimo)
                if(nuevoultimo!=undefined){
                    setultimo(consult[consult.length-1].id)
                    
                }

    }
     

// console.log(consult)




// armar el objeto 

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




 const listardesdeelultimo=async()=>{
  
    setcargandodos(true)


    if (recientes){
        
        var consulta = await Firebase.db.collection("etiquetas").doc(etiquet.id).collection("paper").orderBy("subida","desc").limit(limite).get()

        var consulta = await Firebase.db.collection("etiquetas").doc(etiquet.id).collection("paper").doc(ultimo).get().then(async doc=>{          
            let nuevaLista=[]
             let nuevaListados=await Firebase.db.collection("etiquetas").doc(etiquet.id).collection("paper").orderBy("subida","desc").startAfter(doc).limit(1).get()
             return nuevaListados
    
            })

    }else{

            if(valorados){
               
                //var consulta = await Firebase.db.collection("etiquetas").doc(etiquet.id).collection("paper").orderBy("likes","desc").startAfter(ultimo).limit(1).get()
                
                var consulta = await Firebase.db.collection("etiquetas").doc(etiquet.id).collection("paper").doc(ultimo).get().then(async doc=>{
                        
                        let nuevaLista=[]
                         let nuevaListados=await Firebase.db.collection("etiquetas").doc(etiquet.id).collection("paper").orderBy("likes","desc").startAfter(doc).limit(1).get()
                         return nuevaListados
                
                        })

               
            }else{
              
                var consulta = await Firebase.db.collection("etiquetas").doc(etiquet.id).collection("paper").doc(ultimo).get().then(async doc=>{
                        
                    let nuevaLista=[]
                     let nuevaListados=await Firebase.db.collection("etiquetas").doc(etiquet.id).collection("paper").orderBy("id","desc").startAfter(doc).limit(1).get()
                     return nuevaListados
            
                    })
            }

    }
    var consult=consulta.docs.map(doc=>{
 
        return {

            id:doc.id,
            ...doc.data()
        }

   
    }) 
    console.log(consult)   
    setetiquetarray((viejo)=>[...viejo,...consult])
    if(consult.length){
        let nuevoultimo=consult[consult.length-1].id
        setultimo(nuevoultimo)


    }
    
    if(etiquet.contar==etiquetarray.length+consult.length){
    setesconderboton(true)
    }else{
        setesconderboton(false)
    }


    console.log(cargandodos)
   setcargandodos(false)
 } 


    
    useEffect(async() => {
        
        setcargando(true)
        setcargandodos(false)
       
        const {valor}=props.match.params
      
         //  guardar en un state en una etiqueta 

            const etiquet = await Firebase.db.collection("etiquetas").doc(valor).get().then((doc)=>{
                // console.log(doc.id)
                // console.log(doc.data())
                        return{
                            id:doc.id,
                            ...doc.data()

                        }

                    })

      
            setetiquet(etiquet)
            listaconid(valor,false)
    

    }, [props,id])


        return (



        
            <div className={clases.root} style={{marginTop:"88px"}} >
        
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
                                        <div id="etiqueta" className={clases.divEtiqueta} >
                            
                                                    <Typography   className={clases.textoDos} variant="h4" align="left">
                                                        <EtiquetasIcon color="primary"/>
                                                            {etiquet.descripcion}
                        
                                                    </Typography> 
                                                
                                        </div>     
                                        <div>
                                                    <div>
                                                        
                                                        {
                                                        etiquetarray.map(doc=>(
                                                                <div>
                                                                    <Paperdos   paper={doc}  buscaretiquetas={buscaretiquetas}   length={etiquetarray.length}   changeLike={changeLike} setChangeLike={setChangeLike}   megusta={megusta}  ></Paperdos>
                                                                            
                                                                
                                                                
                                                                </div>   
                                                    
                                                                ))}

                                                
                                        
                                                    </div> 


                                                         {cargandodos?

                                                                    <div>
                                                                    <div className={clases.divCircular} >
                                                                            <CircularProgress className={clases.circular}></CircularProgress>
                                                                        </div>
                                                                    </div>

                                                                    :

                                                                    <Typography align="center">
                                                                          { esconderboton==false&&      <Button 
                                                                                        endIcon={<ExpandMoreIcon></ExpandMoreIcon>}
                                                                                        variant ="contained"
                                                                                        color="primary"
                                                                                
                                                                                onClick={()=>{
                                                                                    listardesdeelultimo()
                                                                                }} >
                                                                                ver mas
                                                                            </Button> }
                                                            </Typography>                 
        
                                                         }       

                                                   
                                        </div> 
                                    </div>                        
                                                                
                                      :  
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
