import React from 'react'
import { makeStyles,Typography,Grid } from '@material-ui/core'


const estilos=makeStyles((theme)=>({

    root:{
            fontFamily:"Lato",
            fontWeight:"500",

           "& .MuiTypography-body1":{
                marginBottom:"1rem",
                fontFamily:"Lato"            

    }, 

    "& .MuiTypography-h3":{
        marginBottom:"1rem",
        fontFamily:"Lato",
        fontWeight:"600fff"          

}, 

    
}




}))

const Nosotros = () => {
     const  clases=estilos()
    return (
        <div  className={clases.root} style={{marginTop:"100px"}}>

            <Grid container>


                <Grid xs="2"></Grid>

                <Grid xs="8">

                            <Typography variant="h3">
                                Nosotros 
                            </Typography>


                            <Typography variant="body1">
                            The mission of Papers with Code is to create a free and open resource with Machine Learning papers, code and evaluation tables.
                            </Typography>

                            <Typography variant="body1">
                            We believe this is best done together with the community, supported by NLP and ML.
                            </Typography>

                            <Typography variant="body1">
                            All content on this website is openly licenced under CC-BY-SA (same as Wikipedia) and everyone can contribute - look for the "Edit" buttons!
                            </Typography>

                            <Typography variant="body1">
                            We also operate specialized portals for papers with code in astronomy, physics, computer sciences, mathematics and statistics.
                            </Typography>
                </Grid>
                <Grid xs="2"></Grid>
            </Grid>


       
        </div>
    )
}

export default Nosotros
