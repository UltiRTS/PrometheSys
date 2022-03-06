/* eslint-disable guard-for-in */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function toggleMapSelector() {
  const mapSelector = document.getElementById('mapSelector');
  mapSelector.style.visibility = mapSelector.style.visibility == 'visible' ? 'hidden' : 'visible';
  const isMapNowVisible = mapSelector.style.visibility == 'visible';
  let time=500;
  toggleControlPanel(isMapNowVisible);
  if (isMapNowVisible) {
    const mapSelectorContent = document.getElementById('mapCountour');
    mapSelectorContent.innerHTML='';
    for (const mapName in selfState.promethesys.sys.mapDic) {
      setTimeout(()=>{
        if (selfState.promethesys.sys.mapDic[mapName].haveMap===true) {
          const singleMapHtmlString = `
            <div style="position:relative;height: 61px;width: 49px;border-color: #2196f3;border-width: 5px;background:red;border-style: solid;display: inline-block;margin: 7px;"><img src="file://`+selfState.promethesys.sys.appPath+ `/ultiConfig/maps/`+mapName+`.png" style="height:100%;width:100%;position:absolute;" onclick='mapPickerPick(`+mapName+`')> </div>
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

// eslint-disable-next-line no-unused-vars
function vagueMap(mapName) {
  const nameList=[];
  for (mapName in selfState.promethesys.sys.mapDic) {
    nameList.push(mapName);
  }
  return closestFinder(mapName, nameList);
}

function mapPickerManualPick() {
  const userInput=document.getElementById('grabberValue').value;
  const formalName = vagueMap(userInput);
  const mapID=selfState.promethesys.sys.mapDic[formalName].id;
  lobbyServerInterfaceObj.setMap(selfState.promethesys.sys.currentGame, mapID);
}

function mapPickerPick(userInput) {
  const formalName = vagueMap(userInput);
  const mapID=selfState.promethesys.sys.mapDic[formalName].id;
  lobbyServerInterfaceObj.setMap(selfState.promethesys.sys.currentGame, mapID);
}
