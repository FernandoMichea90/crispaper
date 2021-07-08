import React ,{useState,useEffect}from 'react'
import { convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {makeStyles} from '@material-ui/core'




const estilo=makeStyles((theme)=>({

editor:{
  minHeight:'150px'
}

}))



const TextoEditor = (props) => {

  const clases=estilo()



    return (
        <div>
      <Editor
         editorState={props.editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={props.onEditorStateChange}
          localization={{
            locale: 'es',
          }}
          toolbar={{fontFamily:{
            options: ['Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman','Verdana','Lato'],
          }}}
        />
        {/* <textarea
          disabled
          value={draftToHtml(convertToRaw(props.editorState.getCurrentContent()))}
        />
          */}
      
         
      
      </div>
    )
}

export default TextoEditor
