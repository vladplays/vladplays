class Monster3D{
	constructor(arr, pos){
		this.arr=arr;
		this.pos=pos;
		
	}
	/*draw(){
		
		this.loadModel('/'+this.arr[this.pos]+'.gltf', (object)=>{
			object=object.scene;
			object.position.y=-120;
			object.position.x=30;
			object.position.z+=40
			this.scene.add(object);
		})
	}*/
	init(loadModel, scene){
		this.loadModel=loadModel
		this.scene=scene;
	}
}