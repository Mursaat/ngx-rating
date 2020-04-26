import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

const ICONS: string[] = ['github'];

@Injectable({
  providedIn: 'root',
})
export class IconService {
  public constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {}

  public registerSvgIcons(): void {
    ICONS.forEach((iconID: string) => this.registerSvgIcon(iconID, `assets/icons/${iconID}.svg`));
  }

  private registerSvgIcon(iconID: string, path: string): void {
    this.iconRegistry.addSvgIcon(iconID, this.sanitizer.bypassSecurityTrustResourceUrl(path));
  }
}
