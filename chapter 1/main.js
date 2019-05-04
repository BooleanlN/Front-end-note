$(document).ready(function(){
	'use strict';
	let strin  = '123';
	let newstr = `456${strin}\u00b0C`;
	let hu = `123
233`;
	const orange = Symbol("The Color is orange");
	let x,y;
	y = x = 3*5;
	//console.log(x+y);
	let arr = [1,2,3,4];
	//arr.find((x,i,a)=>console.log(x,i,a))
	let t1={id:"jame"},t2={id:"times"},t3={id:"lets"};
	let dxarr = [t1,t2,t3];
	let globalFunc;
	{
		let a = 6;
		globalFunc= function(){
			a++;
			console.log(a);
		}
		let b = 5;
	}
	let i = 0;
	//console.log(b);//脱离作用域后。b被回收
	//console.log(a);//虽然访问不到a，表面上a也被回收。但通过闭包函数可以取到a
	for(;i<5;i++){
		//globalFunc();
	}
	//let r = arr.some(x=>x===3);
	let r = dxarr.some(p=>p.id==="times",t2);
	console.log(r);
	let mlarr = [1,2,3,4,5,6,7,8,9,10];
	let os = mlarr.filter(x=>x%2===0);
	console.log(os);
	let mos = mlarr.filter(x=>x%2!==0).map(x=>x.toString());
	console.log(mos);
	let starr = ["basketball","soccer","football","pp","tennis"];
	let nstr = starr.reduce((a,w)=>w.length>6?a+" "+w:a,"").trim();
	let rstr = starr.filter(x=>x.length>6).join(" ");
	console.log(rstr.length);
	console.log(nstr);//a初值是"",须用trim去掉空格，或直接不赋初值
	class Car{
	  constructor(color,speed)
	  {
	    this.color = color;
	    this.speed = speed;
	    this._priWheel = 4;//默认，私有
	    this._priLight = 8;//默认，私有
	    this.value = [8,9,1,2,3,4];
	  }
	  get priWheel(){return this._priWheel;}
	  set priWheel(value){this._priWheel = value;}
	  shift(priWheel){this._priWheel = priWheel;}
	  //迭代器协议，使该对象变得可迭代
	  [Symbol.iterator](){
	  	return this.value.values();
	  }
	}
	const car1 = new Car("red",500);
	//console.log(car1.color);
	car1.color = "blue";
	//console.log(car1.color);
	//Car.prototype.shift(6);//引用原型方法
	//迭代器
	const arxr = [1,2,3,4,5,6];
	let it = arxr.values();
	let bbe = it.next();
	while(!bbe.done)
	{
		console.log(bbe.value);
		bbe = it.next();
	}
	for(let c of car1){
		console.log(c);
	}
	//构造器
	function* gena(){
		yield 1;
		yield 2;
		return 3;
	}
	let fund = gena();
	console.log(fund.next());
	console.log(fund.next());
	console.log(fund.next());
	console.log(fund.next());
	let maps = new Map();
	maps.set('123','456');
	maps.set(arxr,'444');
	console.log(maps.get('123'));
	maps.delete('123');
	console.log(maps.entries());
	//解构取值
	for(let [k,v] of maps)
	{
		console.log(k,v);
	}
	maps.clear();//情况map
	console.log(maps.size);//返回0 
	let wkmap = new WeakMap();//Weakmap
	wkmap.set(arxr,5);
	console.log(wkmap);
	console.log(wkmap.get(arxr));
	//wkmap.set("dsa",6);//报错。WeakMap只允许键值为对象类型
	//使用数组初始化Set
	let sett = new Set([8,"4",4,{"dsa":4},function(){console.log("fun");}]);
	//add()函数添加元素
	console.log(sett.add(4));
	console.log(sett);
	sett.delete(4);
	console.log(sett.has(4));
	console.log(sett.entries());//返回键值对的遍历器
	sett.forEach((value,key) => console.log(key + ' : ' + value));
	let wwset = new WeakSet();
	const foo = {};
	wwset.add(foo);

	wwset.has(foo);

	console.log(wwset.size);//undefined
	console.log(wwset);
	wwset.delete(foo);
	//wwset.clear();//无此function
});