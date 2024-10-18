const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from "./cmps/AppHeader.jsx"
import { About } from "./pages/About.jsx"
import { Home } from "./pages/Home.jsx"
// import { MailIndex } from "./apps/mail/pages/MailIndex.jsx"
import { MailContainer} from "./apps/mail/pages/MailContainer.jsx"
import { MailNew } from "./apps/mail/pages/MailNew.jsx"
import { NoteIndex } from "./apps/note/pages/NoteIndex.jsx"

export function App() {
    return (
      <Router>
        <section className="app">
          <AppHeader />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/mail" element={<MailContainer />} >
               {/* <Route path="/mail/new" element={<MailNew />} /> */}
            </Route>
            <Route path="/note" element={<NoteIndex />} />
            <Route path="/note/pinned" element={<NoteIndex view="pinned" />} />
            <Route path="/note/archive" element={<NoteIndex view="archive" />} />
            <Route path="/note/trash" element={<NoteIndex view="trash" />} />
          </Routes>
        </section>
      </Router>
    )
}
