import React,{useState,useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Firebase from "../firebase/firebase"
import Google from '../../src/google.png'
import Swal from 'sweetalert2'


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" >
      Planetcolab
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '92vh',

  "& body":{
    backgroundColor:"#ffffff"
  },
   

    " & .submit": {
      margin: theme.spacing(5, 0, 2),
      background:"#ffffff",
      color:"#000000"
    },
    " & .MuiButton-containedPrimary:hover" :{
      backgroundColor: "#303f9f00",
      color:"#5fcccf",
      border:"1px solid"
  },
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:"#ffffff",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(1, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  botonGoogle:{
    background:"#ffffff",
    color:"#000000"
  },
  imagenGoogle:{
    margin:"12px"
  }

}));

export default function SignInSide(props) {




  const [recuerdame, setrecuerdame] = useState({
    recuerdame:false
  })

  const [user, setuser] = useState({
    email:"",
   password:"" 

  })
  const [errores, seterrores] = useState({
    email:null,
    password:null

  })

  const classes = useStyles();



  const handleChangeCheck=(e)=>{
   

        if(e.target.checked==false){

          localStorage.clear()
        }


      setrecuerdame({
        [e.target.name]:e.target.checked

      })


}




  const handleChange=e=>{
      e.preventDefault()
        setuser({
          ...user,[e.target.name]:e.target.value

        })


  }


  const validar=()=>{

      let err={}

      if(user.email==""){
          err.email="debes ingresar un usuario"
      }else{ 
      
            if( !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(user.email) ) {
              err.email= "Email no válido"
            }
        }
      if(user.password==""){
        err.password="debes ingresar una contraseña"
      }


        return err

  }

  const iniciarCorreoGmail=()=>{
       // alert("paso por el boton")
       Firebase.registrarCorreo()
       props.history.push("/")
      
       
   }



  const iniciarSesion=async()=>{
    let err=validar()
    seterrores(err)

    if(Object.keys(err).length){

       

    }else{

      try{
      await Firebase.login(user)
       recordar()
        props.history.push("/")

      }catch(error){

        console.log(error.code)

        if(error.code=="auth/wrong-password"){

          Swal.fire({
            title:"Error",
            text:"contraseña invalida",
            icon:"error",
            confirmButtonColor:'#21cbce',
        })
  
  
        }
  


        if(error.code=="auth/user-not-found"){

          Swal.fire({
            title:"La cuenta no existe",
            icon:"error"
        })

        }
      }
    
    

    }


  }

  const recordar =()=>{

      if(recuerdame.recuerdame==true){

           localStorage.user=user.email
           localStorage.password=user.password
           localStorage.recuerdame=recuerdame.recuerdame


      }else{

        localStorage.clear()
      }

  }

const recuperarContrasena=async()=>{

   await Swal.fire({
    title: 'Recuperar contraseña',
    input: 'text',
    confirmButtonColor: '#21cbce',
    
    inputPlaceholder: 'Ingrese su  correo',
    preConfirm: async(login) => {
      
      try {

        if(login==""){
       
          Swal.showValidationMessage(
            `Debe ingresar un correo`
          )
  
       
      }else{ 
        
        if( !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(login) ) {
          Swal.showValidationMessage(
            `Correo invalido`
          )
  
        }else{
              console.log("hola mundo")
          await Firebase.auth.sendPasswordResetEmail(login).then((prueba)=>{
                  console.log(prueba)
                  return {
                    resultado:"correoenviado"
                  }

          }).catch(error=>{ 
            console.log(error)
          })
        }



        }
        
      } catch (error) {
        console.log(error)
      }
     
  
  
  
  },
    allowOutsideClick: () => !Swal.isLoading()
  }).then((result) => {
    

    if (result.isConfirmed) {
      Swal.fire({
        title: `correo enviado`,
        icon:  `success`
      })
    }
  
  })
   
  


}


 useEffect(() => {
            let prueba={
              email:"",
              password:""
            }
      
         if(localStorage.user!=undefined){
       
                  prueba.email=localStorage.user
           
         }
         if(localStorage.password!=undefined){
          
              prueba.password=localStorage.password
         }

          if(localStorage.recuerdame!=undefined){
          setrecuerdame({recuerdame:localStorage.recuerdame})
       }
     
       



      
        setuser(prueba)


 
 }, [])

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
         
        <Avatar className={classes.avatar}>
            <LockOutlinedIcon color="secondary" />
          </Avatar>
          <Typography component="h1" variant="h5">
          Sign in
          </Typography>
          <div className={classes.form} >


            {errores.email?
            
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
           
              label="Email address"
              name="email"
              onChange={handleChange}
              autoComplete="email"
           
              error
              id="standard-error" 
              helperText={errores.email}
            />:
            <TextField
            variant="outlined"
            margin="normal"
            onChange={handleChange}
            required
            fullWidth
            id="email"
            label="Email address"
            name="email"
            autoComplete="email"
          
            value={user.email}
          />
            }




            {errores.password?

<TextField
variant="outlined"
margin="normal"
required
fullWidth
name="password"
label="Password"
type="password"
id="password"
autoComplete="current-password"
error
id="standard-error" 
onChange={handleChange}
helperText={errores.password}
/>
            
          :
          <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          onChange={handleChange}
          id="password"
          autoComplete="current-password"
          value={user.password}
        />



          
          }
          
            <FormControlLabel
              control={<Checkbox  checked={recuerdame.recuerdame} name="recuerdame" onChange={handleChangeCheck} value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={()=>iniciarSesion()}
            >
              Sign In
            </Button>

            <Button
             
             fullWidth
             variant="contained"
             
             className="submit"
             onClick={()=>iniciarCorreoGmail()}


           >

             <img className={classes.imagenGoogle} src ={Google} height="25" />
             login with google
           </Button>
            <Grid container>
              <Grid item xs>
                <Link onClick={()=> recuperarContrasena()} variant="body2">
                  Forgot you password?
                </Link>
              </Grid>
              <Grid item>
                <Link  href="/crearcuenta"  variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </div>
           
        
           
        
        </div>
      </Grid>
    </Grid>
  );
}
