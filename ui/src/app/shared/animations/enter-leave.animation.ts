import {
  trigger,
  state,
  transition,
  style,
  animate,
} from '@angular/animations';
export let slideR = trigger('slideR', [
  state('void', style({ transform: 'translateX(200px)', opacity: 0 })),
  transition(':enter,:leave', [animate(1500)]),
]);
export let fade = trigger('fade', [
  state('void', style({ opacity: 0 })),
  transition(':enter,:leave', [animate(1500)]),
]);
export let slideL = trigger('slideL', [
  state('void', style({ transform: 'translateX(-200px)', opacity: 0 })),
  transition(':enter,:leave', [animate(1500)]),
]);
