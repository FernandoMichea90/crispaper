import React,{useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { useHistory } from 'react-router';
import {Link} from '@material-ui/core'
import PublicIcon from '@material-ui/icons/Public';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
const useStyles = makeStyles((theme)=>({
  root: {
    width: 500,
    margin:'auto',
    '& .MuiBottomNavigationAction-root.Mui-selected': {
      color:'#e8484a',
      paddingTop: '6px',
   
    },
    [theme.breakpoints.down('sm')]:{
      width:'100%'
  }},
  
}));

export default function SimpleBottomNavigation(props) {
  const history = useHistory()
  const classes = useStyles();
  const [value, setValue] = React.useState(0);


useEffect(() => {
  const url =history.location.pathname
  if(url=='/adminetiquetas'){
    setValue(0)
  }
  if(url=='/adminetiquetas/region'){
    setValue(1)
  }
   if(url=='/adminetiquetas/tipoinformacion'){
    setValue(2)
  }
}, [])


  return (
    <BottomNavigation
    value={value}
    onChange={(event, newValue) => {

      if(newValue==0){
        history.push('/adminetiquetas')
      }
      if(newValue==1){
        history.push('/adminetiquetas/region')
      } if(newValue==2){
        history.push('/adminetiquetas/tipoinformacion')
      }
      setValue(newValue);
    }}
     
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction  label="Topico ambiental" icon={<PublicIcon />} />
     
      <BottomNavigationAction  label="Region" icon={<LocationOnIcon />} />
      <BottomNavigationAction  label="Topico de informacion" icon={<LiveHelpIcon />} />
    </BottomNavigation>
  );
}
