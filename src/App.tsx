import Test from '@/components/Test';
import Home from './Home';
import styles from './App.less';
import TEST_IMG from './assets/images/test.jpg';

const App = () => {
  return (
    <div className={styles.App}>
      <h2 className={styles.h2}>hello word</h2>
      <h2>hello TypeScript</h2>
      <img src={TEST_IMG} alt="" />
      <Home />
      <Test />
    </div>
  );
};

export default App;
