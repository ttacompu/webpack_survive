export default (text = 'hello world 5')=>{
const element = document.createElement('div');
element.innerHTML = text;
return element;
}