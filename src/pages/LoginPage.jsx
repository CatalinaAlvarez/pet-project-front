import { userLoggingInAction, userLoggedAction, userLogoutAction } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { userCreatedAction } from "../actions/dataTransferActions";
import { useNavigate } from "react-router-dom"
import { app, google } from "../webService/firebase";
import { useEffect, useState } from "react";
import { createUser } from "../middlewares/dataTransferPayload";
import { ModalLogin } from "../utils/ModalLogin";
import { readUser } from '../middlewares/dataTransferPayload';

export const LoginPage = () => {

    const state = useSelector(state => state.user.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userDto = useSelector(state=> state.dataTransfer.userData);

    const logOutHandler = () => {
        app.auth().signOut();
        dispatch(userLogoutAction());
        navigate("/");
    }

    const logInHandler = () => {
        app.auth().signInWithPopup(google)
            .then(user => {
                dispatch(userLoggedAction(user.user.uid,
                    user.user.displayName,
                    user.user.email,
                    user.user.photoURL));
                navigate("/preguntas");
                dispatch(readUser(user.user.uid))
                if(userDto === null){
                    dispatch(createUser({
                        id: user.user.uid,
                        userName: user.user.displayName,
                        photo:user.user.photoURL,
                        email: user.user.email,}))
                    }
                
            }).catch()
    }

    const [loginData, setLoginData] = useState({
        userName: null,
        password: null,
        error: null
    })

    const msgModal = {
        msg: "No se ha encontrado la cuenta, ¿desea revisar sus datos o registrarse?",
        titulo: "Cuenta no encontrada",
    };

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    }

    const handleConfirm = () => {
        app.auth().createUserWithEmailAndPassword(loginData.email, loginData.password)
            .then(user => {
                dispatch(userLoggedAction({uid:user.user.uid,
                    name:user.user.displayName,
                    email:user.user.email,
                    photo:user.user.photoURL}));
                dispatch(userCreatedAction({id: user.user.uid,
                    userName: user.user.displayName,
                    photo:user.user.photoURL,
                    email:user.user.email}))
                dispatch(createUser({id: user.user.uid,
                    userName: user.user.displayName,
                    photo:user.user.photoURL,
                    email:user.user.email}))
            })
        setOpen(false);

    }

    const loginWithEmailHandler = (e) =>{
        e.preventDefault();
        app.auth().signInWithEmailAndPassword(loginData.email, loginData.password)
            .then(user =>{
                dispatch(userLoggedAction({uid:user.user.uid,
                    name:user.user.displayName,
                    email:user.user.email,
                    photo:user.user.photoURL}));
            })
            .catch( error => {
            setOpen(true)
            setLoginData({...loginData, error: error.message})
            console.clear()
        })
    }


    return (
        <div className="card container text-center py-5 mt-7 pb-10">
            <h1>Home</h1>
            {state ?
                <button className="btn btn-primary px-5 mr-3" onClick={logOutHandler}>
                    Log-out
                </button> :
                <div>
                        <form className="mt-5 py-5 px-5" onSubmit={loginWithEmailHandler} >
                            <h1>
                                Ingresar a preguntas
                            </h1>
                            <p className="p-mensaje">Completa los campos para ingresar</p>
                            <div >
                                <input
                                    required
                                    className="input-box"
                                    placeholder="Email"
                                    name="email"
                                    type="email"
                                    onChange={(e => setLoginData({ ...loginData, email: e.target.value }))}
                                ></input>
                            </div>
                            <div>
                                <input
                                    required
                                    className="input-box"
                                    placeholder="Password"
                                    name="password"
                                    type="password"
                                    onChange={(e => setLoginData({ ...loginData, password: e.target.value }))}
                                ></input>
                            </div>
                            <div className="form-group">

                                <p className="text-danger">{loginData.error}</p>

                                <button className="btn btn-primary px-5 mr-3" type="submit">
                                    Iniciar sesión
                                </button>
                            </div>
                        </form>
                        <ModalLogin
                            msgModal={msgModal}
                            open={open}
                            handleClose={handleClose}
                            handleConfirm={handleConfirm}
                        ></ModalLogin>

                    <button className="btn btn-primary px-5 mr-3" onClick={logInHandler}>
                        Iniciar con google
                    </button>
                </div>
            }
        </div>
    );
}