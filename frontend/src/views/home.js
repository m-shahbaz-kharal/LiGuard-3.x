import React, { useEffect, useRef } from 'react';
import { GoldenLayout } from 'golden-layout';

import ConfigurationView from './components/ConfigurationView';
import ImageView from './components/ImageView';
import PointCloudView from './components/PointCloudView';
import LogsView from './components/LogsView';

import './home.css'

const Home = (props) => {
  const layoutRef = useRef(null);

  useEffect(() => {
    const config = {
      root: {
        type: 'row',
        content: [
          {
            type: 'component',
            componentType: 'ConfigurationView',
            title: 'Configuration',
            width: 20
          },
          {
            type: 'column',
            width: 60,
            content: [
              {
                type: 'component',
                componentType: 'ImageView',
                title: 'Image View',
                width: 50
              },
              {
                type: 'component',
                componentType: 'PointCloudView',
                title: 'Point Cloud View',
                width: 50
              }
            ]
          },
          {
            type: 'component',
            componentType: 'LogsView',
            title: 'Logs View',
            width: 20
          }
        ]
      }
    };

    const myLayout = new GoldenLayout(config, layoutRef.current);
    myLayout.registerComponentConstructor('ConfigurationView', ConfigurationView);
    myLayout.registerComponentConstructor('ImageView', ImageView);
    myLayout.registerComponentConstructor('PointCloudView', PointCloudView);
    myLayout.registerComponentConstructor('LogsView', LogsView);
    myLayout.init();
  }, []);

  return <div style={{ height: '100vh', width: '100vw' }} ref={layoutRef} />;
};

export default Home
