const INITIAL_STATE = {
    USER:{}
}
export default (state = INITIAL_STATE,action)=>{
    console.log("AUTH_reducer==> yahan dekho data -> ",action.data)
    switch(action.type){
    case "SETDATA":
      return ({
        ...state,
        USER:action.data
      })
    }
    return state;
  }