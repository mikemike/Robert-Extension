document.addEventListener('DOMContentLoaded', function() {
  var checkPageButton = document.getElementById('checkPage');
  checkPageButton.addEventListener('click', function() {

    if (window.jQuery) {  
      alert('we have jquery');
    } else {
      alert('no jquery');
    }
  }, false);
}, false);