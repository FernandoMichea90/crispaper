
import Firebase from "../firebase/firebase"
import Swal from "sweetalert2"
import moment from "moment"




export default {



        async IngresarComentario(Comentario){
       await Firebase.db.collection("Comentarios").add(Comentario).then(()=>
         Swal.fire({     
            icon: 'success',
            title: '¡Muchas Gracias!',
            showConfirmButton: false,
            timer: 1500
          })
         )

        }
        ,
        async IngresarColaboracion(Colaboracion){


          await Firebase.db.collection("Colaboracion").add(Colaboracion).then(()=>
          Swal.fire({     
             icon: 'success',
             title: '¡Muchas Gracias!',
             showConfirmButton: false,
             timer: 1500
           })
          )
 
         },

        async ListarComentarios(){
          let listatres=[]
           await Firebase.db.collection("Comentarios").get().then((collection)=>{   
            listatres=collection.docs.map(doc=>{
                      return doc.data()
                  })
            
           })
         
           return listatres
        },
      // pedir etiquetas 
      async ListarEtiquetas (){
        let lista=await Firebase.db.collection("etiquetas").orderBy('descripcion').get().then(doc=>{
              let listados= doc.docs.map(etiqueta => {
                return {

                  id:etiqueta.id,
                  ...etiqueta.data()
                    }
              })   
            return listados;
                  })
        return lista
      }
        ,
      async CrearInformacion(Info,Paper){
        //armar arreglos etiquetas 
        let etiquetas=[]
        etiquetas=Paper.etiquetas
        let prueba= await Firebase.db.collection("Informacion").doc(Info.id).set({...Info})
        let pruebados= await Firebase.db.collection("paper").doc(Info.id).update({info:true})
        etiquetas.map(async(doc)=>{
          let pruebaTres= await Firebase.db.collection("etiquetas").doc(doc.id).collection('paper').doc(Info.id).update({info:true})
        })
        return prueba
      },
      async BorrarInformacion(Info,Paper){
        let etiquetas=[]
        etiquetas=Paper.etiquetas
        let pruebados= await Firebase.db.collection("paper").doc(Info.id).update({info:false})
        //let pruebados= await Firebase.db.collection("paper").doc(Info.id).update({info:true})
        etiquetas.map(async(doc)=>{
          let pruebaTres= await Firebase.db.collection("etiquetas").doc(doc.id).collection('paper').doc(Info.id).update({info:false})
        }) 
        await Firebase.db.collection("Informacion").doc(Info.id).delete().then(() => {
        }).catch((error) => {
                console.error("Error removing document: ", error);
         });

      },

      async subirImagen(id,imagen){
        // prueba de usuario 
        // subir  imagen
            if(imagen.imagen!==null){


                    if(imagen.imagen instanceof File){
                        const imgRef=await Firebase.storage.ref().child("Informacion").child(id)
                        await imgRef.put(imagen.imagen)
                        const imgURL=await imgRef.getDownloadURL() 
                        return imgURL
                    }else{
                        return imagen.file 
                    }
            }else{
               
             return null
            }

  }, 

  async retornarInformacion(id){

      let informacion =await Firebase.db.collection('Informacion').doc(id).get().then((doc)=>{
        if(doc.exists){
          console.log("Document data:", doc.data());
          return doc.data()
      }else{
          console.log("No such document!");
      }
      })
      return informacion
  },
  async retornarPaper(id){

    let informacion =await Firebase.db.collection('paper').doc(id).get().then((doc)=>{
      if(doc.exists){
        console.log("Document data:", doc.data());
        return doc.data()
    }else{
        console.log("No such document!");
    }
    })
    return informacion

  },
  async descargarImagen(id){

        let retornar=null

        var pathReference =await Firebase.storage.ref('Informacion/126906762_110192684249055_224218762780413843_o.jpg');
        console.log(pathReference)
    let ref=await Firebase.storage.ref().child("Informacion").child(id)

    
    pathReference.getDownloadURL().then(function(url) {
 
        var xhr = new XMLHttpRequest();
  xhr.responseType = 'blob';
  xhr.onload = function(event) {
    var blob = xhr.response;
    console.log(blob)
  };
  xhr.open('GET', url);
  xhr.send();
  var img = document.getElementById('myimg');
  img.src = url;


        retornar=url

    }).catch(function(error) {

        console.log(error)

    })


    return retornar



  },
  // admin pagina why
  // a)mostrar 
//1. Pedir cabeza 
  async pedirCabeza(){
    let consulta=await Firebase.db.collection('PagWhy').doc("Cabeza").get().then(doc=>{
        if(doc.exists){
          return doc.data()
        }else{
          console.log("el documento no existe")
        }      
      })
      return consulta
  },
//2. Pedir Componente Uno
async pedirComponenteUno(){
   let consulta=await Firebase.db.collection('PagWhy').doc("ComponenteUno").get().then(doc=>{
        if(doc.exists){
          return doc.data()
        } else{
          console.log("el documento no existe")
        }
   })
   return consulta
},
//3. Pedir Compenente Tres 
async pedirComponenteDos(){
  let consulta=await Firebase.db.collection('PagWhy').doc("ComponenteDos").get().then(doc=>{
      if(doc.exists){
        return doc.data()
      }else{
        console.log("el documento no existe")
      }
  })
  return consulta
},
//4. Pedir Componente Tres 
async pedirComponenterTres(){
  let consulta=await Firebase.db.collection('PagWhy').doc("ComponenteTres").get().then(doc=>{
     if(doc.exists){
       return doc.data()
     }else{
       console.log("el documento no existe")
     }

  })
  return consulta 
},
//b) editar componentes
//b.1)editar Cabeza 
async editarCabeza(Cabeza){
  let consulta=await Firebase.db.collection("PagWhy").doc("Cabeza").set({...Cabeza})
  return consulta
},
//b.2)editar Componente Uno 
async editarComponenteUno(ComponenteUno){
 let consulta=await Firebase.db.collection("PagWhy").doc("ComponenteUno").set({...ComponenteUno})
  return consulta
},
//b.3)editar Componente dos 
async editarComponenteDos(ComponenteDos){
  let consulta=await Firebase.db.collection("PagWhy").doc("ComponenteDos").set({...ComponenteDos})
  return consulta
},
//b.4)editar Componente tres 
async editarComponenteTres(ComponenteTres){
  let consulta=await Firebase.db.collection("PagWhy").doc("ComponenteTres").set({...ComponenteTres})
  return consulta 
},

//c)subir imagen 
//c.1) subir imagen de los componentes 
async subirImagenWhy(id,imagen){
      if(imagen.imagen!==null){
        if(imagen.imagen instanceof File)
        {     
              const imgRef=Firebase.storage.ref().child("imagenWhy").child(id) 
              await imgRef.put(imagen.imagen)
              const imgURL=await imgRef.getDownloadURL()
              return imgURL
        }
    }

},
async pedirTitulo (){

 const consulta =await Firebase.db.collection('Paginas').doc("Titulo").get().then((doc)=>{
      if(doc.exists){
        return doc.data()
      }else{
        return "la informacion no existe"
      }} )  
      return consulta
},
async  guardarTitulo (Titulo){

  const consulta = await Firebase.db.collection('Paginas').doc('Titulo').set({...Titulo})
  return consulta
},
async buscarPorEtiquetas(Tag){
  try {
    const objeto ={id:Tag.id,descripcion:Tag.descripcion}
    const consulta = await Firebase.db.collection("paper")
    .where("etiquetas", "array-contains",objeto).get().then(doc=>{
         let query=doc.docs.map(resp=>{   
                return resp.data()
         })
          return query
    })
    return consulta
  } catch (error) {
    console.log(error)
  }
 
},

async guardarTopicoInformacion(TopicoInformacion){
 let mensaje=''
  try {
 const consulta= await Firebase.db.collection('TopicoInformacion').add(TopicoInformacion)
 mensaje='Informacion guardada'
 } catch (error) {
   mensaje='Error al guardar'
 }

},

async guardarRegion(Region){
 let mensaje=''
 let state=null
  try {
 const consulta= await Firebase.db.collection('Region').add(Region)
   state={...Region,id:consulta.id}
 mensaje='Informacion guardada'
 
 } catch (error) {
   mensaje='Error al guardar'
 }
 return state
},
async llamarTopicos (){
  let lista =[]
  try {
    await Firebase.db.collection('TopicoInformacion').get().then((doc)=>{

      lista= doc.docs.map((doc)=>{
          return {...doc.data(),id:doc.id}
      })
     
    })
    console.log(lista)
    return lista
    
  } catch (error) {

    console.log(error)
    
  }
} ,
async llamarRegion (){
  let lista =[]
  try {
    await Firebase.db.collection('Region').get().then(doc=>{
      lista = doc.docs.map(doc=>{
        return {...doc.data(),id:doc.id}
      })
    })
    return lista
    
  } catch (error) {
    console.log(error)
  }
}, 
async noRepeatRegion (region){
  let existe=false 
  let lista=[]
  try {
    console.log(region.descripcion.trim())
    await Firebase.db.collection("Region").where("descripcion", "==", region.descripcion.trim(  )).get().then(doc=>{
      lista = doc.docs.map(doc=>{
        return doc.data()
      })
      if(lista.length>0){
        existe=true
      }
    })
  } catch (error) { 
    console.log(error)
  }
  return existe
},

async noRepeatInfo (region){
  let existe=false 
  let lista=[]
  try {
    console.log(region.descripcion.trim())
    await Firebase.db.collection("TopicoInformacion").where("descripcion", "==", region.descripcion.trim(  )).get().then(doc=>{
      lista = doc.docs.map(doc=>{
        return doc.data()
      })
      console.log(lista)
      if(lista.length>0){
        existe=true
      }
    })
  } catch (error) { 
    console.log(error)
  }
  return existe
},
async editarTopicoInformacion(state){
  let editado=false
  try {
    await Firebase.db.collection('TopicoInformacion').doc(state.id).update(state);
    editado=true
  } catch (error) {
    console.log(error)
    
  }
  return editado
},
async borrarInfo(state){
  let borrado= false
  try {
    await Firebase.db.collection('TopicoInformacion').doc(state.id).delete()
    borrado=true
  } catch (error) {
    console.log(error)
  }
  return borrado
},
async editarRegion(state){
  let editado=false
  try {
    await Firebase.db.collection('Region').doc(state.id).update(state);
    editado=true
  } catch (error) {
    console.log(error)
    
  }
  return editado
},
async borrarRegion(state){
  let borrado= false
  try {
    await Firebase.db.collection('Region').doc(state.id).delete()
    borrado=true
  } catch (error) {
    console.log(error)
  }
  return borrado
}
// retornar etiqueta  
,
async retornarEtiqueta(id){
  
  const etiqueta= await Firebase.db.collection('etiquetas').doc(id).get().then(doc=>{
   console.log('aqui va el doc')
     return({...doc.data(),id:doc.id})
  })
  console.log(etiqueta)
  return etiqueta
} ,
async retornarEtiquetaDescripcion(descripcion){
  let lista=[]
  console.log(descripcion)
  const etiqueta= await Firebase.db.collection("etiquetas").where("descripcion", "==", descripcion).get().then(doc=>{
  lista= doc.docs.map(tag=>{
     return {...tag.data(),id:tag.id}
   })
   return lista
  })
  console.log(etiqueta)
  return etiqueta[0]
} 
// borrar paper de la base de datos 
,
async borrarPaper (paper){
try {
  await Firebase.db.collection('paper').doc(paper.id).delete().then(()=>{
    const etiquetas=paper.etiquetas
    etiquetas.map(async(doc)=>{
      await Firebase.db.collection('etiquetas').doc(doc.id).collection('paper').doc(paper.id).delete().then(()=>{console.log('borrado')})
    })
  })
} catch (error) {
  console.log(error)
}
},
async retornarTodosPaper(){
  let lista=[]
  try {
    await Firebase.db.collection('paper').get().then((doc)=>{
      lista=doc.docs.map((doc)=>{
          return {...doc.data(),id:doc.id}
      })
    })
    
  } catch (error) {
    console.log(error)
  }
  return lista
}




}   