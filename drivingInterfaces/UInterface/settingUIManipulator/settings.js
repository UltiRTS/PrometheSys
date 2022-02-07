selfState.dbug=false;

function volumeEntry(){
	_entryHighlight('volMenuEntry')
	if (document.getElementById("Volpanel").style.display=="none"){
		document.getElementById("Volpanel").style.display=''
		document.getElementById("FIpanel").style.display="none"
		document.getElementById("MapPanel").style.display="none"
		document.getElementById("Volpanel").innerHTML+="<!--rerun-->"
		document.getElementById("volAmbSlider").value=selfState.userVolume
		//console.log("bar val"+document.getElementById("volAmbSlider").value)
		document.getElementById("volFXSlider").value=selfState.userFXVolume
		document.getElementById("volNotifSlider").value=selfState.userNotifVolume
		document.getElementById("PerformanceSettingsPanel").style.display="none"
		
	}
	else{
		document.getElementById("Volpanel").style.display="none"
	}
}

function FIEntry(){
	_entryHighlight('volFIEntry')
	if (document.getElementById("FIpanel").style.display=="none"){
		document.getElementById("FIpanel").style.display=''
		document.getElementById("Volpanel").style.display="none"
		document.getElementById("FIpanel").innerHTML+="<!--rerun-->"
		document.getElementById("MapPanel").style.display="none"
		document.getElementById("PerformanceSettingsPanel").style.display="none"
	}
	else{
		document.getElementById("FIpanel").style.display="none"
	}
}

function performanceEntry(){
	_entryHighlight('performanceEntry')
	if (document.getElementById("PerformanceSettingsPanel").style.display="none"){
		document.getElementById("PerformanceSettingsPanel").style.display=''
		document.getElementById("Volpanel").style.display="none"
		document.getElementById("FIpanel").style.display="none"
		document.getElementById("PerformanceSettingsPanel").innerHTML+="<!--rerun-->"
		document.getElementById("MapPanel").style.display="none"
		listPerformanceSettings()
	}
	else{
		document.getElementById("PerformanceSettingsPanel").style.display="none"
	}
}


function settingsMapEntry(){
	_entryHighlight('mapEntry')
	if (document.getElementById("MapPanel").style.display=="none"){
		document.getElementById("MapPanel").style.display=''
		document.getElementById("Volpanel").style.display="none"
		document.getElementById("MapPanel").innerHTML+="<!--rerun-->"
		document.getElementById("FIpanel").style.display="none"
		document.getElementById("PerformanceSettingsPanel").style.display="none"
	}
	else{
		document.getElementById("MapPanel").style.display="none"
	}
}



function setVolume(vol){
	
	selfState.userVolume=vol
	selfState.contextGain.gain.setValueAtTime(selfState.userVolume/100, selfState.audioCtx.currentTime);
	//selfState.audio.volume=vol/100
	document.getElementById("volSettingDigit").innerHTML=vol+"%"
}

function settingRMMapDict(){
	storage.set('mapCache',{})
	selfState.allMinimapCache=storage.get('mapCache')
	notice(runNotice=true,'Cache Deleted','Altered maps will be treated as missing! ')
}

function setFXVolume(vol){
	
	selfState.userFXVolume=vol
	//selfState.FXaudio.volume=vol/100
	// set volume
	//selfState.contextGain.gain.setValueAtTime(vol/100, selfState.audioCtx.currentTime);
	document.getElementById("volSettingDigit").innerHTML=vol+"%"
	
}

function setNotifVolume(vol){
	selfState.userNotifVolume=vol
	selfState.FXaudio.volume=vol/100
	document.getElementById("volSettingDigit").innerHTML=vol+"%"
	
}

function VolumeDone(){
	playFX('acknowledge.wav')
	storage.set('userVolume', selfState.userVolume)
	storage.set('userFXVolume', selfState.userFXVolume)
	storage.set('userNotifVolume', selfState.userNotifVolume)
	document.getElementById("Volpanel").style.display="none"
}

function fiDone(){
	playFX('acknowledge.wav')
	//storage.set('userVolume', selfState.userVolume)
	document.getElementById("FIpanel").style.display="none"
}

function mapDone(){
	playFX('acknowledge.wav')
	//storage.set('userVolume', selfState.userVolume)
	document.getElementById("MapPanel").style.display="none"
}

function fiCheckStart(){
	_fiDonut()
	document.getElementById("fiTerm").innerHTML+="Checking launcher presence:<br>"
	document.getElementById("fiTerm").innerHTML+=process.env.WDIR+"<br>"
	maxIntegrity=4
	detectedIntegrity=0
	localverPath = process.env.WDIR+'/info.db'
	document.getElementById("fiTerm").innerHTML+="Checking localVer:<br>"
	fs.access(localverPath, fs.F_OK, (err) => {
		if (err) {
			document.getElementById("fiTerm").innerHTML+=err+"<br>"
			document.getElementById("fiTerm").innerHTML+="localVer not present!</br>"
			
		}
		else{
		document.getElementById("fiTerm").innerHTML+="localVer present!</br>"
		detectedIntegrity+=1;}
		
		localverPath = process.env.WDIR+'/engine'
		document.getElementById("fiTerm").innerHTML+="Checking engine:<br>"
		fs.access(localverPath, fs.F_OK, (err) => {
			if (err) {
				document.getElementById("fiTerm").innerHTML+=err+"<br>"
				document.getElementById("fiTerm").innerHTML+="engine not present!</br>"
				
			}
			else{
			document.getElementById("fiTerm").innerHTML+="engine present!</br>"
			detectedIntegrity+=1;}
			
			localverPath = process.env.WDIR+'/engine/games/'
			document.getElementById("fiTerm").innerHTML+="Checking content dir:<br>"
			fs.access(localverPath, fs.F_OK, (err) => {
				if (err) {
					document.getElementById("fiTerm").innerHTML+=err+"<br>"
					document.getElementById("fiTerm").innerHTML+="content dir not present!</br>"
					
				}
				else{
				document.getElementById("fiTerm").innerHTML+="content dir present!</br>"
				detectedIntegrity+=1;}
				
				localverPath = process.env.WDIR+'/ultiConfig'
				document.getElementById("fiTerm").innerHTML+="Checking writable dirs:<br>"
				fs.access(localverPath, fs.F_OK, (err) => {
					if (err) {
						document.getElementById("fiTerm").innerHTML+=err+"<br>"
						document.getElementById("fiTerm").innerHTML+="writable dirs not present!</br>"
						
					}
					else{
					document.getElementById("fiTerm").innerHTML+="writable dirs present!</br>"
					detectedIntegrity+=1;
					console.log('deIn:'+detectedIntegrity)}
					
					finalIntegrity=detectedIntegrity/maxIntegrity*100
					document.getElementById("fiSettingDigit").innerHTML=finalIntegrity+"%"
					fiChartCanvas.data.datasets[0].data[1] = finalIntegrity;
					fiChartCanvas.data.datasets[0].data[0] = 100-finalIntegrity;
					fiChartCanvas.update();
					detectedIntegrity=0;
				})
			})
		})
	})
}

function listPerformanceSettingsAdv(){
	content=''
	for (settingItem in selfState.springSettings){
		content+='<span>'+settingItem+'&nbsp&nbsp&nbsp</span><span>'+selfState.springSettings[settingItem]['isEnabled']+'&nbsp&nbsp</span><span>'+selfState.springSettings[settingItem]['defaultValue']+'</span><br>'
	}
	document.getElementById('performanceSettingsContent').innerHTML=content
}

function listPerformanceSettings(){
	content=''
	for (settingItem in selfState.springSettings){
		
		if(selfState.springSettings[settingItem]['isCommon']=='1') content+='<span>'+settingItem+'&nbsp&nbsp&nbsp</span><span>'+selfState.springSettings[settingItem]['isEnabled']+'&nbsp&nbsp</span><span>'+selfState.springSettings[settingItem]['defaultValue']+'</span><br>'
	}
	document.getElementById('performanceSettingsContent').innerHTML=content
}

function _entryHighlight(entry){
	var c = document.getElementById(entry).parentElement.children;
	var i;
	for (i = 0; i < c.length; i++) {
		c[i].className="settingSubContent"
		
	} 
	document.getElementById(entry).className="settingSubContentSel"
}

function _fiDonut(){

	document.getElementById("fiChart").innerHTML ="<div class=\"chart-container\" style=\"position: relative; width:70%;left:27%;\"><canvas id=\"fiChartCanvas\"></canvas></div>"
		
	var ctx = document.getElementById("fiChartCanvas");
	selfState.fiChartCanvas = new Chart(ctx, {
			type: 'doughnut',
			data: {
				labels: ['Corrupt','Intact'],
				datasets: [{
					label: 'System Status',
					data: [1,9],
					backgroundColor: [
					'rgba(255, 255, 255, 0.2)',
					'rgba(255, 255, 255, 1)',
					],
					borderColor: [
					'rgba(255, 255, 255, 0.2)',
					'rgba(255, 255, 255, 1)',
								   
					],
					borderWidth: 1
				}]
			},
			options: {
				legend: {
					onClick: (e, i) => {
						
						
					},
					display: true,
					labels: {
						fontColor: 'rgba(255, 255, 255,1)',
								   fontSize: 12,
					}
				},
				
				
				
				scales: {
					yAxes: [{
						ticks: {
							beginAtZero: true
						}
					}]
				}
			}
		});
		
	
	
}

function engineSettings(){
	
}
