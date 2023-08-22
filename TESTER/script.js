// window.onload = async () => {
//   let getX = [0,1]
//   let arrayData = await (await fetch("https://jsonplaceholder.typicode.com/users")).json()
//   let geo = 0
//   arrayData.forEach((element,index) => {
//     if(getX.includes(index)){
//       geo+= Number(element.address.geo.lat)+Number(element.address.geo.lng)
//     }
//   });
//   document.getElementById('data1').innerHTML = geo
// }

async function  a(){
  let {total} = await (await fetch("https://nr-smartcity.onrender.com/appeal/find/status?status=รอตรวจสอบ&topic=road")).json()
  document.getElementById('data1').innerHTML = total
}

async function b(){
  let {total} = await (await fetch("https://nr-smartcity.onrender.com/appeal/find/status?status=รอตรวจสอบ&topic=plumbing")).json()
  document.getElementById('data2').innerHTML = total
}
async function c(){
  let {total} = await (await fetch("https://nr-smartcity.onrender.com/appeal/find/status?status=รอตรวจสอบ&topic=electric")).json()
  document.getElementById('data3').innerHTML = total
}

 window.onload = async () => {
  a()
  b()
  c()
} 

