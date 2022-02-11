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

let monsters=[];
let isMute=false;
let lift=false
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

//nighting(1000)
//nighting(1000)