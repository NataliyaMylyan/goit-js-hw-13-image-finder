import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { alert, defaults } from '@pnotify/core';

defaults.delay = 1500;
defaults.hide = true;

function notify(message) {
  alert({
    text: message,
  });
}

export default notify;
