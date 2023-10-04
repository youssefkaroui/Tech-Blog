const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const userName = document.querySelector('#name-signup').value.trim();
    const userEmail = document.querySelector('#email-signup').value.trim();
    const userPassword = document.querySelector('#password-signup').value.trim();
  
    if (userName && userEmail && userPassword) {
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({ userName, userEmail, userPassword }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      const results = await response.json();
      console.log(results);
      
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
  };
  
  let signupForm = document
    .querySelector('.signup-form')
    if (signupForm){
      signupForm.addEventListener('submit', signupFormHandler);
    }