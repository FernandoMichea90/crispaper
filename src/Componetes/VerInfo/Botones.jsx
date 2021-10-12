import { Icon } from '@material-ui/core'
import React,{useEffect} from 'react'
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import estilos from '../Estilos'
import Firebase from '../../Funciones/FuncionesFirebase'
import {FacebookShareButton,TwitterShareButton} from "react-share";
import { useLocation } from 'react-router-dom';
import HelmetMetaData from '../Helmet/Helmet';


const Botones = (props) => {

    const location=useLocation()
    const clases =estilos()
 const url = "https://crispaper-30459.web.app/"+ location.pathname
const descargarimagen=async(id)=> {

    alert('descargando')
await Firebase.descargarImagen(id)
// const prueba= await fetch('https://upload.wikimedia.org/wikipedia/commons/7/77/Delete_key1.jpg')
//   .then(res => res.blob()) // Gets the response and returns it as a blob
//   .then(blob => {
//     // Here's where you get access to the blob
//     // And you can use it for whatever you want
//     // Like calling ref().put(blob)

//     // Here, I use it to make an image appea    r on the page
//     let objectURL = URL.createObjectURL(blob);
//     return objectURL
// });

// console.log(prueba)

}

useEffect(() => {
    console.log(url)
  
}, [])

    return (
        <div className={clases.botonesIcono}>
            <HelmetMetaData title={props.titulo}  description={props.resumen} image={props.imagen}></HelmetMetaData>

            <ul>
                <li>
                    <a  href={props.imagen}  target="_blank">
                    <Icon className={clases.tamanoIcono}>
                    file_download
                    </Icon>
                    </a>
                </li>
                <li>
                    <Icon className={clases.tamanoIconoMargen}>
                    <FacebookShareButton 
                url={url}
                quote={props.titulo}
                >
                 <FacebookIcon className={clases.tamanoIcono}></FacebookIcon>
              </FacebookShareButton>

                       
                    </Icon>
                </li>
                <li>
                <TwitterShareButton
                        url={url}
                        title={props.titulo}
                        hashtag="#planetcolab"
                       
                    >
                    <Icon className={clases.tamanoIcono}>
                        <TwitterIcon className={clases.tamanoIcono}></TwitterIcon>
                    </Icon>
                    </TwitterShareButton>
                </li>

            </ul>
        </div>
    )
}

export default Botones
