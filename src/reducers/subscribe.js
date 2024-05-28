export const initialState ={
    email :'',
    isItSubscribed : false,
    isLoading : false
}

export const subscribeReducer= (state , action)=>{
    const {type , payload} = action
    let newState
    switch(type){

        case 'ADD_EMAIL': {
            newState = {...state , email : payload.email }
            return newState
        }
        case 'CHANGE_SUBSCRIPTION':{
            newState = {...state,isItSubscribed : payload.isItSubscribed}
            return newState
        }
        case 'CHANGE_LOADING':{
            newState= {...state,isLoading : !state.isLoading}
            return newState
        }
        case 'CLEAR_EMAIL':{
            newState = {...state , email : ''}
            return newState
        }

    }

    return state

}