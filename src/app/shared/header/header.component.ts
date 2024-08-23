import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @ViewChild('elCollapseButton', { static: false })
  elCollapseButton!: ElementRef;
  @ViewChild('sidebar') sidebarRef!: ElementRef;

  sidebarOpen = false;
  dayNumber = new Date().getDay() % 12;
  todaysHeaderCss = this.getCss('Header', this.dayNumber);
  todaysFooterCss = this.getCss('Footer', this.dayNumber);

  ngOnInit(): void {
    this.elCollapseButton?.nativeElement.addEventListener(
      'click',
      this.toggleSidebar.bind(this)
    );
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  ngOnDestroy(): void {
    this.elCollapseButton.nativeElement.removeEventListener(
      'click',
      this.toggleSidebar.bind(this)
    );
    window.removeEventListener('resize', this.handleResize.bind(this));
  }

  ngAfterViewInit(): void {
    // Ensure that elCollapseButton is defined before accessing nativeElement
    if (this.elCollapseButton) {
      this.elCollapseButton.nativeElement.addEventListener(
        'click',
        this.toggleSidebar.bind(this)
      );
    }
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
    const mainContent = document.getElementById('main-content');
    if (this.sidebarOpen) {
      mainContent?.classList.add('content-blur');
    } else {
      mainContent?.classList.remove('content-blur');
    }
  }

  closeSidebar(): void {
    this.sidebarOpen = false;
    document.getElementById('main-content')?.classList.remove('content-blur');
  }

  handleResize(): void {
    if (window.innerWidth >= 992) {
      this.closeSidebar();
    }
  }

  getCss(spriteType: string, dayNumber: number): string {
    return `transparent url('/assets/images/Bootstrap${spriteType}Composed.jpg') 0 ${
      -81 * dayNumber
    }px`;
  }
}
