import getPosts from "../practice-2/functions/function-getPosts.js";
import createTable from "../practice-2/functions/function-createTable.js";
const postTable = document.getElementById('table-js');
const postTableBody = document.getElementById('tbody-js');

let posts = [];
let postsSorted = [];
let postsSearch = [];
let inputText = '';
async function displayPostsAsync() {
  try {
    posts = await getPosts();
    postTable.appendChild(createTable(posts));
    postsSorted = Array.from(posts);
    attachEventListeners();
  } catch (error) {
    console.log('Ошибка при обработке постов:', error);
    postTableBody.innerHTML = 'Ошибка при загрузке данных!';
  }
}
document.addEventListener('DOMContentLoaded', ()=> displayPostsAsync())


function sortedTable(objKey, val){
  if(val) {
    return postsSorted.sort((a, b) => {
      if (typeof a[objKey] === 'number') {
        return a[objKey] - b[objKey]
      } else {
        return a[objKey].localeCompare(b[objKey])
      }
    })
  }
  return postsSorted.sort((a, b) => {
    if(typeof a[objKey] === 'number'){
      return b[objKey] - a[objKey]
    } else {
      return b[objKey].localeCompare(a[objKey])
    }
  });
}

function attachEventListeners(){

  const headers = [
    {elem:document.getElementById('user-id-js'), key:'userId', val:false},
    {elem:document.getElementById('id-js'), key:'id', val:false},
    {elem:document.getElementById('title-js'), key:'title', val:false},
    {elem:document.getElementById('body-js'), key:'body', val:false},
  ]

  headers.forEach((elem) => {
    elem.elem.addEventListener("click", ()=>{
      sortedTable(elem.key, !elem.val);
      if (postsSearch.length === 0) {
        updateTable(postsSorted)
      } else {
        updatePostsSearch(inputText)
        updateTable(postsSearch)
      }
      elem.val = !elem.val;
      const arrow = elem.elem.querySelector('img');
      if(!arrow.classList.contains('open-sort-icon')){
        arrow.classList.add('open-sort-icon')
      }
      if(!elem.val){
        arrow.classList.add('rotate-180');
      } else {
        arrow.classList.remove('rotate-180');
      }

      headers.forEach(el=>{
        if(el !== elem) {
          el.val = false
          const imageArrow = el.elem.querySelector('img');
          imageArrow.classList.remove('rotate-180');
          if(imageArrow.classList.contains('open-sort-icon')){
            imageArrow.classList.remove('open-sort-icon')
          }
        }
      })
    })
  })
}

function updateTable(arr) {
  postTable.removeChild(postTable.lastChild)
  postTable.appendChild(createTable(arr));
}

function updatePostsSearch(inputText) {
  postsSearch = postsSorted.filter(elem => {
    const titleText = elem.title.replace(/\n/g, '').replaceAll(' ', '').toLowerCase().includes(inputText);
    const titleBody = elem.body.replace(/\n/g, '').replaceAll(' ', '').toLowerCase().includes(inputText);
    return (titleText || titleBody)
  })
}

const searchInput = document.getElementById('searchInput')
searchInput.addEventListener('input', (evt)=>{
  inputText = evt.target.value.replaceAll(' ', '').toLowerCase();
  if(inputText.length >= 3){
    updatePostsSearch(inputText);
    updateTable(postsSearch)
  } else {
    if(postsSearch.length !== 0) postsSearch = [];
    updateTable(postsSorted)
  }

})


