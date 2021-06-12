var btnTK = document.querySelector(".nav__item--statistical")
btnTK.onclick = function (e) {
    e.preventDefault();
    document.querySelector(".thongke").style.display="block";
    document.querySelector(".btnSearchBooks").style.display = "none";
    document.querySelector(".btnSearchCate").style.display = "none";
    document.querySelector(".btnSearchCus").style.display = "none";
    document.querySelector(".btnSearchOrder").style.display = "none";
    document.querySelector(".container").style.display = "none";
    document.querySelector(".search__btn").style.display = "none";

    // thongkeStart();
    getapi(BookAPI,OrderDetailAPI);
}
async function getapi(url1,url2) {
    
    // Storing response
    const response = await fetch(url1);   
    // Storing data in form of JSON
    var book_Array = await response.json();
    // console.log(book_Array);


    // Storing response
    const response2 = await fetch(url2);   
    // Storing data in form of JSON
    var DTOD_Array = await response2.json();
    // console.log(DTOD_Array);


    let Mangnew = [];
     book_Array.map(function(book){
        let dem =0;
        DTOD_Array.map(function(DTOD){
            if(book.bookID===DTOD.bookID){
                dem++;
            }
        });
        if(dem>0){
            let o_Mangnew={
                bookID:0,
                nameBook:"",
                quantity:0
            };
            o_Mangnew.bookID = book.bookID;
            o_Mangnew.nameBook =book.Title;
            o_Mangnew.quantity = dem;     
            Mangnew.push(o_Mangnew);
            dem =0;
        }
    });
     Mangnew.sort(function(a,b){
         return b.quantity-a.quantity;
     })
    //  console.log(Mangnew);
    changeDataChart(Mangnew);
}



function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
function changeDataChart(arr){
    var xValues = [];
    var yValues = [];
    var barColors = [];
    arr.map(function(item){
        xValues.push(item.nameBook);
        yValues.push(item.quantity);
        barColors.push(getRandomColor());
    })
    new Chart("myChart", {
        type: "bar",
        data: {
            labels: xValues,
            datasets: [{
                backgroundColor: barColors,
                data: yValues
            }]
        },
        options: {  
            legend: { display: false },
            title: {
                display: true,
                text: "SÁCH BÁN CHẠY NHẤT"
            }
        }
    });
}


// var xValues = ["Italy", "France", "Spain", "USA", "Argentina"];
// var yValues = [55, 49, 44, 24, 15];
// var barColors = ["red", "green", "blue", "orange", "brown"];

// new Chart("myChart", {
//     type: "bar",
//     data: {
//         labels: xValues,
//         datasets: [{
//             backgroundColor: barColors,
//             data: yValues
//         }]
//     },
//     options: {
//         legend: { display: false },
//         title: {
//             display: true,
//             text: "World Wine Production 2018"
//         }
//     }
// });



