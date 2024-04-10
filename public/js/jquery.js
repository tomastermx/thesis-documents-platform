

$(function(){ 

    let spinning = '<div id="spinner" class="d-flex justify-content-center"><div class="spinner-border" style="width: 7rem; height: 7rem;"  role="status"><span class="visually-hidden">Loading...</span></div> </div>'
   
    $('#maincontent').append('<h2>LOADING</h2>');
     $('#maincontent').append(spinning);

    $('#maintable').hide();
 

    ////////////////All documents//////////////////////////////////////////////////////////////////////
    
    $.getJSON('/thesis/all',(data)=>{        
 
  
         $.each(data,(i , value)=>{
      
              
          
           let newRow = `<tr><td> ${value.year} </td><td> <a href="/thesis/page/${value.id}">${value.title}</a>  </td><td>${value.lastName}, ${value.name} </td> <td> ${value.alastName},  ${value.aName}</td> <td> ${value.grade}</td></tr>`
            $('#maintable').append(newRow);
          });
          
            $("#spinner").remove();
            $("h2").remove();
            $('#maintable').show();
     })
      
      ///////////////////////////////search and post//////////////////////////////////////

           $('#mainform').on('submit', (event)=>{
            $('.progress-bar').css("width", "10%");  
              event.preventDefault();
              let filter = $("#select").val(); 
              let query = $('#query').val();  

              console.log(filter);
              console.log(query);
             

              $('td').remove(); 
              $.post('/thesis/search',{filter:filter, query:query}, function(data){
              
                
            
                
             $.each(data,(i , value)=>{
               
              if(value){
               
              let newRow = `<tr><td>${value.year}</td><td><a href="/thesis/page/${value.id}">${value.title}</a>  </td><td>${value.lastName}, ${value.name} </td> <td> ${value.alastName},  ${value.aName}</td> <td> ${value.grade}</td></tr>`            
             $('#maintable').append(newRow);
             console.log(value);

                   }
       

               });
                     
               $('.progress-bar').css("width", "100%"); 
  
            })
              

           });      
      
    
});
