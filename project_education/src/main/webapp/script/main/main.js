
var isImageChanged = false;

   // 맵 아이콘 변경
   function changeMapImage() {
      var img = document.getElementById('mapImg');
       var originalSrc = 'images/gis/i-map.svg';
       var newSrc = 'images/gis/i-map-on.svg';
       if (!isImageChanged) {
           img.src = newSrc;
           isImageChanged = true;
       } else {
           img.src = originalSrc;
           isImageChanged = false;
       }
   }
   // 레이어 아이콘 변경
   function changeLayerImage() {
      var img = document.getElementById('layerImg');
       var originalSrc = 'images/gis/i-layer.svg';
       var newSrc = 'images/gis/i-layer-on.svg';
       if (!isImageChanged) {
           img.src = newSrc;
           isImageChanged = true;
       } else {
           img.src = originalSrc;
           isImageChanged = false;
       }
   }
   // 범례 아이콘 변경
   function changeLegendImage() {
      var img = document.getElementById('legendImg');
       var originalSrc = 'images/gis/i-legend.svg';
       var newSrc = 'images/gis/i-legend-on.svg';
       if (!isImageChanged) {
           img.src = newSrc;
           isImageChanged = true;
       } else {
           img.src = originalSrc;
           isImageChanged = false;
       }
   }
   // 그리기 아이콘 변경
   function changePenImage() {
      var img = document.getElementById('penImg');
       var originalSrc = 'images/gis/pen.png';
       var newSrc = 'images/gis/pen-on.png';
       if (!isImageChanged) {
           img.src = newSrc;
           isImageChanged = true;
       } else {
           img.src = originalSrc;
           isImageChanged = false;
       }
   }
   


