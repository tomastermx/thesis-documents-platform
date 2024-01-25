
    $(function(){

    var pathArray = window.location.pathname.split('/');
    let  param1 = pathArray[1];
    let  param2 = pathArray[2];
    let param3 = pathArray[3];


    console.log(param2);
    console.log(param3);
     
    $.getJSON('/thesis/data/'+ param3  ,(data)=>{
           
         console.log(data);
         document.getElementById("document").innerHTML = `<object data="https://docs.google.com/viewer?url=${data.Url}&embedded=true"
         type="application/pdf"
         width="100%" height="500px"></object>`;  

         document.getElementById("title").innerHTML = data.title;  
         document.getElementById("author").innerHTML = data.lastName + "," + data.name;
         document.getElementById("date").innerHTML = data.year; 
     })
    

   })