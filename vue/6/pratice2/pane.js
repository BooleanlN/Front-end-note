Vue.component('pane',{
	name:'pane',
	template:'\
		<div class="pane" v-show="show">\
			<slot></slot>\
		</div>',
	data:function(){
		return {
			show:true
		}
	},
	props:{
		name:{
			type:String
		},
		label:{
			type:String,
			default:''
		}
	}
})