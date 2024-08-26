import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Heading from '@theme/Heading';
import TrianglePattern from '../../../static/img/triangle-pattern.svg';

import styles from './index.module.css';

export default function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={styles.hero}>
      <TrianglePattern className={styles.trianglePattern} />
      <div className={clsx('container',styles.heroInner)}>
        <Heading as="h1" className={styles.heroTitle}>
          Welcome to the Texture Docs
        </Heading>
        <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
      </div>
    </header>
  );
}
