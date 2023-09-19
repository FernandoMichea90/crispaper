
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
          return undefined;
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
        return undefined;
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
       return undefined;
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
}




}   