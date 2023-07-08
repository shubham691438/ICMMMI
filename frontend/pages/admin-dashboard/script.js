async function fetchUsers(){
    try{
        const res= await fetch("https://icmmmi-backend.onrender.com/api/user/get-all-users",{
        method:"GET",
        })
        const users= await res.json();
        if (!res.ok) {
            throw new Error(users.error);
        }

        let totalRegistrations=0,indianRegistartions=0,industries=0,academicians=0,students=0, accompanions=0;
        users.forEach((user)=>{
            // console.log(user);

            totalRegistrations++;

            if(user.nationality.toLowerCase()=="indian" || user.nationality.toLowerCase()=="india" ) indianRegistartions++;
            

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
                </diV>

            </div>
        </div>`;
            document.getElementById('people-details-body').insertAdjacentHTML('beforeend',htmlMarkup)
        })
        
       

    }
    catch(error){
        console.log(error);
    }
    

}

fetchUsers();