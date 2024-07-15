import { inject, Injectable } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { RouterStateSnapshot, TitleStrategy } from "@angular/router";

@Injectable()
export class CustomTitleStrategy extends TitleStrategy {
  private readonly title: Title = inject(Title);
  override updateTitle(snapshot: RouterStateSnapshot): void {
    const title = this.buildTitle(snapshot);
    if (title) {
      this.title.setTitle(`${title} | ToDos`);
    } else {
      this.title.setTitle("ToDos");
    }

  }
}
