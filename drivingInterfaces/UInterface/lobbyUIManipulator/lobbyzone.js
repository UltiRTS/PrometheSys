/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
// eslint-disable-next-line require-jsdoc
function lobbyzoneAppendBtl(battleid, map, title, founder) {
  const subEntry = document.createElement('li');
  subEntry.classList.add('flyin');
  subEntry.style.width='14vw';
  subEntry.id='battleEntry'+battleid;
  subEntry.innerHTML = `
  <p id="'+battleid+'"onclick="if (selfState.promethesys.sys.currentGame==''){lobbyServerInterfaceObj.joinBattle(&#39;`+title+`&#39;);}else{preBtlExitGem(selfState.promethesys.sys.currentGame);}"class="gameInnerSubEntryTXT" style="font-size:0.7vw; overflow:hidden; font-family: JuneBug2; position: relative; cursor:pointer;background : #2196f3;  margin: 20px ; padding: 25px; mix-blend-mode: screen; font-weight: bold;" type="button" >`+
  	founder.replace(/Autohost/g, 'missionNo') +
	`</br>
  	<span id="'+battleid+'Map">someText</span>
	<p id="title'+battleid+'" style="font-size: 1.5vw; color: #255784; position:absolute; top: 65px ;background-color: rgba(255,255,255,0.85); padding:2px; box-shadow: 0 0 10px #2196f3, 0 0 40px #2196f3, 0 0 80px #2196f3; mix-blend-mode: screen;">`+title+`
	</p>
</p>`;
  document.getElementById('gameEntry').appendChild(subEntry);
}
