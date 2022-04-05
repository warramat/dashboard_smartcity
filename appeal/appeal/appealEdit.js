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

loadUser();

function logout() {
  localStorage.removeItem('jwt');
  window.location.href = '../../login.html';
}

/**************************************************************** */
import './appealEdit.css';
import liff from '@line/liff';
const body = document.getElementById('body');
const pictureUrl = document.getElementById('pictureUrl');
const userId = document.getElementById('userId');
const displayName = document.getElementById('displayName');
const statusMessage = document.getElementById('statusMessage');
const email = document.getElementById('email');
const btnShare = document.getElementById('btnShare');

async function main() {
  liff.ready.then(() => {
    if (liff.getOS() === 'android') {
      body.style.backgroundColor = '#888888';
    }
    if (liff.isInClient()) {
      getUserProfile();
    }
  });
}

async function main() {}
await liff.init({ liffId: '1656902981-0g1VVnpN' });
main();

async function getUserProfile() {
  const profile = await liff.getProfile();
  pictureUrl.scr = profile.pictureUrl;
}
