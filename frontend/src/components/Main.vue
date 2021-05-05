<template>
  <div>
    <Header></Header>
    <Map></Map>
  </div>
</template>

<script>
import Map from './Map'
import Header from './Header'
export default {
  name: 'Main',
  components: {Map, Header}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
