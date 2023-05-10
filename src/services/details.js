
const token = JSON.parse(sessionStorage.getItem('token'))
export const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };