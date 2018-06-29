import { FormGroup } from "@angular/forms/src/model";
import { ValidatorFn } from "@angular/forms";

export const InternalOrExternalValidator: ValidatorFn = (fg: FormGroup) => {
  const isInternal = fg.get("IsInternal").value;
  const ExternalTypeItem = fg.get("ExternalTypeItem").value;
  if (!isInternal && !ExternalTypeItem  ) {
    return { InternalOrExternal: true }
  }
  return null;
}


