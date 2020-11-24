const register = document.getElementById("register");

register.onsubmit = () => {
    fetch('http://localhost:5035/api/login',{
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            email : register.elements[0].value,
            password: register.elements[1].value,
        })
    }).then(res => {
        console.log(res);
    })
}