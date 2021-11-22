try{
	let status='product';//development or product
	
	let closing=true
	
	let monitor1=document.getElementById('monitor');
	let fix1=document.getElementById('fix');
	let img=document.getElementById('img');
	let phone=document.getElementById('smartPhone');
	let audio={
		flashlight:'audio/flashlight.mp3',
		phone:'audio/phone.mp3',
		clickOnPhone:'audio/clickOnPhone.mp3',
		fix:'audio/fix.mp3',
		forest:'audio/forest.mp3',
		monster:'audio/monster.mp3'
	}
	img.onclick=function (e){
		let a=new Audio(audio.phone)
		if(!isMute)
			a.play()
		if(closing){
			e.target.style.transform='rotate(180deg)';
			phone.style.display='block';
		}else{
			e.target.style.transform='rotate(360deg)';
			phone.style.display='none';
		}	
		closing=!closing
	}
	let sceneAdd;
	document.getElementById('mute').onclick=function(){
		if(!isMute)
			document.getElementById('mute').innerText='Включить звук'
		else
			document.getElementById('mute').innerText='Выключить звук'
		isMute=!isMute
	}
	
	document.getElementById('yes').onclick=function(){
		document.getElementById('phone').style.display='block'
		document.body.requestFullscreen();
		let stats;
		if(status=='development'){
			stats=new Stats();
			stats.showPanel(0);
			document.body.appendChild(stats.dom);
		}
		document.getElementById('yes').style.display='none'
		document.getElementById('mute').style.display='none'
		let width=window.innerWidth;
		let height=window.innerHeight;
		let scene=new THREE.Scene();
		
		let camera=new THREE.PerspectiveCamera(40, width/height, 0.01, 250);
		let render=new THREE.WebGLRenderer({
			antialias:true
		});
		let loader = new THREE.GLTFLoader();
		let currentPosition=0;
		let isClick=false;
		render.setSize(width, height);
		render.setClearColor(0xDDDDDD, 1);
		render.domElement.id='canvas'
		document.body.appendChild(render.domElement);
		camera.position.z-=80
		camera.position.x-=-50
		camera.position.y-=60
		camera.lookAt(scene.position)
		scene.add(camera);
		function cube(w, h, d, color, x=0, y=0, z=0, rotationX=0, rotationY=0, rotationZ=0, graphic=16){
			let box=new THREE.BoxGeometry(w,h,d, graphic, graphic, graphic);
			let box_material=new THREE.MeshPhongMaterial({color})
			let cube=new THREE.Mesh(
				box,
				box_material
			); 
			cube.position.set(x, y, z);
			cube.rotation.set(rotationX, rotationY, rotationZ)
			scene.add(cube);
		}
		
		loadModel('./Obj.glb', function(object){
			object=object.scene
			object.position.y=-180
			object.position.z-=10
			scene.add(object);
		});
		/*loadModel('./monster-dog.gltf', function(object){
			object=object.scene
			object.position.y=-120;
			object.position.x=30;
			console.log(object)
			object.position.z+=40
			scene.add(object);
		});*/
		sceneAdd=function(object){
			scene.add(object);
		}
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
							out+=`<td><div class="cube" id='${x+1},${y}' style='${res}' data-cube='${vent}'></div></td>`
						}else
							out+='<td><div class="rectangle"></div></td>'
					}	
			out+='</tr>'
		}

		let table=monitor1.children[0];

		table.innerHTML=out;
		function loadModel(file, callback){
			loader.load(file, callback)
		}
		let monsters=[];
		for(let i=0;i<3;i++){
			let x;
			let y;
			if(i%2==1)
				x=i
			else
				y=i
			x=x||5
			y=y||4
			console.log(x,y)
			let monster=new Monster(x,y, 'normal', []);
			monster.for3D={
				model:null,
				draw(pos, type){
					
					if(type=='down'){
						monster.for3D.pos=0
						if(!pos){
							loadModel(this.arr[pos]+'.gltf', (object)=>{
								object=object.scene;
								object.position.y=-120;
								object.position.x=30;
								object.position.z+=40
								this.model=object;
								scene.add(object);
							})
						}else{
							loadModel(this.arr[pos]+'.gltf', (object)=>{
								object=object.scene;
								object.position.y=-130;
								object.position.x=30;
								object.position.z+=10
								this.model=object
								scene.add(object);
							})
						}
					}else{
						monster.for3D.pos=1
						if(!pos){
							loadModel(this.arr[pos]+'.gltf', (object)=>{
								object=object.scene;
								object.position.y=-50;
								object.position.x=-30;
								object.position.z+=40
								this.model=object
								scene.add(object);
							})
						}else{
							loadModel(this.arr[pos]+'.gltf', (object)=>{
								object=object.scene;
								object.position.y=-80;
								object.position.x=-30;
								object.position.z+=5
								this.model=object
								scene.add(object);
							})
						}
					}
					
				},
				deleteModel(){
					scene.remove(this.model)
				}
			}
		
			monsters.push(monster)
		}
		//let monster=new Monster(1,4, 'normal', []);
		
		
		let time;
		render.domElement.onmousedown=function(){
			let a=new Audio(audio.flashlight)
			if(!isMute)
				a.play()
			light.position.x=camera.position.x-50;
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
				if(monst.for3D.monster&&monst.for3D.pos==currentPosition){
					time=setTimeout(()=>{
						console.log(monst.for3D)
						scene.remove(monst.for3D.monster.model);
						monst.for3D.stop=true
						monst.isAudio=false
						monst.is3D=false
					}, 5000)
				}	
			})
			
			scene.add(light); 
		}
		document.body.onmouseup=function(){
			scene.remove(light);
			monsters.forEach((monst, k)=>{
				if(monst.for3D.monster){
					clearTimeout(time);
				}	
			});
			
			isClick=false;
		}
		document.body.onkeydown=function(e){
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
		
		
		let positionAudio=[];
		let isAudioMonsters=[];
		let positionCentreAudio=[]
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
				out2+=`<td><div style="display:inline-block; width:48px; margin-top:20px" class="cube" id='${x+12},${y}'></div></td>`
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
			if(e.target.className!=='cube')
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
	
	function fixPart(part){
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
				integrity[part]=true;
				amounts[part]=0
			}	
		}
		///element.innerText='Починка!'
		tick()
	}
}catch(e){
	console.error(e.name+':'+e.message)
	let conf=confirm('Ошибка!!!'+e.name+':'+e.message+'. Перезагрузка!!')
	if(conf)
		location.reload()
	
}
