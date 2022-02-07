
function showGem(Name){
	selfState.addGem(Name)
	document.getElementById('gem'+Name).style.display=''
}

function killGem(Name){ //when the final gem destination is reached by the user, the destination use this to kill its gem and any gem that's laid on the upper path. since multiple different destinations might share the same path, we do not wish to kill their gems. Thus a counter is established and when the upper path's gem count reaches zero, the upper path's gem is killed.
	selfState.removeGem(Name)
	if(selfState.activeGems[Name]<=0){document.getElementById('gem'+Name).style.display = "none";}
}

function killAllGem(Name){ //used by a destination to kill all of its gems if they have multiple gems registered. useful for chat and ??nothing else??
	selfState.removeAllGems(Name)
	if(selfState.activeGems[Name]<=0){document.getElementById('gem'+Name).style.display = "none";}
}