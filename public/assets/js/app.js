const wrapperEl = document.getElementById("wrapper");
const switchEl = document.getElementById("switch");
const lightWrapper = document.getElementById("light");
const lightEls = document.querySelectorAll("[data-light]");

switchEl.addEventListener("click", () => {
   if (hasClass(wrapperEl, "active") !== false) {
      LampSwitch(0);
   } else {
      LampSwitch(1);
   }
});
lightWrapper.addEventListener("click", (event) => {
   const target = event.target;
   if (target.nodeName.toLowerCase() === "span") {
      LampLight(target.dataset.light);
   }
});

const controlLight = (el, target) => {
   for (let i = 0; i < el.length; i++) {
      if (el[i].dataset.light <= target) {
         addClass(el[i], "active");
         addClass(wrapperEl, "active");
      } else {
         removeClass(el[i], "active");
      }
   }
};
const hasClass = (el, className) => {
   let classes = el.getAttribute("class").split(" ");
   if (classes.indexOf(className) === -1) {
      return false;
   } else {
      return classes.indexOf(className);
   }
};
const addClass = (el, className) => {
   let classes = el.getAttribute("class").split(" ");
   if (!hasClass(el, className)) {
      classes.push(className);
   }
   el.setAttribute("class", classes.join(" "));
};
const removeClass = (el, className) => {
   let classes = el.getAttribute("class").split(" ");
   if (hasClass(el, className)) {
      classes.splice(hasClass(el, className), 1);
   }
   el.setAttribute("class", classes.join(" "));
};
const LampSwitch = (state) => {
   axios.post("/api/switch", { // eslint-disable-line
      status: state
   }).then(response => {
      console.log(response);
      if (hasClass(wrapperEl, "active") !== false) {
         removeClass(wrapperEl, "active");
         controlLight(lightEls, 0);
      } else {
         addClass(wrapperEl, "active");
         controlLight(lightEls, 1);
      }
   }).catch(error => {
      console.log(error);
   });
};
const LampLight = (state) => {
   let light = 0;
   switch (state) {
      case "1": light = 51; break;
      case "2": light = 102; break;
      case "3": light = 153; break;
      case "4": light = 204; break;
      case "5": light = 255; break;
   }
   axios.post("/api/brightness", { // eslint-disable-line
      light
   }).then(response => {
      console.log(response);
      controlLight(lightEls, state);
   }).catch(error => {
      console.log(error);
   });
};
