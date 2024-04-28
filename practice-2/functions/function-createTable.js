export default function createTable(posts){
  const tbody = document.createElement("tbody");
  tbody.id = "tbody-js";

  posts.forEach(elem => {
    const tableRow = document.createElement('tr');
    Object.values(elem).forEach(content => {
      const tableCell = document.createElement('td');
      tableCell.textContent = `${content}`;
      tableRow.appendChild(tableCell);
    })
    tbody.appendChild(tableRow);
  })

  return tbody
}
