import apiUrl from '../config/config';

export const service = {
    login,
    logout,
    shortener
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };
console.log(apiUrl);
    return fetch(`${apiUrl}/authenticate`, requestOptions)
        .then(handleResponse)
        .then(token => {
            // login successful if there's a token in the response
            if (token) {
                // store token details and basic auth credentials in local storage
                // to keep token logged in between page refreshes
                token.authdata = window.btoa(username + ':' + password);
                localStorage.setItem('user', username);
                localStorage.setItem('token', token.token);
            }
            return token;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function handleResponse(response) {
    console.log(response);
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}


function shortener(url) {
    let headers = { 'Content-Type': 'application/json'};
    headers["Authorization"] = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0IiwiZXhwIjoxNTc1MTAwNDQzLCJpYXQiOjE1NzQ2Njg0NDN9.zEqfskNZRzCcQdoBANxj7buxFR3rlMhwBlcHSj75UsVIuFg6qOUwgzg7jcOjjNBXzD5z7UjhnDaIL1aE9djQmA';
    const requestOptions = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ "url" : url })
    };

    return fetch(`${apiUrl}/shortener`, requestOptions)
        .then(handleResponse);
}