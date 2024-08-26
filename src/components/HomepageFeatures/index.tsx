import React from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import ArrowFatLineRight from '../../../static/img/ArrowFatLineRight.svg';
import ChartLine from '../../../static/img/ChartLine.svg';
import LightningA from '../../../static/img/LightningA.svg';
import Plugs from '../../../static/img/Plugs.svg';
import { CellSignalFull, Icon, FileCode, FastForward, Stack, Terminal } from '@phosphor-icons/react';

type ResourceItem = {
  title: string;
  icon: Icon;
  description: JSX.Element;
  link: string;
};

const keyResourceList: ResourceItem[] = [
  {
    title: 'Platform Concepts',
    icon: Stack,
    description: (
      <>
        Learn about the core concepts of the Texture platform.
      </>
    ),
    link: '/docs/platform-concepts/overview',
  },
  {
    title: 'Quickstart',
    icon: FastForward,
    description: (
      <>
        Get started building on the Texture platform in minutes.
      </> 
    ),
    link: '/docs/home/quickstart',
  },
  {
    title: 'API reference',
    icon: FileCode,
    description: (
      <>
      Explore server-side libraries and integrate with API endpoints      </>
    ),
    link: '/api',
  },
];

type FeatureItem = {
  title: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  description: JSX.Element;
  link: string;
};

const featureList: FeatureItem[] = [
  {
    title: 'Sources',
    icon: Plugs,
    description: (
      <>
       Sources are primary sources of energy data that can be connected to the platform. Connections to Devices, Meters, and Utility Bills are all handled here.
      </> 
    ),
    link: '/docs/sources/overview',
  },
  {
    title: 'Commands',
    icon: Terminal,
    description: (
      <>
        Retrieve data from and send commands to individual or groups of energy devices.
      </>
    ),
    link: '/docs/commands/overview',
  },
  {
    title: 'Destinations',
    icon: ArrowFatLineRight,
    description: (
      <>
        Get data pushed to you from Texture in real-time and send it anywhere you need it, no polling required.
      </>
    ),
    link: '/docs/destinations/overview',
  },
  {
    title: 'Signals',
    icon: CellSignalFull,
    description: (
      <>
        Data from other sources that we will combine with device information for you to get a whole picture of your energy network.
      </>
    ),
    link: '/docs/signals/overview',
  }
  // {
  //   title: 'Analytics',
  //   icon: ChartLine,
  //   description: (
  //     <>
  //       Gain valuable insights, identify trends, and make informed decisions about your energy network.
  //     </>
  //   ),
  //   link: '/docs/analytics/overview',
  // },
];

function Resource({title, icon, description, link}: FeatureItem) {
  return (
    <div className={styles.card}>
      <a href={link}className={clsx(styles.cardInner, styles.resourceInner)}> 
        <div className={styles.resourceIcon}>
        {icon && React.createElement(icon, { width: 24, height: 24, color: "#434AEA" })}
        </div>
        <div>
          <Heading as="h3">{title}</Heading>
          <p>{description}</p>
        </div>
      </a>
    </div>
  );
}

function Feature({title, icon, description, link}: FeatureItem) {
  return (
    <div className={styles.card}>
      <a href={link}className={styles.cardInner}> 
      <div className={styles.featureIcon}>
        {icon && React.createElement(icon, { width: 64, height: 64, color: "#434AEA" })}
      </div>
      <div className={styles.featureText}>
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
      </a>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <div className={clsx('container',styles.wrapper)}>
    <section className={styles.keyResources}>
      {keyResourceList.map((props, idx) => (
        <Resource key={idx} {...props} />
      ))}
    </section>
    <Heading as="h2">Explore the platform</Heading>
    <section className={styles.features}>
      {featureList.map((props, idx) => (
        <Feature key={idx} {...props} />
      ))}
    </section>
    </div>
  );
}
