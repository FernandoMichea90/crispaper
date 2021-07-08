import {useState,useEffect} from 'react'
import firebase from "../firebase/firebase"
const useAutenticado = props => {   


            const [usuarioAutenticado, setusuarioAutenticado] = useState(null)



    const administrador = async(user)=> 
    
    {
    var result=false
     await firebase.db.collection("administradores")
      .where("adminitrador", "==", user.email).get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots     
           result=true
        });
      
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
          
       return result
      
  
    }



    const usuarioExistente=async(usuario)=>{

                console.log(usuario )
                //consultar en la base de datos
                
                // crear constantes  de referencias a usuarios 

                const usuarios=firebase.db.collection("usuarios")
                //firebase.db.collection("usuarios")

                const  consulta=await usuarios.where("correo","==",usuario.email).get().then(doc=>
                    {
                        return doc.docs
                    }
                    )


                if(consulta.length){
                    console.log("vacio")
                }else{
                    console.log("lleno")
                
                    let usuarioAgregar={
                        correo:usuario.email,
                        nombre:usuario.displayName,
                        photoURL:usuario.photoURL

                    }
                    console.log(usuarioAgregar)
                     await usuarios.doc(usuarioAgregar.correo).set(usuarioAgregar)
                    

                } 








    }


    useEffect(async() => {

       
        const unsuscribe= firebase.auth.onAuthStateChanged(user=>{

            if(user){

                 //  consultar si el usuario  existe            

                 


                  administrador(user).then(function(result) {
                            console.log(result) // "Some User token"
                            setusuarioAutenticado({...user,administrador:result})
                         })


                  
                usuarioExistente(user)
              









                
            }else{

                setusuarioAutenticado(null);
              
            }

             return ()=>unsuscribe();   


        })
      
    },[] )



    return usuarioAutenticado
}

export default useAutenticado
