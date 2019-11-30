import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PermalinkMakerService {

  constructor() { }

  public permalink(permalink: string): string {
    return location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '') + '/e' + permalink;
  }
}
