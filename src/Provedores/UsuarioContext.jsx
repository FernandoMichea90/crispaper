import React from 'react'
import useAutenticado from "./useAutenticado"


const UsuarioContext=React.createContext()


const UsuarioProvider = (props) => {

const usuario=useAutenticado()
    

    return (
        <UsuarioContext.Provider value={usuario}>
           {props.children}
        </UsuarioContext.Provider>   

    )
}

export  {UsuarioProvider,UsuarioContext}
