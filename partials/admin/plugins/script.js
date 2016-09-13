(function () {
  "use strict";

  var settingsForm = document.forms['announcement-board-form'];

  function save() {
    var data = {};
    data.enabled = settingsForm['switcher'].checked;
    data.content = settingsForm['announcement-content'].value;
    $.post('/api/admin/plugins/announcement-board', { data: JSON.stringify(data) }, function (data) {
      if (data.result) {
        app.alertSuccess(data.message);
      } else {
        app.alertError(data.message);
      }
    });
  }

  $('#save').click(save);

  $(function () {
    $.getJSON('/api/admin/plugins/announcement-board', function (data) {
      if (data.enabled) {
        settingsForm.getElementsByClassName('announcement-switcher')[0].MaterialSwitch.on();
      }
      settingsForm['announcement-content'].value = data.content || '';
    });
  });
})();