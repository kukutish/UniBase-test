function getPosts() {
  return fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      return response.json()
    })
    .catch(error => {
      console.log('Ошибка при получении постов:', error)
      throw error
    });
}

async function displayPostsAsync() {
  const postTable = document.getElementById('postTable')
  try {
    const posts = await getPosts();
    postTable.appendChild(createTable(posts));
  } catch (error) {
    console.log('Ошибка при обработке постов:', error);
    postTable.innerHTML = 'Ошибка при загрузке данных!';
  }
}

document.addEventListener('DOMContentLoaded', ()=>displayPostsAsync())

function createTable(posts){
  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");

  table.classList.add('post-table');

  const headerRow = document.createElement("tr");
  Object.keys(posts[0]).forEach(key => {
    const headerCell = document.createElement("th");
    headerCell.textContent = key;
    headerRow.appendChild(headerCell);
  });
  thead.appendChild(headerRow);

  posts.forEach(elem => {
    const tableRow = document.createElement("tr")
    Object.values(elem).forEach(content => {
      const tableCell = document.createElement("td");
      tableCell.textContent = `${content}`;
      tableRow.appendChild(tableCell);
    })
    tbody.appendChild(tableRow);
  })

  table.appendChild(thead);
  table.appendChild(tbody);

  return table
}

export {getPosts, createTable}
