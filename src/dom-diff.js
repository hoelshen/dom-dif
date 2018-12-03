import {util} from './utils.js'

let patchs = {};
//全局索引

let globalIndex = 0;
function domDiff(oldTree, newTree){
    dfswalk(oldTree, newTree, globalIndex);
    return patchs;
}

function dfswalk(oldTree, newTree, globalIndex){
    //每个元素都有一补丁对象
    let currentPatchs = [];

    // 如果新节点不存在
    if(!newTree){
        currentPatchs.push({
            type: "REMOVE",
            globalIndex
        })
    }else if(util.isString(oldTree)){
        if(util.isString(newTree) && oldTree !== newTree){
            currentPatchs.push({
                type: "REPLACE",
                newNode: newTree
            })
        }
    } else if(oldTree.type === newTree.type){
        //两个节点的元素类型一致
        //比属性
        //比子节点
        diffChildrens(oldTree.children, newTree.children);
    }
   if(currentPatchs.length > 0) {
       patchs[globalIndex] = currentPatchs;
   }


}

function diffProps(){};

function diffChildrens(oldChildren, newChildren){
    oldChildren.forEach((child, idx) => {
        dfswalk(child, newChildren[idx], ++globalIndex)
    });
};

export{
    domDiff
}