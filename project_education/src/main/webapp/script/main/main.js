
// 우측 상단 아이콘 색 변경 js

	var isMapImageChanged 	 = false;
	var isLayerImageChanged  = false;
	var isLegendImageChanged = false;
	var isPenImageChanged 	 = false;

// 초기에 모든 info 요소를 닫음
	var infoElements = document.querySelectorAll('.info');
   // 맵 아이콘 변경
   function changeMapImage() {
      var img = document.getElementById('mapImg');
       var originalSrc = 'images/gis/i-map.svg';
       var newSrc = 'images/gis/i-map-on.svg';
       if (!isMapImageChanged) {
           img.src = newSrc;
           isMapImageChanged = true;
       } else {
           img.src = originalSrc;
           isMapImageChanged = false;
       }
   }
   // 레이어 아이콘 변경
   function changeLayerImage() {
      var img = document.getElementById('layerImg');
       var originalSrc = 'images/gis/i-layer.svg';
       var newSrc = 'images/gis/i-layer-on.svg';
       if (!isLayerImageChanged) {
           img.src = newSrc;
           isLayerImageChanged = true;
       } else {
           img.src = originalSrc;
           isLayerImageChanged = false;
       }
   }
   // 범례 아이콘 변경
   function changeLegendImage() {
      var img = document.getElementById('legendImg');
       var originalSrc = 'images/gis/i-legend.svg';
       var newSrc = 'images/gis/i-legend-on.svg';
       if (!isLegendImageChanged) {
           img.src = newSrc;
           isLegendImageChanged = true;
       } else {
           img.src = originalSrc;
           isLegendImageChanged = false;
       }
   }
   // 그리기 아이콘 변경
   function changePenImage() {
      var img = document.getElementById('penImg');
       var originalSrc = 'images/gis/pen.png';
       var newSrc = 'images/gis/pen-on.png';
       if (!isPenImageChanged) {
           img.src = newSrc;
           isPenImageChanged = true;
       } else {
           img.src = originalSrc;
           isPenImageChanged = false;
       }
   }
//--------------------------------------------------------
	
	
	// info 요소를 열고 닫는 함수
	function toggleInfo(element) {
	    var infoElement = element.nextElementSibling;
	
	    // 현재 info 요소의 상태 확인
	    var isInfoOpen = infoElement.style.display === 'block';
	
	    // 모든 info 요소를 닫음
	    infoElements.forEach(function(element) {
	        element.style.display = 'none';
	    });
	
	    // 현재 요소의 info 요소를 열거나 닫음
	    if (!isInfoOpen) {
	        infoElement.style.display = 'block';
	    }
	}
