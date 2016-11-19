import { Pipe, PipeTransform } from "@angular/core";
import * as _ from "lodash";

@Pipe({
  name: "orderBy"
})
export class OrderByPipe implements PipeTransform {

    transform(value: any[], args?: any): any[] {
        return _.orderBy(value, [args[0]], ["desc"]);
    }

}
