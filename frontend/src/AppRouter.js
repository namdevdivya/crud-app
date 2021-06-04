import React from "react";
import { Route, Switch } from "react-router-dom";
import Signup from "./component/Registration/Signup";
import ShowList from "./component/Registration/ShowList";
import EditForm from "./component/Registration/EditForm";

const DefaultLayout = ({ children }) => {
  console.log("inside DefaultLayout");

  return <>{children}</>;
};

const routeArray = [
  {
    path: "/",
    component: Signup,
    exact: true,
    layout: LandingPageLayout,
  },

  {
    path: "/showlist",
    component: ShowList,
    exact: true,
    layout: DefaultLayout,
  },
 
  {
    path: "/editform/:id",
    component: EditForm,
    exact: true,
    layout: DefaultLayout,
  },
];


function LandingPageLayout({ children }) {
  return <>{children}</>;
}

export default function Layout() {
  const store = configureStore();
  return (
    <Provider store={store}>
      <Switch>
        {routeArray.map(
          (
            { layout: LayoutComponent, component: Component, ...rest },
            index
          ) => {
            console.log(LayoutComponent, Component, "LayoutComponent");

            return (
              <Route
                {...rest}
                key={index}
                render={(routeProps) => (
                  <LayoutComponent>
                    <Component {...routeProps} />
                  </LayoutComponent>
                )}
              />
            );
          }
        )}
      </Switch>
    </Provider>
  );
}
