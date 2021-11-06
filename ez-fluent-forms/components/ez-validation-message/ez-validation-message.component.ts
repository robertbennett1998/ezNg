import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { IEzValidationErrorOptions } from "../../ez-form-validation-builder";
import { EzValidationMessageService } from "../../new/services/ez-validation-message.service";
import { IEzValidationMessage } from "../../new/types/ez-validation-message.interface";

@Component({
  selector: "app-ez-validation-message",
  templateUrl: "./ez-validation-message.component.html",
  styleUrls: ["./ez-validation-message.component.scss"],
})
export class EzValidationMessageComponent implements OnInit, OnDestroy {
  @Input("forForm") formGroup!: FormGroup;
  @Input("forControl") formControlName!: string;
  validationMessages: IEzValidationMessage[] = [];
  private onDestroyedSubject = new Subject<void>();

  constructor(private ezValidationMessageService: EzValidationMessageService) {}

  ngOnInit(): void {
    this.ezValidationMessageService
      .registerEzValidationMessageComponentForEntry(this.formControlName)
      .pipe(takeUntil(this.onDestroyedSubject))
      .subscribe((validationMessages) => {
        this.validationMessages = validationMessages;
      });
  }

  ngOnDestroy(): void {
    this.onDestroyedSubject.next();
    this.onDestroyedSubject.complete();
  }
}