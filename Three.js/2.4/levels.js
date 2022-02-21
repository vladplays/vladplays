let levels=[
	{
		name:1,
		valueMonsters:1, 
		valueBlendMonsters:0,
		timesMoveMonsters:[20000, 30000],
		durabilityTools:{
			flashlight:20, 
			phone:30,
			audio:15,
			video:25
		},
		changeCrackLift:5,
		first:true,
		timeScreamInCrackLift:8000,
		timeScreamInMachine:35000,
		valueMonstersInCrackLift:10
	},
	{
		name:2,
		valueMonsters:2, 
		valueBlendMonsters:0,
		timesMoveMonsters:[20000, 25000],
		durabilityTools:{
			flashlight:15, 
			phone:25,
			audio:10,
			video:20
		},
		changeCrackLift:10,
		first:false,
		timeScreamInCrackLift:8000,
		timeScreamInMachine:30000,
		valueMonstersInCrackLift:15
		
	},
	{
		name:3,
		valueMonsters:2, 
		valueBlendMonsters:1,
		timesMoveMonsters:[15000, 20000],
		durabilityTools:{
			flashlight:13, 
			phone:23,
			audio:10,
			video:20
		},
		changeCrackLift:15,
		first:false,
		timeScreamInCrackLift:7500,
		timeScreamInMachine:25000,
		valueMonstersInCrackLift:20
		
	},
	{
		name:4,
		valueMonsters:3, 
		valueBlendMonsters:1,
		timesMoveMonsters:[15000, 15000],
		durabilityTools:{
			flashlight:10, 
			phone:20,
			audio:7,
			video:17
		},
		changeCrackLift:17,
		first:false,
		timeScreamInCrackLift:7000,
		timeScreamInMachine:25000,
		valueMonstersInCrackLift:20
		
	},
	{
		name:5,
		valueMonsters:3, 
		valueBlendMonsters:1,
		timesMoveMonsters:[10000, 15000],
		durabilityTools:{
			flashlight:10, 
			phone:15,
			audio:7,
			video:15
		},
		changeCrackLift:20,
		first:false,
		timeScreamInCrackLift:6500,
		timeScreamInMachine:20000,
		valueMonstersInCrackLift:23
		
	},
	{
		name:6,
		valueMonsters:3, 
		valueBlendMonsters:2,
		timesMoveMonsters:[10000, 15000],
		durabilityTools:{
			flashlight:7, 
			phone:13,
			audio:5,
			video:15
		},
		changeCrackLift:23,
		first:false,
		timeScreamInCrackLift:6000,
		timeScreamInMachine:15000,
		valueMonstersInCrackLift:25
		
	},
	{
		name:7,
		valueMonsters:3, 
		valueBlendMonsters:2,
		timesMoveMonsters:[7000, 10000],
		durabilityTools:{
			flashlight:5, 
			phone:10,
			audio:5,
			video:15
		},
		changeCrackLift:23,
		first:false,
		timeScreamInCrackLift:6000,
		timeScreamInMachine:15000,
		valueMonstersInCrackLift:25
		
	},
	{
		name:8,
		valueMonsters:4, 
		valueBlendMonsters:2,
		timesMoveMonsters:[5000, 7000],
		durabilityTools:{
			flashlight:5, 
			phone:5,
			audio:5,
			video:15
		},
		changeCrackLift:25,
		first:false,
		timeScreamInCrackLift:5000,
		timeScreamInMachine:13000,
		valueMonstersInCrackLift:30
	},
	{
		name:9,
		valueMonsters:4, 
		valueBlendMonsters:2,
		timesMoveMonsters:[5000, 5000],
		durabilityTools:{
			flashlight:4, 
			phone:4,
			audio:4,
			video:15
		},
		changeCrackLift:27,
		first:false,
		timeScreamInCrackLift:4500,
		timeScreamInMachine:10000,
		valueMonstersInCrackLift:33
	},
	{
		name:10,
		valueMonsters:4, 
		valueBlendMonsters:2,
		timesMoveMonsters:[3000, 4000],
		durabilityTools:{
			flashlight:3, 
			phone:3,
			audio:3,
			video:13
		},
		changeCrackLift:30,
		first:false,
		timeScreamInCrackLift:4300,
		timeScreamInMachine:7500,
		valueMonstersInCrackLift:35
	}
	
]
function getByName(name){
	let v=false
	levels.forEach((val, k)=>{
		if(val.name==name)
			v=val
	})
	return v
}
function addOption(name){
	let option=document.createElement('option');
	option.value=name;
	option.onclick=function(){
		currentLevel=option.value
	}
	option.innerText=name
	selectLevel.appendChild(option)
}