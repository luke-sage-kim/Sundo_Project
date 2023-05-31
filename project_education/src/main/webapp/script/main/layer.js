// 브이월드 레이어 관련 
      
 // 브이월드 지도(base~Satelite)
let Base = new ol.layer.Tile({
	name : "Base",
	source: new ol.source.XYZ({
		url: 'http://api.vworld.kr/req/wmts/1.0.0/1E878C02-B854-3C6F-B2E7-8FFE0E33253C/Base/{z}/{y}/{x}.png'  // WMTS API 사용
	})
});
  
let white = new ol.layer.Tile({
		name : "white",
		source: new ol.source.XYZ({
			url: 'http://api.vworld.kr/req/wmts/1.0.0/1E878C02-B854-3C6F-B2E7-8FFE0E33253C/white/{z}/{y}/{x}.png'  // WMTS API 사용
		})
	});
  
let midnight = new ol.layer.Tile({
	name : "midnight",
	source: new ol.source.XYZ({
		url: 'http://api.vworld.kr/req/wmts/1.0.0/1E878C02-B854-3C6F-B2E7-8FFE0E33253C/midnight/{z}/{y}/{x}.png'  // WMTS API 사용
	})
});

let Hybrid = new ol.layer.Tile({
	name : "Hybrid",
	source: new ol.source.XYZ({
		url: 'http://api.vworld.kr/req/wmts/1.0.0/1E878C02-B854-3C6F-B2E7-8FFE0E33253C/Hybrid/{z}/{y}/{x}.png'  // WMTS API 사용
	})
});

let Satellite = new ol.layer.Tile({
	name : "Satellite",
	source: new ol.source.XYZ({
		url: 'http://api.vworld.kr/req/wmts/1.0.0/1E878C02-B854-3C6F-B2E7-8FFE0E33253C/Satellite/{z}/{y}/{x}.jpeg'  // WMTS API 사용
	})
});
  
	
  //vworld 지도 입력 
  var map = new ol.Map({
    layers: [Hybrid, white, Satellite, Base],
    target: 'gis_map',
    view: new ol.View({
      center: ol.proj.fromLonLat([128.4, 35.7]),
      zoom: 7
    })
  });

let drawLayer = new ol.layer.Vector({
        source: new ol.source.Vector(),
        style: new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgba(255, 255, 255, 0.2)'
            }),
            stroke: new ol.style.Stroke({
                color: '#ffcc33',
                width: 2
            }),
            image: new ol.style.Circle({
                radius: 7,
                fill: new ol.style.Fill({
                    color: '#ffcc33'
                })
            })
        })
    });

    map.addLayer(drawLayer);

    var typeSelect = document.getElementById('type');
    var draw;
    var polygonCoordinates = []; // 위치 정보를 저장할 배열

    function resetMap() {
        map.removeInteraction(draw);
        drawLayer.getSource().clear();
        polygonCoordinates = []; // 저장된 위치 정보 초기화
		addInteraction(); // 폴리곤 그리기 기능 다시 추가
    }

    function addInteraction() {
        var type = typeSelect.value;
        if (type !== 'None') {
            draw = new ol.interaction.Draw({
                source: drawLayer.getSource(),
                type: type
            });

            draw.on('drawend', function (event) {
                var feature = event.feature;
                var geometry = feature.getGeometry();
                var coordinates = geometry.getCoordinates();

                // 다중 폴리곤을 그릴 때는 coordinates 배열이 2차원 배열일 수 있으므로 flatten 처리
                if (type === 'Polygon') {
                    coordinates = coordinates[0];
                }

                // 위치 정보(위도, 경도)를 저장
                polygonCoordinates = coordinates.map(function(coordinate) {
                    return ol.proj.transform(coordinate, 'EPSG:3857', 'EPSG:4326');
                });

				// 꼭지점이 6개 초과인 경우에 알람 띄우기
                if (polygonCoordinates.length > 6) {
                    alert("삼각형, 사각형 또는 오각형 모양으로 그려주세요");
                    setTimeout(resetMap, 0); // 비동기적으로 resetMap() 함수 실행
                }

                // 필요한 경우 저장된 위치 정보를 활용할 수 있습니다.
                console.log(polygonCoordinates);
            });

            map.addInteraction(draw);
        }
    }

    function removeInteraction() {
        map.removeInteraction(draw);
    }

    typeSelect.onchange = function () {
        map.removeInteraction(draw);
        addInteraction();
    };
      
//------------------------------------------------------------------------------------
  
// 레이어 변경 기능

//일반지도 클릭 이벤트 핸들러
document.getElementById('vworld-base').addEventListener('click', function() {
  updateLayerByName('Base');
});

// 회색지도 클릭 이벤트 핸들러
document.getElementById('vworld-gray').addEventListener('click', function() {
  updateLayerByName('white');
});

 // 위성지도 클릭 이벤트 핸들러
document.getElementById('vworld-satbrid').addEventListener('click', function() {
  updateLayerByName('Satellite');
});

// 하이브리드 클릭 이벤트 핸들러
document.getElementById('vworld-sathybrid').addEventListener('click', function() {
  updateLayerByName('Hybrid');
});


// 레이어 업데이트
function updateLayerByName(name) {
  var layers = map.getLayers();
  for (var i = 0, len = layers.getLength(); i < len; i++) {
    var layer = layers.item(i);
    if (layer.get('name') === name) {
      layers.remove(layer);
      layers.insertAt(3, layer);
      break;
    }
  }
}
  

//------------------------------------------------------------------------------------
// 기타 레이어

// 보호구역 레이어 입력
 var protectedAreaLayer = new ol.layer.Tile({
	source : new ol.source.TileWMS({
		url : 'http://210.113.102.169:8090/geoserver/EDU8/wms?service=WMS', // 1. 레이어 URL
		params : {
			'VERSION' : '1.1.0', // 2. 버전
			'LAYERS' : 'EDU8:protected_area_layer', // 3. 작업공간:레이어 명
			'BBOX' : [124.606993139946, 33.104696111763, 131.954758427956, 38.5978898306375], 
			'SRS' : 'EPSG:4326', // SRID
			'FORMAT' : 'image/png' // 포맷
		},
		serverType : 'geoserver',
	})
});
      
// 시도 레이어 입력
 var sidoEdgeLayer = new ol.layer.Tile({
	source : new ol.source.TileWMS({
		url : 'http://210.113.102.169:8090/geoserver/EDU8/wms?service=WMS', // 1. 레이어 URL
		params : {
			'VERSION' : '1.1.0', // 2. 버전
			'LAYERS' : 'EDU8:sido_edge_layer', // 3. 작업공간:레이어 명
			'BBOX' : [746110.259983499, 1458754.04415633, 1387949.59274307, 2068443.95462902], 
			'SRS' : 'EPSG:5179', // SRID
			'FORMAT' : 'image/png' // 포맷
		},
		serverType : 'geoserver',
	})
});
   
// rnd 레이어 입력
/*
var RnDLayer = new ol.layer.Tile({
	source : new ol.source.TileWMS({
		url : 'http://210.113.102.169:8090/geoserver/EDU8/wms?service=WMS', // 1. 레이어 URL
		params : {
			'VERSION' : '1.1.0', // 2. 버전
			'LAYERS' : 'EDU8:rnd_layer', // 3. 작업공간:레이어 명
			'BBOX' : [125.9519444, 33.44944, 126.2525, 34.95333333], 
			'SRS' : 'EPSG:4326', // SRID
			'FORMAT' : 'image/png' // 포맷
		},
		serverType : 'geoserver',
	})
});
*/

// 레이어 입력    
map.addLayer(protectedAreaLayer);
map.addLayer(sidoEdgeLayer);
//map.addLayer(RnDLayer);




  	
//------------------------------------------------------------------------------------
// rnd 레이어 클릭시 정보받기. info라는 id를 가진 div가 있어야 함
// 현재 iframe 이 same origin 정책으로 막혀있음
/* 
 map.on('singleclick', function (evt) {
	    document.getElementById('info').innerHTML = '';
	    
	    var viewResolution = map.getView().getResolution();
	    var url = RnDLayer.getSource().getGetFeatureInfoUrl(
	        evt.coordinate, viewResolution, 'EPSG:4326',
	        { 'INFO_FORMAT': 'text/html' }
	    );
	    
	    if (url) {
	        document.getElementById('info').innerHTML =
	            '<iframe width="100%" seamless="" src="' + url + '"></iframe>';
	    }
});
*/   
  
//------------------------------------------------------------------------------------
// 화면 줌인/ 아웃 버튼

document.getElementById('zoom-out').onclick = function() {
   var view = map.getView();
   var zoom = view.getZoom();
   view.setZoom(zoom - 1);
 };
   
document.getElementById('zoom-in').onclick = function() {
   var view = map.getView();
   var zoom = view.getZoom();
   view.setZoom(zoom + 1);
}

//------------------------------------------------------------------------------------
 /*
// 클러스터 데이터 요청 wfs 사용하지 않는 버전
// 현재 사용하지 않음

$.ajax({
    url: '/project_education/main/cluster-coordinates.do',
    method: 'GET',
    dataType: 'json'
}).done(function(response) {
    var features = new Array(response.length);
    
    for (var i = 0; i < response.length; i++) {
        var coordinate = [response[i].r_lon , response[i].r_lat];
        features[i] = new ol.Feature(new ol.geom.Point(ol.proj.transform(coordinate,'EPSG:4326', 'EPSG:900913')));
    }
    
    var source = new ol.source.Vector({
		features: features
	});
	
	var cluster = new ol.source.Cluster({
		distance: parseInt(distance.value, 10),
		source: source
	});
	
	var styleCache = {};
	var clusterLayer = new ol.layer.Vector({
    source: cluster,
    style: function(feature) {
      var size = feature.get('features').length;
      var style = styleCache[size];
      if (!style) {
        style = new ol.style.Style({
          image: new ol.style.Circle({
            radius: 13,
            stroke: new ol.style.Stroke({
              color: '#fff'
            }),
            fill: new ol.style.Fill({
              color: '#3399CC'
            })
          }),
          text: new ol.style.Text({
            text: size.toString(),
            fill: new ol.style.Fill({
              color: '#fff'
            })
          })
        });
        styleCache[size] = style;
      }
      return style;
    }
  });
  
  map.addLayer(clusterLayer);
    
}).fail(function(error) {
    console.log(JSON.stringify(error.responseText));
});
	
    
*/
