   $(function(){

     

      var formData;
   
      for (i = new Date().getFullYear(); i > 1974; i--)
      {
          $('#yearpicker').append($('<option />').val(i).html(i));
      }
  
          $('#submitBtn').on('click',()=>{

            $('.progress-bar').css("width", "55%").text("55%");        
             
            let title = $('#title').val();
            let name = $('#name').val();
            let lastName = $('#lastName').val();
            let aName = $('#aName').val();
            let alastName = $('#alastName').val(); 
            let grade = $('#grade').val();
            let year = $('#yearpicker').val();
           // let file = $('#file')[0].files[0];

             if(title && name && lastName && aName && alastName && grade && year ){  
      
              

            document.getElementById("thesis-title").innerHTML =  'Títulto de la tesis:' +" " + title;  
            document.getElementById("thesis-author").innerHTML =  'Autor de la tesis:' +" " + lastName + " "  + name ; 
            document.getElementById("thesis-advisor").innerHTML = 'Asesor de la tesis:' +" " + alastName + " " + alastName; 
            document.getElementById("thesis-grade").innerHTML =    'Grado de la Tesis  :' +" " + grade;  
            
            
            $('#confirmationModal').modal('show');
             } 
             
            else {
               alert(' Falta información'); 
                  if(!title){
                     $('#title').addClass("error");   
                  } else {  $('#title').removeClass("error");  }
                  
                  if(!name){
                     $("#name").addClass("error");
                  } else {    $("#name").removeClass("error");}

                  if(!lastName){
                     $("#lastName").addClass("error");
                  } else {   $("#lastName").removeClass("error");  }

                  if(!aName){
                     $("#aName").addClass("error");
                  } else { $("#aName").removeClass("error");  }
                  
                  if(!alastName){
                     $("#alastName").addClass("error");
                  } else {   $("#alastName").removeClass("error"); }

                  if(!grade){
                     $("#grade").addClass("error");
                  } else { $("#grade").removeClass("error"); } 
           
            }
               
             

          })
              
          

          $('#submitConfirm').on('click',()=>{
               
            $("#dataupload").submit();
            
            $('#confirmationModal').modal('hide');

          
                
          })

        $('#dataupload').on('submit', (event)=>{

       event.preventDefault();
        
       let formData = new FormData();

    
       let createdOn = new Date(); 
        
       let title = $('#title').val();
       let name = $('#name').val();
       let lastName = $('#lastName').val();
       let aName = $('#aName').val();
       let alastName = $('#alastName').val(); 
       let grade = $('#grade').val();
       let year = $('#yearpicker').val();
       let file = $('#file')[0].files[0];
 
       formData.append('createdOn', createdOn);
       formData.append('file', file);
       formData.append('title',title); 
       formData.append('name', name);
       formData.append('lastName',lastName);
       formData.append('aName', aName);
       formData.append('alastName',alastName);
       formData.append('year', year);
       formData.append('grade',grade);

       

  
         
        
        ////// Post to the server 
     
        $.ajax({
          url: '/thesis/new', // Replace with your specific URL
          type: 'POST',
          data: formData,
          contentType: false,
          processData: false,
          success: function(data){ 
            console.log(data);      
            console.log('1+1');  
           // window.location.replace("http://localhost:3000");          
          }
  
            
        }); 

        $('#confirmationModal').modal('hide');


     });


  });