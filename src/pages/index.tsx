import styles from "@component/styles/Home.module.scss";
import { Main } from "../components/main/main";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <Main />
      </div>
    </main>
  );
}
