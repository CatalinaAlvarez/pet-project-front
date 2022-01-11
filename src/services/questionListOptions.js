
export const questionListOptions = (userId="") => {
    return(
        {
            getAll:{
                method: 'GET',
                url: `https://young-coast-60914.herokuapp.com/preguntas`,
                headers: {'Content-Type': 'application/json'}
                },

            getAllbyUserId:{
                method: 'GET',
                url: `https://young-coast-60914.herokuapp.com/preguntas/usuario/${userId}`,
                headers: {'Content-Type': 'application/json'}
            }
        }
    )
}