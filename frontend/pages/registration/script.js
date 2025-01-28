
// Setting amount


updateAmountValue();
document.getElementById('nationality').addEventListener('input', function(event) {
  updateAmountValue();
});

document.getElementById('category').addEventListener('input', function(event) {
  updateAmountValue();
});

function updateAmountValue() {
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

// let form=document.getElementById('registration-form');

// form.addEventListener('submit',function(event){
//   event.preventDefault();
  
//     let salutation=document.getElementById('salutation').value;
//     let firstName=document.getElementById('firstName').value;
//     let lastName=document.getElementById('lastName').value;
//     let nationality=document.getElementById('nationality').value;
//     let category=document.getElementById('category').value;
//     let organization=document.getElementById('organization').value;
//     let paperTitle=document.getElementById('paperTitle').value;
//     let paperId=document.getElementById('paperId').value;
//     let email=document.getElementById('email').value;
//     let phoneNo=document.getElementById('phoneNo').value;
//     let password=document.getElementById('password').value;
//     let amount=document.getElementById('amount').value;
//     let transactionRefNo=document.getElementById('transactionRefNo').value;
//     // console.log(salutation,firstName,lastName,nationality,category,organization,noOfPapers,paperId,email,phoneNo,password)

//   let paymentProof = document.getElementById('paymentProof').files[0];

//   const reader = new FileReader();

//   reader.onloadend = async function () {
//     if (reader.result) {
//       const base64String = reader.result.split(",")[1];
//       console.log("Data to be sent:", base64String);
//     } else {
//       alert("Error: Could not read the file.");
//     }
//   }
//   reader.onerror = function () {
//     alert("Error reading the file.");
//   };

//   reader.readAsDataURL(paymentProof);

  
//   async function postFormData(data) {
//       const scriptURL = "https://script.google.com/macros/s/AKfycbxKK9whP30P0Fb0o73pgghNBjTH6RVGPsLw3hJKRtv0ihoL1911BWQ7DaV4iRhUSTX32Q/exec";
//         try {
//           // const response = await fetch("https://icmmmi-backend.onrender.com/api/user/register", {
//           const response = await fetch(scriptURL, {
//             method: "POST",
//             mode: "no-cors",
            
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify(data),
//           });
//           setTimeout(() => {
//             alert("Registered Successfully");
//             window.location.reload();
//             },1000)
//           if(response.ok)
//           {
//             console.log("ok")
//             alertBox.className="alert alert-success";
//             console.log(json);
//             setTimeout(()=>{
//                 window.location.href = "../../index.html";
//             },2000)
            
//           }
          
//         } catch (error) {
//           console.log(error);
         
//          const alertBox = document.getElementById('msg');
//   alertBox.className = "alert alert-danger";
//           alertBox.innerHTML = "Failed to register. Please try again.";
          
//           setTimeout(() => {
//         window.location.reload();
//       }, 2000);
//         }
//     //  window.location.reload();
//   }
      
//   const data = { salutation, firstName, lastName, nationality, email, phoneNo, organization, category, paperTitle, paperId, password, amount, transactionRefNo,paymentProof:base64String };
//   console.log(data);
      
// })

let form = document.getElementById('registration-form');

form.addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent form submission

  // Collect form data
  let salutation = document.getElementById('salutation').value;
  let firstName = document.getElementById('firstName').value;
  // let lastName = document.getElementById('lastName').value;
  let nationality = document.getElementById('nationality').value;
  let category = document.getElementById('category').value;
  let organization = document.getElementById('organization').value;
  let paperTitle = document.getElementById('paperTitle').value;
  let paperId = document.getElementById('paperId').value;
  let email = document.getElementById('email').value;
  let phoneNo = document.getElementById('phoneNo').value;
  // let password = document.getElementById('password').value;
  let amount = document.getElementById('amount').value;
  let transactionRefNo = document.getElementById('transactionRefNo').value;
  let paymentProofFile = document.getElementById('paymentProof').files[0];
  let  idProof= document.getElementById('idProof').files[0];

 if (!paymentProofFile || !idProof) {
    alert("Please upload both payment proof and ID proof images.");
    return;
  }

  // const reader = new FileReader();

  // reader.onloadend = async function () {
  //   if (reader.result) {
  //     const base64String = reader.result.split(",")[1];

    const readFileAsBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(",")[1]); // Extract Base64 string
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

      // Prepare the data object after file is read
      // const data = {
      //   salutation,
      //   firstName,
      //   nationality,
      //   email,
      //   phoneNo,
      //   organization,
      //   category,
      //   paperTitle,
      //   paperId,
      //   amount,
      //   transactionRefNo,
      //   paymentProof: base64String,
      //   idProof: base64String,// Add the Base64 image
  // };
  
  Promise.all([readFileAsBase64(paymentProofFile), readFileAsBase64(idProof)])
    .then(([paymentProofBase64, idProofBase64]) => {
      const data = {
        salutation,
        firstName,
        nationality,
        email,
        phoneNo,
        organization,
        category,
        paperTitle,
        paperId,
        amount,
        transactionRefNo,
        paymentProof: paymentProofBase64,
        idProof: idProofBase64,
      };

  //     console.log("Data to be sent:", data);

  //     // Send data to Google Apps Script
  //     await postFormData(data);
  //   } else {
  //     alert("Error: Could not read the file.");
  //   }
      // };
      
           console.log("Data to be sent:", data);

      // Send the data to Google Apps Script
      postFormData(data);
    })
    .catch((error) => {
      console.error("Error reading files:", error);
      alert("Failed to read files. Please try again.");
    });

  reader.onerror = function () {
    alert("Error reading the file.");
  };

  reader.readAsDataURL(paymentProofFile); // Start reading file
  reader.readAsDataURL(idProof); // Start reading file

  // Function to send data to Google Sheets
  async function postFormData(data) {
    const scriptURL =
      "https://script.google.com/macros/s/AKfycbycccrUD2OLZKkTOSLKfY2ad9VHtKk2AzxFBtdXCk9_9AgGR_Rw6ddQVbAz1LAshRcmlw/exec";

    try {
      const response = await fetch(scriptURL, {
        method: "POST",
        mode: "no-cors", // Bypass CORS issues
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // Display success message
      alert("Registered Successfully");

      setTimeout(() => {
        window.location.reload();
      }, 10);
    } catch (error) {
      console.error("Error:", error);
      const alertBox = document.getElementById("msg");
      alertBox.className = "alert alert-danger";
      alertBox.innerHTML = "Failed to register. Please try again.";
    }
  }
});
