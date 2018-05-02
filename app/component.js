export default (text = 'hello world 22') =>{
const element = document.createElement('div');
element.innerHTML = text;
return element;
}