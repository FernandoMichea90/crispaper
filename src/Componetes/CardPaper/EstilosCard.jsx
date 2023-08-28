import { makeStyles } from "@material-ui/core";


export const EstilosCard = makeStyles((theme) => ({
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
  },
  titulo: {
    fontWeight: "500",
    fontFamily: "nunito"
  },
  tituloGeneral: {
    fontWeight: "700",
    fontFamily: "Lato",
    fontSize: "27px"
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
      position: 'unset',
    }
  },
  divCircular: {
    marginTop: "100px"
  },
  botonLikes: {
    color: "#35b37c",
    margin: "8px 0px 0x 0px",
    border: "1px solid"
  },
  margenChip: {
    margin: "0px 3px",
    [theme.breakpoints.down("sm")]: {
      margin: "5px 23px"
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
  },
  textUpVote: {
    fontFamily: "nunito",
    textAlign: "center",
    color: "#808080"
  },
  divBotones: {
    margin:0,
    [theme.breakpoints.down("sm")]: {
      display: 'flex',
      margin:'10px 23px',
      justifyContent: 'space-between'
    }
  }

}));
