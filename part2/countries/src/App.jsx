import { useState } from 'react'
import SearchResults from './SearchResults'

function App() {
  const [query, setQuery] = useState("")

  return (
    <>
      find countries <input type="text" value={query} onChange={evt => setQuery(evt.target.value)}/>
      <SearchResults query={query} onCountrySelected={selectedCountry => setQuery(selectedCountry)}/>
    </>
  )
}

export default App
