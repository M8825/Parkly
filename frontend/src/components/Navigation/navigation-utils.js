import AuthModal from "../Auth/AuthModal";

const PAGE_LOCATIONS = {
  '': '/',
  'index': 'indexPage',
  'spots': 'showSpot',
  'spotsCreate': 'createSpotPage',
  'users': 'profilePage',
  'contact': 'contactPage'
};

export const usePage = (location) => {
  const splitPathname = location.pathname.split('/')
  let loc = splitPathname[1]

  // Edge case for /spots/:id and /spots/create
  if (loc === 'spots' && splitPathname[2] === 'create') {
    loc += splitPathname[2].charAt(0).toUpperCase() + splitPathname[2].slice(1)
  }

  return PAGE_LOCATIONS[loc];
}

export const useLinks = (loggedIn, logoutUser) => {
    if (loggedIn) {
      return (
        <button onClick={logoutUser} className="btn logout-btn" type="submit">Logout</button>

      );
    } else {
      return <AuthModal />;
    }
}



