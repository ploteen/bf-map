<template>
<div id='map' style="width:100%; height: 600px"></div>
</template>

<script>
export default {
  name: 'Map',
  data () {
    return {
      positions: [
        {
          title: 'abcd',
          latitude: 35.2787182404502,
          longitude: 128.689282964033
        }
      ]
    }
  },
  methods: {
    initMap () {
      var container = document.getElementById('map')
      var options = { center: new kakao.maps.LatLng(35.2787182404502, 128.689282964033), level: 3 }
      var map = new kakao.maps.Map(container, options)
      // 마커추가하려면 객체를 아래와 같이 하나 만든다.
      var marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(this.positions[0].latitude, this.positions[0].longitude),
        title: this.positions[0].title
      })
      marker.setMap(map)
    },
    addScript () {
      const script = document.createElement('script')
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap)
      script.src = 'http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=ce4a61f3797a1de3ea4467a116c546aa'
      document.head.appendChild(script)
    }
  },
  mounted () {
    window.kakao && window.kakao.maps ? this.initMap() : this.addScript()
    console.log('1234')
  }
}
</script>

<style>

</style>
