var savebutton = document.getElementById('savebutton');
var readonly = true;
var inputs = document.querySelectorAll('input');
savebutton.addEventListener('click',function(){
    
     for (var i=0; i<inputs.length; i++) {
     inputs[i].toggleAttribute('readonly');
     };

    if (savebutton.innerHTML == "edit") {
      savebutton.innerHTML = "save";
         } else {
      savebutton.innerHTML = "edit";
      }     
});
