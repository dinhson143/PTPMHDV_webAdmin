

function start1() {
    getCategory(renderCategory);
}
function displayCate() {
    document.querySelector("#search").style.display = "flex";
    document.querySelector(".btnSearchCate").style.display = "block";
    document.querySelector(".btnSearchBooks").style.display = "none";
    document.querySelector(".btnSearchCus").style.display = "none";
    document.querySelector(".btnSearchOrder").style.display = "none";

    document.querySelector(".container").style.display = "block";
    document.querySelector(".thongke").style.display="none";
    document.querySelector(".search__btn").style.display = "block";

    let form = document.querySelector('.content__table');
    form.setAttribute('style', 'display:inline-table');
    let list = document.querySelector('.content__tableDetail')
    list.setAttribute('style', 'display:none');
    let back = document.querySelector(".btn--BackOrder");
    back.setAttribute('style', 'display:none');
}
var btnCate = document.querySelector(".nav__item--cate")
btnCate.onclick = function (e) {
    e.preventDefault();
    start1();
    // alert("cate")
    let contenttitle = document.querySelector(".content__title");
    contenttitle.innerHTML = "DANH SÁCH LOẠI SÁCH";
    document.querySelector(".btn--add").style.display = "block";
    document.querySelector(".btn--add").classList.add("btnThemCate")
    var add = document.querySelector(".btnThemCate");
    displayCate();
    add.onclick = function () {
        handlerAddCate();
    }
}


var search2 = document.querySelector(".btnSearchCate");
search2.onkeyup = function (e) {
    e.preventDefault();
    handlerSearchCate();
    let contenttitle = document.querySelector(".content__title");
    contenttitle.innerHTML = "DANH SÁCH LOẠI SÁCH";
    document.querySelector(".btn--add").style.display = "block";
    document.querySelector(".btn--add").classList.add("btnThemCate")
    var add = document.querySelector(".btnThemCate");
    add.onclick = function () {
        handlerAddCate();
    }
    if (search2.value === "") {
        getCategory(renderCategory);
    }
}



function handlerSearchCate() {
    let value = search2.value;
    let data =
    {
        value
    }
    if(value === ""){
        url = CategoryAPI;
    }
    else{
        url = SearchLSP_API + "/" + value;
    }
    SearchCate(data, url, () => {
        getCateSearch(url, renderCategory);
    })
}
function getCateSearch(url, callback) {
    fetch(url)
        .then(response =>
            response.json()
        )
        .then(callback)
        .catch(reject => {
            console.log(reject);
        });
}
function SearchCate(data, url, callback) {
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

function getCategory(callback) {
    fetch(CategoryAPI)
        .then(response =>
            response.json()
        )
        .then(callback)
        .catch(reject => {
            console.log(reject);
        });
}
function renderCategory(categorys) {
    let list = document.querySelector('.content__table')
    var html = `<tr>
                    <th>ID</th>
                    <th>Tên Loại Sách</th>
                    <th></th>
                </tr>`;
    var htmls = categorys.map(function (category) {
        return `<tr class='CateID-${category.CategoryID}'>
                    <td>${category.CategoryID}</td>
                    <td class="cateTitle">${category.CategoryDescription}</td>
                    <td>
                        <div class="btn__group">
                            <div class="btn btn--editCate" onclick= "handlerEditCate(${category.CategoryID})">
                                <p>Edit</p>
                            </div>
                            <div class="btn btn--delete" onclick="deleteCate(${category.CategoryID})">
                                <p>Delete</p>
                            </div>
                        </div>
                    </td>
                </tr>`
    })
    list.innerHTML = html + htmls.join('');
}

function handlerAddCate() {
    let form = document.querySelector('.overlay-cate');
    form.setAttribute('style', 'display:flex');
    let addNew = document.querySelector('#add-newCate');
    let formTittle = document.querySelector("#cateTitle");
    formTittle.value = "";
    addNew.onclick = (e) => {
        e.preventDefault()
        let CategoryDescription = document.querySelector("#cateTitle").value;
        let data =
        {
            CategoryDescription
        }
        createCate(data, () => {
            getCategory(renderCategory);
        })
    }
    let close = document.querySelector('.closeCate');
    close.onclick = () => {
        form.setAttribute('style', 'display:none');
    }
}

function createCate(data, callback) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch(CategoryAPI, options)
        .then(function (response) {
            response.json();
        })
        .then(callback)
        .then(
            alert("Successful")
        )
        .catch(reject => showErrorToast())
}
function deleteCate(id) {
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    };
    fetch(CategoryAPI + '/' + id, options)
        .then(function (response) {
            response.json();
        })
        .then(function () {
            var courseItem = document.querySelector('.CateID-' + id);
            if (courseItem) {
                courseItem.remove();
                alert("Successful");
            }
        })
}
function handlerEditCate(id) {
    let block = document.querySelector('.CateID-' + id);
    let Tittle = block.querySelector(".cateTitle").innerText;

    let form = document.querySelector('.overlay-cate');
    let formTittle = document.querySelector("#cateTitle");

    let close = document.querySelector('.closeCate');
    close.onclick = () => {
        form.setAttribute('style', 'display:none');
        addNew.value = "Add new";
    }

    formTittle.value = Tittle;
    form.setAttribute('style', 'display:flex');
    let addNew = document.querySelector('#add-newCate');
    addNew.value = "Edit";
    addNew.onclick = (e) => {
        e.preventDefault()
        let CategoryDescription = document.querySelector("#cateTitle").value;
        // alert(CategoryDecription);
        let data =
        {
            CategoryDescription
        }
        let url = CategoryAPI + "/" + id;
        console.log(url);
        updateCate(data, url, () => {
            getCategory(renderCategory);
        });
    }
}

function updateCate(data, url, callback) {
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
        .then(alert("Successful"))
        .catch(reject => showErrorToast())
}
function toast({ title = "", message = "", type = "info", duration = 3000 }) {
    let main = document.getElementById("toastCate");
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