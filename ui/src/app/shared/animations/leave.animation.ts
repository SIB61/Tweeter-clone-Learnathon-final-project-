import { animate, style, transition, trigger } from '@angular/animations';
import { SlideInAnimationMetadata } from '../models/animation-metadata.model';

export const slideOutAnimation = (value: SlideInAnimationMetadata) => {
  if (!value.position) value.position = '200px';
  if (!value.duration) value.duration = '2000ms';
  if (!value.delay) value.delay = '0ms';
  return trigger('slideOutAnimation', [
    transition(':leave', [
      style({ transform: 'translateX(' + value.position + ')' }),
      animate(value.duration + ' ' + value.delay),
    ]),
  ]);
};
