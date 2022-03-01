import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { MainLayout } from './components/layouts/MainLayout'
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
      <MainLayout>
        <Switch>
          <Route exact path="/">
            <Dashboard />
          </Route>
          <Route exact path="/ranking">
            <Ranking />
          </Route>
          <Route exact path="/rart">
            <RegenArt />
          </Route>
          <Route exact path="/pledge">
            <Pledge />
          </Route>
          <Route exact path="/journey">
            <Journey />
          </Route>
          <Route path="/refi">
            <ReFi />
          </Route>
          <Route exact path="/debug">
            <DebugPage />
          </Route>
        </Switch>
      </MainLayout>
    </WalletContextProvider>
  )
}

export default App
