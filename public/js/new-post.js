const newPostFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('input[id="post-title"]').value.trim();
    const contents = document.querySelector('input[id="post-text"]').value.trim();
    console.log(title, contents);
  
    if (title && contents) {
      const response = await fetch('/dashboard/add-post', {
        method: 'POST',
        body: JSON.stringify({ title, contents }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to post.');
      }
    }
  };
  
  document
    .querySelector('.post-form')
    .addEventListener('submit', newPostFormHandler);
  