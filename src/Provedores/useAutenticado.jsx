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



    useEffect(async() => {

        console.log("paso por use autenticado")
        const unsuscribe= firebase.auth.onAuthStateChanged(user=>{

            if(user){

          
             
                  administrador(user).then(function(result) {
                            console.log(result) // "Some User token"
                            setusuarioAutenticado({...user,administrador:result})
                         })


                  

              









                
            }else{

                setusuarioAutenticado(null);
              
            }

             return ()=>unsuscribe();   


        })
      
    },[] )



    return usuarioAutenticado
}

export default useAutenticado
