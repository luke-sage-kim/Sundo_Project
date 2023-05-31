//------------------------------------------------------------------------------------
// 클러스터 기능

// RnDLayer에서 데이터를 가져올 WFS 소스 생성


var vectorSource = new ol.source.Vector({
  format: new ol.format.GeoJSON(),
  url: function(extent) {
    return 'http://210.113.102.169:8090/geoserver/EDU8/wfs?service=WFS&' +
      'version=1.1.0&request=GetFeature&typeName=EDU8:rnd_layer&' +
      'outputFormat=application/json&srsname=EPSG:4326&' +
      'bbox=' + extent.join(',') + ',EPSG:3857&'+
      'viewparams=0';
  },
  strategy: ol.loadingstrategy.bbox
});

console.log('클러스터 시작');
      
// 클러스터 사이 간격 조절    
var distance = document.getElementById('distance');

// 클러스터링 옵션 설정
var clusterDistance = distance.value; // 클러스터링 거리 설정
console.log(clusterDistance);

// 클러스터링 레이어 스타일 설정
var clusterStyle = new ol.style.Style({
  image: new ol.style.Circle({
    radius: 10,
    fill: new ol.style.Fill({ color: 'rgba(0, 0, 255, 0.5)' }),
    stroke: new ol.style.Stroke({ color: 'blue', width: 1 })
  }),
  text: new ol.style.Text({
    text: '',
    fill: new ol.style.Fill({ color: '#fff' })
  })
});

// 클러스터 소스 생성
var cluster = new ol.source.Cluster({
  distance: clusterDistance,
  source: vectorSource
});

// 클러스터 레이어 생성
var clusterLayer = new ol.layer.Vector({
  source: cluster,
  style: function(feature) {
    var size = feature.get('features').length;
    clusterStyle.getText().setText(size.toString());
    return clusterStyle;
  }
});

// 지도에 클러스터 레이어 추가
map.addLayer(clusterLayer);

//------------------------------------------------------------------------------------
// RnD 레이어 파라미터 변경 함수 입력 
var elements = document.getElementsByClassName('checkLayer');
for (var i = 0; i < elements.length; i++) {
  elements[i].addEventListener('click', function() {
    clusterLayerUpdate();
  });
}



// RnD 레이어 파라미터 변경
function clusterLayerUpdate(){
	var checkLayerList = document.getElementsByClassName('checkLayer');
	var clusterLayerParameter = new Array();
	for (var i = 0; i < checkLayerList.length; i++) {
  		if(checkLayerList[i].checked){
			  var checkedId = checkLayerList[i].id;
			  var convertingId = checkedId.substring(10);
			  console.log(convertingId);
			clusterLayerParameter.push(convertingId);		  
		}
	}
	
	var viewparams ='selection_id:' + clusterLayerParameter.join("\\,");
	
	console.log(viewparams);
	
	
	var newVectorSource = new ol.source.Vector({
  		format: new ol.format.GeoJSON(),
  		url: function(extent) {
    			return 'http://210.113.102.169:8090/geoserver/EDU8/wfs?service=WFS&' +
     			'version=1.1.0&request=GetFeature&typeName=EDU8:rnd_layer&' +
      			'outputFormat=application/json&srsname=EPSG:4326&' +
      			'bbox=' + extent.join(',') + ',EPSG:3857&' +
      			'viewparams='+encodeURIComponent(viewparams);
 		 },
  		strategy: ol.loadingstrategy.bbox
	});
	
	var newCluster = new ol.source.Cluster({
		  distance: clusterDistance,
		  source: newVectorSource
	});
	
	console.log(clusterDistance);
	console.log(clusterLayer);
	
	clusterLayer.getSource().getSource().clear();
	clusterLayer.setSource(newCluster);
	
	
}



//------------------------------------------------------------------------------------
// 클러스터 간격 조절 기능 
distance.addEventListener('input', function() {
	cluster.setDistance(parseInt(distance.value, 10));
});




