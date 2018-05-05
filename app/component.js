export default (text = 'travis working fne now!') =>{
const element = document.createElement('div');
element.innerHTML = text;
return element;
}