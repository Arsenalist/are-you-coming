import {Component, Input, OnInit} from '@angular/core';
import {PermalinkMakerService} from "../permalink-maker.service";

@Component({
  selector: 'app-social-share',
  templateUrl: './social-share.component.html',
  styleUrls: ['./social-share.component.scss']
})
export class SocialShareComponent implements OnInit {

  constructor(private permalinkService: PermalinkMakerService) { }

  @Input() url: string;
  @Input() description: string;

  ngOnInit() {
  }

  public whatsAppShareText() {
    if (this.description) {
      return encodeURI(this.description) + " " + encodeURI(this.linkValue())
    } else {
      return encodeURI(this.linkValue());
    }
  }

  private linkValue() {
    return this.permalinkService.permalink(this.url);
  }
}
