export default function accessHeader() {
    let token = JSON.parse(localStorage.getItem('token'))
    if (token) {return {'accessJwt': token.accessJwt}}
    else return {}
}