import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "./store/session";
import { AuthRoute, ProtectedRoute } from "./components/Routes/Routes";
import { Switch } from "react-router-dom";

import Navigation from "./components/Navigation/Navigation";
import SplashPage from "./components/SplashPage/SplashPage";
import SpotsIndex from "./components/SpotsIndex/SpotsIndex";
import CreateSpotForm from "./components/Spot/CreateSpotForm";

import ShowPage from "./components/ShowPage/ShowPage";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);

	return loaded && (
			<>
				<Navigation />
				{/* <CreateSpotForm /> */}
				<Switch>
					<AuthRoute exact path="/" component={SplashPage} />
					<ProtectedRoute exact path="/index" component={SpotsIndex}/>
					<ProtectedRoute exact path="/spots/create" component={CreateSpotForm} />
				</Switch>
			</>
		);
          <ProtectedRoute exact path="/index" component={SpotsIndex} />
          <ProtectedRoute
            exact
            path="/spots/create"
            component={CreateSpotForm}
          />
          <ProtectedRoute exact path="/spots/:spotId" component={ShowPage} />
        </Switch>
      </>
    )
  );
}

export default App;
