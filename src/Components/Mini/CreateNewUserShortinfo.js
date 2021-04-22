import { Link, useRouteMatch } from "react-router-dom";
export default function BSI({ infos }) {
  const { url } = useRouteMatch();
  return (
    <div className={"px-4 py-4 rounded border-xl bg-gray-600 shadow"}>
      <div>
        <h2 className={"text-xl text-gray-50 font-semibold tracking-wide"}>
          View Bills
        </h2>
        <div className={"flex flex-col gap-1 items-start"}>
          <div className={"mt-3  grid grid-cols-3 gap-1.5 w-65 "}>
            <div
              className={"flex items-center rounded-sm py-2 px-4 bg-pink-500"}
            >
              <p className={"text-base mr-1 text-white font-semibold"}>
                {infos.tbc}
              </p>
              <p className={"text-base text-white"}>Today</p>
            </div>
            <div
              className={
                "text-white flex items-center rounded-sm py-2 px-4 bg-green-500"
              }
            >
              <p className={"text-base mr-1  font-semibold"}>{infos.yebc}</p>
              <p className={"text-base"}>Yes</p>
            </div>
            <div
              className={
                "text-white flex items-center rounded-sm py-2 px-4 bg-red-400"
              }
            >
              <p className={"text-base mr-1 text-white font-semibold"}>
                {infos.wbc}
              </p>
              <p className={"text-base"}>Week</p>
            </div>
            <div
              className={
                "text-white flex items-center rounded-sm py-2 px-4 bg-yellow-600"
              }
            >
              <p className={"text-md mr-1 text-white font-semibold"}>
                {infos.mbc}
              </p>
              <p className={"text-base"}>Month</p>
            </div>
            <div
              className={
                "text-white flex items-center rounded-sm py-2 px-4 bg-blue-400"
              }
            >
              <p className={"text-base mr-1 text-white font-semibold"}>
                {infos.ybc}
              </p>
              <p className={"text-base "}>Year</p>
            </div>
          </div>
        </div>
        <div className={"mt-3"}>
          <Link to={`${url}/billlist`}>
            <p
              className={
                "text-md px-5 py-2 rounded-sm font-semibold text-white bg-green-500 shadow-md hover:bg-green-900"
              }
            >
              view
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
