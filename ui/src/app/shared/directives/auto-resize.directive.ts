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

  private offsetHeight: number = 0;
  @Input() private minRows: number = 2;
  @Input() private maxRows: number = 100;
  @Input() private avgLineHeight = 20;

  @HostListener('input')
  onInput(): void {
    if (this.offsetHeight <= 0) {
      this.offsetHeight = this.input.scrollHeight;
    }
    this.input.rows = this.minRows;
    const rows = Math.floor(
      (this.input.scrollHeight - this.offsetHeight) / this.avgLineHeight
    );
    const rowsCount = this.minRows + rows;
    this.input.rows = rowsCount > this.maxRows ? this.maxRows : rowsCount;
  }
}
