const commentFormHandler = async (event) => {
    event.preventDefault();
  
    const comment = document.querySelector('#text-comment').value;
    const post_id = document.querySelector('#post-id').value;
  console.log(comment, post_id)
    if (comment && post_id) {
      const response = await fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify({ comment, post_id }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        window.location.reload;
      } else {
        alert('Failed to post comment.');
      }
    }
  };  

  const commentForm = document.querySelector('#comment-form');
  commentForm.addEventListener('submit', commentFormHandler);
