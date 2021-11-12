import React, { useEffect, useState, useContext } from 'react'
import FuncionesFirebase from '../Funciones/FuncionesFirebase'
import { Typography, makeStyles, Grid, CircularProgress, Button, ListItemSecondaryAction } from '@material-ui/core'
import { useHistory } from 'react-router-dom';
import { UsuarioContext } from '../Provedores/UsuarioContext';
import Titulo from '../Componetes/Titulo/Titulo';
import Busc from '../Componetes/Tag/Buscador';
import Tabla from '../Componetes/Tag/Tabla'
import Cargando from '../Componetes/Cargando'


const Etiquetas = (props) => {
    const history = useHistory()
    const usuario = useContext(UsuarioContext)
    //state etiquet 
    // guardar el valor 
    const [paper, setpaper] = useState([])
    const [cargando, setcargando] = useState(false)
    // guardar la publicidad 
    const [publicidad, setpublicidad] = useState({})
    //guardad el state en el topico ambiental 
    const [etiquet, setetiquet] = useState({})
    //buscar todas las etiquetas
    const [etiquetas, setetiquetas] = useState([])
    //guardar todas las etiquetas antiguas
    const [paperAntiguas, setpaperAntiguas] = useState([])
    // etiquetas Regiones 
    const [regiones, setregiones] = useState([])
    //region seleccionada 
    const [region, setregion] = useState({})
    //tipo informacion seleccionada
    const [tipoinformacion, settipoinformacion] = useState({})
    //Topico informacion
    const [topicoinformacion, settopicoinformacion] = useState([])
    //armar filtro 
    const [filtro, setfiltro] = useState({
        topicoambiental: null,
        region: null,
        tipoinformacion: null

    })

    const buscarPaper = async (valor) => {
        const etiquetaBd = await FuncionesFirebase.retornarEtiqueta(valor)
        console.log(etiquetaBd)
        setpublicidad({sponsor:etiquetaBd.sponsor,sponsorURL:etiquetaBd.sponsorUrl } )
        setfiltro({ ...filtro, topicoambiental: etiquetaBd.descripcion })
        setetiquet(etiquetaBd.descripcion)
        const paperBd = await FuncionesFirebase.buscarPorEtiquetas(etiquetaBd)
        console.log(paperBd)
        setregion(null)
        settipoinformacion(null)
        setpaper(paperBd)
        setpaperAntiguas(paperBd)
        const etiquetasBd = await FuncionesFirebase.ListarEtiquetas()
        setetiquetas(etiquetasBd)
        armarListaRegiones(paperBd)
        armarListaTopicoInformacion(paperBd)
    }
    //  renovar funcion state 

    const Renovar = (TopicAmb) => {
        let valor = {
            topicoambiental: TopicAmb,
            region: null,
            tipoinformacion: null
        }
        setfiltro(valor)
        setetiquet(valor.topicoambiental)
        setregion(valor.region)
        settipoinformacion(valor.tipoinformacion)
    }

    const buscarPaperTagDescricion = async (valor) => {
        setcargando(true)
        let renovar = false
        let paperBd = []
        //variable de la etiqueta para topicos ambientales
        let etiquetaBd = {}
        console.log(valor)
        //retornar paper segun etiqueta
        if (valor.topicoambiental == 'Todos') {
            paperBd = await FuncionesFirebase.retornarTodosPaper()
            setpublicidad()
            etiquetaBd.descripcion = 'Todos'
            renovar = true
        } else {
            if (valor.topicoambiental == filtro.topicoambiental) {
                paperBd = paperAntiguas
                console.log(paperBd)
                etiquetaBd.descripcion = valor.topicoambiental
            } else {
                //buscar el topico ambiental segun la descrpcion
                etiquetaBd = await FuncionesFirebase.retornarEtiquetaDescripcion(valor.topicoambiental)
                paperBd = await FuncionesFirebase.buscarPorEtiquetas(etiquetaBd)
                if (etiquetaBd.sponsor != undefined) { setpublicidad({sponsor:etiquetaBd.sponsor,sponsorURL:etiquetaBd.sponsorUrl }) } else { setpublicidad() }
                setpaperAntiguas(paperBd)
                console.log(paperBd)
                etiquetaBd.descripcion = valor.topicoambiental
                renovar = true
            }

        }
        // se inserta valor del topico ambiental
        setetiquet(etiquetaBd.descripcion)
        // filtrar paper con las regiones
        if (valor.region !== null) {
            if (valor.region !== 'Todos') {
                console.log(valor.region)
                console.log(paperBd)
                let nuevalista = filtrarPaperPorRegion(paperBd, valor.region)
                paperBd = nuevalista
                console.log(paperBd)
                setregion(valor.region)
            } else {
                setregion(valor.region)
            }
        }
        //filtrar por topico de informacion
        //validacion 
        console.log(valor)
        if (valor.tipoinformacion !== null) {
            if (valor.tipoinformacion !== 'Todos') {
                paperBd = filtrarPaperPorTopicoInformacion(paperBd, valor.tipoinformacion)
                console.log(paperBd)
            }
        }
        settipoinformacion(valor.tipoinformacion)
        setpaper(paperBd)
        //const etiquetasBd=await FuncionesFirebase.ListarEtiquetas()
        // setetiquetas(etiquetasBd)
        armarListaRegiones(paperBd)
        armarListaTopicoInformacion(paperBd)
        if (renovar == true) {
            Renovar(valor.topicoambiental)
        }
        setcargando(false)


    }
    const armarListaRegiones = (paperBd) => {
        let nuevaLista = []
        console.log(paperBd)
        paperBd.map(doc => {
            console.log(doc)
            if (doc.Regiones != undefined) {
                doc.Regiones.map(doc => {
                    return nuevaLista.push(doc)
                })

            } else { return nuevaLista }
        })
        let resultado = nuevaLista.filter((v, i, a) => a.findIndex(t => (t.descripcion === v.descripcion && t.id === v.id)) === i)
        setregiones(resultado)
    }
    const filtrarPaperPorRegion = (listaPaper, region) => {

        let list = []
        listaPaper.map(paper => {

            if (paper.Regiones != undefined) {
                paper.Regiones.map(doc => {
                    if (doc.descripcion == region) {
                        console.log('coincide')
                        list.push(paper)
                    }
                })
            }


        })

        return list
    }
    const filtrarPaperPorTopicoInformacion = (listaPaper, Informacion) => {

        console.log(listaPaper)
        console.log(Informacion)
        let list = []
        listaPaper.map(paper => {

            if (paper.TopicoInformacion != undefined) {
                paper.TopicoInformacion.map(doc => {
                    if (doc.descripcion == Informacion) {
                        console.log('coincide')
                        list.push(paper)
                    }
                })
            }


        })

        return list
    }
    const armarListaTopicoInformacion = (paperBd) => {
        let nuevaLista = []
        paperBd.map(doc => {
            if (doc.TopicoInformacion != undefined)
                doc.TopicoInformacion.map(doc => {
                    return nuevaLista.push(doc)
                })
        })
        let resultado = nuevaLista.filter((v, i, a) => a.findIndex(t => (t.descripcion === v.descripcion && t.id === v.id)) === i)
        settopicoinformacion(resultado)
    }
    const handleChange = (event) => {
        //buscarPaperTagDescricion(event.target.value)
        setfiltro({ ...filtro, [event.target.name]: event.target.value })
        const objeto = { ...filtro, [event.target.name]: event.target.value }
        buscarPaperTagDescricion(objeto)
    }

    useEffect(async () => {
        
        const { valor } = props.match.params
        buscarPaper(valor)
        setcargando(false)
        //  guardar en un state en una etiqueta 
    }, [])


    return (
        <>
            {
                cargando ?
                    <div>
                        <Cargando></Cargando>
                    </div>
                    :
                    <div>
                        <Grid container>
                            <Grid xs={1}></Grid>
                            <Grid xs={10}><Titulo></Titulo></Grid>
                            <Grid xs={1}></Grid>
                        </Grid>



                        <Busc tipoinformacion={tipoinformacion} publicidad={publicidad}  etiqueta={etiquet} region={region} handleChange={handleChange} etiquetas={etiquetas} regiones={regiones} topicoinformacion={topicoinformacion} setpaper={setpaper}></Busc>
                        <div>
                            <Tabla paper={paper}></Tabla>
                        </div>



                    </div>
            }


        </>

    )
}


export default Etiquetas
