export default function getPosts() {
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
