//1.先存原始数据
var goods = [
  { id: 1, pname: "小米", price: 3999 },
  { id: 2, pname: "OPPO", price: 999 },
  { id: 3, pname: "荣耀", price: 1299 },
  { id: 4, pname: "华为", price: 1999 },
];
//2.默认展示全部数据
var targetGoods = [];
//获取元素
var tbody = document.querySelector("tbody");
var btn = document.querySelector("button");
//根据数据创建表格
function createTr() {
  for (let i = 0; i < targetGoods.length; i++) {
    let dataContent = "<tr><td></td><td></td><td></td></tr>";
    tbody.insertAdjacentHTML("beforeend", dataContent);
  }
}
//写入数据到td
function writeTd() {
  //先获取td
  /*   let td = document.querySelectorAll("td");
  //   console.log(td);
  let info = [];
  targetGoods.forEach(function (value) {
    value.forEach(function (value) {
      info.push(value);
    });
  });
  for (let i = 0; i < td.length; i++) {
    td[i].innerHTML = info[i];
  } */
}
function writeData() {
  targetGoods = getData();
  console.log(targetGoods);
  //写数据之前用foreEach创建tr td
  targetGoods.forEach(function (value) {
    let tr = document.createElement("tr");
    tr.innerHTML =
      "<td>" +
      value.id +
      "</td><td>" +
      value.pname +
      "</td><td>" +
      value.price +
      "</td>";
    tbody.appendChild(tr);
  });
}
function clearData() {
  //另外方法
  //   tbody.innerHTML = "";
  let tr = document.querySelectorAll("tbody tr");
  tr.forEach(function (value) {
    tbody.removeChild(value);
  });
}
function getData() {
  //先获取元素
  let min = document.querySelector(".min").value;
  let max = document.querySelector(".max").value;
  let goodsName = document.querySelector(".goodsName").value;
  //   console.log(goodsName);
  //获取元素的value
  //如果查询条件均为空 返回原始数组
  if (goodsName) {
    targetGoods = goods.filter(function (value) {
      // console.log(value.pname);
      return goodsName === value.pname;
    });
  }
  if (!min && !max && !goodsName) {
    return goods;
  }
  if (min || max) {
    targetGoods = goods.filter(function (value) {
      if (min && max) {
        return value.price >= min && value.price <= max;
      } else if (min) {
        return value.price >= min;
      } else if (max) {
        return ivalue.price <= max;
      }
    });
    // console.log(target);
  }
  return targetGoods;
}
//默认展示全部数据
writeData();
//根据条件查询数据
btn.addEventListener("click", function () {
  //每次查询清除上次的数据
  clearData();
  //   console.log(targetGoods);
  writeData();
  //   targetGoods = goods;
  console.log(goods);
});
