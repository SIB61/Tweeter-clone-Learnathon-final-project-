import { animate, style, transition, trigger } from '@angular/animations';
import { Direction } from '../enums/direction.enum';
import { SlideInAnimationMetadata } from '../models/animation-metadata.model';

export const fadeIn = trigger('fadeIn', [
  transition(':enter', [style({ opacity: 0 }), animate(800)]),
]);

function getTransformValue(direction: Direction, position: string): string {
  let value: string;
  switch (direction) {
    case Direction.TOP:
      value = 'translateY(-' + position + ')';
      break;
    case Direction.BOTTOP:
      value = 'translateY(' + position + ')';
      break;
    case Direction.RIGHT:
      value = 'translateX(' + position + ')';
      break;
    case Direction.LEFT:
      value = 'translateX(-' + position + ')';
      break;
    default:
      value = 'translateX(' + position + ')';
  }
  return value;
}

function getTriggerValue(direction: Direction): string {
  let value: string;
  switch (direction) {
    case Direction.TOP:
      value = 'slideInFromT';
      break;
    case Direction.BOTTOP:
      value = 'slideInFromD';
      break;
    case Direction.RIGHT:
      value = 'slideInFromR';
      break;
    case Direction.LEFT:
      value = 'slideInFromL';
      break;
    default:
      value = 'slideInFromR';
  }
  return value;
}
export const slideIn = (value: SlideInAnimationMetadata) => {
  if (!value.position) value.position = '200px';
  if (!value.duration) value.duration = '800ms';
  if (!value.delay) value.delay = '0ms';
  if (!value.direction) value.direction = Direction.RIGHT;

  return trigger(getTriggerValue(value.direction), [
    transition(':enter', [
      style({ transform: getTransformValue(value.direction, value.position) }),
      animate(value.duration + ' ' + value.delay),
    ]),
  ]);
};
