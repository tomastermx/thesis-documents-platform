

$(function(){ 
              

  console.log(document.cookie.split(";")[0]);

  const cookieValue = document.cookie
  .split("; ")
  .find((row) => row.startsWith("token="))
  ?.split("=")[1];

 console.log(cookieValue);

  let page;
        // Function to get a cookie by name
function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

// Usage example
 var myCookieValue = getCookie("token");
 
 ///// query params////////////////////////////////////////




 let urlParams = new URLSearchParams(window.location.search);
  
    
      
        page = urlParams.get('page');




   
    let spinning = '<div id="spinner" class="d-flex justify-content-center"><div class="spinner-border" style="width: 7rem; height: 7rem;"  role="status"><span class="visually-hidden">Loading...</span></div> </div>'
   
    $('#maincontent').append('<h2>LOADING</h2>');
     $('#maincontent').append(spinning);

    $('#maintable').hide();
 

    ////////////////All documents//////////////////////////////////////////////////////////////////////
    
    $.getJSON('/thesis/all?page='+ page + '&limit='+ 2 +'&token='+ cookieValue ,(data)=>{        
          
      console.log('cookieValue:'+ cookieValue );
       let pages = data.pagination;
      
       //console.log(pages);   
 
         $.each(data.documents,(i , value)=>{
      
                
          
           let newRow = `<tr> <div class="row"> <td>  ${value.year}  </td><td> <div class="col"> <a href="/thesis/page/${value.id}">${value.title}</a> </div>  </td><td>${value.lastName}, ${value.name} </td> <td> ${value.alastName},  ${value.aName}</td> <td> ${value.grade}</td> </div> </tr>`
            $('#maintable').append(newRow);
            
          });
                
            let nav ='<nav><ul class="pagination justify-content-center" ></ul></nav>'
            $('#maincontent').append('<nav aria-label="Page navigation example"><ul class="pagination justify-content-center">')          
            
            
                for(let i=1; i<=pages; i++ ){
                    
                    $('ul').append('<li class="page-item"><a class="page-link" href="/?page='+ i + '">1</a></li>');        
                  }

             
                    

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

              if(!query){
                $("#query").addClass("error");
              } else {
                $("#query").removeClass("error");
              }


              $.post('/thesis/search',{filter:filter, query:query}, function(data){
              
                
            
                
             $.each(data.documents,(i , value)=>{
               
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
