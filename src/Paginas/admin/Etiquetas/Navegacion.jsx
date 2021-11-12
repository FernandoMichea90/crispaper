import { Typography } from '@material-ui/core'
import React from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import AdmEtiquetas from '../../AdmEtiquetas'
import AdmInformacion from './AdmInformacion'
import AdmRegion from './AdmRegion'
import MenuNav from './MenuNav'
const Navegacion = () => {
    return (
        <Router>
        <div >
            <MenuNav></MenuNav>
           
            <Switch>
            <Route  path="/adminetiquetas/region" component={AdmRegion}></Route>
            <Route  path="/adminetiquetas/tipoinformacion" component={AdmInformacion}></Route>
            <Route  path="/" component={AdmEtiquetas}></Route>

            </Switch>
           
        </div>
        </Router>
    )
}

export default Navegacion
