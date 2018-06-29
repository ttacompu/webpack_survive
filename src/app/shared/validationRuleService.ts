import { Injectable } from '@angular/core'
import { merge } from 'rxjs/observable/merge';
import { map } from 'rxjs/operators';
import { pipe } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { FormBuilder } from '@angular/forms';
import * as R from 'ramda';
import { FormGroup } from '@angular/forms/src/model';

@Injectable()
export class ValidationRuleService {

  private validationMessagesPerPage = {};
  private validationRules = {};

  constructor(private fb: FormBuilder) {

  }

  SetValidationsMessages(messages) {
    this.validationMessagesPerPage = {
      ...this.validationMessagesPerPage,
      ...messages
    } 
  }

  SetValidationRules(rules) {
    this.validationRules = {
      ...this.validationRules,
      ...rules
    }
  }

  GetValidationRules(pageKey) {
    if (this.validationRules.hasOwnProperty(pageKey)) {
      return this.validationRules[pageKey];
    }
  }


  GetValidationMessages(pageKey) {
    if (this.validationMessagesPerPage.hasOwnProperty(pageKey)) {
      return this.validationMessagesPerPage[pageKey];
    }
  }

  Validate(form, pageKey, validateFn) {
    const rules = this.GetValidationMessages(pageKey);
    return validateFn(form, rules);
  }

  SetValidationRuleOnForm(pageKey) {
    const model = this.GetValidationRules(pageKey);
    return this.fb.group(model);
  }

  ExecuteValidationRules(form, rules)
  {
    let mergeSubject = new Subject();
    
    Object.keys(rules).forEach((fieldName, index) => {
        const ctrl = form.get(fieldName);
      ctrl.statusChanges.subscribe(() => {
        let errorMessage = "";
        if ((ctrl.touched || ctrl.dirty) && ctrl.errors) {
          errorMessage = Object.keys(ctrl.errors).map(errorKey => rules[fieldName][errorKey]).join(' ');
        }
        mergeSubject.next({ [fieldName]: errorMessage });
        })
    })
    return mergeSubject.asObservable();
  }

  RemoveValidators(FeedForm, exceptionFn = (key) => true) {
    for (let key in FeedForm.controls) {
      if (FeedForm.controls.hasOwnProperty(key) && exceptionFn(key)) {
        FeedForm.controls[key].clearAsyncValidators();
        FeedForm.controls[key].clearValidators();
        FeedForm.controls[key].updateValueAndValidity();
      }
    }
  }

  AddValidators(feedForm: FormGroup, rules, customValidatorList: any[]) {
    const customNames = R.keys(customValidatorList);
    for (let key in feedForm.controls) {
      if (!(customNames.indexOf(key) > -1)) {
        const syncValidators = rules[key][1];
        const asyncValidators = rules[key][2];
        if (asyncValidators && asyncValidators.length) {
          feedForm.controls[key].setAsyncValidators(asyncValidators);
          feedForm.controls[key].updateValueAndValidity();
        }
        if (syncValidators && syncValidators.length) {
          feedForm.controls[key].setValidators(syncValidators);
          feedForm.controls[key].updateValueAndValidity();
        }
      }
    }
    // set custom validator
    customValidatorList.forEach((item, i) => {
      feedForm.controls[item.key].setValidators(item.fn);
      feedForm.controls[item.key].updateValueAndValidity();
    })
  }
}
