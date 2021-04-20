import { Link, useRouteMatch } from "react-router-dom";
export default function BillList({ infos }) {
  const { url } = useRouteMatch();
  return (
    <div className={"px-4 py-4 rounded border-xl bg-green-600 shadow"}>
      <div>
        <h2 className={"text-2xl text-gray-50 font-semibold tracking-wide"}>
          View Bills
        </h2>
        <div className={"flex flex-col gap-4 items-end"}>
          <div className={"w-full mt-5  grid grid-cols-3 gap-2 "}>
            <div
              className={"flex items-center rounded-sm py-2 px-4 bg-pink-500"}
            >
              <p className={"text-xl mr-2 text-white font-semibold"}>
                {infos.tbc}
              </p>
              <p className={"text-base text-white"}>Today</p>
            </div>
            <div
              className={
                "text-white flex items-center rounded-sm py-2 px-5 bg-green-500"
              }
            >
              <p className={"text-xl mr-2  font-semibold"}>{infos.yebc}</p>
              <p className={"text-base"}>Yesterday</p>
            </div>
            <div
              className={
                "text-white flex items-center rounded-sm py-2 px-5 bg-red-400"
              }
            >
              <p className={"text-xl mr-2 text-white font-semibold"}>
                {infos.wbc}
              </p>
              <p className={"text-base"}>Week</p>
            </div>
            <div
              className={
                "text-white flex items-center rounded-sm py-2 px-5 bg-yellow-600"
              }
            >
              <p className={"text-md mr-2 text-white font-semibold"}>
                {infos.mbc}
              </p>
              <p className={"text-base"}>Month</p>
            </div>
            <div
              className={
                "text-white flex items-center rounded-sm py-2 px-5 bg-blue-400"
              }
            >
              <p className={"text-xl mr-2 text-white font-semibold"}>
                {infos.ybc}
              </p>
              <p className={"text-base "}>Year</p>
            </div>
          </div>
          <div>
            <Link to={`${url}/create`}>
              <a
                className={
                  "text-md px-5 py-2 rounded-sm font-semibold text-white bg-green-500 shadow-md hover:bg-green-900"
                }
              >
                view
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
