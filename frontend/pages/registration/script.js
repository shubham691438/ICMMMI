
// Setting amount


updateAmountValue();
document.getElementById('nationality').addEventListener('input', function(event) {
  updateAmountValue();
});

document.getElementById('category').addEventListener('input', function(event) {
  updateAmountValue();
});

function updateAmountValue() {
    // Indian Nationals
  const indianDelegateIndustryEarlyBird = 5000;
  const indianDelegateIndustryAfterNovember = 6000;

  const indianAcademiciansEarlyBird = 5000;
  const indianAcademiciansAfterNovember = 6000;

  const indianResearchScholarsStudentsEarlyBird = 3000;
  const indianResearchScholarsStudentsAfterNovember = 4000;

  const indianAccompanyingPersonsEarlyBird = 2000;
  const indianAccompanyingPersonsAfterNovember = 2500;

  // International
  const internationalDelegateIndustryEarlyBird = 250;
  const internationalDelegateIndustryAfterNovember = 300;

  const internationalAcademiciansEarlyBird = 150;
  const internationalAcademiciansAfterNovember = 200;

  const internationalResearchScholarsStudentsEarlyBird = 80;
  const internationalResearchScholarsStudentsAfterNovember = 100;

  const internationalAccompanyingPersonsEarlyBird = 80;
  const internationalAccompanyingPersonsAfterNovember = 100;

  const nationality = document.getElementById('nationality').value;
  const category = document.getElementById('category').value;
  let amount = 0;

  if (nationality === 'Indian') {
    switch (category) {
      case 'Delegates from Industry':{ 
        amount=indianDelegateIndustryEarlyBird
        break;}
      case 'Academician':{
        amount = indianAcademiciansEarlyBird;
        break;}
      case 'Research scholar or student':{
        amount = indianResearchScholarsStudentsEarlyBird;
        break;}
      case 'Accompanying persons':{
        amount = indianAccompanyingPersonsEarlyBird;
        break;}
    }
    document.getElementById('amount').value = "Rs "+amount;
  } else {
    // For International Nationals
    switch (category) {
      case 'Delegates from Industry':{
        amount=internationalDelegateIndustryEarlyBird;
        break;}
      case 'Academician':{
        amount = internationalAcademiciansEarlyBird;
        break;}
      case 'Research scholar or student':{
        amount = internationalResearchScholarsStudentsEarlyBird;
        break;}
      case 'Accompanying persons':{
        amount = internationalAccompanyingPersonsEarlyBird;
        break;}
    }
    document.getElementById('amount').value = "USD "+amount;
  }
  // console.log(nationality,category,amount)
  
}

//registration form
let form=document.getElementById('registration-form');

form.addEventListener('submit',function(event){

    //prevents form from auto submitting
    event.preventDefault();

    //loader
    const alertBox=document.getElementById('msg');
    alertBox.className="spinner-border text-warning";


    let salutation=document.getElementById('salutation').value;
    let firstName=document.getElementById('firstName').value;
    let lastName=document.getElementById('lastName').value;
    let nationality=document.getElementById('nationality').value;
    let category=document.getElementById('category').value;
    let organization=document.getElementById('organization').value;
    let noOfPapers=document.getElementById('noOfPapers').value;
    let paperId=document.getElementById('paperId').value;
    let email=document.getElementById('email').value;
    let phoneNo=document.getElementById('phoneNo').value;
    let password=document.getElementById('password').value;

    // console.log(salutation,firstName,lastName,nationality,category,organization,noOfPapers,paperId,email,phoneNo,password)

    async function postFormData(data) {
        try {
          const response = await fetch("https://icmmmi-backend.onrender.com/api/user/register", {
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
            alertBox.innerHTML="Registered Successfully";
            console.log(json);
            setTimeout(()=>{
                window.location.href = "../../index.html";
            },1000)
            
          }  
          
        } catch (error) {
          console.log(error);
         
          const alertBox=document.getElementById('msg');
          alertBox.className="alert alert-danger";
          alertBox.innerHTML=error;
        }
      }
      
      const data = { salutation,firstName,lastName,nationality,email,phoneNo,organization,category,noOfPapers,paperId,password };
      postFormData(data);
      
})