import React,{useEffect,useState} from 'react'
import {Typography,makeStyles} from '@material-ui/core'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import estilos from '../Estilos'
import Botones from './Botones';
import Firebase from '../../firebase/firebase';
import HelmetMetaData from '../Helmet/Helmet';



const Imagen = (props) => {

const clases =estilos()

    const [url, seturl] = useState({})



useEffect(async () => {

//     const prueba= await fetch('https://firebasestorage.googleapis.com/v0/b/crispaper-30459.appspot.com/o/Informacion%2F126906762_110192684249055_224218762780413843_o.jpg?alt=media&token=ed0d82be-648e-4d4a-845e-e0fe575c566e')
//   .then(res => res.blob()) // Gets the response and returns it as a blob
//   .then(blob => {
//     // Here's where you get access to the blob
//     // And you can use it for whatever you want
//     // Like calling ref().put(blob)

//     // Here, I use it to make an image appear on the page
//     let objectURL = URL.createObjectURL(blob);
//     return objectURL
    const prueba=await  Firebase.storage.ref().child('Informacion/126906762_110192684249055_224218762780413843_o.jpg').getDownloadURL().then(function(url) {
    // `url` is the download URL for 'images/stars.jpg'
  
    // This can be downloaded directly:
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
   
  
    xhr.onload = function(event) {
      var blob = xhr.response;
      console.log('blob')
      console.log(blob);
    };
    xhr.open('GET', url);
    xhr.send();
    console.log(xhr)

    // Or inserted into an <img> element:
    var img = document.getElementById('myimg');
  
  }).catch(function(error) {
    // Handle any errors
    console.log(error);
  });

console.log()

//seturl(prueba) 


    
}, [])



    return (
        <div>


                    <Typography  align="center" variant="h3">

                            <div  className={clases.divImagen}>

  
                            
                             
                                <img src={props.imagen.file} style={{height:"100%",width:"100%"}}/>

                              


                               
                            

                            </div>
                         
                    </Typography>

                    <Typography align="center">
                            <Botones id ={props.id} titulo={props.titulo} resumen={props.resumen} imagen ={props.imagen.file}></Botones>

                    </Typography>

              
            
        </div>
    )
}

export default Imagen
