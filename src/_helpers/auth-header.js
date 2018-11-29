/*
* Should return an authorization header + JWT Token
* */
export function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'))

    if (user && user.token) {
        return {
            'Authorization': 'Bearer ' + user.token
        }
    } else {
        return {}
    }
}