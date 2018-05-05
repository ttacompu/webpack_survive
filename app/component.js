export default (text = 'travis alway failed!!!') =>{
const element = document.createElement('div');
element.innerHTML = text;
return element;
}