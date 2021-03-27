import { useHistory } from "react-router-dom";

export default function CreateBill() {
  let history = useHistory();
  const handleback = () => {
    history.goBack();
  };
  return (
    <div>
      <button onClick={handleback}>back</button>
      <p>Create Bill Here</p>
    </div>
  );
}
