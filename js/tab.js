var that;
class Tab {
  constructor(id) {
    //把this对象给that
    that = this;
    this.main = document.querySelector(id);
    //获取元素
    this.add = this.main.querySelector("button");
    this.ul = this.main.querySelector(".top ul");
    this.div = this.main.querySelector(".content");
    // console.log(this.lis);
    this.init();
  }
  init() {
    //先获取元素
    this.updateNode();
    //初始化时 绑定点击事件
    this.add.onclick = this.addTab;
    for (var i = 0; i < this.lis.length; i++) {
      this.lis[i].index = i;
      this.lis[i].onclick = this.switchTab;
      this.close[i].onclick = this.delTab;
      this.content[i].ondblclick = this.editTab;
      this.section[i].ondblclick = this.editTab;
    }
  }
  //获取元素
  updateNode() {
    this.content = this.main.querySelectorAll(".top ul li span:first-child");
    this.section = this.main.querySelectorAll("section");
    this.lis = this.main.querySelectorAll("li");
    this.close = this.main.querySelectorAll(".close");
  }
  //清除样式
  clearClass() {
    //add之后需要重新获取元素的个数
    this.lis = this.main.querySelectorAll("li");
    this.section = this.main.querySelectorAll("section");
    console.log(this.lis);
    for (var i = 0; i < this.lis.length; i++) {
      this.lis[i].className = "";
      this.section[i].className = "";
    }
  }
  //1.切换功能
  switchTab() {
    // console.log(this.index);
    //排他思想 先清除再点击 注意这里的调用 that
    that.clearClass();
    //当点击时 设置li下边框为白色
    this.className = "current";
    that.section[this.index].className = "contentCurrent";
  }
  //2.新增功能
  addTab() {
    //思路 点击+ 时 追加li 和section 并添加到父元素中
    //追加元素之前 清除之前的显示元素
    that.clearClass();
    var li = "<li class='current'>1<span class='close'>x</span></li>";
    that.ul.insertAdjacentHTML("beforeend", li);
    var section = "<section class='contentCurrent'>1</section>";
    that.div.insertAdjacentHTML("beforeend", section);
    //为新添加的元素绑定点击事件
    that.updateNode();
    // console.log(that.close);
    that.init();
  }
  //3.删除功能
  delTab(e) {
    //阻止事件冒泡 li
    e.stopPropagation();
    //根据当前li的索引 删除li section
    var index = this.parentNode.index;
    console.log(index);
    that.lis[index].remove();
    that.section[index].remove();
    //当我们删除当前li 让之前的一个li处于选定状态
    //方法1 更改li section的class
    /* if (index > 0) {
      that.clearClass();
      that.lis[index - 1].className = "current";
      that.section[index - 1].className = "contentCurrent";
    } else if (index === 0 && that.lis.length != 1) {
      that.clearClass();
      that.lis[index + 1].className = "current";
      that.section[index + 1].className = "contentCurrent";
    } */
    //方法2 让前一个li  执行点击事件
    //需要更新index
    that.init();
    //如果删除的不是当前选定li 则不改变
    if (document.querySelector(".current")) {
      return;
    }
    if (index > 0) {
      index--;
      that.lis[index].click();
    } else if (index === 0 && that.lis.length >= 1) {
      that.lis[index].click();
    }
    // that.lis[index] && that.lis[index].click();
  }
  //4.修改标签文字 双击事件 ondbclick
  editTab() {
    //双击禁止选定文字
    window.getSelection
      ? window.getSelection().removeAllRanges()
      : document.getSelection.empty();
    //获取li中文字
    var str = this.innerText;
    console.log(str);
    this.innerHTML = "<input type= 'text'/>";
    var input = this.children[0];
    input.value = str;
    //双击后选中文字
    input.select();
    //当离开文本框 把文本框的值给span
    input.onblur = function () {
      this.parentNode.innerText = this.value;
    };
    //Enter
    input.onkeyup = function (e) {
      if (e.keyCode === 13) {
        this.blur();
      }
    };
  }
}
var tab = new Tab(".main");
