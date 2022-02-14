class Scenes{
	constructor(){
		this.scenes=[]
		this.currentScene;
		this.currentObject;
	}
	add(name, obj, start, stop){
		this.scenes.push({
			name, obj, start, stop
		})
	}
	searchByName(name){
		let val;
		this.scenes.forEach(function(k, v){
			console.log(k)
			if(k.name==name)
				val=k
		})
		return val;
	}
	draw(object){
		let that=this;
		nighting(100, ()=>{
			let o=this.searchByName(this.currentScene)
			loadModel(o.obj, function(obj){
				obj=obj.scene
				obj.position.set(1000, 0, 1000)
				camera.position.set(object.x, object.y, object.z)
				o.start(obj)
				scene.add(obj);
				that.currentObject=obj;
				lighting(500);
			})
		});
		
	}
	remove(){
		scene.remove(this.currentObject)
	}
	scene(name){
		this.currentScene=name;
	}
}
