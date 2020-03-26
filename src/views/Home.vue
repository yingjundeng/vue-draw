<template>
  <div class="home">
    <HelloWorld msg="图片编辑demo"/>
    <div style="width:80%; margin: auto;">
     <tm-canvas></tm-canvas>
      <!-- <dyj-canvas ></dyj-canvas> -->
    </div>
    
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import  dyjCanvas  from './dyj-canvas'
import  TmCanvas  from './canvas'
export default {
  name: 'home',
  components: {
    HelloWorld,
    dyjCanvas,
    TmCanvas
  }
}
</script>
