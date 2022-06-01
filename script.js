$(document).ready(function () {
    let carArr


    reloadCars();

    $("carIMG").change(function(){
        if (this.files && this.files[0]) {
            console.log(this.files[0]);
            var reader = new FileReader();
            reader.onload = imageIsLoaded;
            reader.readAsDataURL(this.files[0]);
        }
        function imageIsLoaded(e) {
            localStorage.setItem("img", e.target.result);
        };
    })

    $("#carform").submit(function (e) {
        e.preventDefault()
        let carName = $("#carName").val()
        let carModel = $("#carModel").val()
        let carYear = $("#carYear").val()
        let carPrice = $("#carPrice").val()
        let carColor = $("#carColor").val()
        let carIMG = localStorage.getItem("img")
        let car = {
            name: carName,
            model: carModel,
            year: carYear,
            price: carPrice,
            color: carColor,
            photo: carIMG
        }
        carArr.push(car)
        console.log(carArr)
        let carArrJSON = JSON.stringify(carArr)
        localStorage.setItem("CarArr", carArrJSON)
        reloadCars()
    })

    $("#newcar").click(function () {
        $("#addCar").css("display", "flex")
    })

    $("#icon").click(function () {
        $("#addCar").css("display", "none")
    })



    function reloadCars() {
        if (localStorage.getItem("CarArr") == null) {
            carArr = []
        } else {
            let jsonTxt = JSON.parse(localStorage.getItem("CarArr"))
            carArr = jsonTxt
        }
        $("#content").empty()
        for (let i = 0; i < carArr.length; i++) {

            let newDiv = $(`<div>
            <img src="${carArr[i].photo}">
            <p><b>${carArr[i].price}</b>
            </p><p>${carArr[i].name + " " + carArr[i].model}</p>
            <p>${carArr[i].year}</p>
            <p>${carArr[i].color}</p>
            <button id="${i}" class="deletebtn">Delete</button>
            </div>`)
            $("#content").append(newDiv)
        }
        $(".deletebtn").click(function () {
            let x = $(this).attr("id")
            carArr.splice(x, 1)
            let myJson = localStorage.getItem("CarArr")
            let myArr = JSON.parse(myJson)
            myArr.splice(x, 1)
            let carArrJSON = JSON.stringify(myArr)
            localStorage.setItem("CarArr", carArrJSON)
            reloadCars()
        })
        


    }
})