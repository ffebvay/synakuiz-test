import axios from 'axios'

// Array set in local Storage for registered users
//let users = JSON.parse(localStorage.getItem('users')) || []

let users = getUsersFromBackend() || []

console.log(users)

export function getUsersFromBackend() {
    let array = []

    axios
        .get('https://biogen-demo.firebaseio.com/users.json')
        .then(function(response) {
            for (let item in response.data)
                array.push(response.data[item])

            console.log('Fetched Users data successfully !')
            console.log(response)
        })
        .catch(function(error) {
            console.log('Failed to get users from backend miserably... Original error : ', error)
        })

    return array
}

export function configureBackend() {
    let realFetch = window.fetch
    window.fetch = function (url, opts) {
        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(() => {

                // authenticate
                if (url.endsWith('/users/authenticate') && opts.method === 'POST') {
                    // get parameters from post request
                    let params = JSON.parse(opts.body)

                    // find if any user matches login credentials
                    let filteredUsers = users.filter(user => {
                        return user.username === params.username && user.password === params.password
                    })

                    if (filteredUsers.length) {
                        // if login details are valid return user details and fake jwt token
                        let user = filteredUsers[0]
                        let responseJson = {
                            id: user.id,
                            username: user.username,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            token: 'fake-jwt-token'
                        }
                        resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(responseJson)) })
                    } else {
                        // else return error
                        reject('Nom d\'utilisateur ou mot de passe incorrect.')
                    }

                    return;
                }

                // get users
                if (url.endsWith('/users') && opts.method === 'GET') {
                    // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                    if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
                        resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(users))})
                    } else {
                        // return 401 not authorised if token is null or invalid
                        reject('Unauthorised')
                    }

                    return;
                }

                // get user by id
                if (url.match(/\/users\/\d+$/) && opts.method === 'GET') {
                    // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                    if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
                        // find user by id in users array
                        let urlParts = url.split('/')
                        let id = parseInt(urlParts[urlParts.length - 1])
                        let matchedUsers = users.filter(user => { return user.id === id; })
                        let user = matchedUsers.length ? matchedUsers[0] : null

                        // respond 200 OK with user
                        resolve({ ok: true, text: () => JSON.stringify(user)})
                    } else {
                        // return 401 not authorised if token is null or invalid
                        reject('Unauthorized')
                    }

                    return
                }

                // register user
                if (url.endsWith('/users/register') && opts.method === 'POST') {
                    // get new user object from post body
                    let newUser = JSON.parse(opts.body)

                    // validation
                    let duplicateUser = users.filter(user => { return user.username === newUser.username; }).length
                    if (duplicateUser) {
                        reject('Le nom d\'utilisateur "' + newUser.username + '" est déjà utilisé.')
                        return
                    }

                    // save new user
                    newUser.id = users.length ? Math.max(...users.map(user => user.id)) + 1 : 1
                    users.push(newUser)

                    // save user to local storage
                    //localStorage.setItem('users', JSON.stringify(users))

                    // send user information to backend
                    axios
                        .post('https://biogen-demo.firebaseio.com/users.json', newUser)
                        .then(function(response) {
                            console.log('Saved new user to database successfully !')
                        })
                        .catch(function(error) {
                            console.log('Failed to save new user to database miserably... Original error : ', error)
                        })

                    // respond 200 OK
                    resolve({ ok: true, text: () => Promise.resolve() })

                    return
                }

                // pass through any requests not handled above
                realFetch(url, opts).then(response => resolve(response))

            }, 500)
        })
    }
}