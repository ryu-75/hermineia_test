import { Articles } from "../interfaces/Articles";

export interface NavProps {
  articles: Articles[];
}

function Nav({articles}: NavProps) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4 rounded-bottom-3">
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <form className="form-inline my-2 my-lg-0 d-flex justify-content-center mx-4">
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-success my-2 my-sm-0 mx-2" type="submit">Search</button>
        </form>
      </div>
    </nav>
  )
}

export default Nav;