import React from 'react'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
     position:"fixed",
     bottom:"50px",
     right:"50px",

     " & .MuiFab-primary:hover" :{
      backgroundColor: "#ffffff",
      color:"#5fcccf",
      border:"1px solid"
  },

    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }));
  




const BotonFlotante = () => {

    const clases=useStyles()
    return (
        <div className={clases.root}>
            <Fab href="/nuevopaper" color="primary" variant="extended">
        <AddIcon className={clases.extendedIcon} />
                Agregar Paper
      </Fab>
        </div>
    )
}

export default BotonFlotante
