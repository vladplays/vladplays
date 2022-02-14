class Monster{
	constructor(x, y, type){
		this.x=x;
		this.y=y;
		this.type=type;
		this.isAudio=false;
		this.is3D=false
		this.cloustrofobia=false
		this.for3D='';
	}
	draw(){
		if(!integrity.video)
			return
		document.getElementById(this.x+','+this.y).innerHTML='<img src="monster.jpg" style="width:30px; height:30px"/>';
	}
	remove(){
		document.getElementById(this.x+','+this.y).innerHTML='';
	}
	II(input){
		let oldX=this.x;
		let oldY=this.y;
		switch(input){
			case 0:
				if(this.x!==11){
					this.x+=2;
				}
				break;
			case 1:
				if(this.x!==1){
					this.x-=2;
				}
				break;
			case 2:
				if(this.y!==6){
					this.y+=2;
				}
				break;
			case 3:
				if(this.y!==0){
					this.y-=2;
				}
		}
		
		if(this.x==oldX&&this.y==oldY||document.getElementById(this.x+','+this.y).innerHTML){
			return this.II(Math.floor(Math.random()*4))
		}
		return true;
	}
	ray(){
		this.remove();
		setTimeout(()=>{this.draw()}, 500);
	}
	init3D(){
		if(this.x==1 || this.x==11){
			let a=new Audio('audio/monster.mp3')
			if(!isMute)
				a.play()
			this.is3D=true
		}
		
		this.isAudio=true;
		this.y=2
		this.remove()
		let monster3d = new Monster3D(['monster-dog', 'monster-dog-down-two pos']);
		this.for3D=monster3d;
		/*monster3d.draw=this.for3D.draw;
		monster3d.deleteModel=this.for3D.deleteModel;
		this.for3D.monster=monster3d;*/
		
		if(this.x==1){
			monster3d.draw(0, 'down')
				/*let t;
				t=setTimeout(()=>{
					if(this.for3D.stop){
						clearTimeout(t)
						this.for3D.stop=false
						return
					}
					monster3d.deleteModel();
					monster3d.draw(1, 'down')
					t=setTimeout(()=>{
						if(this.for3D.stop){
							this.for3D.stop=false
							return
						}
						gameOver()
					}, 20000)
				}, 15000);*/
				
		}else if(this.x==11){
			monster3d.draw(0, 'up')
				/*let t;
				t=setTimeout(()=>{
					if(this.for3D.stop){
						clearTimeout(t)
						this.for3D.stop=false
						return
					}
					monster3d.deleteModel();
					monster3d.draw(1, 'up');
					t=setTimeout(()=>{
						if(this.for3D.stop){
							this.for3D.stop=false
							return
						}
						gameOver();
					}, 20000)
				}, 15000);*/
				
		}
	}
	init(){
		this.remove();
		amounts.video++;
		if(amounts.video==50){
			integrity.video=false;
		}
		if(this.y==6 && !this.for3D.stop && !this.is3D){
			let isOther3D=false
			monsters.forEach((monst, k)=>{
				if(monst.for3D)
					isOther3D=true
			})
			if(isOther3D)
				return
			
			this.init3D()
			
		}
		if(this.x==11&&this.isAudio==true){
			this.remove()
			this.x=12;
			this.cloustrofobia=true
			countCloustrofobiaMonsters++;
			countMonsters.innerText=countCloustrofobiaMonsters
			this.draw();
			return
		}
		setTimeout(()=>{this.init()}, 3000);
		if(this.isAudio&&!this.is3D){
			this.ray();
			return
		}
		if(document.getElementById(this.x+','+this.y).style.background)
			this.remove();
		this.remove();
		if(!this.is3D){	
			while(!this.II(Math.floor(Math.random()*4)))
				console.log(this.II(Math.floor(Math.random()*4)))
			setTimeout(()=>{this.draw()}, 500);
		}
	}
}