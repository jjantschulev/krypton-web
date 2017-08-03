var key = Cookies.get("krypton_key");
if(key == undefined){
  key = 1;
}else{
  document.getElementById('lockCover').style.display = "block";
}
document.getElementById('key').value = key;

function encrypt() {
  var r = new Random(key);
  var string = document.getElementById('in').value;
  var ints = []
  var solution = "";
  for (var i = 0; i < string.length; i++) {
    ints.push(string.charCodeAt(i));
    for (var j = 0; j < string.length; j++) {
      ints[i]+=r.randomInt(6)-3;
    }
    solution += String.fromCharCode(ints[i]);
  }
  document.getElementById('out').value = solution;
}

function decrypt() {
  var r = new Random(key);
  var string = document.getElementById('in').value;
  var ints = []
  var solution = "";
  for (var i = 0; i < string.length; i++) {
    ints.push(string.charCodeAt(i));
    for (var j = 0; j < string.length; j++) {
      ints[i]-=r.randomInt(6)-3;
    }
    solution += String.fromCharCode(ints[i]);
  }
  document.getElementById('out').value = solution;
}

function Random(k) {
  this.seed = k;

  this.randomInt = function (range) {
    return Math.round(this.random()*range)
  }

  this.randomFloat = function (range) {
    return this.random()*range;
  }

  this.random = function () {
    var x = Math.sin(this.seed++) * 12439;
    return x - Math.floor(x);
  }
}

function copy() {
  var copyTextarea = document.getElementById('out');
  copyTextarea.select();
  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Copying text command was ' + msg);
  } catch (err) {
    console.log('Oops, unable to copy');
  }
  copyTextarea.value = "";
}

function clearField() {
  document.getElementById('out').value = "";
  document.getElementById('in').value = "";
}

function updateKey() {
  var newKey = document.getElementById('key').value;
  if(isNaN(newKey)){
    alert("only numbers allowed")
  }else{
    key = newKey;
    Cookies.set("krypton_key", key, {expires: 356});
  }
}

function lock() {
  document.getElementById('lockCover').style.display = "block";
}

document.getElementById('in').onfocus = function () {
  this.parentNode.style.borderStyle = 'solid';
}

function unlock() {
  var unlockPassword = document.getElementById('unlockPassword');
  if(unlockPassword.value == key){
    document.getElementById('lockCover').style.display = "none";
  }else{
    lockSVG.style.animationName = 'passwordIncorrect';
    setTimeout(function () {
      lockSVG.style.animationName = '';
    }, 600)
  }
  unlockPassword.value = ""
}

var lockSVG = document.getElementById('lockSVG');
lockSVG.addEventListener('animationEnd', function(){
    this.style.animationName = '';
}, false);
