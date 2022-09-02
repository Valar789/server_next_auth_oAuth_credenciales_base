import { getSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Home() {

  //Obtener session y user del backend
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    (async () => {
      const { user } = await getSession();
      setUser(user);
    })();
  }, []);



  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-dark fixed-top"
        id="mainNav"
      >
        <div className="container">
          <a className="navbar-brand" href="/">
            {user ? user.name : "welcome"}
          </a>

          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav text-uppercase ms-auto py-4 py-lg-0">
              {user ? (
                <>
                  <li className="nav-item nav-link">
                    {user.email}
                  </li>
                  <li className="nav-item">
                    <a
                      onClick={() => signOut()}
                      className="nav-link"
                      href="#!"
                    >
                      Cerrar Sesion
                    </a>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <a
                      onClick={() => signIn()}
                      className="nav-link"
                      href="#!"
                    >
                      iniciar Sesion
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <header className="masthead">
        <div className="container titles">
          {user ? (
            <>
              <div className="masthead-subheading">Bienvenido {user.name}</div>
              <div className="masthead-heading text-uppercase">
                Pulsa el boton para Salir
              </div>
            </>
          ) : (
            <>
              <div className="masthead-subheading">Debes iniciar Sesion</div>
              <div className="masthead-heading text-uppercase">
                Pulsa el boton para iniciar sesion
              </div>
            </>
          )}
          {user ? (
            <>
              <a
                onClick={() => signOut()}
                className="btn btn-primary btn-xl text-uppercase"
                href="#!"
              >
                Cerrar Session
              </a>
            </>
          ) : (
            <>
              <a
                onClick={() => signIn()}
                className="btn btn-primary btn-xl text-uppercase"
                href="#services"
              >
                Iniciar Session
              </a>
            </>
          )}
        </div>
      </header>
    </>
  );
}

//Backend

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: " /api/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};
