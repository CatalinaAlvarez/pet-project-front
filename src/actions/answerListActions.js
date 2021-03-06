import { answerListActionTypes as types } from "../actionTypes/answerListActionTypes";


export const answerListLoading = () =>{
    return({
            type: types.LOADING_ANSWER_LIST
        }
    );
}

export const answerListLoadSuccess = (answerList) => {
    return ({
            type: types.LOAD_ANSWER_LIST_SUCCESS,
            payload:answerList
        }
    );
}

export const answerListLoadError = (error) => {
    return ({
            type: types.LOAD_ANSWER_LIST_ERROR,
            payload: error
        }
    );
}

export const answerListDeletingAnswer = () =>{
    return({
        type: types.DELETING_ANSWER
    })
}

export const answerToAnswerLoad = (answerList) =>{
    return({
        type: types.LOAD_ANSWER_TO_ANSWER_LIST,
        payload: answerList
    })
}