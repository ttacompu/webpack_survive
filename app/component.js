export default (text = 'hello world 10') =>{
const element = document.createElement('div');
element.innerHTML = text;
return element;
}