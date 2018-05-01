export default (text = 'hello world 13')=>{
const element = document.createElement('div');
element.innerHTML = text;
return element;
}