let tag = "fox_girl",
    cache = [],
    isLoading = false,
    allID = 0,
    tags = [{ "tag": "feet", "rus": "еожки" }, { "tag": "yuri", "rus": "юри" }, { "tag": "trap", "rus": "АЛЁ У НЕГО ХУЙ" }, { "tag": "futanari", "rus": "АЛЁ У НЕЕ ХУЙ 2" }, { "tag": "hololewd", "rus": "холо 18+" }, { "tag": "lewdkemo", "rus": "" }, { "tag": "solog", "rus": "мастурбация гифка" }, { "tag": "feetg", "rus": "ножки гифка" }, { "tag": "cum", "rus": "" }, { "tag": "erokemo", "rus": "" }, { "tag": "les", "rus": "" }, { "tag": "wallpaper", "rus": "обои" }, { "tag": "lewdk", "rus": "" }, { "tag": "ngif", "rus": "гифки с кошко деффками" }, { "tag": "meow", "rus": "котики" }, { "tag": "tickle", "rus": "шекатать" }, { "tag": "lewd", "rus": "похотливый" }, { "tag": "feed", "rus": "кормить" }, { "tag": "gecg", "rus": "" }, { "tag": "eroyuri", "rus": "18+ юри" }, { "tag": "eron", "rus": "" }, { "tag": "cum_jpg", "rus": "" }, { "tag": "bj", "rus": "минет" }, { "tag": "nsfw_neko_gif", "rus": "18+ кошко деффки гифки" }, { "tag": "solo", "rus": "Мастурбация" }, { "tag": "kemonomimi", "rus": "" }, { "tag": "nsfw_avatar", "rus": "18+ аватарка" }, { "tag": "gasm", "rus": "" }, { "tag": "poke", "rus": "дуться" }, { "tag": "anal", "rus": "анал" }, { "tag": "slap", "rus": "шлепок" }, { "tag": "hentai", "rus": "хентай" }, { "tag": "avatar", "rus": "аватарка" }, { "tag": "erofeet", "rus": "" }, { "tag": "holo", "rus": "холо" }, { "tag": "keta", "rus": "" }, { "tag": "blowjob", "rus": "минет" }, { "tag": "pussy", "rus": "киска" }, { "tag": "tits", "rus": "сиськи" }, { "tag": "holoero", "rus": "16+ холо" }, { "tag": "pussy_jpg", "rus": "киска" }, { "tag": "pwankg", "rus": "" }, { "tag": "classic", "rus": "классика" }, { "tag": "kuni", "rus": "куни" }, { "tag": "waifu", "rus": "вайфу" }, { "tag": "pat", "rus": "" }, { "tag": "kiss", "rus": "поцелуй" }, { "tag": "femdom", "rus": "" }, { "tag": "neko", "rus": "кошко деффки" }, { "tag": "spank", "rus": "шлепок" }, { "tag": "cuddle", "rus": "прижиматься" }, { "tag": "erok", "rus": "" }, { "tag": "fox_girl", "rus": "деффка лиса" }, { "tag": "boobs", "rus": "сиськи" }, { "tag": "Random_hentai_gif", "rus": "рандомная гифка хентай" }, { "tag": "smallboobs", "rus": "маленькие сиськи" }, { "tag": "hug", "rus": "объятия" }, { "tag": "ero", "rus": "16+" }];

window.onload = function () {
    if(getCookie('cache')) cache = JSON.parse(getCookie('cache'));
    let selTag = "", tagsHTML = "";
    tags.sort(function(a, b){
        if(a.tag < b.tag) { return -1; }
        if(a.tag > b.tag) { return 1; }
        return 0;
    }).forEach(t => {
        if (tag == t.tag) {
            selTag = ` <div class="select-box__value"> <input class="select-box__input" type="radio" value="${t.tag}" checked="checked"/> <p class="select-box__input-text">${t.tag.split("_").join(" ")}</p> </div>`;
        }
        tagsHTML += `<li> <label title="${t.rus}" onclick="changeTag('${t.tag}')" class="select-box__option" aria-hidden="aria-hidden">${t.tag.split("_").join(" ")}</label> </li>`;
    })
    document.getElementsByClassName(`select-box__current`)[0].innerHTML = selTag + `<i class="fas fa-chevron-down select-box__icon"></i>`;
    document.getElementsByClassName(`select-box__list`)[0].innerHTML = tagsHTML;
    load();
}

function changeTag(t) {
    tag = t;
    allID = 0; 
    document.getElementsByClassName(`masonry-wrapper`)[0].innerHTML = `<div class="select-box"><div class="select-box__current" tabindex="1"></div><ul class="select-box__list"></ul></div><div class="masonry"></div>`;
    let selTag = "", tagsHTML = "";
    tags.forEach(t => {
        if (tag == t.tag) {
            selTag = ` <div class="select-box__value"> <input class="select-box__input" type="radio" value="${t.tag}" checked="checked"/> <p class="select-box__input-text">${t.tag.split("_").join(" ")}</p> </div>`;
        }
        tagsHTML += `<li> <label title="${t.rus}" onclick="changeTag('${t.tag}')" class="select-box__option" aria-hidden="aria-hidden">${t.tag.split("_").join(" ")}</label> </li>`;
    })
    document.getElementsByClassName(`select-box__current`)[0].innerHTML = selTag + `<i class="fas fa-chevron-down select-box__icon"></i>`;
    document.getElementsByClassName(`select-box__list`)[0].innerHTML = tagsHTML;
    document.getElementsByClassName(`transition-loader`)[0].style.display = "block";
    document.getElementsByTagName(`body`)[0].style.overflow = "hidden";
    document.getElementsByClassName(`masonry-wrapper`)[0].style.opacity = "0";
    load();
}

window.onscroll = function () {
    var height = Math.max(document.body.scrollHeight, document.body.offsetHeight,
        document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
    if (pageYOffset > height - screen.availHeight - 200) {
        if (isLoading == false) {
          load();
        }
    }
};

setInterval(() => {
  var height = Math.max(document.body.scrollHeight, document.body.offsetHeight,
      document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
  if (pageYOffset > height - screen.availHeight - 200) {
      if (isLoading == false) {
        load();
      }
  }
}, 3000)

function load() {
  isLoading = true;
  axios.get(`https://4arts.glitch.me/get?tag=${tag}`).then(res => {
    let imgBlocks = "";
    res.data.forEach(img => {
      if (cache.indexOf(img) == -1) {
        imgBlocks += `<div class="masonry-item img-block-${allID}"><a download="${img.split("/")[4]}" href="https://4arts.glitch.me/download?url=${img}"><img src="${img}" class="masonry-content"></a></div>`;
        allID++;
        cache.push(img);      
      }
    })
    document.getElementsByClassName(`masonry`)[0].innerHTML += imgBlocks;        
    setTimeout(() => {
      isLoading = false;
      document.cookie = `cache=${JSON.stringify(cache)};`;
      document.getElementsByClassName(`masonry-wrapper`)[0].style.opacity = "1";
      document.getElementsByClassName(`transition-loader`)[0].style.display = "none";
      document.getElementsByTagName(`body`)[0].style.overflow = "auto";
    }, 2000)
  })
}

function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  console.log(rand);
  return Math.floor(rand);
}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}