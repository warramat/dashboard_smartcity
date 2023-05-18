fetch ('https://smartcity.onrender.com/appeal/find/status?status=')
.then(res => res.json())
.then(data => {
    console.log(data)
})