<template>
<div id='map' style="width:100%; height: 600px"></div>
</template>

<script>
export default {
  name: 'Map',
  data () {
    return {
      positions: [],
      lat: undefined,
      lon: undefined,
      map: undefined
    }
  },
  methods: {
    setmarker () {
      const self = this
      var imgsrc = require('@/assets/image/disabled.png')
      var imgsz = new kakao.maps.Size(45, 45)
      var imgopt = {offset: new kakao.maps.Point(0, 0)}
      var markerimg = new kakao.maps.MarkerImage(imgsrc, imgsz, imgopt)
      for (var i = 0; i < self.positions.length; i++) {
        var marker = new kakao.maps.Marker({
          position: new kakao.maps.LatLng(self.positions[i].lat, self.positions[i].lon),
          title: self.positions[i].title,
          image: markerimg
        })
        marker.setMap(self.map)
      }
    },
    initMap () {
      const self = this
      var container = document.getElementById('map')
      var options = { center: new kakao.maps.LatLng(self.lat, self.lon), level: 3 }
      this.map = new kakao.maps.Map(container, options)
      this.$http.get('http://localhost:3000/map').then(resp => {
        self.positions = resp.data
        self.setmarker()
      })
      // 마커추가하려면 객체를 아래와 같이 하나 만든다.
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
    const self = this
    navigator.geolocation.getCurrentPosition(function (pos) {
      self.lat = pos.coords.latitude
      self.lon = pos.coords.longitude
    })
    window.kakao && window.kakao.maps ? self.initMap() : self.addScript()
  }
}
</script>

<style>

</style>
