import React, { useState, useEffect, useRef } from "react";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, useHistory } from "react-router-dom";
import Alert from "react-s-alert";

import "./App.css";

import AuthApi from "./api/auth";

import { ACCESS_TOKEN } from "./constants";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import OAuth2RedirectHandler from "./components/OAuth2RedirectHandler";
import PrivateRoute from "./components/PrivateRoute";
import Error from "./components/Error";
import SaveProduct from "./components/SaveProduct";
import LayoutLoginSignup from "./components/LayoutLoginSignup/LayoutLoginSignup";

import Header from "./parts/Header";
import Footer from "./parts/Footer";
import Home from "./parts/Home";
import ProductPage from "./components/ProductPage";
import CartPage from "./components/CartPage";
import CategoryPage from "./components/CategoryPage";
import CheckoutPage from "./components/Checkout";
import PaymentCancel from "./components/Checkout/cancel";
import PaymentSuccess from "./components/Checkout/success";
import AdminRoute from "./components/Admin/AdminRoute";
import AdminOrderList from "./components/Admin/AdminOrderList";
import SendMailResetPassword from "./components/SendMailResetPassword";
import EditPassword from "./components/EditPassword";
import HeaderImagePage from "./components/Header-Image-Page";
import LoadingIndicator from "./components/LoadingIndicator";
import ListUserPage from "./components/Admin/ListUserPage";
import SendEmailVerification from "./components/EmailVerificationPage";
import Admin from "./page/AdminPgae/admin";
import CartApi from "./api/cart";
import  { useStore,actions } from "./store";

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [hasUpdateCurrentUser, setHasUpdateCurrentUser] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cartItems, setCartItems] = useState(0);

  const [state, dispatch] = useStore();
  // const {countCartItems} = state;
  const history = useHistory();
  const dataLocalProduct = useRef(0)
  useEffect (()=>{
    dataLocalProduct.current = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : [];
    dispatch(actions.addCart(dataLocalProduct.current.length))
  },[])
  useEffect (async ()=>{
     const response = await CartApi.getCart();
     dispatch(actions.addCart(response.data.length))
  },[])
  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    if (!token) {
      setAuthLoading(false);
      return;
    }

    const getUser = async () => {
      try {
        const response = await AuthApi.getCurrentUser();
        const user = response.data;

        setCurrentUser(user);
        setAuthenticated(true);
        setIsAdmin(user.authorities.includes("ROLE_ADMIN"));
        setAuthLoading(false);
      } catch (err) {
        setAuthLoading(false);
        Alert.error("Oops! Something went wrong. Please try again!");
      }
    };
    getUser();
    setHasUpdateCurrentUser(false);
  }, [authenticated, hasUpdateCurrentUser]);

  const loginHandler = async (e, authData) => {
    e.preventDefault();
    setAuthLoading(true);
    try {
      const response = await AuthApi.login(authData.email, authData.password);
      const accessToken = response.data.accessToken;
      localStorage.setItem(ACCESS_TOKEN, accessToken);

      setAuthenticated(true);
      setAuthLoading(false);

      history.push("/home");

      return {
        type: "success",
        message: "Đăng nhập thành công",
      };
    } catch (err) {
      setAuthLoading(false);
      return {
        type: "error",
        message: err.response.data.message,
      };
    }
  };

  const logOut = async () => {
    localStorage.removeItem(ACCESS_TOKEN);
    setAuthenticated(false);
    setCurrentUser(null);
    setIsAdmin(false);

    Alert.success("You're logged out!");
  };

  return (
    <div>
      <Header
        currentUser={currentUser}
        isAdmin={isAdmin}
        logOut={logOut}
      />

      <div>
        <Switch>
          <Route
            exact
            path={["/", "/home"]}
            render={(props) => (
              <Home
                isAdmin={isAdmin}
                isAuthentication={authenticated}
                currentUser={currentUser}
                {...props}
              />
            )}
          />
          {/* <Route
            path={"/login"}
            render={(props) => (
              <Login
                onLocalLogin={loginHandler}
                isAuthentication={authenticated}
                loading={authLoading}
                {...props}
              />
            )}
          />
          <Route
            path="/signup"
            render={(props) => (
              <Signup isAuthentication={authenticated} {...props} />
            )}
          ></Route> */}
          <Route
            path="/login"
            render={(props) => (
              <LayoutLoginSignup
                onLocalLogin={loginHandler}
                isAuthentication={authenticated}
                loading={authLoading}
                {...props}
              />
            )}
          ></Route>
          <Route
            path="/cart"
            render={(props) => (
              <CartPage
                isAuthentication={authenticated}
                currentUser={currentUser}
                {...props}
              />
            )}
          ></Route>
          {!authLoading && (
            <PrivateRoute
              path="/profile"
              authenticated={authenticated}
              currentUser={currentUser}
              updateCurrentUser={() => setHasUpdateCurrentUser(true)}
              component={Profile}
            ></PrivateRoute>
          )}
          {/* {!authLoading && (
            <PrivateRoute
              path="/cart"
              authenticated={authenticated}
              currentUser={currentUser}
              component={CartPage}
            ></PrivateRoute>
          )} */}
          {/* <Route
            exact
            path="/smart-phone"
            render={}
          ></Route>
          <Route
            exact
            path="/laptop"
            component={OAuth2RedirectHandler}
          ></Route> */}

          <Route
            path="/oauth2/redirect"
            oauth2Login={() => setAuthenticated(true)}
            component={OAuth2RedirectHandler}
          ></Route>
          {/* {isAdmin && <Route exact path={"/admin/add-product"} component={SaveProduct} />} */}
          {isAdmin && (
            <Route
              exact
              path="/admin/edit-product/:productId"
              render={(props) => <SaveProduct editMode={true} {...props} />}
            ></Route>
          )}
          {/* Admin */}
          {isAdmin && (
            <Route
              exact
              path={"/admin/add-product"}
              render={(props) => (
                <Admin mainPage={<SaveProduct />} {...props} />
              )}
            />
          )}
          {isAdmin && (
            <Route
              exact
              path={"/admin/user-accounts"}
              render={(props) => (
                <Admin mainPage={<ListUserPage />} {...props} />
              )}
            />
          )}
          {isAdmin && (
            <Route
              exact
              path={"/admin/orders"}
              render={(props) => (
                <Admin mainPage={<AdminOrderList />} {...props} />
              )}
            />
          )}
          {isAdmin && (
            <Route
              exact
              path={"/admin/header-image"}
              render={(props) => (
                <Admin mainPage={<HeaderImagePage />} {...props} />
              )}
            />
          )}
          {/* Admin */}
          <Route
            exact
            path="/products/:productId"
            render={(props) => (
              <ProductPage
                isAuth={authenticated}
                isAdmin={isAdmin}
                enableBtnAddToCard={true}
                {...props}
              />
            )}
          ></Route>
          <Route
            path="/smartphone"
            render={(props) => (
              <CategoryPage
                type="SmartPhone"
                size={4}
                isAuth={authenticated}
                isAdmin={isAdmin}
              />
            )}
          ></Route>
          <Route
            path="/laptop"
            render={(props) => (
              <CategoryPage
                type="Laptop"
                size={4}
                isAuth={authenticated}
                isAdmin={isAdmin}
              />
            )}
          ></Route>
          <Route
            exact
            path="/checkout"
            render={(props) => (
              <CheckoutPage
                isAuth={authenticated}
                currentUser={currentUser}
                updateCurrentUser={() => setHasUpdateCurrentUser(true)}
                {...props}
              />
            )}
          ></Route>
          <Route
            exact
            path="/checkout/success"
            component={PaymentSuccess}
          ></Route>
          <Route
            exact
            path="/checkout/cancel"
            component={PaymentCancel}
          ></Route>

          {/* {!authLoading && (
            <AdminRoute
              exact
              path="/admin/orders"
              isAdmin={isAdmin}
              component={AdminOrderList}
            ></AdminRoute>
          )}

          {!authLoading && (
            <AdminRoute
              exact
              path="/admin/user-accounts"
              isAdmin={isAdmin}
              component={ListUserPage}
            />
          )} */}
          {/* <Route
            exact
            path="/admin/header-image"
            render={(props) => <HeaderImagePage />}
          ></Route> */}
          <Route
            exact
            path="/reset-password"
            render={(props) => <SendMailResetPassword isAuth={authenticated} />}
          ></Route>
          <Route
            path="/reset-password/:token"
            render={(props) => (
              <EditPassword
                isAuth={authenticated}
                onPasswordChange={() => logOut()}
              />
            )}
          ></Route>
          <Route
            path="/confirm-user-email/:token"
            render={(props) => <SendEmailVerification />}
          ></Route>
          {!authLoading ? (
            <Route component={Error}></Route>
          ) : (
            <Route component={LoadingIndicator}></Route>
          )}
        </Switch>
      </div>
      <Footer />
      <Alert
        stack={{ limit: 3 }}
        timeout={3000}
        position="top-right"
        effect="slide"
        offset={65}
      />
    </div>
  );
};

export default App;
