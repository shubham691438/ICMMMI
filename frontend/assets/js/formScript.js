//SCRPT FOR CONTACT FORM
let contactForm=document.getElementById('contact-form');

contactForm.addEventListener('submit',function(event){

    //prevents form from auto submitting
    event.preventDefault();

    //loader
    const alertBox=document.getElementById('msg');
    alertBox.className="spinner-border text-success";


    let senderName=document.getElementById('name').value; 
    let senderEmail=document.getElementById('email').value;
    let subject=document.getElementById('subject').value;
    let msg=document.getElementById('message').value;
    

    // console.log(salutation,firstName,lastName,nationality,category,organization,noOfPapers,paperId,email,phoneNo,password)

    async function postFormData(data) {
        try {
          const response = await fetch("https://icmmmi-backend.onrender.com/api/send-mail", {
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
            const alertBox=document.getElementById('msg');
            alertBox.className="alert alert-success";
            alertBox.innerHTML="Message Sent Successfull!";
            console.log(json);
            
          }  
          
        } catch (error) {
          console.log(error);
         
          const alertBox=document.getElementById('msg');
          alertBox.className="alert alert-danger";
          alertBox.innerHTML=error;
        }
      }
      
      const data = {senderName,senderEmail,subject,msg};
      postFormData(data);
      
})
