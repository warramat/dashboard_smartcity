var jwt = localStorage.getItem('jwt');
if (jwt != null) {
  window.location.href = './index.html';
}

$('form').submit(async (e) => {
  e.preventDefault();
  const userid = document.getElementById('userid').value;
  const password = document.getElementById('password').value;
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json;charset=UTF-8');
  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify({
      userid: userid,
      password: password
    }),
    redirect: 'follow'
  };
  const res = await fetch(
    'https://smartcity-pakpoon-api.herokuapp.com/User-admin/login',
    requestOptions
  );
  if (res.status === 201) {
    const data = await res.json();
    localStorage.setItem('jwt', data.access_token);
    Swal.fire({
      text: 'เรียบร้อย',
      icon: 'success',
      confirmButtonText: 'OK',
      timer: 3000
    }).then((result) => {
      window.location.href = './index.html';
    });
  } else {
    const error = await res.json();
    Swal.fire({
      text: error.message,
      icon: 'error',
      confirmButtonText: 'OK',
      timer: 3000
    });
  }
});
