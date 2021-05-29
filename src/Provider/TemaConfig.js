import {createMuiTheme} from "@material-ui/core/styles" 
import { esES } from '@material-ui/core/locale';


const theme=createMuiTheme({


        palette:{
            primary:{
                main:"#21cbce",
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

            }
        }





},esES)





export default theme