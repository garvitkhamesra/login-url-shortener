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
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization' : localStorage.getItem("token") },
        body: JSON.stringify({ url })
    };

    return fetch(`${apiUrl}/shortener`, requestOptions)
        .then(handleResponse);
}