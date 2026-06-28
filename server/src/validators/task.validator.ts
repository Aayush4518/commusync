export const validateTask= (title: string)=>{
    if(!title || title.trim()===""){
        return "Title is required"
    }
    if(title.length < 2 || title.length > 100){
        return "Title must be between 2 and 100 characters"
    }
    return null
}