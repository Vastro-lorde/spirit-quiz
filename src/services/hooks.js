import axios from "axios";
import { GET_CATEGORIES } from "./links";

export const getUser = ()=>{
    const user = JSON.parse(sessionStorage.getItem('user'));
    return user;
}

export const logOut = () =>{
    sessionStorage.removeItem('user');
}

export const getCategories = () => {
    axios.get(GET_CATEGORIES).then(result =>{
        localStorage.setItem('categories', JSON.stringify(result.data)) ;
    }).catch(error=>{
        localStorage.setItem('categories', JSON.stringify({})) ;
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