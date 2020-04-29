$(document).ready(function(){
    $('.btn-upload').on('click',function(){
        $('#upload-input').click();
    });

    $('#upload-input').on('change', function(){
        readURL(this);
        var uploadInput=$('#upload-input');

        if(uploadInput.val()!=''){
            
            var formData=new FormData();
            formData.append('upload', uploadInput[0].files[0]);
        }
    });

    function readURL(e) {
      $('#im-dis').attr('src', URL.createObjectURL(e.files[0]));
    }
      
      
})