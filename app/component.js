export default (text = 'proper caching with travis!') =>{
const element = document.createElement('div');
element.innerHTML = text;
return element;
}