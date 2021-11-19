function gameOver(){
	let img=new Image()
	img.src='scream.gif'
	img.width=window.innerWidt
	img.height=window.innerHeight
	let a=new Audio('audio/monster.mp3')
	let a2=new Audio('audio/scream.mp3')
	document.body.innerHTML='<img src="scream.gif" width="'+window.innerWidth+'" height="'+window.innerHeight+'"/>'
	a.play()
	a2.play()
	a.onended=()=>{
		location.reload()
	}
}