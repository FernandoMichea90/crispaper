import app from 'firebase/app'
import firebaseConfig from './config'
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';




class Firebase{
    
    constructor(){
     if(!app.apps.length){             

        app.initializeApp(firebaseConfig)
     }

     this.auth=app.auth();
     this.db = app.firestore();
     this.storage = app.storage();

    }

    //Registrar un usuario 
    async registrar(user){
    
       const  {nombre,correo,password}=user
             


   
    const nuevoUsuario=await this.auth.createUserWithEmailAndPassword(correo,password);
        return await nuevoUsuario.user.updateProfile( {
            displayName:nombre 
        }  )

        
    }

    // Inicia sesión del usuario
    async login(user) {
        const{email,password}=user    

        return this.auth.signInWithEmailAndPassword(email,password);
    }                                                           

     // Cierra la sesión del usuario
     async cerrarSesion() {
        await this.auth.signOut();
    }


    async registrarCorreo(){
    
    // var provider = new app.auth.GoogleAuthProvider();
    const  provider =new app.auth.GoogleAuthProvider();
       // const googleProvider=new firauth.GoogleAuthProvider()
       // const googleProvider=this.auth.GoogleAuthProvider()
         this.auth.signInWithPopup(provider).then((res) => {
            console.log(res.user)
          }).catch((error) => {
            console.log(error.message)
          })
     
         }
     

    
}

const firebase =new Firebase();
export default firebase