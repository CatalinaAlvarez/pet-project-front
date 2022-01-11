
export const answerListOptions = (id="") => {
    return(
        {
            getAllByParentId:{
                method: 'GET',
                url: `https://young-coast-60914.herokuapp.com/respuestas/parentId/${id}`,
                headers: {'Content-Type': 'application/json'}
                },
            deleteById:{
                method: 'DELETE',
                url: `https://young-coast-60914.herokuapp.com/respuesta/eliminar/${id}`,
                headers: {'Content-Type': 'application/json'}
            }
        }
    )
}