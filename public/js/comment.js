const commentHandler = async (event) => {
    event.preventDefault();
  
    const body = document.querySelector('#comment-body').value.trim();
    const urlArray = location.href.split('/'); 
    const postId = urlArray[urlArray.length - 1]
  
    console.log(body);
    
    if (body && postId) {
      const response = await fetch('/api/comments/', {
        method: 'POST',
        body: JSON.stringify({ body, postId }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      const results = await response.json();
      console.log(results);
      
      if (response.ok) {
        console.log("Comment successfully added!")
        console.log(body);
        document.location.replace(`/posts/${postId}`);
      } else {
        alert(response.statusText);
      }
    }
  };
  
  let commentForm = document
    .querySelector('.comment-form')
    if (commentForm){
      commentForm.addEventListener('submit', commentHandler);
    }