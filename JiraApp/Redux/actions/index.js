export const signIn=(email,password)=>{
    return {
        type :'signin',
        payload:{email,password}
    }
}

export const signUp=(username,email,password,confrim_password) =>{
    return{
        type:'signup',
        payload:{username,email,password,confrim_password}
    }
}