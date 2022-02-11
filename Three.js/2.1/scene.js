class Scenes{
	constructor(){
		this.scenes=[]
		this.currentScene;
	}
	add(name, obj, start, stop){
		this.scenes.push({
			name, obj, start, stop
		})
	}
	searchByName(name){
		let val;
		this.scenes.forEach(function(k, v){
			console.log(k, v)
			if(k.name==name)
				val=k
		})
		return val;
	}
	draw(object){
		nighting(100, ()=>{
			let o=this.searchByName(this.currentScene)
			loadModel(o.obj, function(obj){
				obj=obj.scene
				obj.position.set(1000, 0, 1000)
				camera.position.set(object.x, object.y, object.z)
				o.start()
				scene.add(obj);
				
				lighting(500);
			})
		});
		
	}
	scene(name){
		this.currentScene=name;
	}
}
