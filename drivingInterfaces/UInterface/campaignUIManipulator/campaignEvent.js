function campaignChChapter()
{
	document.getElementById('campaignTargets').className="campaignTargetsGone"
	rstAnime('subDesktop1')
	rstAnime('subTargets1')
	document.getElementById('subDesktop1').style.display=''
	document.getElementById('subTargets1').style.display=''
	
}

function campaignChStage(){
	document.getElementById('detailBox').style.display=''
	rstAnime('detailBox')
}

function campaignUnchStage(){
	document.getElementById('detailBox').style.display="none"

}

function campaignLoad(){
	rstAnime('campaignDesktop')
	rstAnime('campaignTargets')
}

function campaignUnload(){
	document.getElementById('detailBox').style.display="none"
	document.getElementById('campaignTargets').className="campaignTargets"
	
	document.getElementById('subDesktop1').style.display = "none";
	document.getElementById('subTargets1').style.display = "none";
	
}