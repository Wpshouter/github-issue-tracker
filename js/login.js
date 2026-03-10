document.addEventListener("DOMContentLoaded", function () {
  //document.getElementById("demo").innerHTML = "HTML is loaded!";
  const loginbtn = document.getElementById('login-btn');
  const usernamefield = document.getElementById('username');
  const passwordfield = document.getElementById('password');
  console.log(loginbtn);
  loginbtn.addEventListener('click', function(e){
    e.preventDefault();
    console.log(usernamefield.value , passwordfield.value);
    if(usernamefield.value != 'admin' || passwordfield.value != 'admin123'){
        console.log('login failed');
        document.querySelector('div#failed').classList.remove('hidden');
    }
    else{
        //console.log('logih success');
         window.location.href = "main.html";
    }
  });
});