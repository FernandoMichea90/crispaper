import React ,{useState,useEffect}from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

export default function Chips(props) {
  const classes = useStyles();
  const lista=props.etiquetas
  const [valor, setvalor] = useState(props.etiquetas)


  const removerE=props.removerEtiqueta()
  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

  const handleClick = () => {
    console.info('You clicked the Chip.');
  };

useEffect(() => {
  setvalor(props.etiquetas)
}, [props])

  return (
    <div className={classes.root}>
    {valor ?

valor.map((e) => (

                        <Chip
                      
                        key={e.id}
                        label={e.descripcion}
                        onClick={handleClick}
                        onDelete={()=>removerE(e)}
                        color="primary"
                       
                        />
  
        ))
:<div></div>}
   
    
     
    </div>
  );
}
