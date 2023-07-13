
let totalRegistrations=0,indianRegistartions=0,industries=0,academicians=0,students=0, accompanions=0,others=0;
let amount=0;

async function fetchUsers(){

    const admin=JSON.parse(localStorage.getItem('admin'));

    if(!admin)
    {
        window.location.href="../login/index.html"
        return;
    }
    try{
       
        
        if(!admin)
        {
            throw new Error("Invalid authorization")
        }
        const res= await fetch("https://icmmmi-backend.onrender.com/api/admin/get-all-users",{
        method:"GET",
        headers:{
          'Authorization':`Bearer ${admin.token}`
        }
        })
        const users= await res.json();
        if (!res.ok) {
            throw new Error(users.error);
        }

        
        users.forEach((user)=>{
            // console.log(user);

            totalRegistrations++;

            if(user.nationality.toLowerCase()=="indian" || user.nationality.toLowerCase()=="india" ) indianRegistartions++;

            if(user.category=="Delegates from Industry") industries++;
            else if(user.category=="Academician") academicians++;
            else if(user.category=="Research scholar or student") students++;
            else if(user.category=="Accompanying persons") accompanions++;
            else others++;

            amount+=user.amount?user.amount:0;

            const htmlMarkup=`
            <div class="card shadow mb-4">
            <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-success">${user.salutation +" "+ user.firstName +"  " + user.lastName}</h6>
            </div>
            <div class="card-body">
                <diV class="container" >
                    <div class="row">
                        <div class="col col-xl-6 col-12">
                            <p ><strong>Email </strong>: ${user.email}</p>
                        </div>
                        <div class="col col-xl-6 col-12" >
                            <p><strong>Phone Number </strong>: ${user.phoneNo}</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <p><strong>Organization </strong>: ${user.organization}</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <p><strong>Category </strong>: ${user.category}</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <p><strong>Nationality </strong>: ${user.nationality}</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col col-xl-6 col-12">
                            <p><strong>Number of Pagers </strong> : ${user.noOfPapers}</p>
                        </div>
                        <div class="col col-xl-6 col-12" >
                            <p><strong>Paper Id</strong>: ${user.paperId}</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col col-xl-6 col-12">
                            <p><strong>Amount Paid </strong> : ${user.amount}</p>
                        </div>
                        <div class="col col-xl-6 col-12" >
                            <p><strong>Transaction Reference Number</strong>: ${user.transactionRefNo}</p>
                        </div>
                    </div>
                </diV>

            </div>
        </div>`;
            document.getElementById('people-details-body').insertAdjacentHTML('beforeend',htmlMarkup)
        })

        document.getElementById('total-registartions').textContent=totalRegistrations;
        document.getElementById('indian-registrations').textContent=indianRegistartions;
        document.getElementById('international-registrations').textContent=totalRegistrations-indianRegistartions;

        const categoryHtmlMarkup=`
        <h4 class="small font-weight-bold">Delegates from Industries <span
        class="float-right" ">${(industries*100/totalRegistrations).toFixed(2)}%</span></h4>
        <div class="progress mb-4">
            <div class="progress-bar bg-danger" role="progressbar" style="width: ${industries*100/totalRegistrations}%"
                aria-valuenow=${industries*100/totalRegistrations} aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        <h4 class="small font-weight-bold">Academicians <span
                class="float-right">${(academicians*100/totalRegistrations).toFixed(2)}%</span></h4>
        <div class="progress mb-4">
            <div class="progress-bar bg-warning" role="progressbar" style="width: ${academicians*100/totalRegistrations}%"
                aria-valuenow=${academicians*100/totalRegistrations} aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        <h4 class="small font-weight-bold">Research scholars & students<span
                class="float-right">${(students*100/totalRegistrations).toFixed(2)}%</span></h4>
        <div class="progress mb-4">
            <div class="progress-bar" role="progressbar" style="width: ${students*100/totalRegistrations}%"
                aria-valuenow=${students*100/totalRegistrations} aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        <h4 class="small font-weight-bold">Accompanying persons <span
                class="float-right">${(accompanions*100/totalRegistrations).toFixed(2)}%</span></h4>
        <div class="progress mb-4">
            <div class="progress-bar bg-info" role="progressbar" style="width: ${accompanions*100/totalRegistrations}%"
                aria-valuenow=${accompanions*100/totalRegistrations} aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        `

        document.getElementById('category-progress-bar').insertAdjacentHTML('beforeend',categoryHtmlMarkup);
        updatePieChart();
        
       

    }
    catch(error){
        console.log(error);
    }
    

}

fetchUsers();


// Pie Chart Example

function updatePieChart(){
    var ctx = document.getElementById("myPieChart");
    console.log(ctx);
    var myPieChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ["Indian", "International"],
        datasets: [{
        data: [indianRegistartions,totalRegistrations-indianRegistartions],
        backgroundColor: ['#4e73df', '#1cc88a'],
        hoverBackgroundColor: ['#2e59d9', '#17a673'],
        hoverBorderColor: "rgba(234, 236, 244, 1)",
        }],
    },
    options: {
        maintainAspectRatio: false,
        tooltips: {
        backgroundColor: "rgb(255,255,255)",
        bodyFontColor: "#858796",
        borderColor: '#dddfeb',
        borderWidth: 1,
        xPadding: 15,
        yPadding: 15,
        displayColors: false,
        caretPadding: 10,
        },
        legend: {
        display: false
        },
        cutoutPercentage: 0,
    },
    });
}


