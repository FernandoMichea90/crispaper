import React, { useState, useContext, useEffect } from 'react';
import { makeStyles, fade } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Hidden,  Link } from '@material-ui/core'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu'
import AddIcon from '@material-ui/icons/Add';
import { UsuarioContext } from '../../Provedores/UsuarioContext';
import Firebase from "../../firebase/firebase"
import BookIcon from '@material-ui/icons/Book';
import { useHistory } from 'react-router-dom'
import { useRef } from 'react';
// import Icono from "../../pajaro.svg"
import Icono from "../../planet_colab2.png"

import { withRouter } from "react-router";
import Swal from "sweetalert2"
import FuncionesFirebase from '../../Funciones/FuncionesFirebase';
import PublicIcon from '@material-ui/icons/Public';
import Dialogo from './Dialogo';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,

    "& .botonCollaborate": {
      color: "#ffffff",
      background: theme.palette.error.main + " !important",
      fontSize: '12px',
      marginLeft: '5px',

      "&:hover": {
        color: "#ffffff",
      },


    },

    "& .MuiTypography-body1": {
      fontFamily: "Nunito",
      fontWeight: "800"

    },
    "& .MuiTypography-subtitle1": {
      fontFamily: "Nunito",
      fontWeight: "800"
    },


    "& .swal2-textarea": {
      fontFamily: "Nunito !important",
      color: "#21cbce",
    },


    "& .MuiButton-outlinedPrimary": {
      color: "#4a9341",
      border: "1px solid #4a9341",
      margin: "0px 15px"
    },

    "& .MuiLink-underlineHover:hover": {
      textDecoration: "none"
    },

    " & .MuiButton-containedPrimary:hover": {
      backgroundColor: "#303f9f00",
      color: "#5fcccf",
      border: "1px solid"
    },
    "& .MuiInput-underline": {
      borderBottom: "none !important"
    },
    "& #prueba .MuiSvgIcon-root": {
      color: "#000000"
    },
    "& .cajaMenu": {
      padding: "59px 0px 0px",
      height: "200px",
      background: "#21cbce"
    },
    "& .cajaMenuDos": {
      padding: "59px 0px 0px",
      height: "0px",
      background: "#21cbce"
    }







  },
  grow: {
    flexGrow: 1,
  },



  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },

  search: {
    position: 'relative',
    background: "#cfcfcf3d",
    border: "1px solid #ccc",
    borderRadius: "22px",
    height:"45px",
    [theme.breakpoints.down("md")]: {

      padding: "10px 0px 10px 0px",
      border: "1px solid #ccc",


    }


  },

  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },


  inputRoot: {
    color: 'primary',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },


  linkclass: {
    cursor: "pointer",
    padding: "5px 10px 5px 10px",
    '&:hover': {
      padding: "5px 10px 5px 10px",
      background: "#43434329",
      borderRadius: "25px"

    }
    ,
    [theme.breakpoints.down("sm")]: {
      padding: "unset"
    },


  },


  linkclassnohover: {
    cursor: "pointer",
    padding: "5px 25px 5px 25px",


    [theme.breakpoints.down("sm")]: {
      padding: "unset"
    },


  },

  linkclassdos: {
    cursor: "pointer",
    padding: "5px 25px 5px 25px",
    background: "#43434329",
    borderRadius: "25px"


  },
  estiloIcono: {
    height: "45px",
    padding: "0px 0px 0px"

  },
  divlista: {

    position: "absolute",
    left: "0",
    right: "0",
    zIndex: "1",
    margin: "auto",
    borderWidth: "1px 1px 1px 1px",
    borderStyle: "solid",
    borderColor: "#e0e0e0",
    backgroundColor: "white",
    /* right: 6px; */
    top: "50px",
    width: "500px",

    //left: 24px;



    [theme.breakpoints.down("md")]: {
      width: "93vw",
      top: "71px",

    },





  },
  resumen: {

    fontFamily: "nunito",
    margin: "15px auto",
    color: "#000000DE",
    lineHeight: "2"
  },
  icono: {
    display: "block",
    margin: "15px auto"
  },
  botonOpciones: {
    padding: "18px 8px",
    justifyContent: "left",
    width: "100%"

  },
  cajaMenu: {
    padding: "2px 5px 0px 5px",
    height: "453px",
    transition: "height 0.25s ease-in",
    overflow: "hidden",
  },
  cajaMenuTres: {
    padding: "2px 5px 0px 5px",
    height: "350px",
    transition: "height 0.25s ease-in",

  },
  cajaMenuDos: {
    padding: "2px 0px 0px",
    height: "0px",

    overflow: "hidden",
    transition: "height 0.25s  ease-out"
  },
  cajaListMenu: {
    border: "0.01px solid",
    borderColor: "#e5e5e5",
    margin: "11px 11px 11px",
    background: "#ffffff"
  },
  input: {
    marginLeft: "15px",
    [theme.breakpoints.down("md")]: {
      width: "85%"
    }
  },
  linkList: {
    padding: "5px 0px",
    textDecoration: "none",
    color: "rgb(0 0 0 / 30%)",
    cursor: "pointer"
  },
  linkLi: {
    padding: "9px 0px",
    cursor: "pointer"
  },
  linkLiDos: {
    width: "50%",
    margin: "3px auto",
    borderRadius: "21px",
    color: "white",
    background: "#4a9341"

  }
  ,
  esconder: {
    display: "none"

  },

  mostrar: {
    display: "unset"

  },
  noRegistro: {

    width: "50%",
    padding: "10px",
    color: "#808080"
  }





}))

const ButtonAppBar = (props) => {

  const history = useHistory()
  const [url, seturl] = useState(history.location.pathname)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [menu, setmenu] = useState(false)
  const [appBar, setappBar] = useState(false)
  const [listapaper, setlistapaper] = useState([])
  const [noFound, setNoFound] = useState(false)
  const [buscador, setbuscador] = useState({
    buscado: ""
  })
  const [abrir, setabrir] = useState(false)
  const open = Boolean(anchorEl);
  const usuario = useContext(UsuarioContext)
  const wrapperRef = useRef(null)

  const abrirVentana = () => {
    setabrir(true)
  }
  const cerrarVentana = () => {
    setabrir(false)
  }
  const dejarUnaColaboracion = async () => {

    const { value: text } = await Swal.fire({
      input: 'textarea',
      title: 'Would you like to collaborate?',
      inputPlaceholder: 'Please tell us about the environmental software or sources of environmental information that you know',
      confirmButtonColor: '#21cbce',
      denyButtonText: `Cancel`,
      confirmButtonText: `Send`,
      showDenyButton: true,
    })

    if (text) {





      let user = "anonimo"
      let anonimo = true

      if (usuario != null) {
        user = {
          nombre: usuario.displayName,
          email: usuario.email,
          imagen: usuario.photoURL
        }
        anonimo = false

      }
      //Swal.fire(text)


      let Comentario = {
        fecha: new Date(),
        usuario: user,
        comentario: text,
        anonimo
      }

      console.log(Comentario)

      FuncionesFirebase.IngresarColaboracion(Comentario)
    }



  }
  const abrirCerrarMenu = () => {

    setmenu(!menu)
  }

  const handleClose = () => {
    setAnchorEl(null);

  };
  // handle menu
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const buscarPaper = (papermatch) => {
    history.push(`/buscar/${papermatch.id}`)
    setlistapaper([])
  }
  // cerrar sesion
  const cerrarSesion = () => {

    Firebase.cerrarSesion()

  }


  const formatTitle = (titulo) => {
    var string = titulo;
    var length = 50;
    var trimmedString = string.substring(0, length);
    if (trimmedString.length < 20) {
      var trimmedStringdos = trimmedString
    } else {
      var trimmedStringdos = trimmedString + "..."
    }
    console.log(trimmedStringdos)
    return trimmedStringdos
  }
  const formatTitleDos = (titulo) => {
    var string = titulo;
    var length = 30;
    var trimmedString = string.substring(0, length);

    if (trimmedString.length < 12) {
      var trimmedStringdos = trimmedString

    } else {
      var trimmedStringdos = trimmedString + "..."
    }



    console.log(trimmedStringdos)
    return trimmedStringdos

  }


  const buscar = async (e) => {
    setlistapaper([])

    console.log(e.target.value)

    setbuscador({ [e.target.name]: e.target.value })

    //validar cuando el tipeo esta vacio
    if (e.target.value !== "") {
      const inicio = e.target.value.toLocaleLowerCase()
      const prueba = await Firebase.db.collection("paper").
        orderBy("busqueda")
        .startAt(inicio).endAt(inicio + '\uf8ff')
        .limit(5)
        .onSnapshot(manejarSnapshot)

    } else {
      setlistapaper([])
      setNoFound(false)
    }
  }




  function manejarSnapshot(snapshot) {
    const lista = snapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      }
    })

    if (lista.length == 0) {
      setNoFound(true)
    } else {
      setNoFound(false)

    }
    //lista paper
    setlistapaper(lista)
    return lista
  }





  const dejarUnComentario = async () => {

    const { value: text } = await Swal.fire({
      input: 'textarea',
      title: 'Sugerencias-Comentarios-Preguntas?',
      inputPlaceholder: 'Por favor escribe tu feedback aquí',
      confirmButtonColor: '#21cbce',
      denyButtonText: `Cancelar`,
      confirmButtonText: `Enviar`,
      showDenyButton: true,
    })

    if (text) {





      let user = "anonimo"
      let anonimo = true

      if (usuario != null) {
        user = {
          nombre: usuario.displayName,
          email: usuario.email,
          imagen: usuario.photoURL
        }
        anonimo = false

      }
      //Swal.fire(text)


      let Comentario = {
        fecha: new Date(),
        usuario: user,
        comentario: text,
        anonimo
      }

      console.log(Comentario)

      FuncionesFirebase.IngresarComentario(Comentario)
    }



  }



  const classes = useStyles();

  // state Scroll

  //hacer un useEffect

  useEffect(() => {


    console.log(history.location.pathname)


    if (history.location.pathname == "/login") {
      if (usuario !== null) {
        console.log("redirecciono ")
        setappBar(false)
        history.push("/")


      } else {
        setappBar(true)

      }

    } else {

      if (history.location.pathname == "/adminetiquetas" || history.location.pathname == "/ab") {

        setappBar(true)
      } else {
        setappBar(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }

  }, [usuario, url, history.location.pathname])




  const handleClickOutside = event => {

    const { current: wrap } = wrapperRef
    if (wrap && !wrap.contains(event.target)) {
      setlistapaper([])
      setNoFound(false)
      // onBlur={()=>{
      setbuscador({
        buscado: ""
      })
      // }}
    }
  }


  const pruebaFormulario = (event) => {
    history.push({
      pathname: `/search`,
      search: `?query=${buscador.buscado}`,
      state: buscador
    });
    event.preventDefault()

  }



  const buscarDos = () => {

    console.log(buscador.buscado)
    history.push({
      pathname: `/search`,
      search: `?query=${buscador.buscado}`,
      state: buscador
    });
    //event.preventDefault()

  }


  return (
    <div className={classes.root} >
      <Dialogo abierto={abrir} cerrar={cerrarVentana}  ></Dialogo>
      <AppBar position="static" color="secondary" elevation={0} >
        <Toolbar>
          <Typography align="center">
            <Link href="/" className={classes.linkclassnohover}>

              <img className={classes.estiloIcono} src={Icono} alt="" />

            </Link>

          </Typography>
          <Hidden lgUp>
            <Typography variant="h6" style={{ flexGrow: "1" }}>

            </Typography>

            <Typography align="center">

              <IconButton onClick={() => abrirCerrarMenu()} edge="start" variant="contained" color="primary" aria-label="menu"  >

                <MenuIcon style={{ fontSize: "35px" }} />

              </IconButton>


            </Typography>

          </Hidden>

          <Hidden mdDown>
            <div ref={wrapperRef} className={classes.search}>
              <div>
                <form onSubmit={pruebaFormulario}>
                  <InputBase

                    // onBlur={()=>{
                    //   setbuscador({
                    //     buscado:""
                    //   })
                    // }}
                    className={classes.input}
                    onChange={e => buscar(e)}


                    value={buscador.buscado}
                    name="buscado"
                    autoComplete="off"
                    placeholder="Buscar"

                  />
                  <IconButton onClick={() => { buscarDos() }} color="primary" aria-label="search">
                    <SearchIcon />
                  </IconButton>
                </form>
              </div>

              {listapaper.length > 0 ?
                <div className={classes.divlista}>

                  {listapaper.map((valor) => (


                    <div style={{
                      height: "54px",
                      overflow: "hidden"
                    }}  >



                      <Button
                        className={classes.botonOpciones}
                        startIcon={<BookIcon></BookIcon>}
                        color="primary"
                        onClick={() => buscarPaper(valor)}
                      >



                        {
                          formatTitle(valor.titulo)
                        }

                      </Button>



                      {/* <Link onCli >
<Grid
container
>


  <Grid xs={1}>
        <div>
          <BookIcon className={classes.icono}  />
        </div>
  </Grid>
  <Grid xs={11}>
d
        <Typography align="left" className={classes.resumen}  variant="body1" >
           {valor.titulo}
        </Typography>
  </Grid>

</Grid>
</Link> */}
                    </div>






                  ))}


                </div>
                :
                noFound &&
                <div className={classes.divlista}>
                  <div style={{
                    height: "54px",
                    overflow: "hidden"
                  }}>
                    <Typography className={classes.noRegistro} align="left" variant="h6">
                      no results
                    </Typography>

                  </div>
                </div>

              }
            </div>







            {/* <Hidden mdDown> */}




            <div className={classes.grow} />



            {!appBar ?

              <>
              <Link href="/about" className={classes.linkclass}>
                  <div className="divHover">
                    <Typography align="center" >
                      Nosotros
                    </Typography>
                    <div className="subrayado"></div>
                  </div>
                </Link>
                {/* <Link href='/latest' className={classes.linkclass}>
                  <div className="divHover">
                    <Typography >

                      Latest

                    </Typography>
                    <div className="subrayado"></div>
                  </div>
                </Link> */}
                <Link href="/popular" className={
                  classes.linkclass}>
                  <div className="divHover">
                    <Typography >

                      Popular
                    </Typography>
                    <div className="subrayado"></div>
                  </div>
                </Link>

                <Link 
                  onClick={() => {
                    {
                      handleClose()
                      abrirCerrarMenu()
                      history.push("/why")
                    }
                  }}
                 className={
                  classes.linkclass}>
                  <div className="divHover">
                    <Typography >

                      Soluciones
                    </Typography>
                  </div>
                </Link>




              </>


              :
              <div></div>
            }

            {/* <Link href="/choose" className={classes.linkclass}>
              <div className="divHover">
                <Typography >
                  Topics

                </Typography>
                <div className="subrayado"></div>
              </div>
            </Link> */}






            {usuario == null ?

              <>

                
                {/* <Link href="/why" className={classes.linkclass}>
                  <div className="divHover">
                    <Typography align="center" >

                      Why
                      <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      endIcon={<AddIcon></AddIcon>}
                      variant="contained"
                      color="primary"
                  >
                      mas
                  </Button>

                    </Typography>
                    <div className="subrayado"></div>
                  </div>
                </Link> */}
                {/* <Link  onClick={()=>dejarUnComentario()} className={classes.linkclass}>
          <div className="divHover">
              <Typography align="center" >

                Feedback
                  {/* <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      endIcon={<AddIcon></AddIcon>}
                      variant="contained"
                      color="primary"
                  >
                      mas
                  </Button> */}

                {/* </Typography>
              <div className="subrayado"></div>
            </div>
            </Link> */}

                <Button onClick={() => dejarUnComentario()} className="botonCollaborate" variant="contained"

                  startIcon={<PublicIcon />}

                >

                  FeedBack
                </Button>


              </>




              :
              usuario.administrador ?


                <Link onClick={handleMenu} className={classes.linkclassnohover}>

                  <div className="divHover">
                    <Typography align="center" >


                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        endIcon={<AddIcon></AddIcon>}
                        variant="contained"
                        color="primary"
                      >
                        More
                      </Button>

                    </Typography>
                    <div className="subrayado"></div>
                  </div>
                </Link>






                :

                <>
                  <Link href="/about" className={classes.linkclass}>
                    <div className="divHover">
                      <Typography align="center" >

                        About
                        {/* <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    endIcon={<AddIcon></AddIcon>}
                    variant="contained"
                    color="primary"
                >
                    mas
                </Button> */}

                      </Typography>
                      <div className="subrayado"></div>
                    </div>
                  </Link>





                </>






            }


            {/* <Link onClick={handleMenu} className={classes.linkclass}> */}
            {/* <Link  className={classes.linkclass}>
        <div className="divHover">
            <Typography align="center" >

              Nosotros
                {/* <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    endIcon={<AddIcon></AddIcon>}
                    variant="contained"
                    color="primary"
                >
                    mas
                </Button> */}
            {/*
            </Typography>
            <div className="subrayado"></div>
          </div>
          </Link> */}




            {usuario ?
              <Button variant="outlined" color="primary" onClick={() => cerrarSesion()}>
                Sign out
              </Button>

              :

              <></>
              // para cuando el usuario  sea necesario
              //   <Button variant="outlined" color="primary" href="/login">
              //   Iniciar Sesion
              //  </Button>
            }




          </Hidden>
        </Toolbar>

        <Menu
          id="menu-appbar"
          keepMounted
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={() => {
            handleClose()
            abrirCerrarMenu()
            history.push("/about")
          }}>Nosotros</MenuItem>
          <MenuItem onClick={() => {
            handleClose()
            abrirCerrarMenu()
            history.push("/why")
          }}>Why</MenuItem>
          <MenuItem onClick={() => {
            handleClose()
            abrirCerrarMenu()
            history.push("/administrarnosotros")
          }}>Administrar Nosotros</MenuItem>
          <MenuItem onClick={() => {
            handleClose()
            abrirCerrarMenu()
            history.push("/admintitulo")
          }}>Administrar Titulo</MenuItem>
          <MenuItem onClick={() => {
            history.push("/adminetiquetas")
            setmenu(false)
            handleClose()
          }}>Administrar Etiquetas</MenuItem>
          <MenuItem onClick={() => {
            history.push("/admintipos")
            setmenu(false)
            handleClose()
          }}>Administrar Tipos</MenuItem>
          <MenuItem onClick={() => {
            history.push("/adminwhy")
            setmenu(false)
            handleClose()
          }}>Administrar Why</MenuItem>
          <MenuItem onClick={() => {
            history.push("/listacomentarios")
            setmenu(false)
            handleClose()
          }}>Ver Comentarios </MenuItem>

          <MenuItem onClick={() => {
            history.push("/colaborate")
            setmenu(false)
            handleClose()
          }}>Ver Colaboraciones </MenuItem>
          <MenuItem onClick={() => {
            history.push("/listusuarios")
            setmenu(false)
            handleClose()
          }}>Usuarios</MenuItem>
          {/* <MenuItem onClick={handleClose}>Partner</MenuItem> */}
        </Menu>
      </AppBar>












      <Hidden lgUp>
        <div className={menu ?
          listapaper.length > 0 ?
            classes.cajaMenuTres :
            classes.cajaMenu
          : classes.cajaMenuDos}>


          <div ref={wrapperRef} className={classes.search}>
            <div className={classes.cajaListMenu}>

              <InputBase
                className={classes.input}
                onChange={e => buscar(e)}
                value={buscador.buscado}
                name="buscado"
                autoComplete="off"
                placeholder="Buscar"
                inputProps={{ 'aria-label': 'search google maps' }}
              />
              <IconButton onClick={() => { buscarDos() }} color="primary" aria-label="search">
                <SearchIcon />
              </IconButton>



            </div>

            {listapaper.length > 0 ?
              <div className={classes.divlista}>

                {listapaper.map((valor) => (



                  <div style={{
                    height: "54px",
                    overflow: "hidden"
                  }}  >



                    <Button
                      className={classes.botonOpciones}
                      startIcon={<BookIcon></BookIcon>}
                      color="primary"
                      onClick={() => buscarPaper(valor)}
                    >

                      {formatTitleDos(valor.titulo)
                      }
                    </Button>



                    {/* <Link onCli >
<Grid
container
>


  <Grid xs={1}>
        <div>
          <BookIcon className={classes.icono}  />
        </div>
  </Grid>
  <Grid xs={11}>

        <Typography align="left" className={classes.resumen}  variant="body1" >
           {valor.titulo}
        </Typography>
  </Grid>

</Grid>
</Link> */}
                  </div>


                ))}


              </div>
              : <div></div>}

            {/* <div className={menu?classes.mostrar:classes.esconder}> */}


            {appBar ? <div></div> :
              <>
                {/* <Link  href='/latest'   className={classes.linkList} >
              <Typography className={props.recientes?classes.linkLiDos:classes.linkLi} align="center" variant="subtitle1">
                        Latest
              </Typography>
              </Link> */}
                <Link href='/popular' className={classes.linkList} >
                  <Typography className={props.valorados ? classes.linkLiDos : classes.linkLi} align="center" variant="subtitle1">
                    Popular
                  </Typography>
                </Link>
              </>
            }

            {/* 
                <Link href="/choose" className={classes.linkList}>
              <Typography className={classes.linkLi} align="center" variant="subtitle1">
              Environmental Topics
              </Typography>
              </Link> */}



            {usuario == null ?
              <>
                <Link onClick={() => {
                  {
                    handleClose()
                    abrirCerrarMenu()
                    history.push("/about")
                  }
                }} className={classes.linkList} >
                  <Typography className={classes.linkLi} align="center" variant="subtitle1">
                    Nosotros
                  </Typography>
                </Link>
                <Link onClick={() => {
                  {
                    handleClose()
                    abrirCerrarMenu()
                    history.push("/why")
                  }
                }} className={classes.linkList} >
                  <Typography className={classes.linkLi} align="center" variant="subtitle1">
                    Soluciones
                  </Typography>
                </Link>
                <Link onClick={() => dejarUnComentario()} className={classes.linkList} >
                  <Typography className={classes.linkLi} align="center" variant="subtitle1">
                    Feedback
                  </Typography>
                </Link>

              </>
              :

              usuario.administrador ?
                <Link onClick={handleMenu} className={classes.linkclass}>
                  <div className="divHover">
                    <Typography align="center" >
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        endIcon={<AddIcon></AddIcon>}
                        variant="contained"
                        color="primary"
                      >
                        more
                      </Button>
                    </Typography>
                    <div className="subrayado"></div>
                  </div>
                </Link>
                :
                <>
                  <Link className={classes.linkList} >
                    <Typography className={classes.linkLi} align="center" variant="subtitle1">
                      Nosotros
                    </Typography>
                  </Link>


                </>

            }

            <Typography className={classes.linkLi} align="center" variant="h6">


              {usuario ?
                <Button color="primary" variant="outlined" onClick={() => cerrarSesion()} >
                  Log out
                </Button>
                :

                <></>
                //   <Button color="primary" variant="outlined" href="/login" >
                //   Log in
                // </Button>

              }

            </Typography>
          </div>
          {/* </div> */}



        </div>




      </Hidden>


    </div>
  );
}


export default withRouter(ButtonAppBar)