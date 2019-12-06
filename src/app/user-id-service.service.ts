import { Injectable } from '@angular/core';
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class UserIdServiceService {

  constructor(private cookieService: CookieService) { }

  public userId() {
    let rsvpInfo = 'rsvpInfo';
    const isCookieSet = this.cookieService.check(rsvpInfo);
    if (isCookieSet) {
      return JSON.parse(this.cookieService.get(rsvpInfo)).userId;
    } else {
      const rsvpData = {userId: this.uuidv4()};
      this.cookieService.set(rsvpInfo, JSON.stringify(rsvpData ));
      return rsvpData.userId;
    }
  }

  private uuidv4(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      }
    );
  }

}
