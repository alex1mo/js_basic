const NAV = $("header .nav.navbar-nav")[0];
const STYLE = $(".dropdown-menu")[0];
const TASKS = document.getElementById("tasks");
const MODAL_W = $("#modal")[0];
const MODAL_BODY = $(".modal-body")[0];
const MODAL_C = $("#modal .modal-header .close")[0];

try {
  let arr = ["one", "two", "three", "four", "five"];
  localStorage.setItem("arr", JSON.stringify(arr));
  $(MODAL_BODY).html(JSON.stringify(arr));
  console.log("local storage поддерживается");
} catch (e) {
  console.log(e);
  console.log("local storage не поддерживается");
}

window.addEventListener("load", function() {
  !JSON.parse(localStorage.getItem("modal")) &&
    setTimeout(function() {
      $(MODAL_W).css("display", "block");
    }, 4000);
});

try {
  var { theme } = JSON.parse(localStorage.getItem("style"));
} catch (e) {
  console.log(`${e}
  отсутвует ключ
  `);
}

if (theme) {
  if (theme === "style1") {
    style1();
  } else if (theme === "style2") {
    style2();
  }
  notStyle();
  STYLE.querySelector(`[data=${theme}]`).setAttribute("active", "yes");
}

$(NAV)
  .children()
  .on("click", function(e) {
    $(NAV)
      .children()
      .removeClass("active");
    $(this).addClass("active");

    $(TASKS)
      .children()
      .removeClass("active");
    $.each($(TASKS).children(), (i, e) => {
      if ($(this).attr("data") === $(e).attr("data")) {
        $(e).addClass("active");
      }
    });
  });

$(STYLE)
  .children()
  .on("click", function() {
    notStyle();
    $(this).attr("active", "yes");
    style($(this).attr("data"));
    localStorage.setItem(
      "style",
      JSON.stringify({ theme: $(this).attr("data") })
    );
  });

MODAL_W.querySelector(".modal-footer button").onclick = function(e) {
  localStorage.setItem("modal", "true");
  $(MODAL_W).css("display", "none");
};

$(MODAL_C).on("click", function(e) {
  $(MODAL_W).css("display", "none");
});

///////////////////function////////////////////////
function notStyle() {
  $(STYLE)
    .children()
    .attr("active", "no");
}

function style(a) {
  //применяет стиль
  if (a === "style1") {
    style1();
  } else if (a === "style2") {
    style2();
  }
}

function style1() {
  //первый стиль
  if (
    $("head")
      .children()
      .last()
      .attr("href") !== "css/main.css"
  ) {
    $("head")
      .children()
      .last()
      .remove();
  }
}

function style2() {
  //второй стиль
  if (
    $("head")
      .children()
      .last()
      .attr("href") !== "css/style.css"
  ) {
    let html = `<link rel="stylesheet" type="text/css" media="screen" href="css/style.css" />`;
    $("head").append(html);
  }
}

function localSafe() {
  //выводить содержимое local storage
  let obj = {};
  for (var i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    let value = JSON.parse(localStorage.getItem(key));
    obj[key] = value;
  }
  console.log(obj);
}
