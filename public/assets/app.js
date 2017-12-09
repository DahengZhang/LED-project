const wrapperEl = document.getElementById("wrapper");
const switchEl = document.getElementById("switch");
switchEl.addEventListener("click", () => {
   if (hasClass(wrapperEl, "active") !== false) {
      postData(0);
      removeClass(wrapperEl, "active");
   } else {
      postData(1);
      addClass(wrapperEl, "active");
   }
});

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
   if (!hasClass(wrapperEl, className)) {
      classes.push(className);
   }
   el.setAttribute("class", classes.join(" "));
};
const removeClass = (el, className) => {
   let classes = el.getAttribute("class").split(" ");
   if (hasClass(wrapperEl, className)) {
      classes.splice(hasClass(wrapperEl, className), 1);
   }
   el.setAttribute("class", classes.join(" "));
};

//发送请求
const postData = (state) => {
   axios.post('/api', {
      status: state
   }).then(function (response) {
      console.log(response);
   }).catch(function (error) {
      console.log(error);
   });
};
