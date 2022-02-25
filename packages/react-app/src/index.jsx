import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { ThemeProvider } from 'styled-components'

import theme from './themes/theme'
import App from './App'

const subgraphUri = 'http://localhost:8000/subgraphs/name/scaffold-eth/your-contract'

const client = new ApolloClient({
  uri: subgraphUri,
  cache: new InMemoryCache(),
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App subgraphUri={subgraphUri} />
      </BrowserRouter>
    </ThemeProvider>
  </ApolloProvider>,
  document.getElementById('root'),
)
