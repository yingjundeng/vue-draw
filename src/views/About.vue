<style lang='scss'>
	
</style>
<template>
  <div class="about">
    <h1>This is an about page</h1>
	<span>Count:{{$store.state.count}}</span><button @click="add(2)">+</button>
	
	<span>val:{{this.values}}</span><span>tog:{{this.tog}}</span><button @click="change_Val()">+</button>
	
	<div>{{$store.state.city}}<button @click="changeVal()">+</button></div>
  </div>
</template>

<script>
	import {mapState, mapMutations, mapActions, mapGetters} from 'vuex'
	export default{
		data(){
			return{
				values:0,
				tog:0,
				form:{
					name:"",
					tag:'',
				}
			}
		},
		computed:{
			add_h(){
				return this.$store.state.count++
			}
		},
		
		methods:{
			...mapMutations({
				add:"CHANGE_COUNT",
			}),
			...mapActions({
				changeVal:"CHANGE_CITY",
			}),
			 change_Val(){
				this.values = this.values+1
			 }
	  },
	  created(){
		  console.log(this.$store)
	  },
    watch:{
		values(val){
			console.log(val)
			this.tog = val
		},
		form:{
			
		},
		deep:true,
	}
	}
</script>
