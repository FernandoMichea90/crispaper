
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
        }


        

}   