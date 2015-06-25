import Faker from "faker";
import {mergeDeep} from "shared/helpers/common";
import Issue from "shared/models/issue";

// EXPORTS =========================================================================================
export default function makeIssue(manualData={}) {
  // no support to pick name by gender for now in Faker :(
  return Issue(mergeDeep({
    name: Faker.name.firstName(),
    //assemblyDate: Faker.date.between("1970-01-01", "1995-01-01"),
    manufacturer: Faker.random.array_element(["Russia", "USA", "China"]),
  }, manualData));
}
