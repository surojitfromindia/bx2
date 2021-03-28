import { Link, useRouteMatch } from "react-router-dom";
export default function USI({ infos }) {
  const { url } = useRouteMatch();
  return (
    <div className={"px-4 py-4 rounded border-xl bg-white shadow"}>
      <div>
        <h2 className={"text-2xl text-green-600 font-semibold tracking-wide"}>
          New Customer Details
        </h2>
        <div className={"flex flex-col gap-4 items-end"}>
          <div className={"w-full mt-5 flex flex-row  flex-wrap gap-2 "}>
            <div
              className={"flex items-center rounded-lg py-2 px-4 bg-yellow-500"}
            >
              <p className={"text-xl mr-2 text-white font-semibold"}>
                {infos.tbc}
              </p>
              <p className={"text-base text-white"}>Today</p>
            </div>
            <div
              className={
                "text-white flex items-center rounded-lg py-2 px-5 bg-green-500"
              }
            >
              <p className={"text-xl mr-2  font-semibold"}>{infos.yebc}</p>
              <p className={"text-base"}>Yesterday</p>
            </div>
            <div
              className={
                "text-white flex items-center rounded-lg py-2 px-5 bg-red-400"
              }
            >
              <p className={"text-xl mr-2 text-white font-semibold"}>
                {infos.wbc}
              </p>
              <p className={"text-base"}>Week</p>
            </div>
            <div
              className={
                "text-white flex items-center rounded-lg py-2 px-5 bg-yellow-700"
              }
            >
              <p className={"text-xl mr-2 text-white font-semibold"}>
                {infos.mbc}
              </p>
              <p className={"text-base"}>Month</p>
            </div>
            <div
              className={
                "text-white flex items-center rounded-lg py-2 px-5 bg-blue-400"
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
              <button
                className={
                  "focus:outline-none text-md  py-1 px-3 rounded-5 font-semibold text-white bg-indigo-500 ring"
                }
              >
                New Customer
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
