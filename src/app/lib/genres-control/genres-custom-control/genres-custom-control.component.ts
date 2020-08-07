import {
  Component,
  OnInit,
  forwardRef,
  ViewChild,
  ElementRef,
  Input,
  Self,
  Optional
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormGroup, NgControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { IDataGenre } from '../../../core/interfaces/genres.interface';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { GenresServices } from '../../../core/services/genres.service';
import { forkJoin } from 'rxjs';
import { GenresDataServices } from '../../../core/data/genres.data';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-genres-custom-control',
  templateUrl: './genres-custom-control.component.html',
  styleUrls: ['./genres-custom-control.component.scss'],
})
export class GenresCustomControlComponent implements OnInit, ControlValueAccessor {

  @ViewChild('genresInput', { static: true })
  public genresInput: ElementRef<HTMLInputElement>;

  public separatorKeysCodes: number[] = [ENTER, COMMA];
  public selectedGenres: IDataGenre[] = [];
  public loaded = false;

  private _value: IDataGenre;

  constructor(
    @Self() @Optional() private _genresControl: NgControl,
    private _activatedRoute: ActivatedRoute,
    private _genresService: GenresServices,
    private _genresDateService: GenresDataServices,
  ) {
    if (this._genresControl) {
      this._genresControl.valueAccessor = this;
    }
  }

  public ngOnInit(): void {
    const genres = this._activatedRoute.snapshot.queryParamMap.getAll('genres');

    if (genres.length !== 0) {
      this.loaded = true;
      const arr = genres
        .map((id) => this._genresDateService.getGenresById(+id));

      forkJoin(arr)
        .pipe()
        .subscribe((result) => {
          this.loaded = false;
          this.selectedGenres.push(...result);
          this._genresControl.control.setValue(this.selectedGenres);
        });
    }
  }

  public get allGenres(): IDataGenre[] {
    return this._genresService
      .allGenres;
  }

  public writeValue(val: any): void {
    this._value = val;
  }

  public onChange = (val: any) => {};

  public onTouched = () => {};

  public registerOnChange(fn: (val: any) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public selected(event: MatAutocompleteSelectedEvent): void {
    if (!this.selectedGenres) {
      this.selectedGenres = [];
    }
    if (this.selectedGenres.indexOf(event.option.value) === -1) {
      this.selectedGenres.push(event.option.value);
      this._genresControl.control.setValue(this.selectedGenres);
    }
    this.genresInput.nativeElement.value = '';
  }

  public remove(genre: IDataGenre): void {
    const index = this.selectedGenres.indexOf(genre);
    if (index >= 0) {
      this.selectedGenres.splice(index, 1);
      this._genresControl.control.setValue(this.selectedGenres);
    }
    if (this.selectedGenres.length === 0) {
      this.selectedGenres = null;
      this._genresControl.control.setValue(this.selectedGenres);
    }
  }

}
