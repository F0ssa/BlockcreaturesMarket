import { Navigation } from './navigation/Navigation'
import { Footer } from './navigation/Footer'
import TableContainer from './components/TableContainer'
import FilterContainer from './filter/FilterContainer'
import ScrollToTop from './components/ScrollTop'

export const App = () => {
  return (
    <div>
      <Navigation />
      <div>
        <FilterContainer />
      </div>
      <div>
        <TableContainer />
      </div>
      <div>
        <ScrollToTop />
      </div>
      <Footer />
    </div>
  )
}
