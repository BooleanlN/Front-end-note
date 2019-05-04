function start(){
	let hour_ = document.getElementById("hour");
	let minite_ = document.getElementById("minite");
	let can = document.getElementById("canv");
	let ctx = can.getContext("2d");
	ctx.moveTo(150,80);
	console.log(minite_);
	console.log(hour_.innerHTML);
	class Display{
		constructor(v,li){
			this.value = v;
			this.limit = li;
		}
		getValue(){
			return this.value;
		}
		doIncrease(){
			this.value++;
			if(this.value == this.limit)
			{
				this.value = 0;
			}
		}
	}
	let minite = new Display(0,60);
	let hour = new Display(0,12);
	let i = 1;
	setInterval(function(){
		minite.doIncrease();
		if(minite.value===0)hour.doIncrease();
		console.log(hour.value+":"+minite.value);
		hour_.innerHTML = hour.value>9?hour.value:"0"+hour.value;
		minite_.innerHTML = minite.value>9?minite.value:"0"+minite.value;
	},1000);
}
function cstart(){
		let can = document.getElementById("canv");
		let ctx = can.getContext("2d");
		console.log(ctx);
		ctx.beginPath();
		ctx.lineWidth = 5;
		ctx.strokeStyle = "#0000ff";
		ctx.arc(150,80,100,0*Math.PI,2*Math.PI,false);
		ctx.stroke();
	}