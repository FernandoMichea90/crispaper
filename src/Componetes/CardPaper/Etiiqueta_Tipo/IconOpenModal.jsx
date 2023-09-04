import React from 'react'
import Swal from 'sweetalert2'
import { IconButton } from '@material-ui/core'
import { AddCircleOutlineOutlined } from '@material-ui/icons'
const IconOpenModal = (props) => {
    return (
        <IconButton id="addCircle" color="primary"
            style={{ width: "84px" }}
            onClick={()=>{
                props.handleOpenModalTipo()
            }}
          >
            {/* <PostAddIcon /> */}
            {/* <LabelIcon></LabelIcon> */}
            <AddCircleOutlineOutlined   ></AddCircleOutlineOutlined >
        </IconButton>
    )
}

export default IconOpenModal