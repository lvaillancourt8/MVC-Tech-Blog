const newPostFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#post-title').value;
    const contents = document.querySelector('#post-text').value;
    console.log(title, contents);
  
    if (title && contents) {
      const response = await fetch('/api/post', {
        method: 'PUT',
        body: JSON.stringify({ title, contents }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to post.');
      }
    }
  };
  
  // document
  //   .querySelector('#post-form')
  //   .addEventListener('submit', newPostFormHandler);
  const update = document.querySelector('#post-form');
  update.addEventListener('submit', signupFormHandler);