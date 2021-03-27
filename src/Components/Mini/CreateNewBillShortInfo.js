import { Link, useRouteMatch } from "react-router-dom";
export default function CSI({ infos }) {
  const { url } = useRouteMatch();
  return (
    <div className={"px-4 py-3 rounded border-xl bg-white"}>
      <div>
        <h2 className={"text-2xl text-indigo-600 font-light tracking-wide"}>
          Create New Bill
        </h2>
        <div className={"my-3 flex flex-col gap-4 items-end"}>
          <div className={"w-full flex flex-row  flex-wrap gap-2 "}>
            <div
              className={
                "flex items-center rounded-full py-2 px-5 bg-indigo-400"
              }
            >
              <p className={"text-xl mr-2 text-white font-semibold"}>
                {infos.tbc}
              </p>
              <p className={"text-base text-white"}>Today</p>
            </div>
            <div
              className={
                "text-white flex items-center rounded-full py-2 px-5 bg-indigo-400"
              }
            >
              <p className={"text-xl mr-2  font-semibold"}>{infos.yebc}</p>
              <p className={"text-base"}>Yesterday</p>
            </div>
            <div
              className={
                "text-white flex items-center rounded-full py-2 px-5 bg-indigo-400"
              }
            >
              <p className={"text-xl mr-2 text-white font-semibold"}>
                {infos.wbc}
              </p>
              <p className={"text-base"}>Week</p>
            </div>
            <div
              className={
                "text-white flex items-center rounded-full py-2 px-5 bg-indigo-400"
              }
            >
              <p className={"text-xl mr-2 text-white font-semibold"}>
                {infos.mbc}
              </p>
              <p className={"text-base"}>Month</p>
            </div>
            <div
              className={
                "text-white flex items-center rounded-full py-2 px-5 bg-indigo-400"
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
                  "focus:outline-none text-md w-24 py-2.5 rounded-full font-semibold text-white bg-indigo-500 ring"
                }
              >
                Create
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
