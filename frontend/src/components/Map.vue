<template>
<div id='map' style="width:100%; height: 600px"></div>
</template>

<script>
import axios from 'axios'
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
      self.positions.forEach(function (pos) {
        var marker = new kakao.maps.Marker({
          position: new kakao.maps.LatLng(pos.lat, pos.lon),
          title: pos.title,
          image: markerimg
        })
        marker.setMap(self.map)
        var customOverlay = new kakao.maps.CustomOverlay({
          position: marker.getPosition(),
          yAnchor: 3
        })
        var content = document.createElement('div')
        content.className = 'wrap'
        var info = document.createElement('div')
        info.className = 'info'
        var title = document.createElement('div')
        title.className = 'title'
        title.innerHTML = pos.title
        var closeBtn = document.createElement('close')
        closeBtn.className = 'close'
        closeBtn.onclick = function () {
          customOverlay.setMap(null)
        }
        var body = document.createElement('div')
        body.className = 'body'
        // option 집어 넣기
        var options = document.createElement('p')
        var list = ['stair', 'elevator', 'toilet']
        var answer = ['계단', '엘리베이터', '화장실']
        for (var i = 0; i < list.length; i++) {
          if (pos[list[i]]) {
            options.innerHTML = options.innerHTML + answer[i] + ' '
          }
        }
        if (options.innerHTML === '') options.innerHTML = '보조 장치 정보가 없습니다\n'
        else options.innerHTML = options.innerHTML + '보조 장치가 존재 합니다\n'
        body.appendChild(options)
        body.innerHTML += '\n존재하는 보조 장치를 선택해 주세요\n'
        var form = document.createElement('form')
        var toilet = document.createElement('input')
        toilet.type = 'checkbox'
        toilet.info = 'toilet'
        toilet.value = 'toilet'
        toilet.className = pos.title
        var stair = document.createElement('input')
        stair.type = 'checkbox'
        stair.info = 'stair'
        stair.value = 'stair'
        stair.className = pos.title
        var elevator = document.createElement('input')
        elevator.type = 'checkbox'
        elevator.info = 'elevator'
        elevator.value = 'elevator'
        elevator.className = pos.title
        var submit = document.createElement('button')
        submit.value = '제출'
        submit.innerHTML = '제출'
        submit.type = 'button'
        submit.onclick = function () {
          var req = Object()
          req.title = pos.title
          var temp = document.getElementsByClassName(pos.title)
          for (var i = 0; i < temp.length; i++) {
            if (temp[i].checked) {
              req[temp[i].value] = true
            }
          }
          axios.post('http://localhost:3000/map/update', req).then(resp => {
            alert('감사합니다')
          })
        }
        form.appendChild(toilet)
        form.innerHTML = form.innerHTML + '화장실   '
        form.appendChild(elevator)
        form.innerHTML = form.innerHTML + '휠체어용 엘리베이터  '
        form.appendChild(stair)
        form.innerHTML = form.innerHTML + '계단  '
        form.appendChild(submit)
        body.appendChild(form)
        title.appendChild(closeBtn)
        info.appendChild(title)
        info.appendChild(body)
        content.appendChild(info)
        kakao.maps.event.addListener(marker, 'click', function () {
          customOverlay.setMap(self.map)
        })
        customOverlay.setContent(content)
      })
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
    .wrap {position: absolute;left: 0;bottom: 40px;width: 288px;height: 132px;margin-left: -144px;text-align: left;overflow: hidden;font-size: 12px;font-family: 'Malgun Gothic', dotum, '돋움', sans-serif;line-height: 1.5;}
    .wrap * {padding: 0;margin: 0;}
    .wrap .info {width: 286px;height: 120px;border-radius: 5px;border-bottom: 2px solid #ccc;border-right: 1px solid #ccc;overflow: hidden;background: #fff;}
    .wrap .info:nth-child(1) {border: 0;box-shadow: 0px 1px 2px #888;}
    .info .title {padding: 5px 0 0 10px;height: 30px;background: #eee;border-bottom: 1px solid #ddd;font-size: 12px;font-weight: bold;}
    .info .close {position: absolute;top: 10px;right: 10px;color: #888;width: 17px;height: 17px;background: url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/overlay_close.png');}
    .info .close:hover {cursor: pointer;}
    .info .body {position: relative;overflow: hidden;}
    .info .desc {position: relative;margin: 13px 0 0 90px;height: 75px;}
    .desc .ellipsis {overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
    .desc .jibun {font-size: 11px;color: #888;margin-top: -2px;}
    .info .img {position: absolute;top: 6px;left: 5px;width: 73px;height: 71px;border: 1px solid #ddd;color: #888;overflow: hidden;}
    .info:after {content: '';position: absolute;margin-left: -12px;left: 50%;bottom: 0;width: 22px;height: 12px;background: url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png')}
    .info .link {color: #5085BB;}
</style>
