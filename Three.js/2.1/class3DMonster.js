class Monster3D{
	constructor(model){
		this.model=model;
		this.stop=false;
		this.object;
		this.pos;
	}
	deleteModel(){
		scene.remove(this.object)
	}
	draw(position, type){
		
		this.pos=position
		loadModel('/'+this.model[position]+'.gltf', (object)=>{
			object=object.scene;
			
			if(type=='down'){
				if(position==0){
					object.position.y=-120;
					object.position.x=30;
					object.position.z+=40
				}else{
					object.position.y=-130;
					object.position.x=30;
					object.position.z+=10
				}
			}else{
				if(position==0){
					object.position.y=-50;
					object.position.x=-30;
					object.position.z+=40
				}else{
					object.position.y=-80;
					object.position.x=-30;
					object.position.z+=5
				}
			}
			this.object=object;
			scene.add(object);
		})
		this.init()
	}
	init(){
		let t;
		t=setTimeout(()=>{
			if(this.stop){
				clearTimeout(t)
				this.stop=false
				this.deleteModel();
				return
			}
			this.deleteModel();
			this.draw(this.pos, 1);
			t=setTimeout(()=>{
				if(this.stop){
					this.stop=false
					this.deleteModel();
					return
				}
				gameOver();
				this.deleteModel();
			}, 20000)
		}, 15000);
	}
}