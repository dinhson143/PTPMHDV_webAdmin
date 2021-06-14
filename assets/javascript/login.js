
const CustomerAPI = 'http://localhost:3000/api/khachhang';


async function getCustomer(url) {

    // Storing response
    const response = await fetch(url);
    // Storing data in form of JSON
    var cus_Array = await response.json();
    console.log(cus_Array);

    let user = document.querySelector("#username");
    let pass = document.querySelector("#password");
    let btnLogin = document.querySelector(".btnLogin");
    let btnDK = document.querySelector(".btnDangki");

    let inputUser = document.querySelector(".inputUser");
    let inputPass = document.querySelector(".inputPass");
    let mesUser = document.querySelector(".messageUser");
    let mesPass = document.querySelector(".messagePass");


    user.onblur = function () {
        if (user.value == "") {
            inputUser.classList.add("invalid");
            mesUser.innerHTML = "Vui lòng nhập User";
            return false;
        }
        var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        console.log(regex.test(user.value));
        if (regex.test(user.value) == false) {
            inputUser.classList.remove("invalid");
            mesUser.innerHTML = "Trường này phải là Email";
            return false;
        }
    }
    pass.onblur = function () {
        if (pass.value == "") {
            inputPass.classList.remove("invalid");
            mesPass.innerHTML = "Vui lòng nhập Password";
            return false;
        }
    }


    user.oninput = function () {
        inputUser.classList.remove("invalid");
        mesUser.innerHTML = "";
    }
    pass.oninput = function () {
        inputPass.classList.remove("invalid");
        mesPass.innerHTML = "";
    }

    btnLogin.onclick = function () {
        let dem = 0;
        cus_Array.map(function (customer) {
            if (customer.Email == user.value && customer.Password == pass.value) {
                if (customer.Role == "Admin") {
                    dem = 1;
                }
                else {
                    dem = 2;
                }
            }
        })
        console.log(dem);
        if (dem == 1) {
            alert("ĐĂNG NHẬP THÀNH CÔNG")
            return true;
        }
        else if (dem == 2) {
            alert("ĐĂNG NHẬP THÀNH CÔNG")
            document.querySelector(".form-horizontal").setAttribute('action', './dangki.html');
            return true;
        }
        else {
            inputPass.classList.remove("invalid");
            mesPass.innerHTML = "Vui lòng kiểm tra lại Password";
            inputUser.classList.add("invalid");
            mesUser.innerHTML = "Vui lòng kiểm tra lai User";
            return false;
        }
    }

}

function start() {
    getCustomer(CustomerAPI);
}
start();
