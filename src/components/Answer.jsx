import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {useDispatch, useSelector} from "react-redux";
import {deleteAnswerById} from "../middlewares/answerListPayload"
import { ModalDelete } from "../utils/ModalDelete";
import { useState } from "react";

export const Answer = ({answer}) => {

    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch();

    const msgModal = {
        msg: "¿Desea eliminar esta respuesta?",
        titulo: "Eliminar respuesta",
    };

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = () =>{
        dispatch(deleteAnswerById(answer.parentId, answer.id))
        setOpen(false);
    }

    const handleDelete = () =>{
        setOpen(true)
    }

    const modules = {
        toolbar: false
    };
    
    return(
        <div>
             <ReactQuill value={answer.answerBody}  
                    modules={modules}   
                    readOnly='true'/>
            <div>{answer.score}</div>
            <div>{answer.votes}</div>
            {(user && answer.userId === user.id) &&
                <>
                    <button className="btn btn-secondary px-5 mr-3" onClick={handleDelete}>Eliminar</button>
                    <ModalDelete
                        msgModal={msgModal}
                        open={open}
                        handleClose={handleClose}
                        handleConfirm={handleConfirm}
                    />
                </>}
        </div>
    )
}