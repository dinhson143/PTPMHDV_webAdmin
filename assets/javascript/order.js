

function start3() {
    getOrder(renderOrder);
    getCustomerCombobox(renderCustomerComboBox);
}
function displayOrder() {
    document.querySelector("#search").style.display = "flex";
    document.querySelector(".btnSearchCate").style.display = "none";
    document.querySelector(".btnSearchBooks").style.display = "none";
    document.querySelector(".btnSearchCus").style.display = "none";
    document.querySelector(".btnSearchOrder").style.display = "block";

    document.querySelector(".container").style.display = "block";
    document.querySelector(".thongke").style.display="none";
    document.querySelector(".search__btn").style.display = "block";
}
var btnOrder = document.querySelector(".nav__item--order")
btnOrder.onclick = function (e) {
    e.preventDefault();
    start3();
    let contenttitle = document.querySelector(".content__title");
    contenttitle.innerHTML = "DANH SÁCH ĐƠN HÀNG";
    document.querySelector(".btn--add").style.display = "block";
    document.querySelector(".btn--add").classList.add("btnThemOr")
    var add = document.querySelector(".btnThemOr");
    displayOrder();
    add.onclick = function () {
        handlerAddOr();
    }
}

var search4 = document.querySelector(".btnSearchOrder");
search4.onkeyup = function (e) {
    e.preventDefault();
    handlerSearchOrder();
    let contenttitle = document.querySelector(".content__title");
    contenttitle.innerHTML = "DANH SÁCH ĐƠN HÀNG";
    document.querySelector(".btn--add").style.display = "block";
    document.querySelector(".btn--add").classList.add("btnThemOr")
    var add = document.querySelector(".btnThemOr");
    add.onclick = function () {
        handlerAddOr();
    }
    if (search4.value === "") {
        getOrder(renderOrder);
    }
}



function handlerSearchOrder() {
    let value = search4.value;
    let data =
    {
        value
    }
    let url = "";
    if (value === "") {
        url = OrderAPI;
    }
    else {
        url = SearchHD_API + "/" + (+value);
    }
    SearchOr(data, url, () => {
        getOrSearch(url, renderOrder);
    })
}
function getOrSearch(url, callback) {
    fetch(url)
        .then(response =>
            response.json()
        )
        .then(callback)
        .catch(reject => {
            console.log(reject);
        });
}
function SearchOr(data, url, callback) {
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

function SearchOr(data, url, callback) {
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

function getOrder(callback) {
    fetch(OrderAPI)
        .then(response =>
            response.json()
        )
        .then(callback)
        .catch(reject => {
            console.log(reject);
        });
}
function renderOrder(orders) {
    let list = document.querySelector('.content__table')
    var html = `<tr>
                    <th>OrderID</th>
                    <th>CustomerID</th>
                    <th>Date</th>
                    <th>Address</th>
                    <th>Trạng thái</th>
                    <th></th>
                </tr>`;
    var htmls = orders.map(function (order) {
        return `<tr class='OrderID-${order.OrderID}'>
                    <td>${order.OrderID}</td>
                    <td class="OrderCusID">${order.CustomerID}</td>
                    <td class="OrderDate">${order.Date}</td>
                    <td class="OrderAdd">${order.Address}</td>
                    <td class="OrderStatus">${order.Status}</td>
                    <td>
                        <div class="btn__group">
                            <div class="btn btn--editOrder" onclick= "handlerEditOr(${order.OrderID})">
                                <p>Edit</p>
                            </div>
                            <div class="btn btn--delete" onclick="deleteOr(${order.OrderID})">
                                <p>Delete</p>
                            </div>
                            <div class="btn btn--DetailOrder" onclick="handlerGetDetailOrder(${order.OrderID})">
                                <p>Detail</p>
                            </div>
                        </div>
                    </td>
                </tr>`
    })
    list.innerHTML = html + htmls.join('');
}

function handlerAddOr() {
    let form = document.querySelector('.overlay-order');
    form.setAttribute('style', 'display:flex');
    let addNew = document.querySelector('#add-newOr');
    let formCusID = document.querySelector("#orderCusID");
    let formAdd = document.querySelector("#orderAdd");
    let formStatus = document.querySelector("#orderStatus");
    formAdd.value = "";
    formStatus.value = "Chờ xác nhận"
    addNew.onclick = (e) => {
        e.preventDefault()
        let CustomerID = document.querySelector("#orderCusID").value;
        let Address = document.querySelector("#orderAdd").value;
        let Status = document.querySelector("#orderStatus").value;
        let data =
        {
            CustomerID,
            Address,
            Status
        }
        createOr(data, () => {
            getOrder(renderOrder);
        })
    }
    let close = document.querySelector('.closeOr');
    close.onclick = () => {
        form.setAttribute('style', 'display:none');
    }
}

function createOr(data, callback) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch(OrderAPI, options)
        .then(function (response) {
            response.json();
        })
        .then(callback)
        .then(showSuccessToast())
        .catch(reject => showErrorToast())
}
function deleteOr(id) {
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    };
    fetch(OrderAPI + '/' + id, options)
        .then(function (response) {
            response.json();
        })
        .then(function () {
            var courseItem = document.querySelector('.OrderID-' + id);
            if (courseItem) courseItem.remove();
        })
}
function handlerEditOr(id) {
    let block = document.querySelector('.OrderID-' + id);
    let CusID = block.querySelector(".OrderCusID").innerText;
    let Date = block.querySelector(".OrderDate").innerText;
    let Address = block.querySelector(".OrderAdd").innerText;
    let Status = block.querySelector(".OrderStatus").innerText;

    let form = document.querySelector('.overlay-order');
    let formCusID = document.querySelector("#orderCusID");
    let formAdd = document.querySelector("#orderAdd");
    let formStatus = document.querySelector("#orderStatus");

    let close = document.querySelector('.closeOr');
    close.onclick = () => {
        form.setAttribute('style', 'display:none');
        formCusID.value = 1;
        addNew.value = "Add new";
    }

    formCusID.value = CusID;
    formAdd.value = Address;
    formStatus.value = Status;
    form.setAttribute('style', 'display:flex');
    let addNew = document.querySelector('#add-newOr');
    addNew.value = "Edit";
    addNew.onclick = (e) => {
        e.preventDefault()
        let CustomerID = document.querySelector("#orderCusID").value;
        let Address = document.querySelector("#orderAdd").value;
        let Status = document.querySelector("#orderStatus").value;
        let data =
        {
            CustomerID,
            Address,
            Status
        }
        let url = OrderAPI + "/" + id;
        console.log(data);
        updateOr(data, url, () => {
            getOrder(renderOrder);
        });
    }
}
function updateOr(data, url, callback) {
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
        .then(showSuccessToast())
        .catch(reject => showErrorToast())
}



// lấy combobox customer và book 

function getCustomerCombobox(callback) {
    fetch(CustomerAPI)
        .then(response =>
            response.json()
        )
        .then(callback)
        .catch(reject => {
            console.log(reject);
        });
}
function renderCustomerComboBox(customers) {
    let comboBoxCustomer = document.querySelector('#orderCusID');
    var htmls = customers.map(customer =>
        `<option value="${customer.CustomerID}">${customer.Name}__${customer.CustomerID}</option>`
    )
    comboBoxCustomer.innerHTML = htmls.join('');
}
function renderCustomerComboBox_OrDt(customers) {
    let comboBoxCustomer = document.querySelector('#orID');
    var htmls = customers.map(customer =>
        `<option value="${customer.CustomerID}">${customer.Name}__${customer.CustomerID}</option>`
    )
    comboBoxCustomer.innerHTML = htmls.join('');
}

function getBookCombobox(callback) {
    fetch(BookAPI)
        .then(response =>
            response.json()
        )
        .then(callback)
        .catch(reject => {
            console.log(reject);
        });
}
function renderBookComboBox(books) {
    let comboBoxBook = document.querySelector('#bID');
    var htmls = books.map(book =>
        `<option value="${book.bookID}">${book.Title}</option>`
    )
    comboBoxBook.innerHTML = htmls.join('');
}


// xử lí form detailOrder
function GetDetailOrder(id, callback) {
    var options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    };
    fetch(OrderDetailAPI + '/' + id, options)
        .then(response =>
            response.json()
        )
        .then(callback)
        .catch(reject => {
            console.log(reject);
        });

}
function RenderDetailOrder(details) {
    let list = document.querySelector('.content__tableDetail')
    var html = `<tr>
                    <th>OrderID</th>
                    <th>BookID</th>
                    <th>Quantity</th>
                    <th></th>
                </tr>`;
    var htmls = details.map(function (detail) {
        return `<tr class='OrderDetailID-${detail.OrderID}'>
                    <td>${detail.OrderID}</td>
                    <td class="OrderbID">${detail.bookID}</td>
                    <td class="OrderQuantity">${detail.Quantity}</td>
                    <td>
                        <div class="btn__group">
                            <div class="btn btn--editOrderDt" onclick= "handlerEditOrDt(${detail.OrderID},${detail.bookID})">
                                <p>Edit</p>
                            </div>
                            <div class="btn btn--delete" onclick="deleteOrDt(${detail.OrderID},${detail.bookID})">
                                <p>Delete</p>
                            </div>
                        </div>
                    </td>
                </tr>`
    })
    list.innerHTML = html + htmls.join('');
}
function handlerGetDetailOrder(id) {
    let list = document.querySelector('.content__tableDetail')
    let form = document.querySelector('.content__table');
    form.setAttribute('style', 'display:none');
    list.setAttribute('style', 'display:inline-table');
    document.querySelector("#search").style.display = "none";

    let contenttitle = document.querySelector(".content__title");
    contenttitle.innerHTML = "DANH SÁCH CHI TIẾT ĐƠN HÀNG";
    document.querySelector(".btn--add").classList.add("btnThemOrDt")
    var add = document.querySelector(".btnThemOrDt");
    GetDetailOrder(id, RenderDetailOrder);
    add.onclick = function () {
        CreateOrDetail(id);
    }

    let back = document.querySelector(".btn--BackOrder");
    back.setAttribute('style', 'display:block');
    back.onclick = function () {
        form.setAttribute('style', 'display:inline-table');
        document.querySelector("#search").style.display = "flex";
        list.setAttribute('style', 'display:none');
        contenttitle.innerHTML = "DANH SÁCH ĐƠN HÀNG";
        back.setAttribute('style', 'display:none');
        document.querySelector(".btn--add").classList.remove("btnThemOrDt");
        // e.preventDefault();
        start3();
        document.querySelector(".btn--add").style.display = "block";
        document.querySelector(".btn--add").classList.add("btnThemOr")
        var add = document.querySelector(".btnThemOr");
        displayOrder();
        add.onclick = function () {
            handlerAddOr();
        }
    }
}

function CreateOrDetail(id) {
    let formDetail = document.querySelector(".overlay-orderDetail");
    formDetail.setAttribute('style', 'display:flex');

    getBookCombobox(renderBookComboBox);
    let formOrID = document.querySelector("#orID");
    let formBookID = document.querySelector("#bID");
    let quantity = document.querySelector("#quantity");
    let addNew = document.querySelector('#add-newOrDt');

    formOrID.value = id;
    formOrID.disabled = true;
    addNew.onclick = (e) => {
        e.preventDefault()
        let OrderID = document.querySelector("#orID").value;
        let bookID = document.querySelector("#bID").value;
        let Quantity = document.querySelector("#quantity").value;

        let data =
        {
            OrderID,
            bookID,
            Quantity
        }
        let url = OrderDetailAPI + '/' + OrderID;
        CreateOrderDetail(data, url, () => {
            GetDetailOrder(id, RenderDetailOrder);
        })
    }
    let closeOrDt = document.querySelector('.closeOrDt');
    closeOrDt.onclick = () => {
        formDetail.setAttribute('style', 'display:none');
    }
}


function CreateOrderDetail(data, url, callback) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    // console.log(data);
    // console.log(url);
    fetch(url, options)
        .then(function (response) {
            response.json();
        })
        .then(callback)
        .then(showSuccessToast())
        .catch(reject => showErrorToast())
}

function deleteOrDt(id, bookID) {
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    };
    fetch(OrderDetailAPI + '/' + id + '/' + bookID, options)
        .then(function (response) {
            response.json();
        })
        .then(function () {
            var courseItem = document.querySelector('.OrderDetailID-' + id);
            if (courseItem) courseItem.remove();
        })
}
function getNameBook(bookID) {
    fetch(BookAPI + '/' + bookID)
        .then(response =>
            response.json()
        )
        .then(callback)
        .catch(reject => {
            console.log(reject);
        });
}
function handlerEditOrDt(id, bookID) {

    let formDetail = document.querySelector(".overlay-orderDetail");
    formDetail.setAttribute('style', 'display:flex');

    let formOrID = document.querySelector("#orID");
    let formBookID = document.querySelector("#bID");

    let Quantity = document.querySelector("#quantity");
    let addNew = document.querySelector('#add-newOrDt');
    addNew.value = "Edit";


    Quantity.value = 0;
    formOrID.value = id;
    // formBookID.value = bookID;
    document.querySelector("#bID option").value = bookID;
    document.querySelector("#bID option").text = bookID;
    document.querySelector("#bID option").setAttribute("selected", true);

    formBookID.disabled = formOrID.disabled = true;
    addNew.onclick = (e) => {
        e.preventDefault()
        let OrderID = document.querySelector("#orID").value;
        // let bookID = document.querySelector("#bID").value;
        let Quantity = document.querySelector("#quantity").value;

        let data =
        {
            Quantity
        }
        let url = OrderDetailAPI + '/' + OrderID + '/' + bookID;
        updateOrderDetail(data, url, () => {
            GetDetailOrder(id, RenderDetailOrder);
        })
    }
    let closeOrDt = document.querySelector('.closeOrDt');
    closeOrDt.onclick = () => {
        formDetail.setAttribute('style', 'display:none');
        formBookID.disabled = false;
        addNew.value = "Add new";
    }
}
function updateOrderDetail(data, url, callback) {
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
        .then(showSuccessToast())
        .catch(reject => showErrorToast())
}


// Toast
function toast({ title = "", message = "", type = "info", duration = 3000 }) {
    let main = document.getElementById("toastOr");
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