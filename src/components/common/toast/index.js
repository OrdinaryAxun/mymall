import Toast from "./Toast";

//插件封装法
const myToast = {}
myToast.install = function (vue) {
  // document.body.appendChild(Toast.$el)

  //1,创建组件构造器
  const toastContrustor = vue.extend(Toast);

  //2,new的方式，根据组件构造器可以创建出组件对象
  const toast = new toastContrustor();

  //3,将组件对象手动挂载到某一元素
  toast.$mount(document.createElement('div'));

  //4,toast.$el对应的就是div
  document.body.appendChild(toast.$el);

  //5,将myToast挂载到Vue原型上
  vue.prototype.$Toast = toast;

}

export default myToast
