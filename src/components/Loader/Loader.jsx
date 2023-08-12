
import React from 'react';
import { Vortex } from 'react-loader-spinner';
import styles from './Loader.module.css';

class Loader extends React.Component {
  render() {
    return (
      <div className={styles.Loader}>
        <div className={styles.LoaderInner}>
          <Vortex
            visible={true}
            height="80"
            width="80"
            ariaLabel="vortex-loading"
            wrapperStyle={{}}
            wrapperClass="vortex-wrapper"
            colors={[
              '#107980',
              '#76A1A7',
              '#EDE1CF',
              '#D9C5BC',
              '#B6ADAF',
              '#66347F',
              '#fe777d',
              '#fecdc7',
            ]}
          />
        </div>
      </div>
    );
  }
}

export default Loader;
