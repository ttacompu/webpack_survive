export default (text = 'from windows!') =>{
const element = document.createElement('div');
element.innerHTML = text;
return element;
}