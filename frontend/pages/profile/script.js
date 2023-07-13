
async function setUserData(){
      const user=JSON.parse(localStorage.getItem('user'));

      if(!user)
      {
         window.location.href="../login/index.html"
         return;
      }

      // console.log(user);

      //setting profile card 
      document.getElementById("cardName").innerText=user.salutation +" "+ user.firstName+" "+ user.lastName?user.lastName:"";
      document.getElementById("cardEmail").innerText=user.email;
      if(user.organization) document.getElementById("cardOrganization").innerHTML=user.organization;

      //setting profile data
      document.getElementById('salutation').value=user.salutation;
      document.getElementById('firstName').value=user.firstName;
      document.getElementById('lastName').value=user.lastName
      document.getElementById('email').value=user.email
      document.getElementById('phoneNo').value=user.phoneNo
      document.getElementById('nationality').value=user.nationality
      document.getElementById('category').value=user.category
      if(user.noOfPapers) document.getElementById('noOfPapers').value=user.noOfPapers
      if(user.paperId) document.getElementById('paperId').value=user.paperId
      if(user.organization) document.getElementById('organization').value=user.organization
      if(user.amount) document.getElementById('amount').value=user.amount
      if(user.transactionRefNo) document.getElementById('transactionRefNo').value=user.transactionRefNo

}

setUserData();

document.getElementById('updateButton').addEventListener('click',function(event){

   const user=JSON.parse(localStorage.getItem('user'));

   event.preventDefault();

   //loader
   const alertBox=document.getElementById('msg');
   alertBox.className="spinner-border text-success";

   //getting all the updated data
   let salutation=document.getElementById('salutation').value
   let firstName=document.getElementById('firstName').value
   let lastName=document.getElementById('lastName').value
   let email=document.getElementById('email').value
   let phoneNo=document.getElementById('phoneNo').value
   let nationality=document.getElementById('nationality').value
   let category=document.getElementById('category').value
   let noOfPapers= document.getElementById('noOfPapers').value
   let paperId=document.getElementById('paperId').value
   let organization=document.getElementById('organization').value
   let amount=document.getElementById('amount').value;
   let transactionRefNo=document.getElementById('transactionRefNo').value;

   async function updateUserData(data) {
      try {
        const response = await fetch(`https://icmmmi-backend.onrender.com/api/user/update/${user.userId}`, {
          method: "PUT", 
          headers: {
            "Content-Type": "application/json",
            'Authorization':`Bearer ${user.token}`
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
          alertBox.innerText="Data Updated successfully";
         //  console.log(json);

         const updatedUser={
            userId:user.userId,
            token:user.token,
            salutation,firstName,lastName,nationality,email,phoneNo,organization,category,noOfPapers,paperId,amount,transactionRefNo
         }
         localStorage.setItem('user',JSON.stringify(updatedUser));
          
        }  
        
      } catch (error) {
        console.log(error);
       
        const alertBox=document.getElementById('msg');
        alertBox.className="alert alert-danger";
        alertBox.innerText=error;
      }
    }
    
    const data = { salutation,firstName,lastName,nationality,email,phoneNo,organization,category,noOfPapers,paperId,amount,transactionRefNo };
   //  console.log(data);
    updateUserData(data);


})