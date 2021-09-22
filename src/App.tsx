import { Navigation } from './navigation/Navigation'
import { Footer } from './navigation/Footer'
import Market from './routes/Market'
import RewardCalculation from './routes/RewardCalculation'
import Search from './routes/Search'
import { Unknown } from './routes/Unknown'
import ScrollToTop from './components/ScrollTop'
import Announcement from './components/Announcement'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

export const App = () => {
  return (
    <div>
      <Router>
        <Navigation />
        <Announcement />
        <Switch>
          <Route exact path="/" component={Market} />
          <Route exact path="/reward" component={RewardCalculation} />
          <Route exact path="/search" component={Search} />
          <Route component={Unknown} />
        </Switch>
      </Router>
      <div>
        <ScrollToTop />
      </div>
      <Footer />
    </div>
  )
}
