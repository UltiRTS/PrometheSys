
function onDrag(e) {
  let originalStyles = window.getComputedStyle(document.getElementById('toolTipWindow'));
  document.getElementById('toolTipWindow').style.left = parseInt(originalStyles.left) + e.movementX + 'px';
  document.getElementById('toolTipWindow').style.top = parseInt(originalStyles.top) + e.movementY + 'px';
}

function onLetGo() {
  document.removeEventListener('mousemove', onDrag);
  document.removeEventListener('mouseup', onLetGo);
}

function onGrab() {
  document.addEventListener('mousemove', onDrag);
  document.addEventListener('mouseup', onLetGo);
}

function pushToolTip(text) {
  var text = text.replace(/\[/g, "<span style='background:white;color:black;'>&nbsp");
  var text = text.replace(/]/g, "&nbsp</span>");
  var toolTipheader = '<div style="display: inline-block;color:white;transform: skew(-0.312rad);margin:5px;width:10px;height:10px;background:white;margin-bottom:0px;"></div>'
  var helperText = '<p class="helperTxts" style="display: inline-block;color:white;transform: skew(-0.312rad);margin: 2px;font-size: 15px;width:560px;margin-bottom:3px;">' + text + '</p></br>'
  var newTxtToAppend = toolTipheader + helperText

  for (var nodes of document.getElementsByClassName('helperTxts')) {
    newTxtToAppend = newTxtToAppend + '<p class="helperTxts" style="display: inline-block;color:white;transform: skew(-0.312rad);margin: 2px;font-size: 15px;width:560px;margin-bottom:3px;">' + nodes.innerHTML + '</p></br>'
  }

  document.getElementById('actualHelp').innerHTML = newTxtToAppend
}

function minimizeToolTip() {
  if (document.getElementById('actualHelp').style.display == '') { 
    document.getElementById('actualHelp').style.display = "none"; 
    document.getElementById('actualHelpBG').style.display = "none";
    document.getElementById('toolTipWindow').style.height = '20px' 
    document.getElementById('dispersingHelperDot').style.display = "none";
    document.getElementById('toolTipWindow').className='toolTipWindow'
  }
  else { 
    document.getElementById('actualHelp').style.display = ''; 
    document.getElementById('actualHelpBG').style.display = "";
    document.getElementById('dispersingHelperDot').style.display = "";
    document.getElementById('toolTipWindow').className='toolTipWindowExp' }
}

pushToolTip('This is the [toolTip window], it could be [drag and moved] like a regular system window. This may display valuable [help texts] when you are [hovering over icons]. You can [turn this off] in [settings]')