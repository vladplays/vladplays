let vars={
	timeWinInKletka:60000
}
function rand(min, max){
	return Math.floor(Math.random()*(max-min+1))+min;
}
let objMain;
let isLearninig=true
let gen={
	audio:false,
	video:true,
	shok:true
}
let currMonst=0;
let stage=0;
let stages=['audio', 'video', 'shok']
let monster;
let useShoks=0;
let countShoks=2
let countShoksInKletka=8;
let screen=document.getElementById('screen');
screen.style.width=window.innerWidth.toString()+'px'
screen.style.height=window.innerHeight.toString()+'px'
screen.style.opacity=0
screen.style.zIndex=0
let isWork=false;
let isCheckList=true
let closing=true
let isKletka=false
let isAudio=true
let isWorkingFlashLight=true
let check=document.getElementById('check');
let checkList=document.getElementById('checkList');
let strelka=document.getElementById('strelka');
check.style.display='none'
checkList.style.display='none'
checkList.style.zIndex=2;
strelka.style.position='absolute'
strelka.style.height='50px'
strelka.style.width='150px'
strelka.style.zIndex=3;
strelka.style.top='95%'
strelka.style.left='40%'
let monsterInKletka;
let countWalkMonster=0
let audios={
	one:'oneRecord.mp3',
	video:'videoRecord.mp3',
	audio:'audioRecord.mp3',
	shok:'shokRecord.mp3',
	test:'testRecord.mp3',
	superShok:'superShokRecord.mp3',
	RecordInKletka:'RecordInKletka.mp3'
}
function onendtest(){
	let a=new Audio(audios.test);
	a.play()
	a.onended=()=>{
		new Audio(audios.superShok).play()
	}
	
}
function onendconspect(){
	a=new Audio(audios[stages[stage]]);
	isAudio=true
	a.play()
	a.onended=()=>{
		isAudio=false
		
	}
}
function gameOverInKletka(){
	scene.remove(monsterInKletka)
	let light = new THREE.PointLight(0xFFFFFF);
	light.position.y=camera.position.y
	light.position.z=camera.position.z
	light.position.x=camera.position.x
	scene.add(light)
	monster.position.set(camera.position.x-6, camera.position.y-6, camera.position.z+4);
	monster.scale.set(0.1, 0.1, 0.1);
	monster.rotation.y=-Math.PI/4
	let c=0
	let audio=new Audio('./scream.mp3')
	audio.play()
	let t=setInterval(()=>{
		if(c==35){
			audio.pause()
			clearInterval(t)
			location.reload()
		}
		setTimeout(()=>{
			c++;
			monster.position.x+=1
			monster.position.z-=1
		}, 15)
	}, 30)
}
loadModel('./obj.glb', function(obj){
	obj=obj.scene;
	scene.add(obj);
	objMain=obj
})
function updateMonsterInKletka(){
	if(isWorkingFlashLight)
		return
	monsterInKletka.position.set(rand(1040, 1080), 50, rand(1000, 1040))
	countWalkMonster++
	
	if(countWalkMonster==8)
		gameOverInKletka()
}

function kletka(){
	useShoks=0
	check.style.display='none'
	isKletka=true
	loadModel('./steklo.glb', function(obj){
		obj=obj.scene;
		obj.position.x=1000;
		obj.position.y=20;
		obj.position.z=995;
		obj.rotation.x=Math.PI/2
		obj.scale.set(2, 1.3, 1.7)
		//console.log(obj.children[0].parent.children[0].children[0])
		obj.children[0].parent.children[0].children[0].material.opacity=0.5
		obj.children[0].parent.children[0].children[0].material.transparent=true
		scene.add(obj)
	})
	loadModel('./kletka.glb', function(obj){
		obj=obj.scene;
		obj.position.x=1000;
		obj.position.y=25;
		obj.position.z=1000;
		camera.position.x=1120;
		camera.position.y=80;
		camera.position.z=970;
		camera.rotation.x=-2.9286318459226606;
		camera.rotation.y=0.7783931217209509;
		camera.rotation.z=2.9909137213686825;
		isWork=true
		loadModel('./monster-dog.glb', function(obj){
			let a=new Audio(audios.RecordInKletka);
			a.play()
			setInterval(()=>{
				updateMonsterInKletka();
			}, 5000)
			obj=obj.scene;
			/*(1040, 50, 1040), (1080, 50, 1000)*/
			obj.position.x=rand(1040, 1080);
			obj.position.y=50;
			obj.position.z=rand(1000, 1040);
			obj.rotation.y=-Math.PI/2
			/*obj.position.set(camera.position.x, camera.position.y, camera.position.z);*/
			obj.scale.set(0.6, 0.6, 0.6);
			//obj.children[0].scale.set(0.2, 0.2, 0.2);
			
			//obj.children[0].children[0].scale.set(0.2, 0.2, 0.2);
			
			scene.add(obj);
			console.log(obj)
			monsterInKletka=obj
		})
		/*-2.9286318459226606, _y: 0.7783931217209509, _z: 2.9909137213686825*/
		/*let light = new THREE.PointLight(0xFFFFFF);
	light.position.y=camera.position.y
	light.position.z=camera.position.z
	light.position.x=camera.position.x
	scene.add(light)
		*/
		scene.add(obj);
		objMain=obj
	})
}

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

function gameOver(){
	let count=0
	let t=setInterval(function (){
		if(count==20){
			clearInterval(t)
			location.reload()
		}
		new Audio('./scream.mp3').play()
		monster.position.x+=1
		count++
	}, 150);
}

function updateMonster(){
	if(gen[stages[stage]]){
		currMonst++
		monster.position.x+=3
		if(currMonst==2)
			gameOver()
	}
}
loadModel('./monst.glb', function(obj){
	obj=obj.scene;
	obj.position.z=-13
	obj.position.x=10
	obj.position.y=7
	obj.rotation.y=-Math.PI/2
	obj.scale.set(0.3, 0.3, 0.3)
	monster=obj
	scene.add(obj);
})


const controls = new THREE.PointerLockControls(camera, render.domElement)


strelka.onclick=function(e){
	if(isLearninig)
		return
	if(isWork)
		return
	if(closing){
		e.target.style.transform='rotate(180deg)';
		checkList.style.display='block';
		
	}else{
		e.target.style.transform='rotate(360deg)';
		checkList.style.display='none';
		updateMonster()
		onendconspect()
		
		isCheckList=true
	}	
	
	closing=!closing
}
document.getElementById('play').onclick=function(){
	let one=new Audio(audios.one);
	one.play()
	one.onended=()=>{
		isLearninig=false
		let a= new Audio(audios.audio);
		a.play()
		a.onended=()=>{
			isAudio=false
		}
	}
	document.getElementById('play').style.display='none'
	check.style.display='block'
	render.setSize(width, height);
	render.setClearColor(0xDDDDDD, 1);
	render.domElement.id='canvas'
	render.domElement.style.position='relative';
	render.domElement.style.zIndex=1;
	document.body.appendChild(render.domElement);
	
	//controls.lock()
	camera.position.z=-6
	camera.position.x=40
	camera.position.y=25
	camera.rotation.z=1.4195622128686234
	camera.rotation.x=-1.4246458892413416
	camera.rotation.y=1.3088718437646585
	scene.add(camera);
	/*_x: -1.4246458892413416, _y: 1.3088718437646585, _z: 1.4195622128686234*/
	(function t(){
		requestAnimationFrame(t);
		render.render(scene, camera);
	})()
	window.addEventListener('resize', function(){
		width=window.innerWidth;
		height=window.innerHeight;
		camera.aspect=width/height;
		camera.updateProjectionMatrix();
		render.setSize(width,height)
	})
	let light = new THREE.SpotLight(0xFFFFFF);
	light.position.y=camera.position.y+10
	light.position.z=camera.position.z
	light.position.x=camera.position.x+10
	scene.add(light)
	setInterval(function t(){
		let r=Math.random()*0.25
		setTimeout(function(){
			light.intensity=r
		}, 20)
	}, 50);
	render.domElement.onmouseup=()=>{
		if(isLearninig)
			return
		if(!isKletka)
			return
		if(!isWorkingFlashLight)
			return
		let lig = new THREE.PointLight(0xFFFFFF);
		lig.position.y=camera.position.y
		lig.position.z=camera.position.z
		lig.position.x=camera.position.x
		lig.rotation.y=camera.rotation.y
		lig.rotation.z=camera.rotation.z
		lig.rotation.x=camera.rotation.x
		
		scene.add(lig)
		setTimeout(()=>{
			scene.remove(lig)
			updateMonsterInKletka()
			isWorkingFlashLight=false
			setTimeout(()=>{
				isWorkingFlashLight=true
			}, 3000)
		}, 4000)
		
	}
	
	render.domElement.onclick=function(){
		//controls.lock()
		
		let testL=new THREE.SpotLight(0xFFFFFF);
		let aud=new Audio('./zhest.mp3')
		if(isWork)
			return
		if(!isCheckList)
			return
		if(isAudio)
			return
		if(stages[stage]=='video'){
			testL.position.y=camera.position.y+10
			testL.position.z=camera.position.z
			testL.position.x=camera.position.x+10
			scene.add(testL)
			isWork=true
			setTimeout(()=>{
				scene.remove(testL)
				isWork=false
				onendtest()
			}, 5000)
		}else if(stages[stage]=='audio'){
			aud.play()
			isWork=true
			aud.onended=()=>{
				aud.currentTime=0
				isWork=false
				onendtest()
			}
				
			
		}else if(stages[stage]=='shok'){
			testL.position.y=camera.position.y+10
			testL.position.z=camera.position.z
			testL.position.x=camera.position.x+10
			scene.add(testL)
			new Audio('./shok.mp3').play()
			isWork=true
			let t=setInterval(function (){
				let r=Math.random()*0.4
				setTimeout(function(){
					testL.intensity=r
				}, 20)
			}, 50);
			setTimeout(()=>{
				scene.remove(testL)
				clearInterval(t)
				isWork=false
				nighting(100, ()=>{
					kletka()
					setTimeout(()=>{
						alert('Ты выиграл!!!')
						location.reload()
					}, vars.timeWinInKletka)
					lighting(100)
				})
			}, 5000)
			
		}
		
		if(stage!=2){
			
			stage++
		}
			
	
		isCheckList=false
	}
	
	document.body.onkeyup=(e)=>{
		if(e.keyCode==72){
			if(!isKletka){
				if(useShoks==countShoks)
					return
			}else{
				if(useShoks==countShoksInKletka)
					return
			}
			
			
			if(!isKletka){
				
				currMonst--
			}
			useShoks++
			let testL=new THREE.SpotLight(0xFFFFFF);
			testL.position.y=camera.position.y+10
			testL.position.z=camera.position.z
			testL.position.x=camera.position.x+10
			let c=0
			scene.add(testL)
			new Audio('./shok.mp3').play()
			let t=setInterval(function (){
				let r=Math.random()*0.4
				if(c==90){
					clearInterval(r);
					scene.remove(testL)
					if(!isKletka)
						monster.position.x=10
					else{
						monsterInKletka.position.set(1040, 50, 1040)
						countWalkMonster=0
					}
						
				}
				setTimeout(function(){
					testL.intensity=r
				}, 20)
				c++
			}, 50);
			
		}
		
	}
}


