$(document).ready(function(){

  $('.input-group.date').datepicker({
    startDate: "01/01/1920",
    todayHighlight: true,
    autoclose: true
  });

  var $validationForm = $('.form-validation');
  var $formPersonalDate = $('#formPersonalDate')
    , $formBankAccount = $('#formBankAccount')
    , $alertContainer = '.form-group'
    ;

  /*Using validation: load page and after changing in forms*/
  $validationForm.each(function(){
    var self = $(this);
    var $btnValidationForm = self.find('.btn-form-validation')
      , $inputValidationForm = self.find('input.required')
      ;

    formValidation($inputValidationForm, $alertContainer, $btnValidationForm);

    $(document).on('input changeDate', self.find('input.required'), function(){
      formValidation(self.find('input.required'), $alertContainer, $btnValidationForm);
    });
  });


  /*Submit*/
  $formPersonalDate.on('submit', function(e){
    e.preventDefault();
    if (formIsValid($(this).find('input.required'))) {
      $(this).addClass('hidden');
      $formBankAccount.removeClass('hidden');
    }
  });

  //@TODO: We should have a server for correct work
  $formBankAccount.on('submit', function(e){
    e.preventDefault();
    if (formIsValid($(this).find('input.required')) && formIsValid($formPersonalDate.find('input.required')) ) {
      var data = $formPersonalDate.serialize()+'&'+$(this).serializeArray();
      $.ajax({
        url: '/',
        type: 'post',
        data: data,
        success: function(){
          window.location.href = "/payment_page/app/views/registration/success.html?paramFromServer=12345"
        },
        error: function(){
          window.location.href = "/payment_page/app/views/registration/success.html?paramFromServer=12345"
        }
      });
    }
  });
  /*End of submit*/
  /*Work with bank accounts*/
  $(document).on('click', '.add-new-account', function(){
    var $lastData = $('.bank-data:last');
    var cloneLastData = $lastData.clone();
    cloneLastData.find('input').each(function(){
      var newId = $(this).attr('id')+$lastData.index();
      $(this).val('').attr('id', newId)
        .siblings('label').attr('for', newId);
    });
    cloneLastData.find('.v-notification').remove();
    cloneLastData.insertAfter($lastData);
    $('.delete-account-container').removeClass('hidden');
    formValidation($formBankAccount.find('input.required'), $alertContainer, $formBankAccount.find('.btn-form-validation'));
    return false;
  });

  $(document).on('click', '.delete-account', function(){
    var $bankData = $('.bank-data');
    if ($bankData.length > 1) {
      $(this).closest('.bank-data').remove();
      console.log($bankData.length);
      if ($bankData.length === 2) {
        $('.delete-account-container').addClass('hidden');
      }
    }
    formValidation($formBankAccount.find('input.required'), $alertContainer, $formBankAccount.find('.btn-form-validation'));
    return false;
  });
  /*End of work with bank accounts*/

});