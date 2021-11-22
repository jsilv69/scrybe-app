function logout() {
        document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        localStorage.removeItem('token')
        sessionStorage.removeItem('token')
}

export default logout
