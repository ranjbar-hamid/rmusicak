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
  brand: `<svg xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" id="svg397179" viewBox="350 340 300 80" width="200px" height="30px"  version="1.1">
  <g id="logo-group">
  <image xlink:href="" id="container" x="272" y="144" width="480" height="480" transform="translate(0 0)" style="display: none;"></image>
  <g id="logo-center" transform="translate(0 0)">
    <image xlink:href="" id="icon_container" style="display: none;"></image>
    <g id="slogan" style="font-style:normal;font-weight:500;font-size:32px;line-height:1;font-family:'Raleway Medium Alt1';font-variant-ligatures:none;text-align:center;text-anchor:middle" transform="translate(0 0)"></g>
    <g id="title" style="font-style:normal;font-weight:normal;font-size:72px;line-height:1;font-family:'Brandmark Sans 1 Color';font-variant-ligatures:normal;text-align:center;text-anchor:middle" transform="translate(0 0)">
      <g id="path253867" aria-label="M" transform="translate(0 319.44916) translate(275.13955475 30.31664) scale(1.43) translate(-350.39094 47.952)"> <path class="c1" d="M126.01807,75.99805v48.00391h-11.4248V96.35156l-11.13672,27.65039h-6.96094L85.35889,96.35156v27.65039 H73.98193V75.99805h14.30469l11.66504,28.99414l11.66504-28.99414H126.01807z" transform="translate(276.40901 -123.95005)" stroke-width="0" stroke-linejoin="miter" stroke-miterlimit="2" fill="#6f6f6f" stroke="#6f6f6f"></path> </g>
      <g id="path253869" aria-label="U" transform="translate(0 319.44916) translate(368.38001635 30.213680000000004) scale(1.43) translate(-409.59406 48.024)"> <path class="c1" d="M110.10474,75.54199h11.56934v28.80273c0,11.95313-7.00879,20.11328-21.65039,20.11328 c-14.64063,0-21.69775-8.20801-21.69775-20.01758v-28.8501h11.521v28.51416c0,6.43262,3.74414,10.12891,10.17676,10.12891 c6.38477,0,10.08105-3.69629,10.08105-10.12891V75.59033V75.54199z" transform="translate(331.26812 -123.56599)" stroke-width="0" stroke-linejoin="miter" stroke-miterlimit="2" fill="#6f6f6f" stroke="#6f6f6f"></path> </g>
      <g id="path253871" aria-label="S" transform="translate(0 319.44916) translate(449.15267975 29.08111999999999) scale(1.43) translate(-460.07844 48.816)"> <path class="c1" d="M120.11401,109.43286c0,8.78516-6.24121,15.40918-19.20215,15.40918 c-9.2168,0-15.64941-3.16797-21.02588-8.59277l6.14502-8.64063l0.95996,1.00879c2.20801,2.30371,7.00879,6.14453,14.44922,6.14453 c4.99219,0,7.2002-2.1123,7.2002-4.17676c0-2.54395-4.22363-3.55273-9.12012-4.7041 c-7.63281-1.82422-16.9458-4.27246-17.37793-15.21777v-0.43164v-0.43213v-0.43213 c0.24023-7.82471,7.10449-14.20947,18.19336-14.20947c7.63281,0,14.25781,2.3042,19.58594,7.44092l-6.43262,8.44873 l-0.91211-0.86426c-3.4082-3.12012-8.20898-4.94434-13.20117-4.94434c-3.55176,0-5.66406,1.34424-5.66406,3.64844 c0,2.11182,3.98438,3.07227,8.59277,4.17627c7.82422,1.87207,17.37695,4.41602,17.80957,15.45703v0.43262V109.43286z" transform="translate(380.19246 -123.97396)" stroke-width="0" stroke-linejoin="miter" stroke-miterlimit="2" fill="#6f6f6f" stroke="#6f6f6f"></path> </g>
      <g id="path253873" aria-label="I" transform="translate(0 319.44916) translate(525.50126635 30.31664) scale(1.43) translate(-507.46906 47.952)"> <path class="c1" d="M94.31152,75.99805h11.37695v48.00391H94.31152V75.99805z" transform="translate(413.15754 -123.95005)" stroke-width="0" stroke-linejoin="miter" stroke-miterlimit="2" fill="#6f6f6f" stroke="#6f6f6f"></path> </g>
      <g id="path253875" aria-label="C" transform="translate(0 319.44916) translate(560.6256413500001 28.97816000000001) scale(1.43) translate(-526.03156 48.888)"> <path class="c1" d="M123.25781,112.19263c-4.22461,7.53711-12.33691,12.67383-21.64941,12.67383 c-13.72949,0-24.86621-11.1377-24.86621-24.8667c0-13.72949,11.13672-24.86621,24.86621-24.86621 c9.3125,0,17.37695,5.08838,21.64941,12.625l-10.32031,5.04053c-2.35254-3.74414-6.57715-6.24072-11.3291-6.24072 c-7.39258,0-13.39355,6.00049-13.39355,13.39307c0,7.39307,6.00098,13.39355,13.39355,13.39355 c4.75195,0,8.97656-2.49658,11.3291-6.24072L123.25781,112.19263z" transform="translate(449.28937 -124.02155)" stroke-width="0" stroke-linejoin="miter" stroke-miterlimit="2" fill="#6f6f6f" stroke="#6f6f6f"></path> </g>
      <g id="path253877" aria-label="A" style="display: none;"> <polygon class="c1" points="106.43262,75.9978 93.61523,75.9978 75.03809,124.0022 87.95117,124.0022 100.04785,89.58276 106.09747,106.8645 106.09747,106.8645 112.09668,124.0022 124.96191,124.0022 " transform="translate(502.60285 -123.9498)" stroke-width="0" stroke-linejoin="miter" stroke-miterlimit="2" fill="#6f6f6f" stroke="#6f6f6f"></polygon> <polygon class="c3" points="100.03257,124.0022 92.40832,112.19891 107.59168,112.19891 " transform="translate(502.60285 -123.9498)" stroke-width="0" stroke-linejoin="miter" stroke-miterlimit="2" fill="#0063da" stroke="#0063da"></polygon> </g>
      <g id="path253879" aria-label="K" transform="translate(0 319.44916) translate(690.0702852500001 30.31664) scale(1.43) translate(-634.73469 47.952)"> <path class="c1" d="M120.54541,124.00195h-14.0166l-13.15332-17.37744l-2.54395,3.02441v14.35303H79.45459V75.99805h11.37695 v18.14551l14.35254-18.14551h14.06543l-19.05762,22.51367L120.54541,124.00195z" transform="translate(555.2801 -123.95005)" stroke-width="0" stroke-linejoin="miter" stroke-miterlimit="2" fill="#6f6f6f" stroke="#6f6f6f"></path> </g>
           </g>
    <image xlink:href="data:image/png;base64,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" id="icon" x="560" y="-50" width="53.279999999999994" height="53.279999999999994" transform="translate(0 319.44916) translate(643.0070547500001 30.31664) scale(1.43) translate(-577.64094 47.952)"></image>
  </g>
</g>
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
    <img fetchpriority="low" src="${item.PicID}" alt="RadioMusicak" loading="lazy">
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
    <div>
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
    </article>
    <article class="card-panel">
      <h2 class="f-vazir self-start ">جدیدترین ها</h2>
      <div id="shList"></div>
    </article>
    ${footer()}`;
  document.title = Utility.title;
};

about = () => {
  document.getElementsByTagName(
    "main"
  )[0].innerHTML = `<article class="card-panel d-flex">
      <h3 class="f-vazir">رادیو موزیکک</h3>
      <p class="f-vazir">رسانه موسیقی</p>
      <div>
        <a href="http://t.me/radiomusicak" target="_blank">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-telegram" viewBox="0 0 16 16">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629.093.06.183.125.27.187.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315.337.337 0 0 0-.114-.217.526.526 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09z"/>
        </svg>
        </a><bt/>
        <a href="https://castbox.fm/channel/Radio-Musicak--%D8%B1%D8%A7%D8%AF%DB%8C%D9%88-%D9%85%D9%88%D8%B2%DB%8C%DA%A9%DA%A9-id4804438?country=gb" target="_blank">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
          <path d="m12 0c-.29 0-.58.068-.812.206l-8.771 5.186c-.46.272-.804.875-.804 1.408v10.4c0 .533.344 1.135.804 1.407l8.77 5.187c.465.275 1.162.275 1.626 0l8.77-5.187c.46-.272.804-.874.804-1.407v-10.4c0-.533-.344-1.136-.804-1.408l-8.77-5.186a1.618 1.618 0 0 0 -.813-.206zm-.85 8.304c.394 0 .714.303.714.676v2.224c0 .207.191.375.427.375s.428-.168.428-.375v-1.634c0-.373.32-.675.713-.675.394 0 .712.302.712.675v4.713c0 .374-.318.676-.712.676s-.713-.302-.713-.676v-1.31c0-.206-.192-.374-.428-.374s-.427.168-.427.374v1.226c0 .374-.32.676-.713.676-.394 0-.713-.302-.713-.676v-1.667c0-.207-.192-.375-.428-.375-.235 0-.427.168-.427.375v3.31c0 .373-.319.676-.712.676-.394 0-.713-.303-.713-.676v-2.427c0-.206-.191-.374-.428-.374-.235 0-.427.168-.427.374v.178a.71.71 0 0 1 -.712.708.71.71 0 0 1 -.713-.708v-2.123a.71.71 0 0 1 .713-.708.71.71 0 0 1 .712.708v.178c0 .206.192.373.427.373.237 0 .428-.167.428-.373v-1.53c0-.374.32-.676.713-.676s.712.303.712.676v.646c0 .206.192.374.427.374.236 0 .428-.168.428-.374v-1.784c0-.373.319-.676.713-.676zm4.562 2.416c.393 0 .713.302.713.676v2.691c0 .374-.32.676-.713.676-.394 0-.712-.303-.712-.676v-2.691c0-.374.319-.676.712-.676zm2.28 1.368c.395 0 .713.303.713.676v.67c0 .374-.318.676-.712.676s-.713-.302-.713-.675v-.67c0-.374.32-.677.713-.677z"/>
        </svg>
        </a>
      </div>
    </article>`;
  document.title = Utility.title + " - " + "معرفی";
};

footer = ()=>{
  return `
    <footer class="card-panel mb-f">
      <span>طراحی، پیاده سازی، اجرا </span>
      <span>h.ranjbar.net@gmail.com</span>
    </footer>
  `;
}

function play(e) {
  player.src = e.id;
  player.play();
  pImage.src = e.getAttribute("d-i");
}

window.onpopstate = getData;
window.route = route;

brand.innerHTML = Utility.brand;

getData();
