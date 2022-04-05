window.onload = function () {
  let statusALL = ['รอตรวจสอบ', 'กำลังแก้ไข', 'เสร็จสิ้น'];
  statusALL.forEach(async (e) => {
    await loadTable(e);
  });
  loadUser();
  document.querySelectorAll('.tablinks')[0].click();
};

async function req(url) {
  const load = await fetch(url);
  const data = load.json();
  return data;
}

async function loadTable(con) {
  let trHTML = '';
  let status = [];
  let color = [];
  let count = 0;
  status['รอตรวจสอบ'] = 'tb1';
  status['กำลังแก้ไข'] = 'tb2';
  status['เสร็จสิ้น'] = 'tb3';
  color['รอตรวจสอบ'] = 'orange';
  color['กำลังแก้ไข'] = 'yellow';
  color['เสร็จสิ้น'] = 'green';
  const data = await req(
    'https://smartcity-pakpoon-api.herokuapp.com/appeal/appealAll'
  );
  data.forEach((element) => {
    if (element.status === con) {
      count++;
      trHTML += '<tr>';
      trHTML += '<td>' + element.type + '</td>';
      trHTML += '<td>' + element.details + '</td>';
      trHTML += '<td>' + element.userID + '</td>';
      trHTML += `<td><span style="color: ${color[con]}">${element.status} </span></td>`;
      trHTML += '<td>' + element.created + '</td>';
      trHTML += '<td>' + '-' + '</td>';
      trHTML += `<td><a class="btn btn btn-primary" href="./appealEdit.html?_id=${element._id}">จัดการ</a>`;
      trHTML += '</tr>';
    }
  });
  document.querySelector('.' + status[con]).innerText = ' (' + count + ') ';
  let HTML = ` <div class="table-responsive">
  <table id="customers" style="width: 100%;">
      <thead>
          <tr>
              <th scope="col">เรื่อง</th>
              <th scope="col">หัวข้อ อาการ</th>
              <th scope="col">ชื่อผู้แจ้ง</th>
              <th scope="col">สถานะ</th>
              <th scope="col">วันเวลาที่แจ้ง</th>
              <th scope="col">ผู้รับผิดชอบ</th>
              <th scope="col">จัดการ</th>
          </tr>

      </thead>
      <tbody id="mytable">
          <tr>
              ${trHTML}
          </tr>
      </tbody>
  </table>
</div>`;
  document.getElementById(status[con]).innerHTML = HTML;
}

/************************************************************** */

function showUserCreateBox() {
  Swal.fire({
    title: 'Create user',
    html:
      '<input id="id" type="hidden">' +
      '<input id="fname" class="swal2-input" placeholder="First">' +
      '<input id="lname" class="swal2-input" placeholder="Last">' +
      '<input id="username" class="swal2-input" placeholder="Username">' +
      '<input id="email" class="swal2-input" placeholder="Email">',
    focusConfirm: false,
    preConfirm: () => {
      userCreate();
    }
  });
}

function userCreate() {
  const fname = document.getElementById('fname').value;
  const lname = document.getElementById('lname').value;
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;

  const xhttp = new XMLHttpRequest();
  xhttp.open('POST', 'https://www.mecallapi.com/api/users/create');
  xhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  xhttp.send(
    JSON.stringify({
      fname: fname,
      lname: lname,
      username: username,
      email: email,
      avatar: 'https://www.mecallapi.com/users/cat.png'
    })
  );
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      Swal.fire(objects['message']);
      loadTable();
    }
  };
}

/**************************************************************** */

function showUserEditBox(id) {
  console.log(id);
  const xhttp = new XMLHttpRequest();
  xhttp.open('GET', 'https://www.mecallapi.com/api/users/' + id);
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      const user = objects['user'];
      console.log(user);
      Swal.fire({
        title: 'Edit User',
        html:
          '<input id="id" type="hidden" value=' +
          user['id'] +
          '>' +
          '<input id="fname" class="swal2-input" placeholder="First" value="' +
          user['fname'] +
          '">' +
          '<input id="lname" class="swal2-input" placeholder="Last" value="' +
          user['lname'] +
          '">' +
          '<input id="username" class="swal2-input" placeholder="Username" value="' +
          user['username'] +
          '">' +
          '<input id="email" class="swal2-input" placeholder="Email" value="' +
          user['email'] +
          '">',
        focusConfirm: false,
        preConfirm: () => {
          userEdit();
        }
      });
    }
  };
}

function userEdit() {
  const id = document.getElementById('id').value;
  const fname = document.getElementById('fname').value;
  const lname = document.getElementById('lname').value;
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;

  const xhttp = new XMLHttpRequest();
  xhttp.open('PUT', 'https://www.mecallapi.com/api/users/update');
  xhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  xhttp.send(
    JSON.stringify({
      id: id,
      fname: fname,
      lname: lname,
      username: username,
      email: email,
      avatar: 'https://www.mecallapi.com/users/cat.png'
    })
  );
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      Swal.fire(objects['message']);
      loadTable();
    }
  };
}

/************************************************************ */

function userDelete(id) {
  const xhttp = new XMLHttpRequest();
  xhttp.open('DELETE', 'https://www.mecallapi.com/api/users/delete');
  xhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  xhttp.send(
    JSON.stringify({
      id: id
    })
  );
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      const objects = JSON.parse(this.responseText);
      Swal.fire(objects['message']);
      loadTable();
    }
  };
}

/*********************************************** */
var jwt = localStorage.getItem('jwt');
if (jwt == null) {
  window.location.href = '../../login.html';
}

function loadUser() {
  var base64Url = jwt.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );
  const obj = JSON.parse(jsonPayload);
  document.getElementById('userid').innerText = obj.userid;
  document.getElementById('name').innerText = obj.name;
}

function logout() {
  localStorage.removeItem('jwt');
  window.location.href = '../../login.html';
}

function openCity(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName('tabcontent');
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = 'none';
  }
  tablinks = document.getElementsByClassName('tablinks');
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(' active', '');
  }
  document.getElementById(cityName).style.display = 'block';
  evt.currentTarget.className += ' active';
}
