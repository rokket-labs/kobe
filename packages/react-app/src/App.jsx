import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { MainLayout } from './components/layouts/MainLayout'
import { IsPledgedProvider } from './contexts/IsPledgedContext'
import { WalletContextProvider } from './contexts/WalletContext'
import Dashboard from './pages/Dashboard'
import DebugPage from './pages/DebugPage'
import Journey from './pages/Journey'
import Pledge from './pages/Pledge'
import Ranking from './pages/Ranking'
import ReFi from './pages/ReFi'
import RegenArt from './pages/RegenArt'

import 'antd/dist/antd.css'
import './styles/index.css'

const App = () => {
  return (
    <WalletContextProvider>
      <IsPledgedProvider>
        <MainLayout NETWORKCHECK>
          <Switch>
            <Route exact path="/">
              <Dashboard />
            </Route>
            <Route exact path="/ranking">
              <Ranking />
            </Route>
            <Route exact path="/regen-art">
              <RegenArt />
            </Route>
            <Route exact path="/pledge">
              <Pledge />
            </Route>
            <Route exact path="/journey">
              <Journey />
            </Route>
            <Route path="/regen-defi">
              <ReFi />
            </Route>
            <Route exact path="/debug">
              <DebugPage />
            </Route>
          </Switch>
        </MainLayout>
      </IsPledgedProvider>
    </WalletContextProvider>
  )
}

export default App
