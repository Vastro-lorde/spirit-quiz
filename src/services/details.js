
export const config = () => {
  const token = JSON.parse(sessionStorage.getItem('token'))
  return {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };}