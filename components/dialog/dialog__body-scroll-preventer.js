import scrollbarWidth from 'scrollbar-width';

import {bodyWithoutScroll} from './dialog.css';

let isPrevented = false;
let previousBodyWidth = null;
let initialScrollPosition = 0;

export default {
  prevent(emulateScrollBarSpace) {
    if (isPrevented) {
      return;
    }
    isPrevented = true;
    initialScrollPosition = document.documentElement.scrollTop;

    document.body.classList.add(bodyWithoutScroll);

    const scrollWidth = scrollbarWidth();
    const bodyHasScroll = document.body.scrollHeight > window.innerHeight;

    document.body.scrollTop = initialScrollPosition;

    if (emulateScrollBarSpace && bodyHasScroll && scrollWidth > 0) {
      previousBodyWidth = document.body.style.width;
      document.body.style.width = `calc(100% - ${scrollWidth}px)`;
    }
  },

  reset() {
    if (!isPrevented) {
      return;
    }
    isPrevented = false;

    document.body.classList.remove(bodyWithoutScroll);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = initialScrollPosition;
    initialScrollPosition = 0;


    if (previousBodyWidth !== null) {
      document.body.style.width = previousBodyWidth;
      previousBodyWidth = null;
    }
  }
};