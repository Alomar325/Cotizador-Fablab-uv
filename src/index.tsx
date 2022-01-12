import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import Router from "./router";
import { Web3ReactProvider } from '@web3-react/core'
import Web3 from 'web3'

import "./index.css"

function getLibrary(provider) {
  return new Web3(provider)
}

export default function App() {

  return(

    <Web3ReactProvider getLibrary={getLibrary}>
      <BrowserRouter>
        {/*<Particles options={particlesOptions as ISourceOptions}/>*/}
          
            <Router />
      </BrowserRouter>
    </Web3ReactProvider>
);
}

ReactDOM.render(<App />, document.getElementById("root"));
