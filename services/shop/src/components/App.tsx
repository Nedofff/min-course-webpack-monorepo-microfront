import { Outlet } from 'react-router-dom';
import styles from './App.module.scss'

export default function App() {

  return (
    <div data-testid={'App.DataTest'} className={styles["flex"]}>
      <Outlet/>
    </div>
  );
}
