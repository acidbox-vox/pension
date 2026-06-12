function calc(){
const start=new Date(document.getElementById('start').value);
const end=new Date(document.getElementById('end').value);
const bonus=Number(document.getElementById('bonusYears').value||0);
const salary=Number(document.getElementById('salary').value||0);
const avg60=Number(document.getElementById('avg60').value||0);
const type=document.getElementById('type').value;

const years=((end-start)/(1000*60*60*24))/365.25;
const service=years+bonus;

const gratuity=salary*service;
let pension=0;

if(type==='gpf'){
    pension=(avg60*service)/50;
    pension=Math.min(pension,avg60*0.70);
}else{
    pension=(salary*service)/50;
}

const living=Math.min(pension*15,200000);

document.getElementById('result').innerHTML=`
<h3>ผลการคำนวณ</h3>
<p>เวลาราชการ: ${service.toFixed(2)} ปี</p>
<p>บำเหน็จ: ${gratuity.toLocaleString()} บาท</p>
<p>บำนาญ: ${pension.toLocaleString()} บาท/เดือน</p>
<p>บำเหน็จดำรงชีพ: ${living.toLocaleString()} บาท</p>`;
}
