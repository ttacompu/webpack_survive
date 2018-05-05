export default (text = 'testing on travis caching!') =>{
const element = document.createElement('div');
element.innerHTML = text;
return element;
}