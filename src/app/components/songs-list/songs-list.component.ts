import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Song } from 'src/app/models/common.model';

@Component({
  selector: 'app-songs-list',
  templateUrl: './songs-list.component.html',
  styleUrls: ['./songs-list.component.scss']
})
export class SongsListComponent implements OnInit, OnChanges {
  @Input() songsList: Song[] = [];

  @Output() play = new EventEmitter<Song>();

  public form: FormGroup;
  public filteredSongs: Song[] = [];

  private get search(): AbstractControl {
    return this.form.get("search") as AbstractControl;
  }

  constructor(private fb: FormBuilder) {
    this.form = this.createForm();
  }

  public ngOnInit(): void {
    this.search.valueChanges.subscribe((text: string) => this.searchSongs(text.toLowerCase()));
  }

  public ngOnChanges(): void {
    this.resetSongs();
  }

  public playSong(i: number) {
    this.play.emit(this.filteredSongs[i]);
  }

  public showDetails(i: number) {
    this.filteredSongs[i].showDetails = !this.filteredSongs[i].showDetails;
  }

  private createForm(): FormGroup {
    return this.fb.group({ search: '' });
  }

  private searchSongs(text: string): void {
    if (!text) {
      this.resetSongs();
      return;
    }

    this.filteredSongs = this.songsList.filter(
      (song: Song) => song.title.toLowerCase().includes(text) || song.author.toLowerCase().includes(text)
    );
  }

  private resetSongs(): void {
    this.filteredSongs = this.songsList;
  }
}
