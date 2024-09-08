const body = document.body;

const btnDarkMode = document.getElementById("dark_mode")

btnDarkMode.addEventListener("click",(e)=>{
    if(btnDarkMode.innerText =="dark") {
        btnDarkMode.innerText = "clear";
        body.classList.add("dark");
        localStorage.setItem("mode", "dark");
    } else{
        btnDarkMode.innerText ="dark";
        body.classList.remove("dark");
        localStorage.setItem("mode","clear");

    }
})

const mode = localStorage.getItem("mode")

if(mode == "dark"){
    btnDarkMode.innerText = "clear";
    body.classList.add("dark");
}else{
    btnDarkMode.innerText="dark";
    body.classList.remove("dark");
}