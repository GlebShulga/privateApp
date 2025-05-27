import styles from "@component/styles/Home.module.scss";
import { Main } from "../components/Main";

// Force static generation
export const dynamic = "force-static";

export default function HomePage() {
  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <Main />
      </div>
    </main>
  );
}
