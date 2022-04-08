import React from 'react'
import { Background } from '../components/Background'
import { MainWindow } from '../components/MainWindow'
import Menu from '../components/Menu'
import { HashRouter, BrowserRouter, Route, Switch } from 'react-router-dom';
import routes from '../config/routes';
import Game from '../components/Game'

const App = ({ message }) => {

  return (
    <Background>
        <HashRouter hashType='noslash'>
          <Switch>
            <Route exact path={routes.index} >
            <MainWindow title='Welcome!'>
              <Menu />
            </MainWindow>
            </Route>
            <Route path={routes.game} >
              <MainWindow title="Let's start!">
                <Game />
              </MainWindow>
            </Route>
          </Switch>
        </HashRouter>
    </Background>
  )
}

export default App
