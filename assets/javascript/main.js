const BookAPI = 'http://localhost:3000/api/sanpham';
const CategoryAPI = 'http://localhost:3000/api/loaisanpham';
const CustomerAPI = 'http://localhost:3000/api/khachhang';
const OrderAPI = 'http://localhost:3000/api/hoadon';
const OrderDetailAPI = 'http://localhost:3000/api/chitiethoadon';

const SearchSP_API = 'http://localhost:3000/api/searchSP';
const SearchLSP_API = 'http://localhost:3000/api/searchLSP';
const SearchKH_API = 'http://localhost:3000/api/searchKH';
const SearchHD_API = 'http://localhost:3000/api/searchHD';


// function displayBook() {
//     let list = document.querySelector('.content__tableDetail')
//     list.setAttribute('style', 'display:none');
//     let back = document.querySelector(".btn--BackOrder");
//     back.setAttribute('style', 'display:none');
// }



function start() {
    getBook(renderBook);
    getCategoryComboBox(renderCategoryComboBox);
}

function displayBook() {
    document.querySelector("#search").style.display = "flex";
    document.querySelector(".btnSearchBooks").style.display = "block";

    document.querySelector(".container").style.display = "block";
    document.querySelector(".thongke").style.display="none";
    document.querySelector(".search__btn").style.display = "block";

    document.querySelector(".btnSearchCate").style.display = "none";
    document.querySelector(".btnSearchCus").style.display = "none";
    document.querySelector(".btnSearchOrder").style.display = "none";
}
var btnBook = document.querySelector(".nav__item--book")
btnBook.onclick = function (e) {
    e.preventDefault();
    displayBook();
    start();
    let contenttitle = document.querySelector(".content__title");
    contenttitle.innerHTML = "DANH SÁCH SÁCH"
    document.querySelector(".btn--add").style.display = "block";
    document.querySelector(".btn--add").classList.add("btnThemSach")
    var add = document.querySelector(".btnThemSach");
    add.onclick = function () {
        handlerAddBook();
    }
}
var search = document.querySelector(".btnSearchBooks");
search.onkeyup = function (e) {
    e.preventDefault();
    handlerSearchBook();
    let contenttitle = document.querySelector(".content__title");
    contenttitle.innerHTML = "DANH SÁCH SÁCH"
    document.querySelector(".btn--add").style.display = "block";
    document.querySelector(".btn--add").classList.add("btnThemSach")
    var add = document.querySelector(".btnThemSach");
    add.onclick = function () {
        handlerAddBook();
    }
    if (search.value === "") {
        getBook(renderBook);
    }
}








function handlerSearchBook() {
    let value = search.value;
    let data =
    {
        value
    }
    let url = "";
    if(value === ""){
        url = BookAPI;
    }
    else{
        url = SearchSP_API + "/" + value;
    }
    SearchBook(data, url, () => {
        getBookSearch(url, renderBook);
    })
}
function getBookSearch(url, callback) {
    fetch(url)
        .then(response =>
            response.json()
        )
        .then(callback)
        .catch(reject => {
            console.log(reject);
        });
}
function SearchBook(data, url, callback) {
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
function getBook(callback) {
    fetch(BookAPI)
        .then(response =>
            response.json()
        )
        .then(callback)
        .catch(reject => {
            console.log(reject);
        });
}
function renderBook(books) {
    let list = document.querySelector('.content__table')
    var html = `<tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Year</th>
                    <th>Price</th>
                    <th>Book Decription</th>
                    <th>Publishing Company</th>
                    <th>Author</th>
                    <th>Cartegory ID</th>
                    <th>Image</th>
                    <th></th>
                </tr>`;
    var htmls = books.map(function (book) {
        return `<tr class='BookID-${book.bookID}'>
                    <td>${book.bookID}</td>
                    <td class="bookTittle">${book.Title}</td>
                    <td class="bookYear">${book.Year}</td>
                    <td class="bookPrice">${book.Price}</td>
                    <td class="bookDecription">${book.BookDescription}</td>
                    <td class="bookPublishingCompany">${book.PublishingCompany}</td>
                    <td class="bookAuthor">${book.Author}</td>
                    <td class="bookCategoryID">${book.CategoryID}</td>
                    <td class="bookImage"><img src="${book.url}" alt="" style="width:100px;height:100px"></td>
                    <td>
                        <div class="btn__group">
                            <div class="btn btn--edit" onclick= "handlerEditBook(${book.bookID})" >
                                <p>Edit</p>
                            </div>
                            <div class="btn btn--delete" onclick="deleteBook(${book.bookID})">
                                <p>Delete</p>
                            </div>
                        </div>
                    </td>
                </tr>`
    })
    list.innerHTML = html + htmls.join('');
}
{/* <div class="btn btn--edit" onclick= "handlerEditBook(${book.bookID})"> */ }

function getCategoryComboBox(callback) {
    fetch(CategoryAPI)
        .then(response =>
            response.json()
        )
        .then(callback)
        .catch(reject => {
            console.log(reject);
        });
}
function renderCategoryComboBox(categorys) {
    let comboBoxCategory = document.querySelector('#bookCategoryId');
    var htmls = categorys.map(category =>
        `<option value="${category.CategoryID}">${category.CategoryDescription}</option>`
    )
    comboBoxCategory.innerHTML = htmls.join('');
}
function deleteBook(id) {
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    };
    fetch(BookAPI + '/' + id, options)
        .then(function (response) {
            response.json();
        })
        .then(function () {
            var courseItem = document.querySelector('.BookID-' + id);
            if (courseItem) {
                courseItem.remove();
                alert("Successful");
            }
        })
}
function uploadImage(){
    const ref = firebase.storage().ref()
    const file = document.querySelector("#bookImage").files[0]
    const name = file.name
    let urlImage = "";
    const metadata ={
        contentType: file.type
    }
    const task = ref.child(name).put(file, metadata)
    
    task
    .then(snapshot => snapshot.ref.getDownloadURL())
    .then( urlImage => {
        // console.log(url);
        // alert("image upload successful")
            return urlImage;
        }
    )
}
function handlerAddBook() {
    let form = document.querySelector('.overlay-book');
    form.setAttribute('style', 'display:flex');
    let addNew = document.querySelector('#add-new');
    let formTittle = form.querySelector("#bookTitle");
    let formYear = form.querySelector("#bookYear");
    let formPrice = form.querySelector("#bookPrice");
    let formBookDecription = form.querySelector("#bookDecription");
    let formPublishingCompany = form.querySelector("#bookPublishingCompany");
    let formAuthor = form.querySelector("#bookAuthor");
    const imageEdit = document.querySelector("#imageEdit");

    formTittle.value = "";
    formYear.value = "";
    formPrice.value = "";
    formBookDecription.value = "";
    formPublishingCompany.value = "";
    formAuthor.value = "";
    addNew.onclick = (e) => {
        e.preventDefault();
        let Title = document.querySelector("#bookTitle").value;
        let Year = document.querySelector("#bookYear").value;
        let Price = document.querySelector("#bookPrice").value;
        let BookDescription = document.querySelector("#bookDecription").value;
        let PublishingCompany = document.querySelector("#bookPublishingCompany").value;
        let Author = document.querySelector("#bookAuthor").value;
        let CategoryID = document.querySelector("#bookCategoryId").value;




        const ref = firebase.storage().ref()
        const file = document.querySelector("#bookImage").files[0]
        const name = file.name
        const metadata ={
            contentType: file.type
        }
        const task = ref.child(name).put(file, metadata)
        
        task
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then( url => {
            imageEdit.src=url;
            alert("Successful");
            let data =  
            {
                CategoryID,
                Title,
                Year,
                Price,
                BookDescription,
                PublishingCompany,
                Author,
                url
            }
            // console.log(data);
            createBook(data, () => {
                getBook(renderBook);
            })
        })      
    }
    let close = document.querySelector('.close');
    close.onclick = () => {
        form.setAttribute('style', 'display:none');
    }
}
function createBook(data, callback) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    console.log(data);  
    fetch(BookAPI, options)
        .then(function (response) {
            response.json();
        })
        .then(callback)
        .then(showSuccessToast())
        .catch(reject => showErrorToast())
}
function handlerEditBook(id) {
    let block = document.querySelector('.BookID-' + id);
    let Tittle = block.querySelector(".bookTittle").innerText;
    let Year = block.querySelector(".bookYear").innerText;
    let Price = block.querySelector(".bookPrice").innerText;
    let BookDecription = block.querySelector(".bookDecription").innerText;
    let PublishingCompany = block.querySelector(".bookPublishingCompany").innerText;
    let Author = block.querySelector(".bookAuthor").innerText;
    let CategoryID = block.querySelector(".bookCategoryID").innerText;
    const imageEdit = document.querySelector("#imageEdit");


    let form = document.querySelector('.overlay-book');
    let formTittle = form.querySelector("#bookTitle");
    let formYear = form.querySelector("#bookYear");
    let formPrice = form.querySelector("#bookPrice");
    let formBookDecription = form.querySelector("#bookDecription");
    let formPublishingCompany = form.querySelector("#bookPublishingCompany");
    let formAuthor = form.querySelector("#bookAuthor");
    let formCategoryID = form.querySelector("#bookCategoryId");

    formTittle.value = Tittle;
    formYear.value = Year;
    formPrice.value = Price;
    formBookDecription.value = BookDecription;
    formPublishingCompany.value = PublishingCompany;
    formAuthor.value = Author;
    formCategoryID.value = CategoryID;

    form.setAttribute('style', 'display:flex');

    let addNew = document.querySelector('#add-new');
    addNew.value = "Edit";
    addNew.onclick = (e) => {
        e.preventDefault()
        let Title = document.querySelector("#bookTitle").value;
        let Year = document.querySelector("#bookYear").value;
        let Price = document.querySelector("#bookPrice").value;
        let BookDescription = document.querySelector("#bookDecription").value;
        let PublishingCompany = document.querySelector("#bookPublishingCompany").value;
        let Author = document.querySelector("#bookAuthor").value;
        let CategoryID = document.querySelector("#bookCategoryId").value;



        const ref = firebase.storage().ref()
        const file = document.querySelector("#bookImage").files[0]
        const name = file.name
        const metadata ={
            contentType: file.type
        }
        const task = ref.child(name).put(file, metadata)
        
        task
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then( url => {
            imageEdit.src=url;
            alert("Successful");
            let data =
            {
                CategoryID,
                Title,
                Year,
                Price,
                BookDescription,
                PublishingCompany,
                Author,
                url
            }
            let urlUpdate = BookAPI + "/" + id;
            updateBook(data, urlUpdate, () => {
                getBook(renderBook);
            })
            }
        )
    }
    let close = document.querySelector('.close');
    close.onclick = () => {
        form.setAttribute('style', 'display:none');
        addNew.value = "Add new";
    }
}
function updateBook(data, url, callback) {
    var options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    // console.log(data.id);
    fetch(url, options)
        .then(function (response) {
            response.json();
        })
        .then(callback)
        .then(showSuccessToast())
        .catch(reject => showErrorToast())
}






function toast({ title = "", message = "", type = "info", duration = 3000 }) {
    let main = document.getElementById("toastBook");
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




