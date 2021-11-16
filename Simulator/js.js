
let t;
$(function(){
	$('button').css({
		'cursor':'pointer',
		'padding':'4px'
	})
	let data={
		temperature:{
			max:40,
			min:0,
			value:10,
			minAndMaxIsGameOver:true
		},
		looking:{
			max:100,
			min:0,
			value:90,
			minAndMaxIsGameOver:true
		},
		energy:{
			max:100,
			min:0,
			value:100,
			minAndMaxIsGameOver:true
		},
		energy_percent:{
			max:100,
			min:0,
			value:0,
			minAndMaxIsGameOver:false
		}
	};
	let buttonData={
		janitor:{
			useEnergy:5,
			use:false
		},
		windows:{
			useEnergy:0,
			use:false
		},
		furnace:{
			useEnergy:25,
			use:false
		}
	};
	let audio={
		window: 'audio/window',
		car: 'audio/car',
		janitor:'audio/janitor',
		furnace:'audio/furnace'
	}
	let temperature=$('#temperature');
	let looking=$('#looking');
	let energy=$('#energy');
	let energy_percent=$('#energy_percent');
	let janitor=$('#janitor');
	let windows=$('#window');
	let furnace=$('#furnace');
	let time=$('#time');
	let ending=$('#ending');
	let currentTime=0;
	let status=1;
	let isJanitor, isFurnace, isWindow, isEco;
	isJanitor=isFurnace=isWindow=isEco=false;
	function writeValues(){
		temperature.text(data.temperature.value);
		looking.text(data.looking.value);
		energy.text(data.energy.value);
		energy_percent.text(data.energy_percent.value);
	}
	function check_audio() {
		var elem = document.createElement('audio'), bool = [];
		try{
			if(bool = !!elem.canPlayType ){
				bool = new Boolean(bool);
				bool.ogg = elem.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,'');
				bool.mp3 = elem.canPlayType('audio/mpeg;').replace(/^no$/,'');
				bool.wav = elem.canPlayType('audio/wav; codecs="1"').replace(/^no$/,'');
				bool.m4a = (elem.canPlayType('audio/x-m4a;') || elem.canPlayType('audio/aac;')).replace(/^no$/,'');
			}
		}catch(e){}
		return bool;
	}
	let format=check_audio().mp3? '.mp3':check_audio().ogg?'.ogg':'.wav';
	function isGameOver(){
		for(let i=0, d=Object.keys(data); i<d.length;i++){
			if(data[d[i]].minAndMaxIsGameOver){
					if((data[d[i]].value>data[d[i]].max || data[d[i]].value<data[d[i]].min)){
							alert('Конец игры. Ваш результат '+currentTime+' секунд'+getEnd(currentTime));
							location.reload()
					}
			}
		}
	}
	function getEnd(curTime){
		let strCurTime=String(curTime);
		let lastIndexCurTime=strCurTime[strCurTime.length-1];
		if(strCurTime==11||strCurTime==12||strCurTime==13||strCurTime==14||+lastIndexCurTime>4||lastIndexCurTime==0)
			return ' '
		if(lastIndexCurTime==1)
			return 'а '
		if(/[234]/.test(lastIndexCurTime))
			return 'ы '
	}
	function getEnding(curTime){
		let strCurTime=String(curTime);
		let lastIndexCurTime=strCurTime[strCurTime.length-1];
		if(strCurTime==11||strCurTime==12||strCurTime==13||strCurTime==14||+lastIndexCurTime>4||lastIndexCurTime==0)
			ending.text('о')
		else if(lastIndexCurTime==1)
			ending.text('а')
		else if(/[234]/.test(lastIndexCurTime))
			ending.text('и')
	}
	(function t(){
		currentTime++;
		getEnding(currentTime)
		let minutes=Math.floor(currentTime/60);
		if(!minutes)
			time.text(currentTime+' секунд'+getEnd(currentTime));
		else
			time.text(minutes+' минут'+getEnd(minutes)+(currentTime-(minutes*60))+' секунд'+getEnd(currentTime));
		setTimeout(t, 1000);//вызов функции
	})();
	(function r(){
		status++;
		setTimeout(r, 10000);
	})();
	function setValues(){
		let st=status/2;
		let temp=3+st;
		let look=-3-st;
		if(isJanitor)
			look=3+st;
		if(isWindow)
			temp+=-5-st;
		if(isFurnace)
			temp+=8+st;
		data.temperature.value += temp;
		data.looking.value += look;
		let eco=isEco?5:0;
		data.energy.value-=data.energy_percent.value/5-eco;
		writeValues();
		isGameOver();
		t=setTimeout(function(){setValues()}, 1500);
	}
	function allButtonsCheck(buttonCheck, object){
		object[buttonCheck]();
	}
	function writeButtons(option=false){
		if(option){
			allButtonsCheck(option, {
				'janitor':()=>janitor.text('Включить дворники'),
				'windows':()=>windows.text('Открыть окно'),
				'furnace':()=>furnace.text('Включить печку')
			})
		}else{
			janitor.text('Включить дворники');
			windows.text('Открыть окно');
			furnace.text('Включить печку');
		}
		
	}
	function toggleButton(buttonName, change){
		let bName = buttonData[buttonName];
		bName.use = !bName.use;
		change()
		if(bName.use){
			allButtonsCheck(buttonName, {
				'janitor': ()=>janitor.text('Выключить дворники'),
				'windows': ()=>windows.text('Закрыть окно'),
				'furnace': ()=>furnace.text('Выключить печку')
			})
			data.energy_percent.value+=bName.useEnergy;
		}else{
			writeButtons(buttonName)
			data.energy_percent.value-=bName.useEnergy;
		}	
	}
	let carAudio=new Audio(audio.car+format);
	janitor.click(()=>{
		toggleButton("janitor", function(){
			isJanitor=!isJanitor
			let a=new Audio(audio.janitor+format)
			a.play();
			janitor.attr('disabled','disabled');
			a.onended=function(){
				if(isJanitor)
					a.play();
				janitor.removeAttr('disabled');
			}
		})
	})
	windows.click(()=>{
		toggleButton("windows", function(){
			isWindow=!isWindow;
			let a=new Audio(audio.window+format)
			a.play();
			windows.attr('disabled','disabled');
			a.onended=function(){
				windows.removeAttr('disabled');
			}
			if(isWindow)
				carAudio.volume=0.5;
			else
				carAudio.volume=0.15;
		})
	})
	furnace.click(()=>{
		toggleButton("furnace", function(){
			isFurnace=!isFurnace;
			let a=new Audio(audio.furnace+format)
			a.play();
			furnace.attr('disabled','disabled');
			a.onended=function(){
				if(isFurnace)
					a.play();
				furnace.removeAttr('disabled');
			}
		})
	})
	carAudio.volume=0.15;
	carAudio.play();
	carAudio.onended=function(){
		carAudio.play();
	}
	writeButtons()
	setValues();
	console.log(window.isEco)
})