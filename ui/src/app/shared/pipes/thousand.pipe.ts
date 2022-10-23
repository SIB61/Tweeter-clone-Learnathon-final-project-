import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'thousand',
  standalone:true
})
export class ThousandPipe implements PipeTransform {
  transform(value: number, ...args: number[]): string {
    if(value<1000) return `${value}`
    else return `${(value/1000).toFixed(1)}k`
  }
}
