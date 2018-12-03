//虚拟dom
/*
<ul class="list">
    <li>a</li>
    <li>b</li>
    <li>c</li>
    <li>d</li>
</ul>
*/
// {
//     taggetName,
//     props,
//     children
// }
import {createElement} from "./element.js";
import {domDiff} from "./dom-diff.js"
// import {sjh} from "./SJH.js";

// let SJH = sjh();
// console.log(SJH)

let virtualDom1 = createElement("ul",{class:"list"},[
    createElement("li",{class:"item"},["a"]),
    createElement("li",{class:"item"},["b"]),    
    createElement("li",{class:"item"},["c"]),
    createElement("li",{class:"item"},["d"]),
]);

let virtualDom2 = createElement("ul",{class:"list-item"},[
    createElement("li",{class:"item"},["1"]),
    createElement("li",{class:"item"},["c"]), //无法自动将virtualDom1的元素提前，只能判断为replace
    createElement("li",{class:"item"},["d"]),
    createElement("li",{class:"item"},["k"]),
    createElement("li",{class:"item"},["10"]),
]);

//dom diff
console.log(virtualDom1);
console.log(virtualDom2);


// 补丁包
// {
//     0:{type: "ATTRS", attrs:{class:"list-item"}},
//     2:{tyep:"TEXT", text:1},
//     8:{tyep:"TEXT", text:4}
// }
//1.{type: "ATTRS", attrs:{class:"list-item"}}
//2.{type:"REMove", index:3}
//3.{tyep:"TEXT", text:1}
//4.{type:"REPLACE", newNode:newNode}

//=======假设用户这个时候调用setState====

//将虚拟dom 渲染到页面
//$dom => VirtualDom1 => oldTree
// let $dom = render(virtualDom1);
// renderDom($dom, document.getElementById('app'));

//得到补丁包
const patche = domDiff(virtualDom1, virtualDom2);
//将补丁包直接更新到dom
// Patchs($dom,$patche)
console.log("得到的补丁包",patche);



