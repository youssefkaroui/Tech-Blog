const loginFormHandler = async (event) => {
    event.preventDefault();
  
    const userEmail = document.querySelector('#email-login').value.trim();
    const userPassword = document.querySelector('#password-login').value.trim();
  
    if (userEmail && userPassword) {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ userEmail, userPassword }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      const results = await response.json();
      console.log(results);
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText + "\nIncorrect email or password, please try again.");
      }
    }
  };
  
  let loginForm = document 
    .querySelector('.login-form')
    if (loginForm){
      loginForm.addEventListener('submit', loginFormHandler);
    }