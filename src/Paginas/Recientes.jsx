import React, { useEffect, useState } from 'react'
import { Grid, makeStyles, Typography, Button, IconButton, CircularProgress, setRef } from "@material-ui/core"
import Paper from '@material-ui/core/Paper';
import firebase from '../firebase/firebase'
import moment from 'moment'
import Swal from 'sweetalert2'
import "moment/locale/es"
import { UsuarioContext } from "../Provedores/UsuarioContext"
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import BotonFlotante from '../Componetes/BotonFlotante';
import CardPaper from '../Componetes/CardPaper/CardPaper';
import FuncionesFirebase from '../Funciones/FuncionesFirebase';
import Titulo from '../Componetes/Titulo/Titulo';
const estilos = makeStyles((theme) => ({
        button: {
                margin: '3px'
        },

        margen: {
                margin: "45px auto ",
                "& .botoneditar": {
                        background: "#4a9341",
                        color: "#ffffff",

                        "&:hover": {
                                background: "#ffffff",
                                color: "#1ab37c !important",
                        },


                },


                " & #mandarina .MuiSvgIcon-root": {

                        color: "#EC6933",

                },
                " & #verde .MuiSvgIcon-root": {

                        color: "#4B9965",

                },
                " & #morado .MuiSvgIcon-root": {

                        color: "#9372B6",

                },
                " & #azul .MuiSvgIcon-root": {

                        color: "#4CA9B2",

                },



                " & .MuiButton-containedPrimary": {

                        color: "#434343",
                        backgroundColor: "#ffffff",
                        boxShadow: "none"
                },


                "& .botoneditar": {
                        background: "#4a9341",
                        color: "#ffffff",
                        marginTop: "10px",

                        "&:hover": {
                                background: "#ffffff",
                                color: "#1ab37c !important",
                        },


                }










        },
        caja: {
                position: "relative",
                width: "80vw",
                margin: "20px auto",
                display: "block",
                height: "unset",
                borderRadius: "10px",
                transition: "background-color .25s,color .25s,box-shadow .25s",
                boxShadow: "0 8px 42px -8px rgb(0 0 0 / 20%)",
                border: "1px solid #f0f0f0",

                [theme.breakpoints.down("md")]: {
                        height: "unset"
                }

        }

        ,
        titulo: {

                fontWeight: "500",
                fontFamily: "nunito"
        }
        ,
        tituloGeneral: {

                fontWeight: "700",
                fontFamily: "Lato",
                fontSize: "27px"
        }
        ,
        spanGeneral: {
                color: theme.palette.error.main
        },
        divTituloGeneral: {
                margin: "0px auto",
                width: "85vw"
        },
        fecha: {
                fontWeight: "500",
                fontFamily: "nunito",
                paddingTop: "5px",
                color: "#717171"
        },
        contenedor: {
                margin: "18px auto"
        },
        resumen: {
                fontFamily: "nunito",
                margin: "15px auto"
        },
        diveditarborrar: {
                position: "absolute",
                bottom: "0",
                right: "9px",
                width: "90px"
        },
        divFoto: {

                width: "250px",
                height: "160px",
                border: "2px dashed #21cbce",
                display: "block",
                margin: "16px auto",
                position: "relative",
                [theme.breakpoints.down("sm")]: {
                        margin: "30px auto"
                }
        },
        divImagen: {

                height: "160px",
                width: "260px",
                backgroundSize: "260px auto",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "50%",
                borderRadius: "16px",
                display: "block",
                margin: "auto",
                marginTop: "15px",
                [theme.breakpoints.down("sm")]: {
                        marginTop: "30px"
                }



        },

        imgFoto: {
                color: "#21cbce",
                position: "absolute",
                margin: "auto",
                top: "0",
                bottom: "0",
                left: "0",
                right: "0",
                fontSize: "3rem"
        },
        cajaMeGusta: {
                position: 'absolute',
                top: '8px',
                right: '12px',
                [theme.breakpoints.down("sm")]: {
                        position: 'unset'
                }


        },
        divCircular: {
                marginTop: "100px"

        }
        , botonLikes: {
                color: "#35b37c",
                margin: "8px 0px 0x 0px",
                border: "1px solid"


        },
        margenChip: {

                margin: "0px 3px",
                [theme.breakpoints.down("sm")]: {

                        margin: "0px 4px"
                }


        },
        circular: {
                height: "72px !important",
                width: "72px !important",
                display: "block",
                margin: "auto"
        },
        divTexto: {
                [theme.breakpoints.down("md")]: {

                        margin: "0vw 5vw 0"
                },



                [theme.breakpoints.down("sm")]: {

                        margin: "5vw 5vw 0"
                }
        },
        textNoDisponible: {


                fontFamily: "Nunito",
                color: "#808080"




        },
        centrarComponente: {
                textAlign: "end",
                marginRight: "10px",
                [theme.breakpoints.down("md")]: {

                        textAlign: "center",
                }

        },
        botonPdf: {
                position: "absolute",
                bottom: "55px",
                right: '0px',
                [theme.breakpoints.down("sm")]: {
                        position: 'unset'
                }
        }
        ,
        textUpVote: {
                fontFamily: "nunito",
                textAlign: "center",
                color: "#808080"
        }





}))

const Populares = (props) => {

        const history = useHistory();
        const clases = estilos()
        const recientes = true
        const populares = false
        const usuario = useContext(UsuarioContext)
        const [listapaper, setlistapaper] = useState([])
        const [cargando, setcargando] = useState(false)
        const [cargandodos, setcargandodos] = useState(false)
        const [paper, setpaper] = useState({})
        const [ultimoDocumento, setultimoDocumento] = useState(0)
        const [vacio, setvacio] = useState(false)
        const [tituloGeneral, setTituloGeneral] = useState("The Lastest")

        const listadepaper = async (recientes, valorados) => {
                console.log("inicio")

                try {

                        if (recientes) {
                                setlistapaper([])
                                await firebase.db.collection("paper").orderBy("subida", "desc").limit
                                        (5).get().then((coleccion) => {

                                                if (coleccion.size != 0) {
                                                        console.log("paso por aca ")
                                                        const lista = coleccion.docs.map((paperObje) => {
                                                                return {
                                                                        ...paperObje.data(),
                                                                        click: false
                                                                }
                                                        })
                                                        setultimoDocumento(lista[lista.length - 1].id)
                                                        setlistapaper((listapaper) => [...listapaper, ...lista])
                                                        setcargando(false)

                                                }
                                                if (coleccion.length == 5) {
                                                        setvacio(true)
                                                } else {
                                                        setvacio(false)
                                                }

                                        }

                                        )
                        } else {
                                if (valorados) {
                                        setlistapaper([])
                                        await firebase.db.collection("paper").orderBy("likes", "desc").limit(5).get().then((coleccion) => {

                                                if (coleccion.size != 0) {

                                                        const lista = coleccion.docs.map((paperObje) => paperObje.data())
                                                        setultimoDocumento(lista[lista.length - 1].id)
                                                        setlistapaper((listapaper) => [...listapaper, ...lista])
                                                        setcargando(false)

                                                }
                                                if (coleccion.length == 5) {
                                                        setvacio(true)
                                                } else {
                                                        setvacio(false)
                                                }

                                        }

                                        )
                                } else {

                                        let nuevalista = []
                                        await firebase.db.collection("paper").orderBy("id", "desc").limit(5).get().then(valor => {


                                                nuevalista = valor.docs.map(doc => {

                                                        return {
                                                                id: doc.id,
                                                                ...doc.data()
                                                        }

                                                })

                                                if (nuevalista.length == 5) {
                                                        setvacio(true)
                                                } else {
                                                        setvacio(false)
                                                }

                                                if (nuevalista.length == 0) {
                                                        setultimoDocumento(0)
                                                } else {
                                                        setultimoDocumento(nuevalista[nuevalista.length - 1].id)
                                                }


                                        })

                                        console.log("paso por aca ")
                                        setlistapaper(nuevalista)
                                }


                        }

                } catch (error) {
                        console.log(error)
                }
                console.log("final")

                setcargando(false)
        }

        const pedirpaper = () => {
                setcargando(true)
                listadepaper(props.recientes, props.valorados)
        }


        const borrar = (e) => {
                Swal.fire({
                        title: '¿Esta seguro que desea borrar el siguiente registro?',
                        text: `${e.titulo}`,
                        showDenyButton: true,
                        confirmButtonColor: '#21cbce',
                        confirmButtonText: `Borrar`,
                        denyButtonText: `Cancelar`,
                }).then((result) => {
                        /* Read more about isConfirmed, isDenied below */
                        if (result.isConfirmed) {
                                firebase.db.collection("paper").doc(e.id).delete().then(() => {
                                        let nuevaLista = []
                                        listapaper.map((valor) => {
                                                if (valor.id != e.id) {
                                                        console.log(valor)
                                                        nuevaLista.push(valor)
                                                }

                                        })
                                        //pedirpaper()
                                        console.log("borrado")

                                }).catch((error) => {
                                        console.error("Error removing document: ", error);
                                });


                                e.etiquetas.map(valor => {

                                        firebase.db.collection("etiquetas").doc(valor.id).collection("paper").doc(e.id).delete().then(async () => {
                                                //  console.log("Document successfully deleted!");



                                                let soloTag = await firebase.db.collection("etiquetas").doc(valor.id).get().then((doc) => {


                                                        return { ...doc.data() }

                                                })

                                                console.log(soloTag)
                                                let nuevoObjeto = {
                                                        ...soloTag,
                                                        contar: soloTag.contar - 1
                                                }

                                                console.log(nuevoObjeto)

                                                firebase.db.collection("etiquetas").doc(valor.id).set(nuevoObjeto)


                                        }).catch((error) => {
                                                console.error("Error removing document: ", error);
                                        });


                                })

                                try {
                                        var borrarArchivo = firebase.storage.ref().child("PDF").child(e.id)
                                        var borrarImagen = firebase.storage.ref().child("IMAGEN").child(e.id)


                                } catch (error) {
                                        console.log(error)
                                }

                                if (borrarArchivo != undefined) {
                                        borrarArchivo.delete().then(function () {
                                                //console.log("borrado")
                                                // File deleted successfully
                                        }).catch(function (error) {

                                                console.log(error)
                                                //console.log(error)
                                                // Uh-oh, an error occurred!m
                                        });

                                }
                                if (borrarImagen != undefined) {


                                        if (e.imagen != null) {
                                                borrarImagen.delete().then(function () {
                                                        //console.log("borrado")
                                                        // File deleted successfully
                                                }).catch(function (error) {
                                                        console.log(error)
                                                        // Uh-oh, an error occurred!
                                                });
                                        }
                                }


                                Swal.fire({ title: 'Borrado!', confirmButtonColor: '#21cbce', icon: 'success' }).then(() => {
                                        pedirpaper()
                                })
                        } else if (result.isDenied) {

                        }
                })


        }


        useEffect(() => {

                setcargando(true)
                listadepaper(recientes, populares)

        }, [props.recientes, props.paperid, props.busqueda])


        const pedirTitulo = async () => {
                try {
                        const consulta = await FuncionesFirebase.pedirTitulo();
                        console.log(consulta)
                        setTituloGeneral(consulta.titulo)
                }
                catch (error) {
                        setTituloGeneral("Informacion ambiental de calidad confiable")
                        console.log(error)
                }
        }


        useEffect(() => {
                // solicitar titulos 
                pedirTitulo();

        }, [])

        const funcionCorazon = (valor) => {
                if (valor.likes > 0) {
                        return true
                } else {
                        return false
                }
        }

        const pedirMas = async () => {
                setcargandodos(true)
                const recientes = props.recientes
                const valorados = props.valorados
                const paperRef = firebase.db.collection("paper")


                try {

                        if (recientes) {




                                return paperRef.doc(ultimoDocumento).get().then(async (doc) => {
                                        //     console.log(doc)
                                        var valoradosOrdenados = await paperRef.orderBy("subida", "desc").startAfter(doc).limit(5).get()

                                        if (valoradosOrdenados.size != 0) {

                                                //      console.log(valoradosOrdenados)
                                                const lista = valoradosOrdenados.docs.map((paperObje) => ({ ...paperObje.data(), click: false }));
                                                setultimoDocumento(lista[lista.length - 1].id)
                                                setlistapaper((listapaper) => [...listapaper, ...lista])
                                                setcargandodos(false)
                                        } else {

                                                setvacio(false)
                                                setcargandodos(false)
                                        }

                                }
                                )






                        } else {


                                if (valorados) {



                                        // const valoradosRef=firebase.db.collection("paper")

                                        return paperRef.doc(ultimoDocumento).get().then(async (doc) => {
                                                console.log(doc)
                                                var valoradosOrdenados = await paperRef.orderBy("likes", "desc").startAfter(doc).limit(5).get()

                                                if (valoradosOrdenados.size != 0) {

                                                        console.log(valoradosOrdenados)
                                                        const lista = valoradosOrdenados.docs.map((paperObje) => paperObje.data())
                                                        setultimoDocumento(lista[lista.length - 1].id)
                                                        setlistapaper((listapaper) => [...listapaper, ...lista])
                                                        setcargandodos(false)

                                                } else {

                                                        setvacio(false)
                                                        setcargandodos(false)
                                                }

                                        }
                                        )

                                } else {


                                        return paperRef.doc(ultimoDocumento).get().then(async (doc) => {
                                                //console.log(doc)
                                                var valoradosOrdenados = await paperRef.orderBy("id", "desc").startAfter(doc).limit(5).get()

                                                if (valoradosOrdenados.size != 0) {

                                                        // console.log(valoradosOrdenados)
                                                        const lista = valoradosOrdenados.docs.map((paperObje) => paperObje.data())
                                                        setultimoDocumento(lista[lista.length - 1].id)
                                                        setlistapaper((listapaper) => [...listapaper, ...lista])
                                                        setcargandodos(false)

                                                } else {

                                                        setvacio(false)
                                                        setcargandodos(false)
                                                }

                                        }
                                        )
                                }


                        }

                } catch (error) {
                        console.log(error)
                }
        }


        // buscar por id del paper

        const buscarPorId = async (id) => {
                //  alert(id)
                var variable = await firebase.db.collection("paper").doc(id)
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


        const buscarChips = (valor) => {
                history.push(`/tag/${valor.id}`)
        }

        const megustaSinValidarUsuario = (valor) => {


                if (valor.click) {
                        valor.likes = valor.likes - 1
                        valor.click = false
                } else {
                        valor.likes = valor.likes + 1
                        valor.click = true
                }

                const nuevoHaVotado = [];
                let nuevoValor = {
                        ...valor,
                        likes: valor.likes,
                        haVotado: nuevoHaVotado
                }



                //guarda datos en el paper
                firebase.db.collection("paper").doc(valor.id).update({
                        ...valor,
                        likes: valor.likes,
                        haVotado: nuevoHaVotado

                })

                // mapear etiquetas
                valor.etiquetas.map(valordos => {

                        //guarda datos  en las etiquetas
                        firebase.db.collection("etiquetas").doc(valordos.id).collection("paper").doc(valor.id).update({
                                ...valor,
                                likes: valor.likes,
                                haVotado: nuevoHaVotado

                        })
                })

                armararreglo(nuevoValor)
                //setpaper({...valor,likes:valor.likes})

                // }
                console.log("final")
        }

        const armararreglo = (nuevoValor) => {

                let nuevalista = listapaper.map(valor => {

                        if (nuevoValor.id == valor.id) {

                                return {
                                        ...nuevoValor
                                }
                        } else {

                                return { ...valor }
                        }
                })

                setlistapaper(nuevalista)
        }



        return (
                <div className={clases.margen}>
                        {usuario ?
                                <div>
                                        {usuario.administrador ? <div>
                                                <BotonFlotante>

                                                </BotonFlotante>
                                        </div> :
                                                <div></div>
                                        }

                                </div> :
                                <></>
                        }


                        <div className={clases.divTituloGeneral}>


                                <Grid container>
                                        <Grid xs={12}>
                                                <Typography variant="h4" className={clases.tituloGeneral}>
                                                        Informacion ambiental de <span className={clases.spanGeneral}> calidad  confiable</span>
                                                </Typography>
                                        </Grid>
                                </Grid>
                        </div>

                        <Grid container>
                                <Grid xs={12}>
                                        {
                                                cargando ?
                                                        <div className={clases.divCircular} >
                                                                <CircularProgress className={clases.circular}></CircularProgress>
                                                        </div>
                                                        : <div>
                                                                {listapaper.length == 0 ?
                                                                        <Typography className={clases.
                                                                                textNoDisponible
                                                                        } align="center" variant="h4">
                                                                                No hay registros
                                                                        </Typography>


                                                                        :

                                                                        <div>
                                                                                {

                                                                                        listapaper.map((valor, key) => (
                                                                                                <CardPaper key={key}
                                                                                                        valor={valor}
                                                                                                        megustaSinValidarUsuario={megustaSinValidarUsuario}
                                                                                                        buscarChips={buscarChips}
                                                                                                        usuario={usuario}
                                                                                                        funcionCorazon={funcionCorazon}
                                                                                                        setlistapaper={setlistapaper}
                                                                                                        borrar={borrar}
                                                                                                />

                                                                                        ))
                                                                                }

                                                                        </div>
                                                                }

                                                                {cargandodos ?

                                                                        <div className={clases.divCircular} >
                                                                                <CircularProgress className={clases.circular}></CircularProgress>
                                                                        </div>



                                                                        :

                                                                        // vacio==true &&

                                                                        <Typography align="center">
                                                                                <Button

                                                                                        endIcon={<ExpandMoreIcon></ExpandMoreIcon>}
                                                                                        variant="contained"
                                                                                        className="botonVerMas"

                                                                                        onClick={() => {
                                                                                                pedirMas()
                                                                                        }} >
                                                                                        See More

                                                                                </Button>
                                                                        </Typography>}






                                                        </div>
                                        }




                                </Grid>


                        </Grid>


                </div>

        )
}

export default Populares
