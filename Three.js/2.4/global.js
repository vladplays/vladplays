let integrity={
	audio:true,
	video:true
}
let amounts={
	audio:0,
	video:0
}
let durabilityTool={
	flashlight:0,
	phone:0
}
let woringTool={
	flashlight:true,
	phone:true
}
let levelObj;
let loc=localStorage.getItem('ded')
let maxLevel=1;
let currentLevel=1;

let monsters=[];
let isMute=false;
let lift=false
let currentPosition=0;
let countCloustrofobiaMonsters=0;
let countMonsters=document.getElementById('countMonsters')
let monitor1=document.getElementById('monitor');
let fix1=document.getElementById('fix');
let img=document.getElementById('img');
let phone=document.getElementById('smartPhone');
let screen=document.getElementById('screen');
let ded=document.getElementById('ded');
let btnFix=document.getElementById('btnFix');
let btnBack=document.getElementById('back');
let fixAndUpgrade=document.getElementById('fixAndUpgrade');
let crackLift=document.getElementById('crackLift');
let closeBlendMonstersId=document.getElementById('closeBlendMonsters');
let selectLevel=document.getElementById('selectLevel');
if(loc){
	loc=JSON.parse(loc)
	maxLevel=loc.maxLevel;
	currentLevel=loc.currentLevel
	for(let i=2; i<=loc.maxLevel; i++){
		let option=document.createElement('option');
		option.value=i;
		option.innerText='Уровень '+i
		option.onclick=()=>{
			currentLevel=parseInt(option.value);
		}
		selectLevel.appendChild(option)
	}
	if(loc.dop){
		loc.dop.forEach((v, k)=>{
			levels.push(v);
			addOption(v.name)
		})
	}
}
closeBlendMonstersId.disabled=true
crackLift.style.display='none'
crackLift.style.opacity=0
btnFix.style.top='95%'
btnFix.style.left='90%'
btnBack.style.top='95%'
btnBack.style.left='83%'
ded.style.display='none'
let closing=true
screen.style.width=window.innerWidth.toString()+'px'
screen.style.height=window.innerHeight.toString()+'px'
screen.style.opacity=0
screen.style.zIndex=0
function lighting(start, callback=()=>{}){
	
	let op=1/start;
	let time;
	time=setInterval(function t(){
		if(parseFloat(screen.style.opacity)<=0){
			clearInterval(time)
			screen.style.zIndex=0
			callback()
		}
			
		screen.style.opacity=(parseFloat(screen.style.opacity)-op).toString();
	}, 1)
	
}
function nighting(start, callback=()=>{}){
	screen.style.zIndex=9
	let op=1/start;
	let time;
	time=setInterval(function t(){
		if(parseFloat(screen.style.opacity)>=1){
			clearInterval(time)
			callback()
		}
			
		screen.style.opacity=(parseFloat(screen.style.opacity)+op).toString();
	}, 1)
}
function rand(min, max){
	return Math.floor(Math.random()*(max-min+1))+min;
}
//nighting(1000)
//nighting(1000)