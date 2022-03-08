/* eslint-disable guard-for-in */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function toggleMapSelector() {
  const mapSelector = document.getElementById('mapSelector');
  if (mapSelector.style.visibility == 'visible') {
    mapSelector.style.visibility = 'hidden';
    isMapNowVisible = false;
    console.log('setting selector to hidden');
  } else {
    mapSelector.style.visibility = 'visible';
    isMapNowVisible = true;
    console.log('setting selector to visible');
  }


  let time=500;
  toggleControlPanel(isMapNowVisible);
  if (isMapNowVisible) {
    const mapSelectorContent = document.getElementById('mapCountour');
    mapSelectorContent.innerHTML='';
    for (const mapName in selfState.promethesys.sys.mapDic) {
      setTimeout(()=>{
        if (selfState.promethesys.sys.mapDic[mapName].haveMap===true) {
          const singleMapHtmlString = `
            <div style="position:relative;height: 61px;width: 49px;border-color: #2196f3;border-width: 5px;background:red;border-style: solid;display: inline-block;margin: 7px;"><img src="file://`+selfState.promethesys.sys.appPath+ `/ultiConfig/maps/`+mapName+`.png" style="height:100%;width:100%;position:absolute;" onclick='mapPickerPick('`+mapName+`')> </div>
            `;

          const div = document.createElement('div');
          div.innerHTML = singleMapHtmlString.trim();
          mapSelectorContent.appendChild(div.firstChild);
          time+=500;
        }
      }, time);
    }
  }
}

function toggleControlPanel(onorOff) {
  const ctlPanel = document.getElementById('controlPanel');
  if (onorOff) {
    ctlPanel.style.visibility = 'visible';
  } else {
    ctlPanel.style.visibility = 'hidden';
  }
}

function minimizeAll(){
  const mapSelector = document.getElementById('mapSelector');
  mapSelector.style.visibility = 'hidden';
  const ctlPanel = document.getElementById('controlPanel');
  ctlPanel.style.visibility = 'hidden';
}

// eslint-disable-next-line no-unused-vars

function vagueMap(mapName) {
  const nameList=[];
  for (const singleMap in selfState.promethesys.sys.mapDic) {
    nameList.push(singleMap);
  }
  // console.log(mapName);
  // console.log(nameList);
  return closestFinder(mapName, nameList);
}

function mapPickerManualPick() {
  const userInput=document.getElementById('grabberValue').value;
  // console.log('mapGrabber:'+userInput)
  const formalName = vagueMap(userInput);
  const mapID=selfState.promethesys.sys.mapDic[formalName].id;
  lobbyServerInterfaceObj.setMap(selfState.promethesys.sys.currentGame, mapID);
}

function mapPickerPick(userInput) {
  const formalName = vagueMap(userInput);
  const mapID=selfState.promethesys.sys.mapDic[formalName].id;
  lobbyServerInterfaceObj.setMap(selfState.promethesys.sys.currentGame, mapID);
}

