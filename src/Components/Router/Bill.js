import CSI from "../Mini/CreateNewBillShortInfo";
import { Link, useRouteMatch } from "react-router-dom";
import BSI from "../Mini/CreateNewUserShortinfo";

export default function Bills() {
  let infos = {
    tbc: 3,
    yebc: 6,
    wbc: 9,
    mbc: 21,
    ybc: 80,
  };
  return (
    <div className={"px-4 py-4"}>
      <div className={"flex flex-col gap-2 md:flex-row md:w-full"}>
        <div className={"md:w-1/2 lg:w-1/3"}>
          <CSI infos={infos} />
        </div>
        <div className={"md:w-1/2 lg:w-1/3"}>
          <BSI infos={infos} />
        </div>
      </div>
    </div>
  );
}
