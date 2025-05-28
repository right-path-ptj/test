//innerHTML 방식으로 조작
const popularBtn = document.getElementById("popular-btn");
const upcomingBtn = document.getElementById("upcoming-btn");
const movieOl = document.querySelector("ol");
const headerTitle = document.getElementById("header-title");
const accessToken =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYzdlMjRlZTJhZWMxMzk0Y2UwZGIzNzFmMzI5MGQyMyIsIm5iZiI6MTcxNDg5NjMwNi44MDYwMDAyLCJzdWIiOiI2NjM3M2RiMjgxM2NiNjAxMjE4OGRiM2YiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.IKONC13rOUfiSqEtngJD_ql2z65JdTNYBFwXag_MGP8";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: accessToken,
  },
};

// 공통 fetch 함수
function fetchMovieList(type, type2) {
  headerTitle.textContent = type2 + " 영화 목록";
  console.log(`${type} 영화 데이터를 불러오는 중...`);
  fetch(
    `https://api.themoviedb.org/3/movie/${type}?language=ko&page=1`,
    options
  )
    .then((res) => res.json())
    .then((data) => {
      console.log("불러온 영화 목록:", data.results);
      movieOl.innerHTML = data.results
        .map((movie) => {
          const poster = movie.poster_path
            ? `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title} 포스터">`
            : `<img src="../basic.png" alt="포스터 없음">`;

          return `
            <li>
              <div class="movie-item">
                ${poster}
                <div class="movie-info">
                  <h3>${movie.title}</h3>
                  <p>개봉일: ${movie.release_date}</p>
                  <p>평점: ${movie.vote_average.toFixed(1)}</p>
                </div>
              </div>
            </li>
          `;
        })
        .join("");
    })
    .catch((err) => console.error("영화 목록 불러오기 오류:", err));
}

popularBtn.addEventListener("click", () => fetchMovieList("popular", "인기"));
upcomingBtn.addEventListener("click", () => fetchMovieList("upcoming", "최신"));

//dom으로 조작
// const popularBtn = document.getElementById("popular-btn");
// const upcomingBtn = document.getElementById("upcoming-btn");
// const movieOl = document.querySelector("ol");
// const headerTitle = document.getElementById("header-title");
// const accessToken =
//   "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYzdlMjRlZTJhZWMxMzk0Y2UwZGIzNzFmMzI5MGQyMyIsIm5iZiI6MTcxNDg5NjMwNi44MDYwMDAyLCJzdWIiOiI2NjM3M2RiMjgxM2NiNjAxMjE4OGRiM2YiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.IKONC13rOUfiSqEtngJD_ql2z65JdTNYBFwXag_MGP8";

// const options = {
//   method: "GET",
//   headers: {
//     accept: "application/json",
//     Authorization: accessToken,
//   },
// };

// // 공통 fetch 함수
// function fetchMovieList(type, type2) {
//   headerTitle.textContent = type2 + " 영화 목록";
//   console.log(`${type} 영화 데이터를 불러오는 중...`);
//   fetch(
//     `https://api.themoviedb.org/3/movie/${type}?language=ko&page=1`, // 여기 type부분에 따라 불러오는 api 달라짐
//     options
//   )
//     .then((res) => res.json())
//     .then((data) => {
//       console.log("불러온 영화 목록:", data.results);
//       movieOl.innerHTML = "";

//       data.results.forEach((movie) => {
//         const movieDiv = document.createElement("div");
//         const listItem = document.createElement("li");
//         movieDiv.classList.add("movie-item");

//         const titleElement = document.createElement("h3");
//         titleElement.textContent = movie.title;

//         const releaseElement = document.createElement("p");
//         releaseElement.textContent = `개봉일: ${movie.release_date}`;

//         const voteElement = document.createElement("p");
//         voteElement.textContent = `평점: ${movie.vote_average.toFixed(1)}`; //평점 소수점 1번쨰까지

//         const posterElement = document.createElement("img");
//         if (movie.poster_path) {
//           posterElement.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`; //이미지 불러오는 기본 경로? api 설명서에 나와있음
//           posterElement.alt = `${movie.title} 포스터`;
//         } else {
//           posterElement.alt = "포스터 없음";
//         }

//         const infoDiv = document.createElement("div");
//         infoDiv.classList.add("movie-info");
//         infoDiv.appendChild(titleElement);
//         infoDiv.appendChild(releaseElement);
//         infoDiv.appendChild(voteElement);

//         movieDiv.appendChild(posterElement);
//         movieDiv.appendChild(infoDiv);
//         listItem.appendChild(movieDiv);
//         movieOl.appendChild(listItem);
//       });
//     })
//     .catch((err) => console.error("영화 목록 불러오기 오류:", err));
// }

// // 버튼 이벤트 리스너 등록
// popularBtn.addEventListener("click", () => fetchMovieList("popular", "인기"));
// upcomingBtn.addEventListener("click", () => fetchMovieList("upcoming", "최신"));
