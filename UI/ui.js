const route = (event) => {
  event = event || window.event;
  event.preventDefault();
  window.history.pushState({}, "", event.target.href);
  getData();
};

const routes = {
  "/": "home",
  "": "home",
  list: "?type=list",
  archive: "?type=genreList",
  artists: "?type=artists",
  about: "?about",
};

Utility = {
  iconMenu: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
    </svg>`,
  iconClose: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
    </svg>`,
  iconDownload: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/><path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/></svg>`,
  iconPlay: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
    <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z"/>
  </svg>`,
  loading: `<div class="loader">loading</div>`,
  title: "رادیو موزیکک",
};

const navbar = (eID) => {
  const navTG = document.querySelector("[aria-label=toggle]"),
    navOut = document.getElementsByTagName("main"),
    nav = document.getElementsByTagName("nav"),
    links = document.querySelectorAll("[tg=linkGroup]");

  navTG.innerHTML = Utility.iconMenu;

  navTG.addEventListener("click", () => {
    navToggle("1");
  });

  for (const l of links) {
    l.addEventListener("click", () => {
      for (const r of links) r.classList.remove("active-link");
      l.classList.add("active-link");
      navToggle(0);
    });
  }
  if (eID) {
    for (const r of links) r.classList.remove("active-link");
    document.getElementById(eID).classList.add("active-link");
  }

  navOut[0].addEventListener("click", () => {
    navToggle("0");
  });

  navToggle = (e) => {
    e == "0" ? nav[0].classList.remove("sm-none") : null;
    nav[0].classList.contains("sm-none")
      ? (nav[0].classList.remove("sm-none"),
        (navTG.innerHTML = Utility.iconClose))
      : (nav[0].classList.add("sm-none"), (navTG.innerHTML = Utility.iconMenu));
  };
};
navbar();

const getData = async () => {
  const url =
    "https://script.google.com/macros/s/AKfycbw8zy5vVKWyQfO4ov6GBuuplfZJL0Ao7yku5L6gddLs41NSSPxmN7OM426SI0j4IqGrHg/exec";
  document.title = Utility.title;
  const http = new XMLHttpRequest();
  navbar();
  document.getElementsByTagName("main")[0].classList.add("mainload");
  ld.classList.remove("hide");
  let ul = "<ul class='d-flex'>";
  let htmlListData = "";
  const hash = window.location.hash.substring(1).split("/")[0];
  const sKey = window.location.hash.substring(1).split("/")[1]
    ? window.location.hash.substring(1).split("/")[1]
    : "";

  if ((hash == "home") | !hash) {
    home();
    document.getElementsByTagName("main")[0].classList.remove("mainload");
    ld.classList.add("hide");
    navbar("mLink");
    http.open("Get", url + "?type=list&start=0&end=4");
    http.send();
    http.onload = () => {
      const data = JSON.parse(http.responseText);
      htmlListData = listMap(data);
      for (const item of htmlListData) {
        ul += item;
      }
      ul += "</ul>";
      document.getElementById("shList").innerHTML += ul;
    };
    return;
  }
  if (hash == "about") {
    about();
    document.getElementsByTagName("main")[0].classList.remove("mainload");
    ld.classList.add("hide");
    navbar("aboutLink");
    return;
  }
  http.open("Get", url + routes[hash] + "&searchKey=" + sKey);
  http.send();
  http.onerror = (e, r) => {
    document.getElementsByTagName(
      "main"
    )[0].innerHTML = `<p class='error'>خطای ارتباطی</p>`;
    document.getElementsByTagName("main")[0].classList.remove("mainload");
    ld.classList.add("hide");
    navbar();
  };
  http.onload = () => {
    const data = JSON.parse(http.responseText);
    if (routes[hash] == "?type=list") {
      document.title = Utility.title;
      htmlListData = listMap(data);
      navbar("mLink");
    }
    if ((hash == "archive") | (hash == "artists")) {
      document.title =
        Utility.title + " - " + (hash == "archive" ? "آرشیو" : "هنرمندان");
      hash == "archive" ? navbar("archiveLink") : navbar("artistsLink");
      htmlListData = data.map((item) => {
        return `<li class='shadow-sm f-vazir d-flex' onclick="window.event.target.href='#list/${item}' ,route()" name="${item}">
          <div class="card-command">
            <a class="card-btn">${item}</a></div>
          </div>
          </li>`;
      });
    }
    for (const item of htmlListData) {
      ul += item;
    }
    ul += "</ul>";
    document.getElementsByTagName("main")[0].innerHTML = ul;
    document.getElementsByTagName("main")[0].classList.remove("mainload");
    ld.classList.add("hide");
  };
};

const listMap = (data) => {
  return data.map((item) => {
    return `<li class='shadow-sm f-vazir d-flex'>
  <div class="al">
    <button class="card-btn card-play" id='${item.URL}' d-i='${item.PicID}' onClick="play(this)">
    <img fetchpriority="low" src="${item.PicID}" alt="${item.Title}" loading="lazy">
  <div>${Utility.iconPlay}</div>
  </button>
  <label><strong>آلبوم ${item.Title}</strong></label>
  </div class="al">
    <label><a class="card-btn card-lbl" onclick="window.event.target.href='#list/${item.Artist}' ,route()">${item.Artist}</a></label>
    <label><a class="card-btn card-lbl sm-hide" onclick="window.event.target.href='#list/${item.Genre}' ,route()">${item.Genre}</a></label>
  </div>
  <div class="al">
    <div>${item.Duration}</div>
    <a href="${item.URL}" class="card-btn card-lbl" aria-label="دانلود">${Utility.iconDownload}</a>
  </div>
  </li>`;
  });
};

home = () => {
  document.getElementsByTagName(
    "main"
  )[0].innerHTML = `<article class="card-panel d-flex mb-0 m-first">
    <div class="homeART">
      <h1 class="f-vazir self-start ">بهترین لحظات آلبوم های موسیقی را اینجا بشنوید.</h1>
      <button class="f-vazir btn-prim self-start al" onclick="window.event.target.href='#archive',route()">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="20" fill="currentColor" viewBox="-4 0 16 16">
          <path d="M6 13c0 1.105-1.12 2-2.5 2S1 14.105 1 13c0-1.104 1.12-2 2.5-2s2.5.896 2.5 2zm9-2c0 1.105-1.12 2-2.5 2s-2.5-.895-2.5-2 1.12-2 2.5-2 2.5.895 2.5 2z"/>
          <path fill-rule="evenodd" d="M14 11V2h1v9h-1zM6 3v10H5V3h1z"/>
          <path d="M5 2.905a1 1 0 0 1 .9-.995l8-.8a1 1 0 0 1 1.1.995V3L5 4V2.905z"/>
        </svg>
        <strong>آرشیو</strong>
      </button>
      <button class="f-vazir btn-prim self-start al" onclick="window.event.target.href='#artists',route()">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="20" fill="currentColor" viewBox="-4 0 16 16">
        <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1h-3zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5zM.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5z"/>
          <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
        </svg>
        <strong>هنرمندان</strong>
      </button>
    </div>
    <img class="homeIMG" src="https://drive.google.com/u/0/uc?id=1TubgLvb67TGVRCRZr2th4-BJYAcRlb37&export=download"  alt="رادیو موزیکک">
    </article>
    <article class="card-panel">
      <h2 class="f-vazir self-start "></h2>
      <div id="shList"></div>
    </article>
    ${footer()}`;
  document.title = Utility.title;
};

about = () => {
  document.getElementsByTagName(
    "main"
  )[0].innerHTML = `<article class="card-panel d-flex mb-0 m-first">
      <div class="homeART">
        <h1 class="f-vazir">رادیو موزیکک</h1>
        <p class="f-vazir">رسانه موسیقی برای بهترین لحظات آلبوم های موسیقی ایران و جهان</p>
        <a class="f-vazir Link" href="http://t.me/radiomusicak" target="_blank">
          <svg class="Link" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629.093.06.183.125.27.187.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315.337.337 0 0 0-.114-.217.526.526 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09z"/>
          </svg> <span> کانال تلگرام </span>
        </a>
        <br>
        <a class="f-vazir Link" href="https://castbox.fm/channel/Radio-Musicak--%D8%B1%D8%A7%D8%AF%DB%8C%D9%88-%D9%85%D9%88%D8%B2%DB%8C%DA%A9%DA%A9-id4804438?country=gb" target="_blank">
          <svg class="Link" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
            <path d="m12 0c-.29 0-.58.068-.812.206l-8.771 5.186c-.46.272-.804.875-.804 1.408v10.4c0 .533.344 1.135.804 1.407l8.77 5.187c.465.275 1.162.275 1.626 0l8.77-5.187c.46-.272.804-.874.804-1.407v-10.4c0-.533-.344-1.136-.804-1.408l-8.77-5.186a1.618 1.618 0 0 0 -.813-.206zm-.85 8.304c.394 0 .714.303.714.676v2.224c0 .207.191.375.427.375s.428-.168.428-.375v-1.634c0-.373.32-.675.713-.675.394 0 .712.302.712.675v4.713c0 .374-.318.676-.712.676s-.713-.302-.713-.676v-1.31c0-.206-.192-.374-.428-.374s-.427.168-.427.374v1.226c0 .374-.32.676-.713.676-.394 0-.713-.302-.713-.676v-1.667c0-.207-.192-.375-.428-.375-.235 0-.427.168-.427.375v3.31c0 .373-.319.676-.712.676-.394 0-.713-.303-.713-.676v-2.427c0-.206-.191-.374-.428-.374-.235 0-.427.168-.427.374v.178a.71.71 0 0 1 -.712.708.71.71 0 0 1 -.713-.708v-2.123a.71.71 0 0 1 .713-.708.71.71 0 0 1 .712.708v.178c0 .206.192.373.427.373.237 0 .428-.167.428-.373v-1.53c0-.374.32-.676.713-.676s.712.303.712.676v.646c0 .206.192.374.427.374.236 0 .428-.168.428-.374v-1.784c0-.373.319-.676.713-.676zm4.562 2.416c.393 0 .713.302.713.676v2.691c0 .374-.32.676-.713.676-.394 0-.712-.303-.712-.676v-2.691c0-.374.319-.676.712-.676zm2.28 1.368c.395 0 .713.303.713.676v.67c0 .374-.318.676-.712.676s-.713-.302-.713-.675v-.67c0-.374.32-.677.713-.677z"/>
          </svg> کست باکس
        </a>
      </div>
      <img class="homeIMG" src="https://drive.google.com/u/0/uc?id=1gEaw-VFd9sZiCD54sfIO2FS2sROaiUoN&export=download" alt="رادیو موزیکک">
    </article>
    ${footer()}`;
  document.title = Utility.title + " - " + "معرفی";
};

footer = () => {
  return `
    <footer class="card-panel mb-f">
    <a class="" href="http://t.me/radiomusicak" target="_blank">
      <svg class="F-Link " xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629.093.06.183.125.27.187.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315.337.337 0 0 0-.114-.217.526.526 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09z"/>
      </svg>
    </a>
    <a class="" href="https://castbox.fm/channel/Radio-Musicak--%D8%B1%D8%A7%D8%AF%DB%8C%D9%88-%D9%85%D9%88%D8%B2%DB%8C%DA%A9%DA%A9-id4804438?country=gb" target="_blank">
      <svg class="F-Link " xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
        <path d="m12 0c-.29 0-.58.068-.812.206l-8.771 5.186c-.46.272-.804.875-.804 1.408v10.4c0 .533.344 1.135.804 1.407l8.77 5.187c.465.275 1.162.275 1.626 0l8.77-5.187c.46-.272.804-.874.804-1.407v-10.4c0-.533-.344-1.136-.804-1.408l-8.77-5.186a1.618 1.618 0 0 0 -.813-.206zm-.85 8.304c.394 0 .714.303.714.676v2.224c0 .207.191.375.427.375s.428-.168.428-.375v-1.634c0-.373.32-.675.713-.675.394 0 .712.302.712.675v4.713c0 .374-.318.676-.712.676s-.713-.302-.713-.676v-1.31c0-.206-.192-.374-.428-.374s-.427.168-.427.374v1.226c0 .374-.32.676-.713.676-.394 0-.713-.302-.713-.676v-1.667c0-.207-.192-.375-.428-.375-.235 0-.427.168-.427.375v3.31c0 .373-.319.676-.712.676-.394 0-.713-.303-.713-.676v-2.427c0-.206-.191-.374-.428-.374-.235 0-.427.168-.427.374v.178a.71.71 0 0 1 -.712.708.71.71 0 0 1 -.713-.708v-2.123a.71.71 0 0 1 .713-.708.71.71 0 0 1 .712.708v.178c0 .206.192.373.427.373.237 0 .428-.167.428-.373v-1.53c0-.374.32-.676.713-.676s.712.303.712.676v.646c0 .206.192.374.427.374.236 0 .428-.168.428-.374v-1.784c0-.373.319-.676.713-.676zm4.562 2.416c.393 0 .713.302.713.676v2.691c0 .374-.32.676-.713.676-.394 0-.712-.303-.712-.676v-2.691c0-.374.319-.676.712-.676zm2.28 1.368c.395 0 .713.303.713.676v.67c0 .374-.318.676-.712.676s-.713-.302-.713-.675v-.67c0-.374.32-.677.713-.677z"/>
      </svg>
    </a>
    </footer>
  `;
};

function play(e) {
  player.src = e.id;
  player.play();
  pImage.src = e.getAttribute("d-i");
}

window.onpopstate = getData;
window.route = route;

getData();
