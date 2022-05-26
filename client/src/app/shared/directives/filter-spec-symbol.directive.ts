import { Directive } from '@angular/core';
import { HostListener } from '@angular/core';
import { ElementRef } from '@angular/core';

@Directive({
  selector: '[appFilterSpecSymbol]'
})
export class FilterSpecSymbolDirective {
  @HostListener('keypress', ['$event']) onKeyPress($event) {
    return $event.keyCode != 47;
  }
}
