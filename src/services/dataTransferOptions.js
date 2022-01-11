export const dataTransferOptions = (body={},id="")  => {
    return(
        {
            createUser: {
                method: 'POST',
                url: `https://young-coast-60914.herokuapp.com/usuarios/crear`,
                headers: {'Content-Type': 'application/json'},
                data: {id: body.id, userName: body.userName, photo: body.photo, email: body.email}
            },
            deleteQuestion:{
                method:'DELETE',
                url: `https://young-coast-60914.herokuapp.com/preguntas/eliminar/${id}`,
                headers: {'Content-Type': 'application/json'}
            },
            createAnswer:{
                method:'POST',
                url:`https://young-coast-60914.herokuapp.com/respuestas/crear`,
                headers: {'Content-Type': 'application/json'},
                data: {userId: body.userId, parentId: body.parentId, answerBody: body.answerBody}
            },
            updateUser:{
                method: 'PUT',
                url: `https://young-coast-60914.herokuapp.com/usuario/actualizar`,
                headers: {'Content-Type': 'application/json'},
                data: {id: body.id, userName: body.userName, firstNames: body.firstNames, lastNames: body.lastNames, photo: body.photo, email: body.email}
            },
            readUser:{
                method: 'GET',
                url: `https://young-coast-60914.herokuapp.com/usuario/id=${id}`,
                headers: {'Content-Type': 'application/json'},
                data: {id: body.id, userName: body.userName, firstNames: body.firstNames, lastNames: body.lastNames, photo: body.photo, email: body.email}
            }
        }
    )
}