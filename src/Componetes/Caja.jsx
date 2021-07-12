import React,{useEffect,useState} from 'react'
import {Grid,makeStyles, Typography, Button,IconButton,CircularProgress, setRef} from "@material-ui/core"
import Paper from '@material-ui/core/Paper';
import firebase from '../firebase/firebase'
import moment from 'moment'
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2'
import {Chip} from '@material-ui/core'
import "moment/locale/es"
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
//import Corazon from '@material-ui/icons/FavoriteBorder';
import Basurero from '@material-ui/icons/Delete';
//import CorazonLleno from '@material-ui/icons/Favorite';
import Lapiz from '@material-ui/icons/Create';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import {UsuarioContext} from "../Provedores/UsuarioContext"
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Alert from '@material-ui/lab/Alert';
import CorazonLleno from "../imagen/iconos/arbolLleno.png"
import Corazon from "../imagen/iconos/arbolVacio.png"
import FuncionesFirebase from "../Funciones/FuncionesFirebase"
import PublicIcon from '@material-ui/icons/Public';




 const  estilos = makeStyles((theme)=>({


    margen:{

            margin:"45px auto ",



            "& .botoneditar":{
                background:"#1ab37c",
                color:"#ffffff",

                "&:hover": {
                   background:"#ffffff",
                   color:"#1ab37c !important",
                 },


            },
            "& .botonCollaborate":{
                background:"#ffffff",
                color:"#1ab37c !important",
                fontSize:'12px',

                "&:hover": {
                   background:"#ffffff",
                   color:"#1ab37c !important",
                 },


            },

            " & .MuiButton-containedPrimary:hover" :{
                backgroundColor: "#303f9f00",
                color:"#5fcccf",
                border:"1px solid"
            },

            "& .botoneditar":{
                background:"#1ab37c",
                color:"#ffffff",
                marginTop:"10px",

                "&:hover": {
                   background:"#ffffff",
                   color:"#1ab37c !important",
                 },


            }










    },
    caja:{
        position:"relative",
        width:"80vw",
        margin:"20px auto",
        display:"block",
        height:"unset",
        borderRadius:"10px",
    transition:"background-color .25s,color .25s,box-shadow .25s",
    boxShadow:"0 8px 42px -8px rgb(0 0 0 / 20%)",
    border:"1px solid #f0f0f0",
    [theme.breakpoints.down("md")]:{
        height:"unset"
    }

    }

,
    titulo:{

        fontWeight:"500",
        fontFamily:"nunito"
    }
,
        tituloGeneral:{

        fontWeight:"700",
        fontFamily:"Lato",
        fontSize:"27px"
        }
,
divTituloGeneral:{
        margin:"0px auto",
        width:"85vw"
},
fecha:{
        fontWeight:"500",
        fontFamily:"nunito",
        paddingTop:"5px",
        color:"#717171"
},
contenedor:{
        margin:"18px auto"
},
resumen:{
        fontFamily:"nunito",
        margin:"15px auto"
},
diveditarborrar:{
        position:"absolute",
        bottom:"0",
        right:"9px",
        width:"90px"
},
divFoto:{

        width:"250px",
        height:"160px",
        border:"2px dashed #21cbce",
        display:"block",
        margin:"16px auto",
        position:"relative",
        [theme.breakpoints.down("sm")]:{
                margin:"30px auto"
        }
    },
    divImagen:{

         height:"160px",
         width:"260px",
         backgroundSize:"260px auto",
         backgroundRepeat:"no-repeat",
         backgroundPosition:"50%",
         borderRadius:"0",
         display:"block",
         margin:"auto",
         marginTop:"15px",
         [theme.breakpoints.down("sm")]:{
                 marginTop:"30px"
         }



      },

    imgFoto:{
        color:"#21cbce",
        position:"absolute",
        margin:"auto",
        top:"0",
        bottom:"0",
        left:"0",
        right:"0",
        fontSize:"3rem"
    },
    cajaMeGusta:{
            position:'absolute',
            top:'8px',
            right:'12px',
    [theme.breakpoints.down("sm")]:{
            position:'unset'
    }


    },
    divCircular:{
        marginTop:"100px"

    }
    ,botonLikes:{
        color:"#35b37c",
        margin:"8px 0px 0x 0px",
        border:"1px solid"


    },
    margenChip:{

        margin:"0px 3px",
        [theme.breakpoints.down("sm")]:{

                margin:"0px 4px"
        }


    },
    circular:{
        height:"72px !important",
        width:"72px !important",
        display:"block",
        margin:"auto"
        },
        divTexto:{
                [theme.breakpoints.down("md")]:{

                        margin:"0vw 5vw 0"
                },



                [theme.breakpoints.down("sm")]:{

                        margin:"5vw 5vw 0"
                }
        },
        textNoDisponible:{


                fontFamily:"Nunito",
                color:"#808080"




        },
        centrarComponente:{
                textAlign:"end",
                marginRight:"10px",
                [theme.breakpoints.down("md")]:{

                        textAlign:"center",
                }

        },
        botonPdf:{
                position:"absolute",
                bottom:"55px",
                right:'0px',
                [theme.breakpoints.down("sm")]:{
                        position:'unset'
                }
        }
,
        textUpVote:{
           fontFamily:"nunito",
           textAlign:"center",
           color:"#808080"     
        }





 }))




const Caja = (props) => {

    const history = useHistory();
    const clases =estilos()
    const usuario =useContext(UsuarioContext)
    const [listapaper,setlistapaper]=useState([])
    const [cargando, setcargando] = useState(false)
    const [cargandodos, setcargandodos] = useState(false)
    const [paper, setpaper] = useState({})
    const [ultimoDocumento, setultimoDocumento] = useState(0)
   const [vacio, setvacio] = useState(false)
  const [tituloGeneral,setTituloGeneral]=useState("The Lastest")




 const listadepaper=async(recientes,valorados)=>{


        try {

        if(recientes){
                setlistapaper([])
                await firebase.db.collection("paper").orderBy("subida","desc").limit
                (5).get().then((coleccion)=>
                {

                            if(coleccion.size!=0){
                                        console.log("paso por aca ")
                                        const lista =coleccion.docs.map((paperObje)=>paperObje.data())
                                        setultimoDocumento(lista[lista.length-1].id)
                                        setlistapaper((listapaper)=>[...listapaper,...lista])
                                        setcargando(false)

                                }
                                if(coleccion.length==5){
                                        setvacio(true)
                                }else{
                                        setvacio(false)
                                }

                }

                )
        }else{
                if(valorados){
                        setlistapaper([])
                       await  firebase.db.collection("paper").orderBy("likes","desc").limit(5).get().then((coleccion)=>
                        {

                                    if(coleccion.size!=0){

                                                const lista =coleccion.docs.map((paperObje)=>paperObje.data())
                                                setultimoDocumento(lista[lista.length-1].id)
                                                setlistapaper((listapaper)=>[...listapaper,...lista])
                                                setcargando(false)

                                        }
                                        if(coleccion.length==5){
                                                setvacio(true)
                                        }else{
                                                setvacio(false)
                                        }

                        }

                        )
                }else{

                         let nuevalista=[]
                            await firebase.db.collection("paper").orderBy("id","desc").limit(5).get().then(valor=>{


                                nuevalista=valor.docs.map(doc=>{

                                                          return{
                                                                id:doc.id,
                                                                ...doc.data()
                                                            }

                                })

                                if(nuevalista.length==5){
                                        setvacio(true)
                                }else{
                                        setvacio(false)
                                }

                                if(nuevalista.length==0){
                                        setultimoDocumento(0)
                                }else{
                                setultimoDocumento(nuevalista[nuevalista.length-1].id)
                                 }


                           })




                           console.log("paso por aca ")
                        setlistapaper(nuevalista)






                }


        }

        } catch (error) {
                console.log(error)
        }
        setcargando(false)
 }

//  const  manejarSnapshot=(snapshot)=>{



//         console.log(listapaper)
//         const  lista =snapshot.docs.map(doc=>{
//             return{
//                 id:doc.id,
//                 ...doc.data()
//             }
//         })
//         console.log(lista)
//         setcargando(false)

//                 if(lista.length!=0){
//                         setvacio(false)
//                         setultimoDocumento(lista[lista.length-1].id)

//                 }else{

//                         setvacio(true)

//                 }
//         setlistapaper(lista)
//     }





//nueva funcion de busqueda

const buscarTexto=async(texto_busqueda,recientes,valorados)=>{


        setcargando(true)

        try {

                if(recientes){
                        console.log(texto_busqueda)
                        setlistapaper([])
                        await firebase.db.collection("paper").orderBy("busqueda")
                        .startAt(texto_busqueda).endAt(texto_busqueda+'\uf8ff')
                       .limit(5).get().then((coleccion)=>
                        {

                                    if(coleccion.size!=0){

                                                const lista =coleccion.docs.map((paperObje)=>paperObje.data())
                                                console.log(lista)
                                                console.log(listapaper)


                                                setultimoDocumento(lista[lista.length-1].id)
                                                setlistapaper((listapaper)=>[...listapaper,...lista])
                                                setcargando(false)

                                        }
                                        if(coleccion.length==5){
                                                setvacio(true)
                                        }else{
                                                setvacio(false)
                                        }

                        }

                        )
                }else{
                        // if(valorados){
                        //         setlistapaper([])
                        //        await  firebase.db.collection("paper").orderBy("likes","desc").limit(5).get().then((coleccion)=>
                        //         {

                        //                     if(coleccion.size!=0){

                        //                                 const lista =coleccion.docs.map((paperObje)=>paperObje.data())
                        //                                 setultimoDocumento(lista[lista.length-1].id)
                        //                                 setlistapaper((listapaper)=>[...listapaper,...lista])
                        //                                 setcargando(false)

                        //                         }
                        //                         if(coleccion.length==5){
                        //                                 setvacio(true)
                        //                         }else{
                        //                                 setvacio(false)
                        //                         }

                        //         }

                        //         )
                        // }else{

                        //          let nuevalista=[]
                        //             await firebase.db.collection("paper").orderBy("id","desc").limit(5).get().then(valor=>{


                        //                 nuevalista=valor.docs.map(doc=>{

                        //                                           return{
                        //                                                 id:doc.id,
                        //                                                 ...doc.data()
                        //                                             }

                        //                 })

                        //                 if(nuevalista.length==5){
                        //                         setvacio(true)
                        //                 }else{
                        //                         setvacio(false)
                        //                 }

                        //                 if(nuevalista.length==0){
                        //                         setultimoDocumento(0)
                        //                 }else{
                        //                 setultimoDocumento(nuevalista[nuevalista.length-1].id)
                        //                  }


                        //            })




                        //            console.log("paso por aca ")
                        //         setlistapaper(nuevalista)






                        // }


                }

                } catch (error) {
                        console.log(error)
                }



                setcargando(false)



}


const pedirpaper=()=>{

//buscar si  ahi un paper en especifico
//
setcargando(true)

const {papermatch}=props.paperid

if(papermatch){

        buscarPorId(papermatch)

}else{

  // LLAMAR A LOS PAPER



  listadepaper(props.recientes,props.valorados)

}

}







const borrar=(e)=>{




        Swal.fire({
                title: '¿Esta seguro que desea borrar el siguiente registro?',
                text:`${e.titulo}`,
                showDenyButton: true,
                confirmButtonColor: '#21cbce',
                confirmButtonText: `Borrar`,
                denyButtonText: `Cancelar`,
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */

                 if (result.isConfirmed) {
                                console.log("paso por el borrado")
                                console.log(e.id)
                                firebase.db.collection("paper").doc(e.id).delete().then(() => {
                                        let nuevaLista=[]
                                        listapaper.map((valor)=>{
                                                        if(valor.id!=e.id){
                                                                console.log(valor)
                                                                nuevaLista.push(valor)
                                                        }

                                        })


                                        //pedirpaper()

                                console.log("borrado")

                                }).catch((error) => {
                                        console.error("Error removing document: ", error);
                                });


                                e.etiquetas.map( valor=>{

                                        firebase.db.collection("etiquetas").doc(valor.id).collection("paper").doc(e.id).delete().then(async() => {
                                             //  console.log("Document successfully deleted!");



                                              let soloTag=await firebase.db.collection("etiquetas").doc(valor.id).get().then((doc)=>{


                                                        return{...doc.data()}

                                              })

                                                console.log(soloTag)
                                                let nuevoObjeto={  ...soloTag,
                                                        contar:soloTag.contar-1}

                                                  console.log(nuevoObjeto)

                                                firebase.db.collection("etiquetas").doc(valor.id).set(nuevoObjeto)


                                        }).catch((error) => {
                                            console.error("Error removing document: ", error);
                                        });


                                    })








                                   try {
                                        var  borrarArchivo= firebase.storage.ref().child("PDF").child(e.id)
                                        var  borrarImagen= firebase.storage.ref().child("IMAGEN").child(e.id)


                                   } catch (error) {
                                    console.log(error)
                                   }




                              console.log(borrarArchivo)
                              console.log(borrarImagen)


                                   if(borrarArchivo!=undefined){
                                                borrarArchivo.delete().then(function() {
                                                        //console.log("borrado")
                                                        // File deleted successfully
                                                }).catch(function(error) {

                                                                console.log(error)
                                                        //console.log(error)
                                                        // Uh-oh, an error occurred!m
                                                });

                                        }
                                if(borrarImagen!=undefined){


                                                if(e.imagen!=null){ borrarImagen.delete().then(function() {
                                                                //console.log("borrado")
                                                        // File deleted successfully
                                                        }).catch(function(error) {
                                                                console.log(error)
                                                        // Uh-oh, an error occurred!
                                                        }); }
                                }


                  Swal.fire({title:'Borrado!', confirmButtonColor:'#21cbce',icon: 'success'}).then(()=>{
                          pedirpaper()
                  })
                } else if (result.isDenied) {

                }
              })


}




 useEffect(() => {

//buscar si  ahi un paper en especifico
//
setcargando(true)

const {papermatch}=props.paperid

if(papermatch){

        buscarPorId(papermatch)

}else{

  // LLAMAR A LOS PAPER



  listadepaper(props.recientes,props.valorados)

}

                // if(props.busqueda!=undefined){
                //         const texto_busqueda=props.busqueda.buscado
                //         buscarTexto(texto_busqueda,props.recientes,props.valorados)
                // }
                //else{
                // pedirpaper()
                // }

                //    console.log(listapaper)
                //    setlistapaper([])

 }, [props.recientes,props.paperid,props.busqueda])




 const funcionCorazon=(valor)=>{

        let votos_usuarios=[]

        if(valor.haVotado==undefined){
                console.log("paso por aca dodo")
                return false
        }else{

        votos_usuarios=valor.haVotado
        if(votos_usuarios.length==0){
                console.log("paso por aca dodo")
                return false
        }else{

                if(usuario!=undefined){
                if(votos_usuarios.includes(usuario.uid)){
                        return true
                }else{
                        return false
                }}

        }
}



 }



  const pedirMas=async()=>{
                setcargandodos(true)
                const recientes=props.recientes
                const valorados=props.valorados
                const paperRef=firebase.db.collection("paper")


        try {

                if(recientes){




                        return paperRef.doc(ultimoDocumento).get().then(async(doc)=>
                        {
                           //     console.log(doc)
                          var valoradosOrdenados = await paperRef.orderBy("subida","desc").startAfter(doc).limit(5).get()

                                if(valoradosOrdenados.size!=0){

                             //      console.log(valoradosOrdenados)
                                 const lista =valoradosOrdenados.docs.map((paperObje)=>paperObje.data())
                                 setultimoDocumento(lista[lista.length-1].id)
                                 setlistapaper((listapaper)=>[...listapaper,...lista])
                                 setcargandodos(false)
                        }else{

                                setvacio(false)
                                setcargandodos(false)
                          }

                        }
                        )






                }else{


                        if(valorados){



                                // const valoradosRef=firebase.db.collection("paper")

                                return paperRef.doc(ultimoDocumento).get().then(async(doc)=>
                                {
                                        console.log(doc)
                                  var valoradosOrdenados = await paperRef.orderBy("likes","desc").startAfter(doc).limit(5).get()

                                        if(valoradosOrdenados.size!=0){

                                           console.log(valoradosOrdenados)
                                         const lista =valoradosOrdenados.docs.map((paperObje)=>paperObje.data())
                                         setultimoDocumento(lista[lista.length-1].id)
                                         setlistapaper((listapaper)=>[...listapaper,...lista])
                                         setcargandodos(false)

                                }else{

                                        setvacio(false)
                                        setcargandodos(false)
                                  }

                                }
                                )


                                // firebase.db.collection("paper").orderBy("likes","desc").startAfter(ultimoDocumento).limit(5).get().then((coleccion)=>
                                // {


                                //                 console.log("dentro de la coleccion ")

                                //             if(coleccion.size!=0){

                                //                         const lista =coleccion.docs.map((paperObje)=>paperObje.data())
                                //                         setultimoDocumento(lista[lista.length-1].likes)
                                //                         setlistapaper((listapaper)=>[...listapaper,...lista])

                                //                 }else{

                                //                       setvacio(true)
                                //                 }
                                // }

                                // )
                        }else{


                                return paperRef.doc(ultimoDocumento).get().then(async(doc)=>
                                {
                                        //console.log(doc)
                                  var valoradosOrdenados = await paperRef.orderBy("id","desc").startAfter(doc).limit(5).get()

                                        if(valoradosOrdenados.size!=0){

                                          // console.log(valoradosOrdenados)
                                         const lista =valoradosOrdenados.docs.map((paperObje)=>paperObje.data())
                                         setultimoDocumento(lista[lista.length-1].id)
                                         setlistapaper((listapaper)=>[...listapaper,...lista])
                                         setcargandodos(false)

                                }else{

                                        setvacio(false)
                                        setcargandodos(false)
                                  }

                                }
                                )







                                // comentar
                        //       firebase.db.collection("paper").orderBy("id","desc").startAfter(ultimoDocumento).limit(1).get().then((coleccion)=>
                        //         {

                        //                     if(coleccion.size!=0){

                        //                                 const lista =coleccion.docs.map((paperObje)=>paperObje.data())
                        //                                 setultimoDocumento(lista[lista.length-1])
                        //                                 setlistapaper((listapaper)=>[...listapaper,...lista])

                        //                         }else{

                        //                               setvacio(true)
                        //                         }
                        //         }

                        //         )
                        }


                }

                } catch (error) {
                        console.log(error)
                }




  }


 // buscar por id del paper

  const buscarPorId=async(id)=>{
//  alert(id)
  var variable=await firebase.db.collection("paper").doc(id)
 //console.log(variable)


 variable.get().then((doc) => {
        // Document was found in the cache. If no cached document exists,
        // an error will be returned to the 'catch' block below.
       // console.log("Cached document data:", doc.data());
        setlistapaper([doc.data()])

        setcargando(false)
        setvacio(false)

    }).catch((error) => {
        console.log("Error getting cached document:", error);
    });



  }


  const buscarChips=(valor)=>{


        history.push(`/tag/${valor.id}`)

  }



const megusta=(valor)=>{


        // if(usuario==null) {
        //         return history.push("/login")
        // }




          console.log(valor.haVotado)

        if(valor.haVotado==undefined){
                var antiguoHaVotado=[]
         }else{
                var antiguoHaVotado=valor.haVotado
         }


     if(antiguoHaVotado.includes(usuario.uid)){
             console.log(antiguoHaVotado)

        antiguoHaVotado=antiguoHaVotado.filter(function(obj){
                return obj!==usuario.uid
        })
        valor.likes=valor.likes-1

        let  nuevoValor={
                ...valor,
                 likes:valor.likes,
                haVotado:antiguoHaVotado
        }


        firebase.db.collection("paper").doc(valor.id).update(nuevoValor)


        // armar de nuevo el arreglo con el valor

         armararreglo(nuevoValor)

       // mapear etiquetas

        valor.etiquetas.map(valordos=>{
                firebase.db.collection("etiquetas").doc(valordos.id).collection("paper").doc(valor.id).update({
                        ...valor,
                        likes:valor.likes,
                       haVotado:antiguoHaVotado

                })
        })


         //setpaper({...valor,likes:valor.likes})
        // actualizar la etiquetas







     }else{

     const nuevoHaVotado = [...antiguoHaVotado, usuario.uid];
     valor.likes=valor.likes+1


     let  nuevoValor={
        ...valor,
         likes:valor.likes,
        haVotado:nuevoHaVotado
        }
firebase.db.collection("paper").doc(valor.id).update(nuevoValor)

      // mapear etiquetas

      valor.etiquetas.map(valordos=>{
        firebase.db.collection("etiquetas").doc(valordos.id).collection("paper").doc(valor.id).update({
                ...valor,
                likes:valor.likes,
                haVotado:nuevoHaVotado

        })
})

armararreglo(nuevoValor)
     //setpaper({...valor,likes:valor.likes})

      }
      console.log("final")
}


const megustaSinValidarUsuario=(valor)=>{


        // if(usuario==null) {
        //         return history.push("/login")
        // }




       

        if(valor.haVotado==undefined){
                var antiguoHaVotado=[]
         }else{
                var antiguoHaVotado=valor.haVotado
         }


//      if(antiguoHaVotado.includes(usuario.uid)){
//              console.log(antiguoHaVotado)

//         antiguoHaVotado=antiguoHaVotado.filter(function(obj){
//                 return obj!==usuario.uid
//         })
//         valor.likes=valor.likes-1

//         let  nuevoValor={
//                 ...valor,
//                  likes:valor.likes,
//                 haVotado:antiguoHaVotado
//         }


//         firebase.db.collection("paper").doc(valor.id).update(nuevoValor)


//         // armar de nuevo el arreglo con el valor

//          armararreglo(nuevoValor)

//        // mapear etiquetas

//         valor.etiquetas.map(valordos=>{
//                 firebase.db.collection("etiquetas").doc(valordos.id).collection("paper").doc(valor.id).update({
//                         ...valor,
//                         likes:valor.likes,
//                        haVotado:antiguoHaVotado

//                 })
//         })


         //setpaper({...valor,likes:valor.likes})
        // actualizar la etiquetas







   //  }else{

     const nuevoHaVotado = [];
     valor.likes=valor.likes+1


     let  nuevoValor={
        ...valor,
         likes:valor.likes,
        haVotado:nuevoHaVotado
        }
firebase.db.collection("paper").doc(valor.id).update(nuevoValor)

      // mapear etiquetas

      valor.etiquetas.map(valordos=>{
        firebase.db.collection("etiquetas").doc(valordos.id).collection("paper").doc(valor.id).update({
                ...valor,
                likes:valor.likes,
                haVotado:nuevoHaVotado

        })
})

armararreglo(nuevoValor)
     //setpaper({...valor,likes:valor.likes})

     // }
      console.log("final")
}

const armararreglo=(nuevoValor)=>{


                 let   nuevalista=listapaper.map(valor=>{

                                if (nuevoValor.id==valor.id){

                                        return{
                                                ...nuevoValor
                                        }
                                }else{

                                        return{ ...valor}
                                }



                 })


                 console.log(nuevalista)
                 setlistapaper(nuevalista)


}


const dejarUnaColaboracion=async()=>{

        const { value: text } = await Swal.fire({
          input: 'textarea',
          title: 'Would you like to collaborate?',
          inputPlaceholder: 'Please describe here the environment information ,report,paper,software or tool  that you want to share',
          confirmButtonColor: '#21cbce',
          denyButtonText: `Cancel`,
          confirmButtonText: `Send`,
          showDenyButton: true,
        })
    
        if (text) {
    
    
    
    
    
          let user="anonimo"
          let anonimo=true
    
          if(usuario!=null){
            user={
              nombre:usuario.displayName,
              email:usuario.email,
              imagen:usuario.photoURL
            }
            anonimo=false
    
          }
          //Swal.fire(text)
    
    
          let Comentario={
            fecha: new Date(),
            usuario:user,
            comentario:text,
            anonimo
          }
    
          console.log(Comentario)
    
           FuncionesFirebase.IngresarColaboracion(Comentario)
        }
    
    
    
      }
    
    

    return (



// <Button onClick={()=>{pedirMas()}} >
//                             ver mas
// </Button>





        <div  className={clases.margen}>


                <div className={clases.divTituloGeneral}>

                <Grid container>
                <Grid xs={8} md={10}>
                         <Typography variant="h4" className={clases.tituloGeneral}>
                                {props.textoGeneral}
                        </Typography>
                </Grid>

                <Grid xs={4} md={2}>

                                 <Button  onClick={()=>dejarUnaColaboracion()} className="botonCollaborate" variant="contained"

                                                startIcon={<PublicIcon />}

                                                >

                                                        Collaborate
                                                </Button>


                </Grid>
                </Grid>
                </div>

                <Grid container>
                    <Grid  xs={12}>
                            {
                            cargando?
                            <div className={clases.divCircular} >
                            <CircularProgress className={clases.circular}></CircularProgress>
                        </div>
                        :<div>
                           { listapaper.length==0 ?
                              <Typography className={clases.
                              textNoDisponible
                               } align="center" variant="h4">
                                        No hay registros
                              </Typography>


                           :

                           <div>
                                {

                            listapaper.map((valor)=>(

                                        <Paper key={valor.id} className={clases.caja} elevation={3}>
                                        <Grid container  className={clases.contenedor}>
                                                <Grid xs={12} sm={12} md={4} >
                                                        <div  >

                                                             {valor.imagen==null?

                                                              <div className={clases.divFoto}>
                                                                        < AddAPhotoIcon className={clases.imgFoto}></AddAPhotoIcon>

                                                              </div> :
                                                           <div   className={clases.divImagen} style={{
                                                          backgroundImage:`url(${valor.imagen})`,

                                                        }} >


                                                                </div>

                                                             }
                                                        </div>
                                                </Grid>


                                                <Grid  xs={12} sm={12} md={6}>
                                                   <div className={clases.divTexto}>

                                                <Typography variant="h5" className={clases.titulo} >
                                                                {valor.titulo}
                                                </Typography>

                                                        <Typography className={clases.fecha} variant="subtitle2">
                                                                {moment(new Date(valor.subida.seconds*1000)).format("D MMM YYYY")}
                                                </Typography>





                                                <Typography variant="body2" className={clases.resumen}>
                                                        {valor.resumen}
                                                </Typography>

                                                <Typography variant="subtitle1">

                                                        {valor.etiquetas.map((valor)=>(
                                                //      <Link style={{textDecoration:"none"}} to={`/etiquetas/${valor}`}>
                                                        <Chip variant="outlined"  className={clases.margenChip} onClick={()=>buscarChips(valor)} color="primary" size="small" label={valor.descripcion} />
                                                //    </Link>
                                                                        ))}


                                                </Typography>

                                                </div>

                                                </Grid>

                                                <Grid xs={12} sm={12} md={2}>
                                                <div className={clases.cajaMeGusta}>
                                                                 <Typography className={clases.centrarComponente} variant="subtitle1" >

                                                                <Button onClick={()=>megustaSinValidarUsuario(valor)}
                                                                className={clases.botonLikes}
                                                                startIcon={

                                                                funcionCorazon(valor)?
                                                                // <CorazonLleno></CorazonLleno>
                                                                <>
                                                                <img height="25" src={CorazonLleno}></img>
                                                                
                                                                </>
                                                                :

                                                                //  <Corazon></Corazon>
                                                                <>
                                                                <img  height="25"  src={Corazon}></img>
                                                               
                                                                </>

                                                               }
                                                                >

                                                                        {valor.likes}
                                                                </Button>

                                                                <Typography className={clases.textUpVote} variant='subtitle2' >
                                                                 upvote
                                                                 </Typography>
                                                                

                                                </Typography>
                                                </div>
                                               
                                               
                                               
                                               <div className={clases.botonPdf}>
                                                <Typography  className={clases.centrarComponente} variant="subtitle1"
                                                          >




                                                <a href={valor.pdf==null?
                                                    valor.link:valor.pdf
                                                }  style={{textDecoration:"none"}} target="_blank">
                                                <Button  className="botoneditar" variant="contained"

                                                startIcon={<InsertDriveFileIcon />}

                                                >

                                                        get it
                                                </Button>

                                                </a>

                                                </Typography>
                                                </div>        

                                              {usuario==null?



                                                        <div></div>
                                                        :


                                                        usuario.administrador?

                                                        <div className={clases.diveditarborrar}>

                                                        <Grid container>

                                                                 <Grid xs={6}>

                                                                        <Typography variant="subtitle1" align="center">
                                                                                <Link to={`/editarpaper/${valor.id}`}>
                                                                                        <IconButton  variant="outlined" color="primary">
                                                                                        <Lapiz></Lapiz>
                                                                                        </IconButton>
                                                                                </Link>

                                                                        </Typography>
                                                                </Grid>
                                                                <Grid  xs={6}>
                                                                        <Typography variant="subtitle1" align="center">

                                                                        <IconButton  variant="contained"  color="primary"  onClick={()=>borrar(valor)}>
                                                                                <Basurero></Basurero>
                                                                        </IconButton>

                                                                        </Typography>
                                                                </Grid>
                                                        </Grid>
                                             </div>

                                                 :
                                                 <div></div>

                                                        }
       </Grid>



                                        </Grid>






                                        </Paper>
                            ))
                            }









                            </div>
                         }

                            {cargandodos?

<div className={clases.divCircular} >
<CircularProgress className={clases.circular}></CircularProgress>
</div>



:

// vacio==true &&

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
</Typography>   }






                            </div>
                            }




                     </Grid>


                </Grid>


        </div>

 )
}

export default Caja
