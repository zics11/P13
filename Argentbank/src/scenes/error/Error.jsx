import { NavLink } from 'react-router-dom'
import logo from '../../assets/argentBankLogo.png'


function Error() {
  return (
    <section className="error">
         <img
            className="main-nav-logo-image"
            src={logo}
            alt="Argent Bank Logo"
          />
      <h2 className=''>404</h2>
      <p>
        Oups! La page que vous demandez n'existe pas.
      </p>
      <NavLink to="/index" className=' ' >Retourner sur la page d’accueil</NavLink>{' '}
    </section>
  )
}

export default Error
