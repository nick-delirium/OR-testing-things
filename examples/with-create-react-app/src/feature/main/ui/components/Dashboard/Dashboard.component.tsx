import React from 'react';
import { TailwindWidgetIframe } from '../../../../tailwind/ui/components/TailwindWidgetIframe/TailwindWidgetIframe.component';
import { userId } from '../../../../../tracker';
import logo from '../../assets/logo.svg';
import './Dashboard.style.css';

interface DashboardProps {
  sUrl: string;
}

export const Dashboard: React.FC<DashboardProps> = ({ sUrl }) => {
  const [input, setInput] = React.useState('');
  return (
    <header className="header App-header">
      <div className="list">
        <img src={logo} className="App-logo" alt="logo" />
        <span>Your userId is [{userId}]</span>
        <span>
          session url:{' '}
          <a rel="noreferrer noopener" target="_blank" href={sUrl} className={'link color-blue'}>
            {sUrl}
          </a>
        </span>
        <input
          className="input"
          id="visible-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
        />
        <div className="testhide"> should not be seen here</div>
        <input className="testobscure input" placeholder="test" id="testobscured"></input>
        <div data-openreplay-obscured id="obscured-div">
          obscured
        </div>
        <div data-openreplay-masked id="masked-div">
          masked deprecated
        </div>
        <input
          className="input"
          data-openreplay-obscured
          type="text"
          id="obscured-text"
          placeholder="obscured text"
        ></input>
      </div>
      <TailwindWidgetIframe />
    </header>
  );
};
