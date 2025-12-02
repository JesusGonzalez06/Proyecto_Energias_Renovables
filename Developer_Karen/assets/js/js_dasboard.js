/* RENOVABLES REALES */
const years = [2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022,2023];
const hydro = [45,46,47,48,49,52,53,55,57,58,60,62,63,65,66,68,70,72,73,74,76,77,79,80];
const solar = [0.1,0.2,0.3,0.4,0.5,0.7,1,1.3,1.8,2.3,3,4,5.2,6.8,8.4,10,11.5,13,15,18,22,26,30,35];
const wind =  [1,1.2,1.5,1.7,2,2.3,2.7,3.1,3.6,4.2,4.8,5.5,6.2,7,8,9.2,10.5,12,13.5,15,17,19,21,23];
const geo =   [0.8,0.9,1,1.1,1.1,1.2,1.3,1.4,1.6,1.7,1.8,1.9,2,2.1,2.2,2.4,2.5,2.7,2.9,3,3.2,3.4,3.6,3.8];

/* CONVENCIONAL*/
const conventional = years.map((y,i)=> 20000 - i * 125);

/* FORMATO */
function numberFormat(n){
  return (Math.round(n*1000)/1000).toLocaleString('es-CO');
}

/* TABLA */
function loadTable(){
  let tbody = document.getElementById("dataTable");
  tbody.innerHTML = "";
  for (let i=0;i<years.length;i++){
    tbody.innerHTML += `<tr>
      <td>${years[i]}</td>
      <td>${hydro[i]}</td>
      <td>${solar[i]}</td>
      <td>${wind[i]}</td>
      <td>${geo[i]}</td>
    </tr>`;
  }
  const last = years.length - 1;
  document.getElementById("summary").innerHTML = `
    <strong>Año reciente: ${years[last]}</strong><br>
    Hydro: ${hydro[last]} TWh<br>
    Solar: ${solar[last]} TWh<br>
    Wind: ${wind[last]} TWh<br>
    Geo: ${geo[last]} TWh<br>
    <b>Convencional: ${conventional[last]} TWh</b>
  `;
}
loadTable();

/* GRÁFICA PRINCIPAL */
function getConfig(type, selected) {
  const datasets = [];
  const add = (label,data) => datasets.push({label,data,tension:0.2});

  if (selected.includes("Hydro")) add("Hydro", hydro);
  if (selected.includes("Solar")) add("Solar", solar);
  if (selected.includes("Wind")) add("Wind", wind);
  if (selected.includes("Geo")) add("Geo Biomass", geo);

  const options = {
    responsive:true,
    plugins:{legend:{position:"top"}},
    interaction:{mode:"index",intersect:false},
    scales:{x:{},y:{}}
  };

  if (type==="stacked"){
    options.scales.x.stacked = true;
    options.scales.y.stacked = true;
    datasets.forEach(d=>d.stack="st1");
    return {type:"bar",data:{labels:years,datasets},options};
  }

  return {type,data:{labels:years,datasets},options};
}

let chart = new Chart(
  document.getElementById("mainChart"),
  getConfig("line",["Hydro","Solar","Wind","Geo"])
);

document.getElementById("updateBtn").onclick = ()=>{
  const type = document.getElementById("chartType").value;
  const selected = [...document.getElementById("energySelect").selectedOptions].map(o=>o.value);
  chart.destroy();
  chart = new Chart(document.getElementById("mainChart"), getConfig(type, selected));
};

/* PIE */
new Chart(document.getElementById("pieChart"),{
  type:"pie",
  data:{
    labels:["Hydro","Solar","Wind","Geo"],
    datasets:[{
      data:[hydro[23],solar[23],wind[23],geo[23]],
      backgroundColor:["#37c788","#f7b543","#4a8cff","#7ac44b"]
    }]
  }
});

/* AREA APILADA RENOVABLE + CONVENCIONAL */
new Chart(document.getElementById("areaChart"),{
  type:"line",
  data:{
    labels:years,
    datasets:[
      {
        label:"Renovable Total",
        data: years.map((_,i)=>hydro[i]+solar[i]+wind[i]+geo[i]),
        fill:true,
        backgroundColor:"rgba(55,199,136,0.45)",
        borderColor:"#37c788",
        tension:0.3
      },
      {
        label:"Convencional",
        data: conventional,
        fill:true,
        backgroundColor:"rgba(200,80,80,0.45)",
        borderColor:"#c85050",
        tension:0.3
      }
    ]
  },
  options:{
    responsive:true,
    plugins:{legend:{position:"top"}},
    scales:{
      x:{stacked:true},
      y:{stacked:true,title:{display:true,text:"TWh"}}
    }
  }
});