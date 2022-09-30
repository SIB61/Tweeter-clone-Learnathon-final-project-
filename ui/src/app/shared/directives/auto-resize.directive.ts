import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appAutoResize]',
  standalone: true,
})
export class AutoResizeDirective {
  private input: HTMLTextAreaElement;
  constructor(element: ElementRef) {
    this.input = element.nativeElement;
  }

  @HostListener('input')
  onInput(): void {
    this.input.setAttribute(
      'style',
      'height: ' + this.input.scrollHeight + 'px;'
    );
  }
}
