// Saves options to chrome.storage
function save_options() {
  var modifier = document.getElementById('modifier').value;
  var customname = document.getElementById('customname').value;
  chrome.storage.sync.set({
    modifier: modifier,
    customname: customname,
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    modifier: 0,
    customname: 'Griff'
  }, function(items) {
    document.getElementById('modifier').value = items.modifier;
    document.getElementById('customname').value = items.customname;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);