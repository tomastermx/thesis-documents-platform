
    $(function(){

    var pathArray = window.location.pathname.split('/');
    let  param1 = pathArray[1];
    let  param2 = pathArray[2];
    let param3 = pathArray[3];
  
    let spinning = '<div id="spinner" class="d-flex justify-content-center"><div class="spinner-border" style="width: 7rem; height: 7rem;"  role="status"><span class="visually-hidden">Loading...</span></div> </div>'
    
    $("#document").append('<h2>CARGANDO...</h2>');   
    $("#document").append(spinning); 
     
    $("#paper").hide();   



    console.log(param2);
    console.log(param3);
     
    $.getJSON('/thesis/data/'+ param3  ,(data)=>{

   
      
         console.log(data);



        $("#paper").append(`<object data="https://docs.google.com/viewer?url=${data.Url}&embedded=true"
         type="application/pdf"
         width="100%" height="500px"></object>`)
         
        $("#spinner").remove();
        $("#paper").show();
        $("h2").remove();
       
     /*
        document.getElementById("document").innerHTML = `<object data="https://docs.google.com/viewer?url=${data.Url}&embedded=true"
         type="application/pdf"
         width="100%" height="500px"></object>`;  
       
     */
         document.getElementById("title").innerHTML = data.title;  
         document.getElementById("author").innerHTML = data.lastName + "," + " " +  data.name;
         document.getElementById("advisor").innerHTML = data.alastName + "," + " " + data.aName;
         document.getElementById("year").innerHTML = data.year;
         document.getElementById("grade").innerHTML = data.grade; 
     })
    

   })