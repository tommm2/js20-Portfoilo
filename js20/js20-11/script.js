const filter = document.getElementById('filter');
const postContainer = document.getElementById('post-container');
const loading = document.querySelector('.loader');

let limit = 5;
let page = 1;

// Fetch post from API
async function getPostData() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
  const data = await res.json();

  return data;
}

// Show loading & fetch
function showLoading() {
  loading.classList.add('show');
  setTimeout(() => {
    loading.classList.remove('show');
    
    // 頁數累加
    setTimeout(() => {
      page++;
      showPosts(); 
    }, 200);
  }, 2000)
}

// Filte the post
function filtePost(e) {
  const term = e.target.value.toUpperCase();
  const posts = document.querySelectorAll('.post');
  posts.forEach(item => {
    const title = item.querySelector('.post-title').innerText.toUpperCase();
    const body = item.querySelector('.post-body').innerText.toUpperCase();

    // 使用indexOf尋找與打出關鍵字符合的字，indexOf如果找不到匯回傳-1
    if(title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

// Show post in DOM
async function showPosts() {
  const post = await getPostData();
  post.forEach(item => {
    const postEl = document.createElement('div');
    postEl.classList.add('post');
    postEl.innerHTML = `
      <div class="number">${item.id}</div>
      <div class="post-info">
        <h2 class="post-title">${item.title}</h2>
        <p class="post-body">${item.body}</p>
      </div>
    `
    postContainer.appendChild(postEl);
  })
}


showPosts();

// Event Listeners
window.addEventListener('scroll', () => {
  // scrollTop: 是「內容」被捲動的距離，也就是內容頂端和捲軸頂端的相對距離。
  // scrollHeight: 也是元素所包含的「子元素」的「完整」寬度和高度，其中包含了超出捲軸之外的部分的寬度與高度。在沒有捲軸的情況下，這個值就等於
  // clentEhight: 是元素所包含的「子元素」的寬度/高度，其中包含了padding，但不包含邊界及捲軸。
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if(scrollTop + clientHeight >= scrollHeight) {
    showLoading();
  }
})

filter.addEventListener('input', filtePost);
