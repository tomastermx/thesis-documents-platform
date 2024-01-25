


$(function(){ 
  

    ////////////////All documents//////////////////////////////////////////////////////////////////////
    
    $.getJSON('/thesis/all',(data)=>{        

      console.log(data);
  
         $.each(data,(i , value)=>{
      
           let newRow = `<tr><td>${value.year}</td><td>  <a href="/thesis/page/${value.id}">${value.title}</a>  </td><td>${value.lastName}, ${value.name} </td> <td> ${value.advisor}</td></tr>`
            $('#maintable').append(newRow);
          });

     })
      
      ///////////////////////////////search and post//////////////////////////////////////

           $('#mainform').on('submit', (event)=>{
             
              event.preventDefault();
              let filter = $("#select").val(); 
              let query = $('#query').val();  

              console.log(filter);
              console.log(query);
              $('td').remove(); 
              $.post('/thesis/search',{filter:filter, query:query}, function(data){
                console.log('funciona');
                console.log(data);
                
                  
             $.each(data,(i , value)=>{
             let newRow = `<tr><td>${value.year}</td><td>  <a href="/thesis/page/${value.id}">${value.title}</a>  </td><td>${value.lastName}, ${value.Name} </td> <td> ${value.advisor}</td></tr>`
             $('#maintable').append(newRow);
          });
                
                
                
              })
           });      
      
    
});
