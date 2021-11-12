import React from 'react'
import { FormControl, InputLabel, Select} from '@material-ui/core'
import {MenuItem,makeStyles} from '@material-ui/core'

const estilos=makeStyles((theme)=>({
  margenSelect:{
        margin:'0px 15px',
        width:'90%',
        [theme.breakpoints.down('xs')]:{
            margin:'15px'
        }
  }

}))
const Sel = (props) => {
    const clases=estilos()
    return (
        <FormControl className={clases.margenSelect} >
        <InputLabel id='demo-simple-select-label'>{props.label}</InputLabel>
        <Select
        labelId='demo-simple-select-label'
        id='demo-simple-select'
        value={props.topico}
        label={props.label}
        name={props.name}
        onChange={props.handleChange}    
        >
  <MenuItem   value='Todos' >Todos </MenuItem>
{ props.etiquetas!=undefined && props.etiquetas.map((value, index) =>(
    <MenuItem  key={value.descripcion}  value={value.descripcion}>{value.descripcion}</MenuItem>

))

}
        </Select>
    </FormControl>
    )
}

export default Sel
