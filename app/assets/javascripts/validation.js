function formValidation($input, $alertContainer, $btn){
  var inputsCount = $input.length;
  $input.each(function(){
    if ($(this).val()) {
      if(valueIsValid($(this)) ) {
        showNotification($(this).closest($alertContainer), false);
      } else {
        showNotification($(this).closest($alertContainer), true);
      }
    } else {
      inputsCount--;
    }
  });

  if (inputsCount === 0) { //empty form
    disableSubmit($btn, true);
    showNotification($input.closest($alertContainer), false);
  }

  if (formIsValid($input)) {
    disableSubmit($btn, false);
  } else {
    disableSubmit($btn, true);
  }
}

function formIsValid($input) {
  var inputsCount = $input.length;
  $input.each(function(){
    if ( valueIsValid($(this)) ) {
      inputsCount--;
    }
  });
  return inputsCount === 0;
}

function valueIsValid($input) {
  var val = $input.val();
  if ($input.hasClass('v-iban') ) {
    return IBAN.isValid(val) == true;
  } else {
    var text_regexp = /^[a-zA-Zа-яА-Я]+$/
      , date_regexp = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/
      , bic_regexp = /^([a-zA-Z]){4}([a-zA-Z]){2}([0-9a-zA-Z]){2}([0-9a-zA-Z]{3})?$/
      , default_regexp = text_regexp
      ;
    if ($input.hasClass('v-date') ) {
      default_regexp = date_regexp;
    } else if ($input.hasClass('v-bic')) {
      default_regexp = bic_regexp;
    }
    val = val.replace(/\s+/, '');
    return ( val.length > 1 && default_regexp.test(val) );
  }
}

function showNotification($alertContainer, showFlag){
  if (showFlag && !$alertContainer.find('.v-notification').length) {
    $alertContainer.prepend('<span class="label label-danger v-notification">Invalid value</span>');
  } else if (!showFlag){
    $alertContainer.find('.v-notification').remove();
  }
}

function disableSubmit($btn, disableFlag) {
  if ( !disableFlag ) {
    $btn.removeAttr('disabled');
  } else {
    $btn.attr('disabled', 'disabled');
  }
}