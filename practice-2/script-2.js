
import getPosts from "./functions/function-getPosts.js";
import createTable from "./functions/function-createTable.js";

async function displayPostsAsync() {
  const postTable = document.getElementById('table-js')
  const postTitleBody = document.getElementById('tbody-js');
  try {
    const posts = await getPosts();
    postTable.appendChild(createTable(posts));
  } catch (error) {
    console.log('Ошибка при обработке постов:', error);
    postTitleBody.innerHTML = 'Ошибка при загрузке данных!';
  }
}
document.addEventListener('DOMContentLoaded', ()=>displayPostsAsync());
