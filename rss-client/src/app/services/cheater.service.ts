import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


/** CheaterService:
 *  this service is here to track the user's mouse movements,
 *  as well as certain keypresses and if they switch tabs.
 *  This is designed to be combined with our 'Quiz' Component,
 *  so that if the user tries to leave the page they'll get a
 *  warning. If they continue, their quiz will be void.
 */
@Injectable({
  providedIn: 'root'
})
export class CheaterService {

  hidden: string;
  visibilityChange: string;
  confirmMessage: string;
  leftTab: Subject<boolean>; // A special type of observable that we can use to easily communicate with our Quiz Component.

  constructor() {
    // Check if browser supports the 'hidden' attribute
    if (typeof document.hidden !== 'undefined') { // Opera 12.10 and Firefox 18 and later support
      this.hidden = 'hidden';
      this.visibilityChange = 'visibilitychange';
    }
    this.leftTab = new Subject<boolean>();

    this.leftTab.next(false);
    this.confirmMessage = 'Changing your tab or going to another window will void your quiz. \nDo you understand? \n\nClicking "no" will void the quiz.';

      // Warn if the browser doesn't support addEventListener or the Page Visibility API 
    if (typeof document.addEventListener === 'undefined' || this.hidden === undefined) {
        console.log('This demo requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API.');
      } else {
        // Add event that tracks if the mouse leaves the HTML document entirely.
        // It won't trigger if it enters a child node, only if they leave the boundries
        // of their window.
        this.addEvent(document, 'mouseout', (e) => {
          e = e ? e : window.event;
          const from = e.relatedTarget || e.toElement;
          if (!from || from.nodeName == 'HTML') {
            // the cursor has left the building
            console.log('If you change tabs or windows, this quiz will be invalid.');
            this.leftTab.next(true);
          }
        });
        // Add an event listener for when the user deliberately changes tabs.
        this.addEvent(document, this.visibilityChange, () => {
          if (document.hidden) {
            console.log('Tab left, quiz void');
            this.leftTab.next(true);
          }
        });

        this.addEvent(document,'keydown', (e) => {
          if (e.altKey){
            console.log('Stop pressing Alt!');
          }
        });
        this.addEvent(document,'focus', (e) => {
          console.log(document.activeElement.tagName + ' focused');
        });
        this.addEvent(document,'blur', (e) => {
          console.log(document.activeElement.tagName + ' blurred');
        });
      }
  }

  // Support for different kinds of browsers.
 addEvent(obj, evt, fn) {
  if (obj.addEventListener) {
      obj.addEventListener(evt, fn, false);
  }
  else if (obj.attachEvent) {
      obj.attachEvent('on' + evt, fn);
  }

  }

}
