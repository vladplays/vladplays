let sc=new Scenes();
let audios=[];
let status='product';//development or product
let first=true
let positionAudio=[];
let isAudioMonsters=[];
let positionCentreAudio=[]
let audio={
	flashlight:'audio/flashlight.mp3',
	phone:'audio/phone.mp3',
	clickOnPhone:'audio/clickOnPhone.mp3',
	fix:'audio/fix.mp3',
	forest:'audio/forest.mp3',
	monster:'audio/monster.mp3',
	recordForLift:'audio/RecordForLift.mp3',
	record:'audio/Record.mp3',
	lift:'audio/lift.mp3',
	openDoors:'audio/openDoors.mp3',
	crackLift1:'audio/crackLift1.mp3',
	crackLift2:'audio/crackLift2.mp3',
	crackLift3:'audio/crackLift3.mp3'
}
let machineMonsterTimer;
let machineLightTest = new THREE.SpotLight(0xFFFFFF);
let crackLiftlightTest = new THREE.SpotLight(0xFFFFFF);
let isClickMonsters=false;
let clickedMonsters=0;
let countClickedMonsters=25;
function crackLiftQuest(){
	let eyes;
	loadModel('./eyes.glb', function(object){
		object=object.scene;
		object.traverse(function(e){
			e.name='monst'
		});
		object.position.set(1017,14,970)
		object.scale.set(0.1, 0.1, 0.1)
		console.log(object)
		scene.add(object)
	})
	let a;
	if(!isMute){
		a=new Audio(audio.recordForLift)
		a.play()
	}
	let timer;
	timer=setInterval(()=>{
		if(isClickMonsters){
			isClickMonsters=false
			return
		}
		if(clickedMonsters>=countClickedMonsters){
			if(!isMute)
				a.pause()
			nighting(100, ()=>{
				console.log('dedulka')
				sc.remove();
				scene.remove(crackLiftlightTest);
				sc.scene('lift');
				sc.draw({
					x:1000,
					y:25,
					z:1000
				})
				
				clearInterval(timer)
				lighting(100)
			})
			return
		}
		lift=false	
		gameOver()
	}, 7000)
	
	let selectAudio=setInterval(function(){
		if(parseFloat(crackLift.style.opacity)==0){
			clearInterval(selectAudio)
			crackLift.style.display='none'
		}
		crackLift.style.opacity=(parseFloat(crackLift.style.opacity)-0.01).toString()
	}, 50)
	/*985.9969997406006,32.44235990950487,976.2791977285926 (988, 33, 972)*/
	/*1019.0030002593994,14.294721597881631,970.4484658132345 (1017,14,970)*/
	/*(988, 33, 972) (1017,14,970)*/
}
function machine(){
	nighting(100, ()=>{
		camera.position.x=-40
		camera.position.y=-130
		camera.position.z=-85	
		camera.rotation.x=-1.6351869626830693
		camera.rotation.y=1.2666152764396978
		camera.rotation.z=1.6382760224452568
		machineLightTest.target.position.x = -1.601862470820806;
		machineLightTest.target.position.y = 0.9088898700082089;
		machineLightTest.target.position.z = 1.6101716019488768;
		let t=setInterval(function(){
			let r=Math.random()*0.4
			setTimeout(function(){
				machineLightTest.intensity=r
			}, 10)
		}, 30)
		scene.add(machineLightTest)
		lighting(500, ()=>{
			machineMonsterTimer=setTimeout(function(){
				lift=false
				gameOver()
			}, 30000)
		})
		ded.style.display='block'
	})
	/*pos:x: -10, y: -141.04777593132056, z: -80*/
	/*rot: x: -1.6351869626830693, y: 1.2666152764396978,z: 1.6382760224452568*/
	
}
img.onclick=function (e){
	let a=new Audio(audio.phone)
	
	if(!isMute)
		a.play()
	audios.push(a)
	let t;
	if(closing){
		e.target.style.transform='rotate(180deg)';
		phone.style.display='block';
		/*durabilityTool.phone++;
		if(durabilityTool.phone==15)
			woringTool.phone=false*/
		durabilityTool.phone++;
		t=setInterval(function (){
			durabilityTool.phone++;
			if(durabilityTool.phone==15){
				woringTool.phone=false
				//return
			}
			//d()
		}, 5000)
	}else{
		e.target.style.transform='rotate(360deg)';
		phone.style.display='none';
		clearInterval(t)
	}	
	
	closing=!closing
}
document.getElementById('mute').onclick=function(){
	if(!isMute)
		document.getElementById('mute').innerText='Включить звук'
	else
		document.getElementById('mute').innerText='Выключить звук'
	isMute=!isMute
}
let back=false;
document.getElementById('yes').onclick=function(){
	sc.add('lift', './lift.glb', function(obj){
		camera.rotation.x= 0.004483431145124377
		camera.rotation.y= -0.07900587099273684
		camera.rotation.z= 0.0003538513539429651
		let lightTest = new THREE.SpotLight(0xFFFFFF);
		lightTest.position.y=camera.position.y;
		lightTest.position.z=camera.position.z+10;
		lightTest.position.x=camera.position.x+10;
		lightTest.lookAt(camera.position)
		let count=false
		let a2=new Audio(audio.lift)
		if(!back){
			img.style.display='none'
			if(!isMute){
				
				a2.play()
				a2.volume=0.3
				a2.onended=function(){
					if(!count)
						a2.play()
				}
				if(first){
					let a=new Audio(audio.record)
					a.play()
					a.onended=()=>{
						count=true
						machine()
						scene.remove(obj)
						a2.pause()
						let a3=new Audio(audio.openDoors)
						a3.play()
						scene.remove(lightTest)
						//sc.scene('update')
					}
					first=false
				}else{
					setTimeout(function(){
						count=true
						machine()
						let a3=new Audio(audio.openDoors)
						a3.play()
						scene.remove(lightTest)
					}, 15000)
				}
				/*let a=new Audio('/Record.mp3')
				a.play()
				a.onended=()=>{
					count=true
					machine()
					
					a2.pause()
					let a3=new Audio('/openDoors.mp3')
					a3.play()
					scene.remove(lightTest)
					//sc.scene('update')
				}*/
			}else{
				setTimeout(function(){
					count=true
					machine()
					scene.remove(lightTest)
				}, 15000)
			}
		}else{
			ded.style.display='none'
			if(!isMute){
				a2.play()
				a2.volume=0.3
				a2.onended=function(){
					if(!count)
						a2.play()
				}
			}
			scene.remove(machineLightTest)
			setTimeout(function(){
				let a3=new Audio(audio.openDoors)
				if(!isMute){
					
					a3.play()
				}
				monsters.forEach((monst, k)=>{
					monst.isAudio=false
					if(monst.for3D.stop)
						monst.for3D.stop=false
				})
				back=false
				if(!isMute){
					audios.forEach((v, k)=>{
						v.currentTime=0;
						v.play()
					})
				}
				
				nighting(100, ()=>{
					img.style.display='block'
					scene.remove(obj)
					/*x: -70, y: -60, z: -80*/
					camera.position.x=-70
					camera.position.y=-60
					camera.position.z=-80
					lift=false
					count=true
					a3.pause()
					scene.remove(lightTest)
					camera.rotation.set(3.1330877087971993,-0.091397397362723,3.1408163869934884);
					lighting(100)
				})
				
			}, 15000)
		}
		
		
		let t=setInterval(function(){
			if(count)
				clearInterval(t)
			let r=Math.random()*5
			camera.position.y+=r
			setTimeout(function(){
				
				camera.position.y-=r
			}, 50)
		}, 100)
		/*lightTest.rotation.y=camera.rotation.y;
		lightTest.rotation.z=camera.rotation.z+10;
		lightTest.rotation.x=camera.rotation.x+10;*/
		scene.add(lightTest)
		lift=true
	}, null)
					//deeeeeeeeeeeeeeeeeeeeeeed//
					//deeeeeeeeeeeeeeeeeeeeeeed//
					//deeeeeeeeeeeeeeeeeeeeeeed//
					//deeeeeeeeeeeeeeeeeeeeeeed//
	
	sc.add('crackLift', './lift.glb', (obj)=>{
		lift=true;
		img.style.display='none'
		camera.rotation.x= 0.004483431145124377
		camera.rotation.y= -0.07900587099273684
		camera.rotation.z= 0.0003538513539429651
		ded.style.display='none'
		crackLiftlightTest.position.y=camera.position.y;
		crackLiftlightTest.position.z=camera.position.z+10;
		crackLiftlightTest.position.x=camera.position.x+10;
		crackLiftlightTest.lookAt(camera.position)
		let a2
		if(!isMute){
			a2=new Audio(audio.lift)
			a2.play()
			a2.onended=()=>{
				a2.play()
			}
		}
		
		audios.forEach((v, k)=>{
			v.currentTime=0;
			v.pause();
		})
		scene.add(crackLiftlightTest)
		let t=setInterval(function(){
			let r=Math.random()*5
			camera.position.y+=r
			setTimeout(function(){
				camera.position.y-=r
			}, 50)
		}, 100)
		//stopingLift
		setTimeout(()=>{
			if(!isMute){
				a2.pause()
				new Audio(audio.crackLift1).play()
				new Audio(audio.crackLift2).play()
				new Audio(audio.crackLift3).play()
			}
			crackLift.style.display='block'
			let selectAudio=setInterval(function(){
				if(parseFloat(crackLift.style.opacity)==0.6)
					clearInterval(selectAudio)
				
				crackLift.style.opacity=(parseFloat(crackLift.style.opacity)+0.01).toString()
			}, 50)
			
			clearInterval(t)
			setInterval(function(){
				let r=Math.random()*0.4
				setTimeout(function(){
					crackLiftlightTest.intensity=r
				}, 20)
			}, 50);
			
		}, 13000)
	}, null)
	document.getElementById('phone').style.display='block'
	//document.body.requestFullscreen();
	let stats;
	if(status=='development'){
		stats=new Stats();
		stats.showPanel(0);
		document.body.appendChild(stats.dom);
	}
	document.getElementById('yes').style.display='none'
	document.getElementById('mute').style.display='none'
	
	let currentPosition=0;
	let isClick=false;
	render.setSize(width, height);
	render.setClearColor(0xDDDDDD, 1);
	render.domElement.id='canvas'
	render.domElement.style.position='relative';
	render.domElement.style.zIndex=0;
	document.body.appendChild(render.domElement);
	const controls = new THREE.PointerLockControls(camera, render.domElement)
	
	camera.position.z-=80
	camera.position.x-=-50
	camera.position.y-=60
	camera.lookAt(scene.position)
	scene.add(camera);
	/*function cube(w, h, d, color, x=0, y=0, z=0, rotationX=0, rotationY=0, rotationZ=0, graphic=16){
		let box=new THREE.BoxGeometry(w,h,d, graphic, graphic, graphic);
		let box_material=new THREE.MeshPhongMaterial({color})
		let cube=new THREE.Mesh(
			box,
			box_material
		); 
		cube.position.set(x, y, z);
		cube.rotation.set(rotationX, rotationY, rotationZ)
		scene.add(cube);
	}*/
	//controls.lock()
	loadModel('./Obj.glb', function(object){
		object=object.scene
		object.position.y=-180
		object.position.z-=10
		
		//scene.updateProjectionMatrix()
		object.traverse(function(e){
			e.name='dedus'
		})
		
		scene.add(object);
		
		
		
	});
	loadModel('./knopka.glb', function(object){
		object=object.scene;
		object.traverse(function(e){
			e.name='knopka'
		});
		object.position.x=-59
		object.position.y=-63
		object.position.z=-65
		
		object.scale.set(0.3,0.3,0.3)
		scene.add(object);
		
	})
	let light = new THREE.SpotLight(0xFFFFFF);
	light.position.y=camera.position.y-15;
	light.position.z=camera.position.z-30;
	//1. {_x: -2.789964266133045, _y: 0.023094711996063735, _z: 3.1331207379747568}
	//2.{_x: 2.885095792403315, _y: 0.12443615755441262, _z: -3.10905193929178}
	//3.{_x: 3.1330877087971993, _y: -0.091397397362723, _z: 3.1408163869934884}
	
	(function t(){
		requestAnimationFrame(t);
		render.render(scene, camera);
		if(status=='development')
			stats.update()
	})();
	window.addEventListener('resize', function(){
		width=window.innerWidth;
		height=window.innerHeight;
		screen.style.width=window.innerWidth.toString()+'px'
		screen.style.height=window.innerHeight.toString()+'px'
		camera.aspect=width/height;
		camera.updateProjectionMatrix();
		render.setSize(width,height)
	})

	let out='';
	for(let y=0; y<7; y++){
		out+='<tr>'
			for(let x=0; x<12; x++)
				if(y%2==1){
					if(x%2==0)
							out+='<td><div class="rectangle-rotate"></div></td>'
						else
							out+='<td><div class="cube-hidden"></div></td>'
				}else{
					if(x%2==0){
						let vent=false;
						if(y==6&&x==0||y==6&&x==10){
							vent=true
						}	
						let res=vent?'background:yellow':'';
						out+=`<td><div class="cube kayf" id='${x+1},${y}' style='${res}' data-cube='${vent}'></div></td>`
					}else
						out+='<td><div class="rectangle"></div></td>'
				}	
		out+='</tr>'
	}

	let table=monitor1.children[0];

	table.innerHTML=out;
	
	
	for(let i=0;i<3;i++){
		let x;
		let y;
		if(i%2==1)
			x=i
		else
			y=i
		x=x||5
		y=y||4
		let monster=new Monster(x,y, 'normal');
		monsters.push(monster)
	}
	let time;
	let t;
	render.domElement.onmousedown=function(){
		light.position.x=camera.position.x-50;
		
		if(lift)
			return
		if(!woringTool.flashlight)
			return
		let a=new Audio(audio.flashlight)
		
		if(!isMute)
			a.play()
		audios.push(a)
		
		switch(currentPosition){
			case 0:
				camera.rotation.set(-2.789964266133045,0.023094711996063735,3.1331207379747568);
				break;
			case 1:
				camera.rotation.set(2.885095792403315,0.12443615755441262,-3.10905193929178);
				break;
			case 2:
				camera.rotation.set(3.1330877087971993,-0.091397397362723,3.1408163869934884);
				break;
		}
		isClick=true;
		monsters.forEach((monst, k)=>{
			if(monst.for3D.object&&monst.for3D.pos==currentPosition){
				time=setTimeout(()=>{
					monst.for3D.deleteModel()
					monst.for3D.stop=true
					monst.isAudio=false
					monst.is3D=false
				}, 7000)
			}	
		})
		scene.add(light); 
		t=setInterval(function d(){
			durabilityTool.flashlight++;
			if(durabilityTool.flashlight==20){
				woringTool.flashlight=false
				scene.remove(light);
				//return
			}
			//d()
		}, 5000)
		durabilityTool.flashlight++;
		if(durabilityTool.flashlight==20){
			woringTool.flashlight=false
			scene.remove(light);
			//return
		}
		
	}
	document.body.onmouseup=function(){
		if(lift)
			return
		clearInterval(t);
		scene.remove(light);
		monsters.forEach((monst, k)=>{
			if(monst.for3D.monster){
				clearTimeout(time);
				
			}	
		});
		
		isClick=false;
	}
	document.body.onkeydown=function(e){
		if(lift)
			return
		
		if(!isClick){
			//plus
			if(e.keyCode===39){
				if(camera.position.x!=-70){
					camera.position.x-=60
					currentPosition++
				}
					
			}
			//minus
			if(e.keyCode===37){
				if(camera.position.x!=50){
					camera.position.x+=60;
					currentPosition--
				}
					
			}
		}
	};
	
	
	
	document.body.onclick=function(event){
		//controls.lock()
		
		let raycaster = new THREE.Raycaster();
		let mouse=new THREE.Vector2();
		mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
		mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
		raycaster.setFromCamera(mouse, camera);
		var intersects = raycaster.intersectObjects(scene.children, true);
		//console.log(intersects[0].point)
		if (intersects.length > 0) {
			//console.log(intersects[0].object.name)
			if(intersects[0].object.name=='knopka'){
				audios.forEach(function(v, k){
					v.pause()
					v.currentTime=0
				})
				if(!first){
					let random=rand(1, 100);
					if(random<20)
						sc.scene('crackLift')
					else
						sc.scene('lift')
				}else
					sc.scene('lift')			
				sc.draw({
					x: 1000,
					y: 25, 
					z: 1000
				})
				monsters.forEach(function(v, k){
					v.isAudio=true
					if(v.for3D)
						v.for3D.stop=true
				})
				
			}else if(intersects[0].object.name=='monst'){
				let obj=intersects[0].object.parent.parent;
				console.log(obj);
				isClickMonsters=true;
				clickedMonsters++;
				scene.remove(obj);
				if(clickedMonsters>=countClickedMonsters)
					return
				obj.position.set(rand(988,1017), rand(33, 14), rand(972, 970))
				scene.add(obj);
				/*(988, 33, 972) (1017,14,970)*/
			}
				
		}
		//console.log(false);
	}
	/*render.domElement.onmousemove=function(event){
		let raycaster = new THREE.Raycaster();
		let mouse=new THREE.Vector2();
		mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
		mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
		raycaster.setFromCamera(mouse, camera);
		var intersects = raycaster.intersectObjects(scene.children, true);
		if(hover)
			return
		if (intersects.length > 0) {
			if(intersects[0].object.name=='knopka'){
				hover=true
				console.log('knopka1')
				if(!isMute){
					new Audio(audio.clickOnPhone).play()
				}
			}else if(intersects[0].object.name=='dedus' && hover)
				hover=false
				
		}
	}*/
	
	function clearAudioMonsters(){
		isAudioMonsters.forEach((v, k)=>{
			v.isAudio=false;
		});
	}
	function clearAudio(){
		if(positionAudio.length!=0){
			positionAudio.forEach((v, k)=>{
				document.getElementById(v).style.background='';
				document.getElementById(v).style.opacity='1';
			});
		}
	}
	function checkYellowCube(x, y){
		return eval(document.getElementById(x+','+y).attributes['data-cube'].value);
	}
	let kletka=document.querySelector('#kletka');
	let out2='';
	for(let y=0; y<4; y++){
		for(let x=0; x<1; x++)
			out2+=`<td><div style="display:inline-block; width:48px; margin-top:20px" class="cube kayf" id='${x+12},${y}'></div></td>`
		out2+='<br/>';
	}
	let timer;
	kletka.innerHTML=out2;
	monsters.forEach((monst, k)=>{
		monst.init()
	})
	
	table.addEventListener('click', function(e){
		if(!integrity.audio)
			return
		let position=e.target.id.split(',');
		let x=+position[0];
		let y=+position[1];
		if(positionCentreAudio[0]==x&&positionCentreAudio[1]==y)
			return
		if(e.target.className!=='cube kayf')
			return
		clearAudio();
		clearAudioMonsters();
		isAudioMonsters=[];
		positionAudio=[];
		clearTimeout(timer)
		if(x!=1){
			if(!checkYellowCube(x-2, y)){
				positionAudio.push(`${x-2},${y}`)
				document.getElementById(`${x-2},${y}`).style.background='gray';
				document.getElementById(`${x-2},${y}`).style.opacity='0.3';
			}
		}
		if(x!=11){
			if(!checkYellowCube(x+2, y)){
				positionAudio.push(`${x+2},${y}`);
				document.getElementById(`${x+2},${y}`).style.background='gray'
				document.getElementById(`${x+2},${y}`).style.opacity='0.3';
			}
		}
		if(y!=0){
			if(!checkYellowCube(x, y-2)){
				positionAudio.push(`${x},${y-2}`);
				document.getElementById(`${x},${y-2}`).style.background='gray'
				document.getElementById(`${x},${y-2}`).style.opacity='0.3';
			}
		}
		if(y!=6){
			if(!checkYellowCube(x, y+2)){
				positionAudio.push(`${x},${y+2}`);
				document.getElementById(`${x},${y+2}`).style.background='gray'
				document.getElementById(`${x},${y+2}`).style.opacity='0.3';
			}
		}
		function stopedMonsters(){
			positionAudio.forEach((v, k)=>{
				monsters.forEach((monst, k)=>{
					let positionAudioXY=v.split(',')
					if(monst.x==Number(positionAudioXY[0]) && monst.y==Number(positionAudioXY[1])){
						var d = Math.random();
						if (d > 0.6&&isAudioMonsters<2){
							monst.isAudio=true;
							monst.remove();
							setTimeout(function(){
								monst.remove();
								monst.x=x;
								monst.y=y;
								monst.draw();
							}, 1000);
							
							isAudioMonsters.push(monst);
						}
						
					}
				})
				
			});
			timer=setTimeout(stopedMonsters, 1500)
		}
		stopedMonsters()
		positionCentreAudio[0]=x;
		positionCentreAudio[1]=y;
		amounts.audio++;
		if(amounts.audio==20){
			integrity.audio=false
			amounts.audio=0;
		}
			
	})
	let a=new Audio(audio.forest)
	a.volume=0.3
	if(!isMute)
		a.play()
	a.onended=()=>{
		a.play();
	}
	audios.push(a)
	document.getElementById('closeKletka').onclick=function(){
		monsters.forEach((monst, k)=>{
			if(!monst.cloustrofobia)
				gameOver()
			else {
				alert('Вы выиграли!!!!')
				location.reload()
			}
		})
	}
}
function clickOnPhoneAudio(){
	let a=new Audio(audio.clickOnPhone)
	if(!isMute)
		a.play()
	audios.push(a)
}
function monitor(){
	clickOnPhoneAudio()
	monitor1.style.display='block';
	fix1.style.display='none';
}
function fix(){
	clickOnPhoneAudio()
	monitor1.style.display='none';
	fix1.style.display='block';
}
/*function fixAudio(){
	let element=document.getElementById('fixAudio');
	let progress=document.createElement('progress');
	progress.value=0;
	progress.max=10;
	element.innerText=''
	element.appendChild(progress)
	function tick(){
		if(progress.value!==10){
			progress.value++
			setTimeout(tick, 1000)
		}else{
			element.innerText='Всё в порядке'
			integrity.audio=true
			
		}	
	}
	///element.innerText='Починка!'
	tick()
	
}
function fixVideo(){
	
}*/
function checkAudioInLift(bool){
	if(!bool){
		lift=false
		gameOver()
	}else{
		crackLiftQuest()
	}
}
let isDisplayingWindow=false
function dialogWindowFix(){
	if(isDisplayingWindow)
		fixAndUpgrade.style.display='none'
	else
		fixAndUpgrade.style.display='block'
	isDisplayingWindow=!isDisplayingWindow
}
function backAndExit(){
	back=true;
	clearTimeout(machineMonsterTimer)
	let random=rand(1, 100);
	if(random<20)
		sc.scene('crackLift')
	else
		sc.scene('lift')
	//sc.scene('lift');
	sc.draw({
		x: 1000,
		y: 25, 
		z: 1000
	});
	
}
function fixTool(part){
	let a=new Audio(audio.fix)
	if(!isMute)
		a.play()
	
	let element=document.getElementById('fix'+part[0].toUpperCase()+part.slice(1));
	let progress=document.createElement('progress');
	progress.value=0;
	progress.max=10;
	element.innerText='Починка:';
	element.appendChild(progress)
	function tick(){	
		if(progress.value!==10){
			progress.value++;
			setTimeout(tick, 1000)
		}else{
			element.innerText='Всё в порядке'
			woringTool[part]=true;
			durabilityTool[part]=0
		}	
	}
	tick()
}
function fixPart(part){
	let a=new Audio(audio.fix)
	if(!isMute)
		a.play()
	audios.push(a)
	let element=document.getElementById('fix'+part[0].toUpperCase()+part.slice(1));
	let progress=document.createElement('progress');
	progress.value=0;
	progress.max=10;
	element.innerText='Починка:';
	element.appendChild(progress)
	function tick(){	
		if(progress.value!==10){
			progress.value++;
			setTimeout(tick, 1000)
		}else{
			element.innerText='Всё в порядке'
			integrity[part]=true;
			amounts[part]=0
		}	
	}
	///element.innerText='Починка!'
	tick()
}

