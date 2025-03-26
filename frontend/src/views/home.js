import React, { useEffect, useRef } from 'react';
import { GoldenLayout } from 'golden-layout';

import MenuBar from './components/MenuBar';
import ConfigurationView from './components/ConfigurationView';
import ImageView from './components/ImageView';
import PointCloudView from './components/PointCloudView';
import LogsView from './components/LogsView';

import './home.css'

const Home = (props) => {
  const layoutRef = useRef(null);

  useEffect(() => {
    const config = {
      settings: {
        showPopoutIcon: false,
        showMaximiseIcon: false,
      },
      root: {
        type: 'column',
        content: [
          {
            type: 'row',
            content: [
              {
                type: 'component',
                componentType: 'ConfigurationView',
                title: 'Configuration',
                width: 20,
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
        ]
      }
    };

    const myLayout = new GoldenLayout(config, layoutRef.current);
    myLayout.registerComponentConstructor('ConfigurationView', ConfigurationView);
    myLayout.registerComponentConstructor('ImageView', ImageView);
    myLayout.registerComponentConstructor('PointCloudView', PointCloudView);
    myLayout.registerComponentConstructor('LogsView', LogsView);
    myLayout.init();

    const handleResize = () => {
      myLayout.setSize();
    };

    window.addEventListener('resize', () => {myLayout.setSize();});

    window.myLayout = myLayout;
  }, []);

  const state = {
    ConfigurationView: true,
    ImageView: true,
    PointCloudView: true,
    LogsView: true
  };

  return (
    <>
      <div className="menu-bar beautiful">
        <div className="menu">
          <span>File ▾</span>
          <div className="dropdown">
            <div onClick={() => window.pywebview.api.dummy()}>New Configuration</div>
            <div onClick={() => window.pywebview.api.dummy()}>Open Configuration</div>
            <div onClick={() => window.pywebview.api.dummy()}>Save Configuration</div>
            <div onClick={() => window.pywebview.api.dummy()}>Quit</div>
          </div>
        </div>
        <div className="menu">
          <span>View ▾</span>
          <div className="dropdown">
            <label><input type="checkbox" defaultChecked onChange={() => togglePanel('ConfigurationView')} /> Configuration View</label>
            <label><input type="checkbox" defaultChecked onChange={() => togglePanel('ImageView')} /> Image View</label>
            <label><input type="checkbox" defaultChecked onChange={() => togglePanel('PointCloudView')} /> Point Cloud View</label>
            <label><input type="checkbox" defaultChecked onChange={() => togglePanel('LogsView')} /> Logs View</label>
          </div>
        </div>
      </div>
      <div style={{ height: 'calc(100vh - 40px)', width: '100vw' }} ref={layoutRef} />
    </>
  );

  function togglePanel(name) {
    const layout = window.myLayout;
    if (state[name]) {
      // Remove the component from the layout
      const item = layout.getAllContentItems().find(item => item.container && item.container.componentType === name);
      if (item) {
        item.remove();
      }
      state[name] = false;
    }
    else {
      layout.root.contentItems[0].contentItems[0].addComponent(name);
      state[name] = true;
    }
  }
};

export default Home
