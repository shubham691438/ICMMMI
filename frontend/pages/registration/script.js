document.addEventListener("DOMContentLoaded", function () {
  updateAmountValue();

  document.getElementById("nationality").addEventListener("input", updateAmountValue);
  document.getElementById("category").addEventListener("input", updateAmountValue);

  function updateAmountValue() {
    const indianDelegateIndustryEarlyBird = 5000;
    const indianAcademiciansEarlyBird = 5000;
    const indianResearchScholarsStudentsEarlyBird = 3000;
    const indianAccompanyingPersonsEarlyBird = 2000;

    const internationalDelegateIndustryEarlyBird = 250;
    const internationalAcademiciansEarlyBird = 150;
    const internationalResearchScholarsStudentsEarlyBird = 80;
    const internationalAccompanyingPersonsEarlyBird = 80;

    const nationality = document.getElementById("nationality").value;
    const category = document.getElementById("category").value;
    let amount = 0;

    if (nationality === "Indian") {
      switch (category) {
        case "Delegates from Industry":
          amount = indianDelegateIndustryEarlyBird;
          break;
        case "Academician":
          amount = indianAcademiciansEarlyBird;
          break;
        case "Research scholar or student":
          amount = indianResearchScholarsStudentsEarlyBird;
          break;
        case "Accompanying persons":
          amount = indianAccompanyingPersonsEarlyBird;
          break;
      }
      document.getElementById("amount").value = "Rs " + amount;
    } else {
      switch (category) {
        case "Delegates from Industry":
          amount = internationalDelegateIndustryEarlyBird;
          break;
        case "Academician":
          amount = internationalAcademiciansEarlyBird;
          break;
        case "Research scholar or student":
          amount = internationalResearchScholarsStudentsEarlyBird;
          break;
        case "Accompanying persons":
          amount = internationalAccompanyingPersonsEarlyBird;
          break;
      }
      document.getElementById("amount").value = "USD " + amount;
    }
  }

  document.getElementById("registration-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    let salutation = document.getElementById("salutation").value;
    let firstName = document.getElementById("firstName").value;
    let nationality = document.getElementById("nationality").value;
    let category = document.getElementById("category").value;
    let organization = document.getElementById("organization").value;
    let paperTitle = document.getElementById("paperTitle").value;
    let paperId = document.getElementById("paperId").value;
    let email = document.getElementById("email").value;
    let phoneNo = document.getElementById("phoneNo").value;
    let amount = document.getElementById("amount").value;
    let transactionRefNo = document.getElementById("transactionRefNo").value;
    let paymentProofFile = document.getElementById("paymentProof").files[0];
    let idProof = document.getElementById("idProof").files[0];

    if (!paymentProofFile || !idProof) {
      alert("Please upload both payment proof and ID proof images.");
      return;
    }

    // Check if transactionRefNo already exists before submitting
    checkDuplicateEntry(transactionRefNo).then((isDuplicate) => {
      if (isDuplicate) {
        alert("This transaction reference number has already been used. Please enter a unique one.");
        return;
      }

      // Convert files to Base64
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

          console.log("Data to be sent:", data);
          postFormData(data);
        })
        .catch((error) => {
          console.error("Error reading files:", error);
          alert("Failed to read files. Please try again.");
        });
    });
  });

  async function checkDuplicateEntry(transactionRefNo) {
    const scriptURL =
      "https://script.google.com/macros/s/AKfycbwqTKcb9DPAwvW-HnvYBQYZT7jTuU_ohjIrO-Bl-3R9MSKzYc_XoQGzWwH7Pb2oq_ik/exec";

    try {
      const response = await fetch(scriptURL);
      const data = await response.json();
      return data.some((entry) => entry.transactionRefNo === transactionRefNo);
    } catch (error) {
      console.error("Error checking duplicates:", error);
      return false; // Allow submission in case of error
    }
  }

  function readFileAsBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async function postFormData(data) {
    const scriptURL =
      "https://script.google.com/macros/s/AKfycbyT1mUHAT0JHKP_Rapc92tWUN5QcnGjMjrEeJRLVyYMnF0r4RCEjPD6-NtEupAWrBVUcQ/exec";

    try {
      const response = await fetch(scriptURL, {
        method: "POST",
        mode: "no-cors", // Bypass CORS issues
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

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
