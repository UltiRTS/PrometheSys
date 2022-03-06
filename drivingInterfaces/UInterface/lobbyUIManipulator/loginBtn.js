/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */


// if (selfState.storage.get('isRemembered')=='true') {
//   document.getElementById('usr').value=storage.get('username');
//   document.getElementById('passwd').value=storage.get('password');
//   document.getElementById('rememberName').className='button-clicked';
// }
//
//
// selfState.loadingCallback=function() {
//   return;
// };

const selfState = global.selfState;

// eslint-disable-next-line require-jsdoc
function loginConnect() {
  // playFX('zoomin.wav');

  document.getElementById('loginbtn').className='loginbtnClicked';
  document.getElementById('underlinePRTS').className='underlinePRTS';
  document.getElementById('prtsOS1').className='prtsOS';
  document.getElementById('prtsOS').className='prtsOS';
  document.getElementById('prtsVer').className='prtsVer';
  document.getElementById('prtsPharma').className='prtsPharma';
  document.getElementById('prtsLOGO').className='prtsLOGO';
  document.getElementById('logininput').className='logininput';
  document.getElementById('loginbox').style.display='';
}

function rememberMe() {
  if (document.getElementById('rememberName').className == '') {
    selfState.storage.set('isRemembered', 'true');
    selfState.storage.set('username', document.getElementById('usr').value);
    selfState.storage.set('password', document.getElementById('passwd').value);
    document.getElementById('rememberName').className='button-clicked';
  } else {
    selfState.storage.set('isRemembered', 'false');
    document.getElementById('rememberName').className='';
  }
}


function registerMe() {
  if (document.getElementById('register').className == '') {
    pushSmolNotif('Register', 'You are now registering instead of logging in.');
    document.getElementById('register').className='button-clicked';
  } else {
    pushSmolNotif('Login', 'You are now logging in instead of registering.');
    document.getElementById('register').className='';
  }
}

function logMeIn() {
  // playFX('zoomin.wav')
  // loading(true)

  document.getElementById('logininput').className='logininputGone';
  document.getElementById('welcomeMsg').style.display='';
  document.getElementById('welcomeHeading').style.display='';
  document.getElementById('welcomeHeading').className='welcomeHeading';

  lobbyServerInterfaceObj.connect();
  // why for ?
  // lobbyLauncherInterfaceObj.ipcCheck();

  setTimeout(function() {
    document.getElementById('welcomeHeading').className='welcomeHeadingOut';
    document.getElementById('welcomeUser').style.display='';
    document.getElementById('welcomeUser').innerHTML='<span style="font-size:3vw;weight:900;opacity:0.4">Dr. &nbsp;</span>'+document.getElementById('usr').value;
    document.getElementById('welcomeUser').className='welcomeUser';

    setTimeout(function() {
      document.getElementById('welcomeSubline1').style.display='';

      setTimeout(function() {
        document.getElementById('welcomeSubline2').style.display='';
        const launcher=lobbyLauncherInterfaceObj.ipcCheck();
        setTimeout(()=> {
          document.getElementById('welcomeSubline3').style.display='';
          if (selfState.promethesys.sys.isLauncherPresent) lobbyLauncherInterfaceObj.ipcGetPath();
        }, 2800);
        setTimeout(function() {
          document.getElementById('welcomeSubline4').style.display='';
          if (selfState.promethesys.sys.isLauncherPresent) lobbyLauncherInterfaceObj.ipcGetIndex();
        }, 3600);
        setTimeout(function() {
          document.getElementById('welcomeSubline5').style.display='';
        }, 4000);
        setTimeout(actuallyLogMeIn, 5000);
      }, 2500);
    }, 2000);
  }, 1000);
}

function actuallyLogMeIn() {
  const username = document.getElementById('usr').value;
  const password = document.getElementById('passwd').value;


  if (document.getElementById('register').className=='button-clicked') {
    lobbyServerInterfaceObj.register(username, password);
  } else {
    lobbyServerInterfaceObj.login(username, password);
  }

  // loading(true)
}

function reverseLogin() {
  document.getElementById('loginbtn').className='loginbtnClicked';
  document.getElementById('underlinePRTS').className='underlinePRTS';
  document.getElementById('prtsOS1').className='prtsOS';
  document.getElementById('prtsOS').className='prtsOS';
  document.getElementById('prtsVer').className='prtsVer';
  document.getElementById('prtsPharma').className='prtsPharma';
  document.getElementById('prtsLOGO').className='prtsLOGO';
  document.getElementById('logininput').className='logininput';
  document.getElementById('loginbox').style.display='';

  document.getElementById('loginInputStatus').setAttribute('onclick', 'playFX(\'acknowledge.wav\');logMeIn();this.onclick=\'\'');
}


function finalBoxEnlargeLeave() {
  document.getElementById('preLogin').style.display = 'none';
  document.getElementById('c').style.display = 'none';
  document.getElementById('postLogin').style.display='';
  document.getElementById('username').innerHTML ='Dr.&nbsp'+selfState.promethesys.sys.username;
  document.getElementById('username').style.display='';
  selfState.isExited=true;
  lobbyServerInterfaceObj.joinChat('global');
  console.log('finalBoxEnlargeLeave fired!');
  pushSmolNotif('Dr. '+selfState.promethesys.sys.username, 'Welcome');
}

