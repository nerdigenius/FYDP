import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Personal from './Personal'
import Elections from './Elections'
import Ur_elections from './Ur_elections'
import Vote from './Vote'

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Personal />}>
          <Route index element={<Elections />} />
          <Route path="blogs" element={<Ur_elections />} />
          <Route path="*" element={<Vote />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
