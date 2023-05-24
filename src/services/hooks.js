import axios from "axios";
import { GET_CATEGORIES } from "./links";
import { config } from "./details";

export const getUser = ()=>{
    const user = JSON.parse(sessionStorage.getItem('user'));
    
    return user? user : undefined;
}

export const checkAdminClaim = ()=>{
    const userClaim = JSON.parse(sessionStorage.getItem('userClaim'));
    return userClaim?.role === "ADMIN";
}

export const checkToken = ()=>{
    const exp = JSON.parse(sessionStorage.getItem('tokenExp'));
    const user = JSON.parse(sessionStorage.getItem("user"));
    const token = JSON.parse(sessionStorage.getItem('token'));
    if(token && exp && user){
        const currentTime = Math.floor(Date.now() / 1000); // convert milliseconds to seconds
        if (exp && exp < currentTime) {
            // token has expired
            sessionStorage.removeItem("user")
            return false;
        } else {
            // token is still valid
            return true;
        }
    }
    return false;
}

export const logOut = () =>{
    sessionStorage.removeItem('user')
    sessionStorage.removeItem('token');
}

export const getCategories = () => {
    axios.get(GET_CATEGORIES, config).then(result =>{
        localStorage.setItem('categories', JSON.stringify(result.data)) ;
    }).catch(error=>{
        localStorage.setItem('categories', JSON.stringify({}));
        console.log(error);
    })
}

export const shuffleArray = (array)=>{
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export const getCloudinaryId = (folderDepth, url) =>{
    const extension = url.split('.').pop();
    return url.split('/').slice(-parseInt(folderDepth ??= 2)).join('/').replace(`.${extension}`,'')
}