import { Link, Outlet } from 'react-router-dom';
import styles from './App.module.scss'
import {shopRoutes} from '@packages/shared/src/routes/shop'
import {adminRoutes} from '@packages/shared/src/routes/admin'

export default function App() {

  return (
    <div data-testid={'App.DataTest'} className={styles["flex"]}>
      <h1>PAGE 1</h1>
      <Link to={adminRoutes.about}>ABOUT</Link>
      <br />
      <Link to={shopRoutes.main}>SHOP</Link>
      <br />
      <Link to={shopRoutes.second}>SHOP 2</Link>
      <Outlet/>
    </div>
  );
}
