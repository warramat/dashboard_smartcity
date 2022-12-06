var baseURL =
  'https://smartcity.onrender.com/userSmart/data/pagination';
var SexURL = 'https://smartcity.onrender.com/userSmart/data/sex';
async function makechart() {
  let options = {
    chart: {
      type: 'pie',
      height: 500,
      width: '100%',
      toolbar: { show: false },
      zoom: { enabled: true },
      fontFamily: '"Nunito"',
      foreColor: '#373d3f'
    },
    plotOptions: {
      bar: { horizontal: false }
    },
    colors: ['#009ef7', '#ff6384'],
    series: await getSex(),
    dataLabels: { enabled: false },
    labels: [['ผู้ชาย'], ['ผู้หญิง']],
    title: {
      text: 'จำแนกตามเพศ'
    },
    subtitle: {
      text: '',
      align: ''
    },
    xaxis: {
      categories: []
    },
    grid: { show: false },
    markers: { show: false }
  };

  let chart = new ApexCharts(
    document.querySelector('#prbzwucjexlokidfvshgtamqy'),
    options
  );
  chart.render();
}

function makechart2() {
  let options = {
    chart: {
      type: 'bar',
      height: 500,
      width: '100%',
      toolbar: { show: false },
      zoom: { enabled: true },
      fontFamily: '"Nunito"',
      foreColor: '#373d3f'
    },
    plotOptions: {
      bar: { horizontal: false }
    },
    colors: [
      '#008FFB',
      '#00E396',
      '#feb019',
      '#ff455f',
      '#775dd0',
      '#80effe',
      '#0077B5',
      '#ff6384',
      '#c9cbcf',
      '#0057ff',
      '#00a9f4',
      '#2ccdc9',
      '#5e72e4'
    ],
    series: [
      { name: 'ชาย', data: [1, 1, 98, 1, 10] },
      { name: 'หญิง', data: [5, 1, 132, 1, 10] }
    ],
    dataLabels: { enabled: false },
    title: {
      text: 'จำแนกเพศตามอำเภอ'
    },
    subtitle: {
      text: '',
      align: ''
    },
    xaxis: {
      categories: [
        'พรหมคิรี',
        'เมืองนครศรีธรรมราช',
        'ท่าศาลา',
        'สิชล',
        'ร่อนพิบูลย์'
      ]
    },
    grid: { show: false },
    markers: { show: false }
  };
  let chart = new ApexCharts(
    document.querySelector('#aejdtmqyilohfubngkcpxvswr'),
    options
  );
  chart.render();
}

async function req(url) {
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  return data;
}

async function getISS(con, id) {
  const url = baseURL + con;
  const data = await req(url);
  document.getElementById(id).textContent = data.total;
}

async function getSex() {
  let totalSex = [];
  let sex = SexURL + '?sex=ชาย';
  let data = await req(sex);
  totalSex[0] = data.total;
  sex = SexURL + '?sex=หญิง';
  data = await req(sex);
  totalSex[1] = data.total;
  return totalSex;
}

window.onload = async function () {
  makechart();
  makechart2();
  getISS('?province=นครศรีธรรมราช&sub_district=&district=', 'total');
  getISS('?province=&sub_district=&district=เมืองนครศรีธรรมราช', 'district');
  getISS('?province=&district=&sub_district=ปากพูน', 'sub_district');
  getISS('?province=&district=&sub_district=ปากพูน', 'sub_district');
  getISS('?province=&sub_district=&district=', 'allUser');
};
