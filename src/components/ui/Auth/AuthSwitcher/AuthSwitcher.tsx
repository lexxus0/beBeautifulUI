import styles from "./AuthSwitcher.module.scss";
import { FC } from "react";

interface AuthSwitcherProps {
  isLogin: boolean;
  setIsLogin: (value: boolean) => void;
}

const AuthSwitcher: FC<AuthSwitcherProps> = ({ isLogin, setIsLogin }) => {
  return (
    <div className={styles.tabs}>
      <button
        onClick={() => setIsLogin(true)}
        className={`${styles.tab} ${isLogin ? styles.active : ""}`}
      >
        Вхід
      </button>
      <button
        onClick={() => setIsLogin(false)}
        className={`${styles.tab} ${!isLogin ? styles.active : ""}`}
      >
        Реєстрація
      </button>
    </div>
  );
};

export default AuthSwitcher;
