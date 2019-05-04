Vue.component('inputNumber',{
	template:'<div class="input-number>"\
		<input type="text" name="" value="{{value}}">\
	</div>',
	props:{
		maxValue:{
			type:Number,
			default:Infinity
		},
		minValue:{
			type:Number,
			default:-Infinity
		},
		value:{
			type:Number,
			default:0
		}
	}
})