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
  

// ---------------------------- 기타 레이어 -------------------------------------

// 보호구역 레이어 입력
 var protectedAreaLayer = new ol.layer.Tile({
   source : new ol.source.TileWMS({
      url : 'http://210.113.102.169:8090/geoserver/EDU5/wms?service=WMS', // 1. 레이어 URL
      params : {
         'VERSION' : '1.1.0', // 2. 버전
         'LAYERS' : 'EDU5:Protected_areas_jh', // 3. 작업공간:레이어 명
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
      url : 'http://210.113.102.169:8090/geoserver/EDU5/wms?service=WMS', // 1. 레이어 URL
      params : {
         'VERSION' : '1.1.0', // 2. 버전
         'LAYERS' : 'EDU5:ctp_rvn_jh', // 3. 작업공간:레이어 명
         'BBOX' : [746110.259983499, 1458754.04415633, 1387949.59274307, 2068443.95462902], 
         'SRS' : 'EPSG:5179', // SRID
         'FORMAT' : 'image/png' // 포맷
      },
      serverType : 'geoserver',
   })
});

map.addLayer(protectedAreaLayer);
map.addLayer(sidoEdgeLayer);

// 보호구역 체크박스 클릭 이벤트 처리
var protectedAreaCheckbox = document.getElementById('proteted_area');
protectedAreaCheckbox.addEventListener('change', function() {
    if (!this.checked) {
        map.removeLayer(protectedAreaLayer);
    } else {
        map.addLayer(protectedAreaLayer);
    }
});

// 시도 구분 체크박스 클릭 이벤트 처리
var ctpRvbCheckbox = document.getElementById('ctp_rvb');
ctpRvbCheckbox.addEventListener('change', function() {
    if (!this.checked) {
        map.removeLayer(sidoEdgeLayer);
    } else {
        map.addLayer(sidoEdgeLayer);
    }
});




// 체크박스 요소 선택
var fisheryManagementCheckbox = document.getElementById('fishery_management');
var fisheryObservatoryCheckbox = document.getElementById('fishery_observatory');


// 체크박스 상태 변경 이벤트 리스너 추가
fisheryManagementCheckbox.addEventListener('change', toggleFisheryManagementLayer);
var fisheryManagementLayer;

// 면허어장도 레이어 표출/비표출 함수
function toggleFisheryManagementLayer() {
	if (fisheryManagementCheckbox.checked) {
    // WFS 소스 생성
    var fisheryManagementSource = new ol.source.Vector({
    	format: new ol.format.GeoJSON(),
   		url: 'http://210.113.102.169:8090/geoserver/EDU3/wfs?service=WFS&version=1.1.0&'
			+'request=GetFeature&typeName=EDU3:LF_layer&outputFormat=application/json&srsname=EPSG:4326'
    });
    // 면허어장도 레이어 생성
    fisheryManagementLayer = new ol.layer.Vector({
    	source: fisheryManagementSource
    });
    	map.addLayer(fisheryManagementLayer);
	} else {
    	map.removeLayer(fisheryManagementLayer);
	}
}

fisheryObservatoryCheckbox.addEventListener('change', function() {
  if (fisheryObservatoryCheckbox.checked) {
    // 체크박스가 체크되었을 때 실시간 관측도 레이어를 지도에 추가
   map.addLayer(wfsLayer);
  } else {
    // 체크박스가 체크 해제되었을 때 실시간 관측도 레이어를 지도에서 제거
    map.removeLayer(wfsLayer);
  }
});

// WFS 소스 생성
var wfsSource = new ol.source.Vector({
  format: new ol.format.GeoJSON(),
  url: 'http://210.113.102.169:8090/geoserver/EDU5/wfs?service=WFS&' +
    'version=1.1.0&request=GetFeature&typeName=EDU5:observe_jh&' +
    'outputFormat=application/json&srsname=EPSG:4326'
});

// WFS 레이어 생성
var wfsLayer = new ol.layer.Vector({
  source: wfsSource,
  style: function(feature) {
    // feature에서 속성 값을 가져와 아이콘과 스타일을 다르게 구성
    var agency = feature.get('agency');
    var iconUrl;
    // agency 값에 따라 다른 아이콘 URL 선택
    switch (agency) {
      case '국립수산과학원':
        iconUrl = 'images/icon/nifs.png';
        break;
      case '기상청':
        iconUrl = 'images/icon/kma.png';
        break;
      case '한수원':
        iconUrl = 'images/icon/khnp.png';
        break;
      case '지자체':
        iconUrl = 'images/icon/government.png';
        break;
      case '점검중':
        iconUrl = 'images/icon/inspect.png';
        break;
      default:
        iconUrl = 'images/icon/inspect.png';
    }

    // 아이콘 스타일 생성
    var iconStyle = new ol.style.Style({
      image: new ol.style.Icon({
        src: iconUrl,
        size: [40, 40], // 아이콘 크기
        anchor: [0.5, 0.5], // 아이콘 앵커 위치
        scale: 0.5 // 아이콘 크기 비율
      })
    });

    return iconStyle;
  }
});


//------------------------------------------------------------------------------------
// 실시간 관측소 클릭시 이벤트 생성. 
// 2023-06-01 조경민

// Overlay 요소를 생성하여 feature 정보를 표시할 팝업을 추가
var overlay = new ol.Overlay({
  element: document.getElementById('real_time_inform'),
  positioning: 'bottom-center',
  stopEvent: false,
  offset: [0, -10]
});
map.addOverlay(overlay);

// 클릭 이벤트 핸들러
map.on('pointermove', function(event) {
  var pixel = event.pixel;

  // 폴리곤 그리기 기능이 실행 중인지 확인
  var isDrawing = map.getInteractions().getArray().some(function(interaction) {
    return interaction instanceof ol.interaction.Draw;
  });

  // 팝업 닫기
  overlay.setPosition(undefined);


  if (!isDrawing) {				//폴리곤이 켜지지않는경우
    // 팝업 표시 기능 활성화
    var features = map.getFeaturesAtPixel(pixel);

    if (features && features.length > 0) {
      // 가져온 피처들중 1번 피쳐 정보 가져오기 
      var firstFeature = features[0];
      var properties = firstFeature.getProperties();
	//if(properties['observator'] != null){
		// 팝업에 피처 정보를 표시
      var overlayElement = overlay.getElement();
      var observatory_nm = overlayElement.querySelector('#observatory_nm');
      var observatory_date = overlayElement.querySelector('.date');
      var surface_class = overlayElement.querySelector('#surface_class');
      var middle_class = overlayElement.querySelector('#middle_class');
      var low_class = overlayElement.querySelector('#low_class');
      var temp = overlayElement.querySelector('#temp');
      var salt = overlayElement.querySelector('#salt');
      var oxygen = overlayElement.querySelector('#oxygen');

      // null 체크 함수 
      function nullCheck(checkedElement){
        return checkedElement != null ? checkedElement : '미설치';
      }

      // 팝업창에 정보 입력
      observatory_nm.innerHTML = nullCheck(properties['observator']).replace(/\(.*\)/g, '')+'<span class="date">'+ (properties['obsdtm'] != null ? properties['obsdtm'] : '자료없음' )+'</span>';
      surface_class.innerText = nullCheck(properties['wtrtmp1']);
      middle_class.innerText = nullCheck(properties['wtrtmp2']);
      low_class.innerText = nullCheck(properties['wtrtmp3']);
      temp.innerText = nullCheck(properties['low-class']);
      salt.innerText = nullCheck(properties['cdt1']);
      oxygen.innerText = nullCheck(properties['dox1']);

      // 팝업을 클릭한 피처의 위치에 표시 
      overlay.setPosition(event.coordinate);
		//}
    }
  }
});

     
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
// 폴리곤 관련 

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

      // 겹친 부분의 특정 속성만 가져오기
      var intersectionFeatures = getIntersectionFeatures(feature);

      // 필요한 경우 저장된 위치 정보를 활용할 수 있습니다.
      console.log(polygonCoordinates);
      console.log(intersectionFeatures);
      // 모달 창 열기
      // openCustomModal(polygonCoordinates);
      openCustomModal(intersectionFeatures);
    });

    map.addInteraction(draw);
  }
}

// 겹친 좌표를 통해 면허어장도 레이어의 다른 정보 불러오기
function getIntersectionFeatures(polygonFeature) {
  var intersectionFeatures = [];
  var polygonGeometry = polygonFeature.getGeometry();
  var fisheryFeatures = fisheryManagementLayer.getSource().getFeatures();

  fisheryFeatures.forEach(function (fisheryFeature) {
    var fisheryGeometry = fisheryFeature.getGeometry();
    var fisheryExtent = fisheryGeometry.getExtent();

    if (polygonGeometry.intersectsExtent(fisheryExtent)) {
      var properties = fisheryFeature.getProperties();
      var selectedProperties = {
        license_nu: properties.license_nu,
        fishery_space: properties.fishery_space
      };
      intersectionFeatures.push(selectedProperties);
    }
  });
  return intersectionFeatures;
}

function openCustomModal(features) {
  var customModal = document.getElementById('custom-modal');
  var contentList = document.getElementById('content-list');
  customModal.style.display = "block";
  contentList.innerHTML = '';

  features.forEach(function(feature) {
    var listItem = document.createElement('li');
    var licenseNu = feature.license_nu;
    var fisherySpace = feature.fishery_space;
    listItem.textContent = "어장도명: " + licenseNu + ", 면적: " + fisherySpace;
    contentList.appendChild(listItem);
  });
}

function closeCustomModal() {
  var customModal = document.getElementById('custom-modal');
  customModal.style.display = "none";
}

function removeInteraction() {
  map.removeInteraction(draw);
}

typeSelect.onchange = function () {
  map.removeInteraction(draw);
  addInteraction();
};
      

