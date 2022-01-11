
export const questionOptions = (id="", data={}) => {
    return(
        {
            getById:{
                method: 'GET',
                url: `https://young-coast-60914.herokuapp.com/preguntas/${id}`,
                headers: {'Content-Type': 'application/json'}
                },

            create:{
                method: 'POST',
                url: `https://young-coast-60914.herokuapp.com/preguntas/crear`,
                headers: {'Content-Type': 'application/json'},
                data:data
            }
        }
    )
}