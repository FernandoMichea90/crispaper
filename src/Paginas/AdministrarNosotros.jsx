import React, { useState, useEffect } from 'react'
import { Typography, makeStyles, Grid, TextField, Button, CircularProgress } from '@material-ui/core'
import TextoEditor from "../Componetes/TextoEditor.jsx"
import { EditorState } from 'draft-js';
import Firebase from "../../src/firebase/firebase"
import draftToHtml from 'draftjs-to-html';
import { convertToRaw } from 'draft-js';
import { ContentState, convertFromHTML } from 'draft-js'
import Swal from "sweetalert2"
import htmlToDraft from 'html-to-draftjs';


const estilos = makeStyles((theme) => ({

    divTituloGeneral: {
        margin: "55px auto",
        width: "85vw",
        " & .MuiButton-containedPrimary:hover": {
            backgroundColor: "#303f9f00",
            color: "#5fcccf",
            border: "1px solid"
        },

    },
    tituloGeneral: {

        fontWeight: "700",
        fontFamily: "Lato",
        fontSize: "27px"
    },
    divCircular: {
        marginTop: "200px"

    },

    margenDiv: {
        margin: "100px 0px 0px 0px"
    },
    circular: {
        height: "72px !important",
        width: "72px !important",
        display: "block",
        margin: "auto"
    },

    margenDivContenedor: {
        margin: "30px 0px"
    },
    textoTitulo: {
        margin: "0px 0px 10px 5px"
    }

}))



const AdministrarNosotros = (props) => {
    const clases = estilos()
    const [titulo, settitulo] = useState("")
    const [editorState, setEditorState] = useState(EditorState.createWithContent(
        ContentState.createFromBlockArray(
            convertFromHTML('<p></p>')
        )
    ))
    //   const [editorState, setEditorState] = useState(EditorState.createEmpty())

    const [cargando, setcargando] = useState(false)









    const onEditorStateChange = (editorState) => {
        setEditorState(editorState)
    }


    const onTitleStateChange = (e) => {
        e.preventDefault()
        settitulo(e.target.value)
    }




    const remplazarTexto = (htmlText) => {
        console.log(htmlText)

        //<div style="text-align:none;">
        let textoprueba = htmlText.replace(`<div style="text-align:none;">`, `<div style="text-align: center; width: 100%;">`)


        return textoprueba
    }

    const Guardar = () => {

        const rawContentState = convertToRaw(editorState.getCurrentContent());
        let htmlText = draftToHtml(rawContentState);
        let htmlConverted = remplazarTexto(htmlText) //here I call the function that converts the <img/> to <div><img/></div>. 


        const configWeb = {
            title: titulo,
            //contenido:draftToHtml(convertToRaw(editorState.getCurrentContent()))
            contenido: htmlConverted
        }



        Firebase.db.collection("administrarnosotros").doc("configuracion").set(configWeb).then(() =>

            Swal.fire({
                title: "Su informacion ha sido guardada",
                icon: "success",
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                props.history.push("/nosotros")
            })
        ).catch(error => console.log(error))


        //guardar en la base de datos


    }






    useEffect(async () => {

        setcargando(true)

        const retornarObjeto = await Firebase.db.collection("administrarnosotros").doc("configuracion").get().then((respuesta) => {
            console.log(respuesta.data())

            return respuesta.data()
        })

        if (retornarObjeto != undefined) {

            settitulo(retornarObjeto.title)

            // funcion extraida 
            // const blocksFromHTML = convertFromHTML(retornarObjeto.contenido);

            const contentBlock = htmlToDraft(retornarObjeto.contenido);
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            // const text = ContentState.createFromBlockArray(
            //         blocksFromHTML.contentBlocks,
            //         blocksFromHTML.entityMap
            //         );

            const editorState = EditorState.createWithContent(contentState);

            setEditorState(
                editorState
            )


            // fin de la funcion extraida 
            // setEditorState(EditorState.createWithContent(
            //     ContentState.createFromBlockArray(
            //       convertFromHTML(retornarObjeto.contenido)
            //     )
            //   ))

        }

        setcargando(false)


    }, [])




    return (


        <div className={clases.divTituloGeneral}>
            <Typography variant="h4" className={clases.tituloGeneral}>
                Administrar Paginas Nosotros
            </Typography>

            <div className={clases.margenDiv}>

                {
                    cargando ?
                        <div className={clases.divCircular} >
                            <CircularProgress className={clases.circular}></CircularProgress>
                        </div>
                        : <div>

                            <Grid container>

                                <Grid xs={1} ></Grid>
                                <Grid xs={10}>
                                    <Grid xs={12} md={12}>

                                        <div className={clases.margenDivContenedor}>
                                            <Typography className={clases.textoTitulo} variant="h6" >
                                                Titulo
                                            </Typography>
                                            <TextField value={titulo} onChange={onTitleStateChange} id="outlined-basic" variant="outlined" fullWidth />
                                        </div>

                                        <div className={clases.margenDivContenedor}>
                                            <Typography className={clases.textoTitulo} variant="h6" >
                                                Contenido
                                            </Typography>
                                            <TextoEditor editorState={editorState} onEditorStateChange={setEditorState} ></TextoEditor>

                                        </div>

                                        <Button onClick={() => Guardar()} variant="contained" color="primary">
                                            Guardar
                                        </Button>

                                    </Grid>





                                </Grid>
                                <Grid xs={1} ></Grid>


                            </Grid>
                        </div>



                }



            </div>
        </div>
    )
}

export default AdministrarNosotros
