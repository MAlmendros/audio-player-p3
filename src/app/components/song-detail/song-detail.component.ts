import { Component, Input } from '@angular/core';
import {Song} from 'src/app/models/common.model';

@Component({
  selector: 'app-song-detail',
  templateUrl: './song-detail.component.html',
  styleUrls: ['./song-detail.component.scss']
})
export class SongDetailComponent {
  @Input() song: Song = {} as Song;

  constructor() { }

  public getDuration(duration: number): string {
    const minutes = Math.trunc(duration / 60);
    const seconds = Math.trunc(duration - (minutes * 60));

    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  }
}

