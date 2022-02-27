import style from "./Loading.module.css";
export const Loading = () => {
  return (
    <div className={style.loading_card}>
      <div className={`${style.loading_icon} ${style.rotated}`}>
        <svg className={style.spinner} viewBox="0 0 50 50">
          <circle
            className={style.path}
            cx="25"
            cy="25"
            r="20"
            fill="none"
            strokeWidth="5"
          ></circle>
        </svg>
      </div>
    </div>
  );
};