
import { BrowserRouter } from "react-router-dom"
import { AppRoute } from "./routes/AppRoute"

function MarbellaApp() {
  return (
    <BrowserRouter>
      <AppRoute />
    </BrowserRouter>

  )
}

export default MarbellaApp
