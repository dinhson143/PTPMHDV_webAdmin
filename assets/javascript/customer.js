
var customersArray = [];
function start2() {
    getCustomer(renderCustomer);
}
function displayCus() {
    document.querySelector("#search").style.display = "flex";
    document.querySelector(".btnSearchCate").style.display = "none";
    document.querySelector(".btnSearchBooks").style.display = "none";
    document.querySelector(".btnSearchOrder").style.display = "none";
    document.querySelector(".btnSearchCus").style.display = "block";

    let form = document.querySelector('.content__table');
    form.setAttribute('style', 'display:inline-table');
    let list = document.querySelector('.content__tableDetail')
    list.setAttribute('style', 'display:none');
    let back = document.querySelector(".btn--BackOrder");
    back.setAttribute('style', 'display:none');
}
var btnCus = document.querySelector(".nav__item--cus")
btnCus.onclick = function (e) {
    e.preventDefault();
    start2();
    let contenttitle = document.querySelector(".content__title");
    contenttitle.innerHTML = "DANH SÁCH KHÁCH HÀNG";
    document.querySelector(".btn--add").style.display = "block";
    document.querySelector(".btn--add").classList.add("btnThemCus")
    var add = document.querySelector(".btnThemCus");
    displayCus();
    add.onclick = function () {
        handlerAddCus();
    }
}

var search3 = document.querySelector(".btnSearchCus");
search3.onkeyup = function (e) {
    e.preventDefault();
    handlerSearchCus();
    let contenttitle = document.querySelector(".content__title");
    contenttitle.innerHTML = "DANH SÁCH KHÁCH HÀNG";
    document.querySelector(".btn--add").style.display = "block";
    document.querySelector(".btn--add").classList.add("btnThemCus")
    var add = document.querySelector(".btnThemCus");
    add.onclick = function () {
        handlerAddCus();
    }
    if (search3.value === "") {
        getCustomer(renderCustomer);
    }
}



function handlerSearchCus() {
    let value = search3.value;
    let data =
    {
        value
    }
    let url = "";
    if(value === ""){
        url = CustomerAPI;
    }
    else{
        url = SearchKH_API + "/" + value;
    }
    SearchCus(data, url, () => {
        getCusSearch(url, renderCustomer);
    })
}
function getCusSearch(url, callback) {
    fetch(url)
        .then(response =>
            response.json()
        )
        .then(callback)
        .catch(reject => {
            console.log(reject);
        });
}
function SearchCus(data, url, callback) {
    var options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch(url)
        .then(response =>
            response.json()
        )
        .then(callback)
        .catch(reject => {
            console.log(reject);
        });
}


function getCustomer(callback) {
    fetch(CustomerAPI)
        .then(response =>
            response.json()
        )
        .then(callback)
        .catch(reject => {
            console.log(reject);
        });
}


function renderCustomer(customers) {
    let list = document.querySelector('.content__table')
    var html = `<tr>
                    <th>CustomerID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th></th>
                </tr>`;
    var htmls = customers.map(function (customer) {
        return `<tr class='CustomerID-${customer.CustomerID}'>
                    <td>${customer.CustomerID}</td>
                    <td class="CusName">${customer.Name}</td>
                    <td class="CusEmail">${customer.Email}</td>
                    <td class="CusAdd">${customer.Address}</td>
                    <td>
                        <div class="btn__group">
                            <div class="btn btn--editCus" onclick= "handlerEditCus(${customer.CustomerID})">
                                <p>Edit</p>
                            </div>
                            <div class="btn btn--delete" onclick="deleteCus(${customer.CustomerID})">
                                <p>Delete</p>
                            </div>
                        </div>
                    </td>
                </tr>`
    })
    list.innerHTML = html + htmls.join('');
}

function handlerAddCus() {
    let form = document.querySelector('.overlay-cus');
    form.setAttribute('style', 'display:flex');
    let addNew = document.querySelector('#add-newCus');
    let formName = document.querySelector("#cusName");
    let formEmail = document.querySelector("#cusEmail");
    let formAdd = document.querySelector("#cusAdd");
    formName.value = formEmail.value =formAdd.value = "";
    addNew.onclick = (e) => {
        e.preventDefault()
        let Name = document.querySelector("#cusName").value;
        let Email = document.querySelector("#cusEmail").value;
        let Address = document.querySelector("#cusAdd").value;
        let Role = document.querySelector("#cusRole").value;
        let Password = document.querySelector("#cusPass").value;
        let data =
        {
            Name,
            Email,
            Address,
            Role, 
            Password
        }
        createCus(data, () => {
            getCustomer(renderCustomer);
        })
    }
    let close = document.querySelector('.closeCus');
    close.onclick = () => {
        form.setAttribute('style', 'display:none');
    }
}

function createCus(data, callback) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch(CustomerAPI, options)
        .then(function (response) {
            response.json();
        })
        .then(callback)
        .then(alert("Success!"))
        .catch(reject => showErrorToast())
}
function deleteCus(id) {
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    };
    fetch(CustomerAPI + '/' + id, options)
        .then(function (response) {
            response.json();
        })
        .then(function () {
            var courseItem = document.querySelector('.CustomerID-' + id);
            if (courseItem) {
                courseItem.remove();
                alert('Success!')
            }
        })
}
function handlerEditCus(id) {
    let block = document.querySelector('.CustomerID-' + id);
    let Name = block.querySelector(".CusName").innerText;
    let Phone = block.querySelector(".CusEmail").innerText;

    let form = document.querySelector('.overlay-cus');
    let formName = document.querySelector("#cusName");
    let formPhone = document.querySelector("#cusEmail");

    let close = document.querySelector('.closeCus');
    close.onclick = () => {
        form.setAttribute('style', 'display:none');
        addNew.value = "Add new";
    }

    formName.value = Name;
    formPhone.value = Phone;
    form.setAttribute('style', 'display:flex');
    let addNew = document.querySelector('#add-newCus');
    addNew.value = "Edit";
    addNew.onclick = (e) => {
        e.preventDefault()
        let Name = document.querySelector("#cusName").value;
        let Phone = document.querySelector("#cusEmail").value
        let data =
        {
            Name,
            Phone
        }
        let url = CustomerAPI + "/" + id;
        console.log(url);
        updateCus(data, url, () => {
            getCustomer(renderCustomer);
        });
    }
}

function updateCus(data, url, callback) {
    var options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch(url, options)
        .then(function (response) {
            response.json();
        })
        .then(callback)
        .then(alert('Success!'))
        .catch(reject => showErrorToast())
}
function toast({ title = "", message = "", type = "info", duration = 3000 }) {
    let main = document.getElementById("toastCus");
    if (main) {
        let toast = document.createElement("div");

        // Auto remove toast
        let autoRemoveId = setTimeout(function () {
            main.removeChild(toast);
        }, duration + 1000);

        // Remove toast when clicked
        toast.onclick = function (e) {
            if (e.target.closest(".toast__close")) {
                main.removeChild(toast);
                clearTimeout(autoRemoveId);
            }
        };
        let icons = {
            success: "fa fa-check",
            info: "fa fa-info",
            warning: "fa fa-exclamation",
            error: "fa fa-exclamation-circle"
        };
        let icon = icons[type];
        let delay = (duration / 1000).toFixed(2);

        toast.classList.add("toast", `toast--${type}`);
        toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;

        toast.innerHTML = `
                      <div class="toast__icon">
                          <i class="${icon}"></i>
                      </div>
                      <div class="toast__body">
                          <h3 class="toast__title">${title}</h3>
                          <p class="toast__msg">${message}</p>
                      </div>
                      <div class="toast__close">
                          <i class="fa fa-times"></i>
                      </div>
                  `;
        main.appendChild(toast);
    }
}
function showSuccessToast() {
    toast({
        title: "SUCCESS",
        message: "Success",
        type: "success",
        duration: 5000
    });
}

function showErrorToast() {
    toast({
        title: "FAIL",
        message: "Fail",
        type: "error",
        duration: 5000
    });
}