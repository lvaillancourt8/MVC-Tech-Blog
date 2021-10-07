const updateFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#post-title').value;
    const contents = document.querySelector('#post-text').value;
    const id = document.querySelector('#post-id').value;
    console.log(title, contents);
  
    if (title && contents) {
      const response = await fetch('/api/post/update/' + id, {
        method: 'PUT',
        body: JSON.stringify({ title, contents }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to update post.');
      }
    }
  };

  const deleteFormHandler = async (event) => {
    event.preventDefault();

    const id = document.querySelector('#post-id').value;
    
      const response = await fetch('/api/post/delete/' + id, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to delete post.');
      }
    };
  
  const updatePost = document.querySelector('#post-form');
  updatePost.addEventListener('submit', updateFormHandler);

  const deletePost = document.querySelector('#deleteButton');
  deletePost.addEventListener('click', deleteFormHandler);
  