const container = document.querySelector(".container");
const seat = document.querySelectorAll(".row .seat:not(.occupied)");
const seatCount = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
const deleteButton = document.getElementById("del-btn");
let ticketPrice = +movieSelect.value;

populateUI();

function populateUI() {
  const seletedSeats = JSON.parse(localStorage.getItem("selectedSeat"));
  if (seletedSeats !== null && seletedSeats.length > 0) {
    seat.forEach((item, index) => {
      if (seletedSeats.indexOf(index) > -1) {
        item.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovie");
  if (selectedMovieIndex !== null) {
    movie.selectedIndex = selectedMovieIndex;
  }
  const selectedMoviePrice = localStorage.getItem("selectedPrice");
  if (selectedMoviePrice !== null) {
    ticketPrice = selectedMoviePrice;
  }
}

//save price and movie
function setMovieData(movie, price) {
  localStorage.setItem("selectedMovie", movie);
  localStorage.setItem("selectedPrice", price);
}

// 更新價錢
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  const seatsIndex = [...selectedSeats].map((item) => [...seat].indexOf(item));
  localStorage.setItem("selectedSeat", JSON.stringify(seatsIndex));

  seatCount.innerText = selectedSeats.length;
  total.innerText = selectedSeats.length * ticketPrice;
}

// 電影價錢響應
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// 座位選擇後變成藍色
container.addEventListener("click", (e) => {
  //如果點擊的地方class名稱包含seat和不包含 selected的話，執行toggle()
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    updateSelectedCount();
  }
});

//清除所有已選擇的座位
deleteButton.addEventListener("click", (e) => {
  seat.forEach((item) => {
    item.classList.remove("selected");
  });
  updateSelectedCount();
});

//初始化價錢數量和座位數量
updateSelectedCount();
