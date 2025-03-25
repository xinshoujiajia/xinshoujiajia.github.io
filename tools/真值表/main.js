function complement(A){
  return !A;
}

function union(A,B){
  return A||B;
}

function intersection(A,B) {
  return A&&B;
}

let selectList = [];
let strMap = new Map();
let varName = [];
let funcList = [];
let varMap = {
  A:0,
  B:0,
  C:0,
  D:0
};

selectList.push(document.getElementById('A'));
selectList.push(document.getElementById('B'));
selectList.push(document.getElementById('C'));
selectList.push(document.getElementById('D'));

strMap.set("补","complement");
strMap.set("并","union");
strMap.set("交","intersection");
strMap.set("A","varMap.A");
strMap.set("B","varMap.B");
strMap.set("C","varMap.C");
strMap.set("D","varMap.D");

// 定义一个函数，用于根据Map替换字符串
function replaceWithMap(inputString) {
  // 将输入字符串克隆一下，避免直接修改原始字符串
  let resultString = inputString;

  // 遍历Map对象
  for (let [key, value] of strMap.entries()) {
    // 使用正则表达式确保全局替换所有出现的key
    const regex = new RegExp(key, 'g');
    resultString = resultString.replace(regex, value);
  }

  return resultString;
}

function recursion(index = 0) {
  if(index == varName.length){
    const row = document.createElement('tr');
    const tdValue = document.createElement('td');
    
    let tmp = [];
    varName.forEach(v => {
      tmp.push(varMap[v]);
    });
    
    tdValue.appendChild(document.createTextNode(tmp.join('\t')));
    row.appendChild(tdValue);
    
    funcList.forEach(func => {
      //result = func();
      const td = document.createElement('td');
      td.appendChild(document.createTextNode(Number(func())));
      row.appendChild(td);
    });
    table.appendChild(row);
    return;
  }
  
  varMap[varName[index]]=1;
  recursion(index+1);
  
  varMap[varName[index]]=0;
  recursion(index+1);
}

// 获取按钮和容器元素
const createTextBoxBtn = document.getElementById('createTextBoxBtn');
const textBoxContainer = document.getElementById('textBoxContainer');

// 添加按钮点击事件监听器
createTextBoxBtn.addEventListener('click', () => {
  // 创建一个新的容器div，用于包裹输入框和删除按钮
  const inputContainer = document.createElement('div');
  inputContainer.className = 'input-container';

  // 创建一个新的文本框元素
  const textBox = document.createElement('input');
  textBox.type = 'text'; // 设置类型为文本
  textBox.placeholder = '输入表达式...'; // 设置占位符

  // 创建一个新的删除按钮元素
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '删除';
  deleteBtn.className = 'delete-btn';

  // 为删除按钮添加点击事件监听器
  deleteBtn.addEventListener('click', () => {
    // 删除包含文本框和删除按钮的整个容器
    textBoxContainer.removeChild(inputContainer);
  });

  // 将文本框和删除按钮添加到容器中
  inputContainer.appendChild(textBox);
  inputContainer.appendChild(deleteBtn);

  // 将整个容器添加到主容器中
  textBoxContainer.appendChild(inputContainer);
});

const updateBtn = document.getElementById('updateBtn');

const tableContainer = document.getElementById('tableContainer');
let table;

// 添加按钮点击事件监听器
updateBtn.addEventListener('click', () => {
  const inputBoxes = textBoxContainer.querySelectorAll('input[type="text"]');
  
  varName = [];
  selectList.forEach(select => {
    if (select.value == 'x') {
      varName.push(select.id);
    } else {
      varMap[select.id] = Number(select.value);
    }
  });
  
  if(table){
    tableContainer.removeChild(table);
  }
  
  table = document.createElement('table');
  const headerRow = document.createElement('tr');
  const th = document.createElement('th');
  th.appendChild(document.createTextNode(varName.join('\t')));
  headerRow.appendChild(th);
  
  
  funcList = [];
  
  inputBoxes.forEach(box => {
    const rawString = box.value;
    const funString = replaceWithMap(rawString);
    const func = new Function(`return ${funString};`);
    const th = document.createElement('th');
    th.appendChild(document.createTextNode(rawString));
    headerRow.appendChild(th);
    funcList.push(func);
  });
  
  table.appendChild(headerRow);
  
  tableContainer.appendChild(table);
  recursion();
});