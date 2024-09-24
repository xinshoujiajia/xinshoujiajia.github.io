function complement(A){
  return !A;
}

function union(A,B){
  return A||B;
}

function intersection(A,B) {
  return A&&B;
}

let varMap = {
  A: 0,
  B: 0,
  C: 0,
  D: 0
};

let selectList = [];
let varName = [];
let funcList = [];

selectList.push(document.getElementById('A'));
selectList.push(document.getElementById('B'));
selectList.push(document.getElementById('C'));
selectList.push(document.getElementById('D'));

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
  inputContainer.appendChild(deleteBtn);
  createSelect(inputContainer);

  // 将整个容器添加到主容器中
  textBoxContainer.appendChild(inputContainer);
});

const updateBtn = document.getElementById('updateBtn');

const tableContainer = document.getElementById('tableContainer');
let table;

// 添加按钮点击事件监听器
updateBtn.addEventListener('click', () => {
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
  
  const inputBoxes = textBoxContainer.childNodes;
  funcList = [];
  inputBoxes.forEach(box => {
    const func = analysis(box);
    const th = document.createElement('th');
    th.appendChild(document.createTextNode(getText(box)));
    headerRow.appendChild(th);
    funcList.push(func);
  });
  
  table.appendChild(headerRow);
  
  tableContainer.appendChild(table);
  recursion();
});

function createSelect(parent) {
  const elem = document.createElement('select');
  const options = [
  { value: 'A', text: 'A' },
  { value: 'B', text: 'B' },
  { value: 'C', text: 'C' },
  { value: 'D', text: 'D' },
  { value: 'bu', text: '补' },
  { value: 'bin', text: '并' },
  { value: 'jiao', text: '交' }
  ];
  
  options.forEach(option => {
    const opt = document.createElement('option');
    opt.value = option.value;
    opt.textContent = option.text;
    elem.appendChild(opt);
  });
  
  elem.addEventListener('change',function() {
    const parentElement = elem.parentElement;
    //console.log(parentElement.querySelector('> .para1'));
    let para1 = null;//parentElement.querySelector('> .para1');
    let para2 = null;//parentElement.querySelector('> .para2');
    parentElement.childNodes.forEach(child =>{
      if(child.className=='para1')para1=child;
      if(child.className=='para2')para2=child;
    });
    switch (elem.value) {
      case 'bu':
        if(!para1){
          para1 = document.createElement('span');
          para1.className = 'para1';
          createSelect(para1);
          parentElement.appendChild(document.createTextNode('('));
          parentElement.appendChild(para1);
          parentElement.appendChild(document.createTextNode(')'));
        }
        if(para2){
          parentElement.removeChild(para2);
        }
        break;
      case 'bin':  
      case 'jiao':
        if (!para1) {
          para1 = document.createElement('span');
          para1.className = 'para1';
          createSelect(para1);
          parentElement.appendChild(document.createTextNode('('));
          parentElement.appendChild(para1);
          parentElement.appendChild(document.createTextNode(','));
        }
        if (!para2) {
          para2 = document.createElement('span');
          para2.className = 'para2';
          createSelect(para2);
          parentElement.appendChild(para2);
          parentElement.appendChild(document.createTextNode(')'));
        }
        break;
      
      default:
        if(para1){
          parentElement.removeChild(para1);
        }
        if(para2){
          parentElement.removeChild(para2);
        }
    }
  });
  
  parent.appendChild(elem);
}

function analysis(parent){
  let select = parent.querySelector('select');
  let str = select.value;
  
  let para1 = null;
  let para2 = null;
  let v1 = null;
  let v2 = null;
  
  parent.childNodes.forEach(child => {
    if (child.className == 'para1') para1 = child;
    if (child.className == 'para2') para2 = child;
  });
  
  if(para1){
    v1 = analysis(para1);
  }
  if(para2){
    v2 = analysis(para2);
  }
  switch(str){
    case 'bu':
      return ()=>complement(v1());
    case 'bin':
      return ()=>union(v1(),v2());
    case 'jiao':
      return ()=>intersection(v1(),v2());
    default:
      return ()=>varMap[str];
  }
}
function getText(parent) {
  let select = parent.querySelector('select');
  let str = select.value;

  let para1 = null;
  let para2 = null;
  let v1 = null;
  let v2 = null;

  parent.childNodes.forEach(child => {
    if (child.className == 'para1') para1 = child;
    if (child.className == 'para2') para2 = child;
  });

  if (para1) {
    v1 = getText(para1);
  }
  if (para2) {
    v2 = getText(para2);
  }
  switch (str) {
    case 'bu':
      return `补(${v1})`;
    case 'bin':
      return `并(${v1},${v2})`;
    case 'jiao':
      return `交(${v1},${v2})`;
    default:
      return str;
  }
}