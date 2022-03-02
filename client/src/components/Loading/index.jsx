import style from "./Loading.module.css";
import img from "../../assets/loading.gif"
export const Loading = () => {
  return (
    <div className={style.loading}>
      <img src={img} alt="loading"/>
      <span>Loading...</span>
    </div>
  );
};