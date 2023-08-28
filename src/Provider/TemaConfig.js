import {createMuiTheme} from "@material-ui/core/styles" 
import { esES } from '@material-ui/core/locale';


const theme=createMuiTheme({


        palette:{
            primary:{
                // main:"#21cbce",
                main: "#434343",
                dark:"#303f9f",
                contrastText:"#ffffff"
            },
            secondary:{
                main:"#ffffff",
                contrastText:"#21cbce"
            },
            info:
            {
                light: "#64b5f6",
                main: "#2196f3",
                dark: "#1976d2"

            },
            error:{
                main:"#dd2c00"
            }
            
        },
        // typography:{
        //     fontFamily:"oswald",
        // }





},esES)





export default theme