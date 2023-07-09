//admin-login

let adminLoginForm=document.getElementById('admin-login-form');

adminLoginForm.addEventListener('submit',function(event){

    //prevents form from auto submitting
    event.preventDefault();

    //loader
    const alertBox=document.getElementById('msg-admin-login');
    alertBox.innerText="";
    alertBox.className="spinner-border text-success";


    
    let email=document.getElementById('admin-email').value;
    let password=document.getElementById('admin-password').value;

    // console.log(email,password)

    async function postFormData(data) {
        try {
          const response = await fetch("https://icmmmi-backend.onrender.com/api/admin/login", {
            method: "POST", 
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
          const json=await response.json();
          
          if (!response.ok) {
            throw new Error(json.error);
            }
          if(response.ok)
          {
            const alertBox=document.getElementById('msg-admin-login');
            alertBox.className="alert alert-success";
            alertBox.innerHTML="Logged in Successfully";
            // console.log(json);
            localStorage.setItem('admin',JSON.stringify(json));

            window.location.href = "../admin-dashboard/index.html";
            
          }  
          
        } catch (error) {
          console.log(error);
         
          const alertBox=document.getElementById('msg-admin-login');
          alertBox.className="alert alert-danger";
          alertBox.innerHTML=error;
        }
      }
      
      const data = {email,password};
      postFormData(data);
      
})



//user login
let userLoginForm=document.getElementById('user-login-form');

userLoginForm.addEventListener('submit',function(event){

    //prevents form from auto submitting
    event.preventDefault();

    //loader
    const alertBox=document.getElementById('msg-user-login');
    alertBox.innerText=""
    alertBox.className="spinner-border text-success";


    
    let email=document.getElementById('user-email').value;
    let password=document.getElementById('user-password').value;

    // console.log(email,password)

    async function postFormData(data) {
        try {
          const response = await fetch("https://icmmmi-backend.onrender.com/api/user/login", {
            method: "POST", 
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
          const json=await response.json();
          
          if (!response.ok) {
            throw new Error(json.error);
            }
          if(response.ok)
          {
            const alertBox=document.getElementById('msg-user-login');
            alertBox.className="alert alert-success";
            alertBox.innerHTML="Logged in Successfully";
            // console.log(json);
            localStorage.setItem('user',JSON.stringify(json));

            window.location.href = "#";
            
          }  
          
        } catch (error) {
          console.log(error);
         
          const alertBox=document.getElementById('msg-user-login');
          alertBox.className="alert alert-danger";
          alertBox.innerHTML=error;
        }
      }
      
      const data = {email,password};
      postFormData(data);
      
})