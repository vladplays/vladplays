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
		console.log(position, type)
		this.pos=type
		loadModel('./'+this.model[position]+'.glb', (object)=>{
			object=object.scene;
			
			if(type==0){
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
			
			this.draw(1, this.pos);
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