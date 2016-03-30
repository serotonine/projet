function dragStart(e){
  var s = window.getComputedStyle(e.target, null);
  e.dataTransfer.setData("text/plain", (parseInt(s.getPropertyValue("left"),10) - e.clientX) + ',' + (parseInt(s.getPropertyValue("top"),10) - e.clientY));

}
function dragOver(e){
  console.log('drag over');
  if(e.stopPropagation) {e.stopPropagation();}
  if(e.preventDefault()){ e.preventDefault() };
  return false;
}
function drop(e){

  if(e.stopPropagation) {e.stopPropagation();}
  if(e.preventDefault()){ e.preventDefault() };

console.log('drop');
  var offset = e.dataTransfer.getData("text/plain").split(',');
var popup = document.getElementById('youtube-popup');
popup.style.left = (e.clientX + parseInt(offset[0],10)) + 'px';
popup.style.top = (e.clientY + parseInt(offset[1],10)) + 'px';

return false;
}
