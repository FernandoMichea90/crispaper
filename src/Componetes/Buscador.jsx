import React,{useEffect,useState,useRef} from 'react'
import Estilos from './Estilos'
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import BookIcon from '@material-ui/icons/Book';
import Button from '@material-ui/core/Button';
import Firebase from "../firebase/firebase"
import {useHistory} from 'react-router-dom'



const Buscador = (props) => {
     const classes=Estilos()   
     const[buscador,setbuscador]=useState({
        buscado:""
      })
    const history=useHistory()
    const wrapperRef =useRef(null)
    const [noFound,setNoFound]=useState(false)
    const [listapaper, setlistapaper] = useState([])
    const formatTitle=(titulo)=>{
        var string = titulo;
        var length = 50;
        var trimmedString = string.substring(0,length);
        if(trimmedString.length<20){
          var trimmedStringdos=trimmedString
        }else{
          var trimmedStringdos=trimmedString+"..."
        }
        console.log(trimmedStringdos)
        return trimmedStringdos
   }

   const buscar=async (e)=>{
    setlistapaper([])

    console.log(e.target.value)

    setbuscador({[e.target.name]:e.target.value})

    //validar cuando el tipeo esta vacio
    if(e.target.value!==""){
     const inicio=e.target.value.toLocaleLowerCase()
    const prueba=await Firebase.db.collection("paper").
    orderBy("busqueda")
    .startAt(inicio).endAt(inicio+'\uf8ff')
    .limit(5)
   .onSnapshot(manejarSnapshot)

   }else{
     setlistapaper([])
     setNoFound(false)
   }
  }
  function manejarSnapshot(snapshot){
    const  lista =snapshot.docs.map(doc=>{
        return{
            id:doc.id,
            ...doc.data()
        }
    })

    if(lista.length==0){
        setNoFound(true)
    }else{
        setNoFound(false)

    }
    //lista paper
    setlistapaper(lista)
    return lista
}
const buscarPaper=(papermatch)=>{
    history.push(`/buscar/${papermatch.id}`)
    setlistapaper([])
}
const buscarDos=()=>{

    console.log(buscador.buscado)
      history.push({
        pathname: `/search`,
        search: `?query=${buscador.buscado}`,
        state: buscador
    });
    //event.preventDefault()
    
    }

    return (
        <div>
            <div ref={wrapperRef}     className={classes.search}>
            <div>
           <form  >
            <div className={classes.CajaBusc}>
            <InputBase

          // onBlur={()=>{
          //   setbuscador({
          //     buscado:""
          //   })
          // }}
        className={classes.Busc}
        onChange={e=>props.filtrado(e) }


        value={props.buscador.buscador}
        name="buscador"
        autoComplete="off"
        placeholder="Search..."

      />
       <IconButton onClick={()=>{buscarDos()}} color="primary" aria-label="search">
        <SearchIcon />
      </IconButton>
      </div>
        </form>
            </div>

          {listapaper.length>0?
            <div className={classes.divlista}>

            {listapaper.map((valor)=>(


                <div style={{height:"54px",
                overflow:"hidden"
                }}  >



                          <Button
                            className={classes.botonOpciones}
                            startIcon={<BookIcon></BookIcon>}
                          color="primary"
                          onClick={()=>buscarPaper(valor)}
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
          noFound&&
          <div className={classes.divlista}>
                <div style={{height:"54px",
                overflow:"hidden"
                }}>
                 <Typography className={classes.noRegistro} align="left" variant="h6">
                 no results
                  </Typography>

                  </div>
            </div>

         }
          </div>
        </div>
    )
}

export default Buscador
