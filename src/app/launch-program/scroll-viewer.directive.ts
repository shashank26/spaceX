import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appScrollViewer]'
})
export class ScrollViewerDirective {

  @Output() loadMoreData = new EventEmitter<void>();
  eventEmitted = false;

  constructor() { }

  @HostListener('window:load')
  onLoad(): void {
    if (!this.eventEmitted && (window.scrollY + window.innerHeight) >= document.body.offsetHeight) {
      this.eventEmitted = true;
      this.loadMoreData.emit();
    }
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (!this.eventEmitted && (window.scrollY + window.innerHeight) >= document.body.offsetHeight) {
      this.eventEmitted = true;
      this.loadMoreData.emit();
    } else if ((window.scrollY + window.innerHeight) < document.body.offsetHeight) {
      this.eventEmitted = false;
    }
  }
}
