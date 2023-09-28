import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "./App.css";

import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";

import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";
import SpinnerFullPage from "./components/SpinnerFullPage";

// import Home from "./pages/Home";
// import Product from "./pages/Product";
// import Pricing from "./pages/Pricing";
// import PageNotFound from "./pages/PageNotFound";
// import AppLayout from "./pages/AppLayout";
// import Login from "./pages/Login";

// BEFORE LAZY LOADING : lazy loading is basically instead of downloading all the bundles or files at once rather download when there
// is a need of that bundle in the application or when user needs
// dist/index.html                   0.45 kB │ gzip:   0.29 kB
// dist/assets/index-19bb4def.css   31.30 kB │ gzip:   5.17 kB
// dist/assets/index-90903e89.js   526.36 kB │ gzip: 149.05 kB this one is greater than 500kb which is bad practice so we should split it up

const Home = lazy(() => import("./pages/Home"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const Login = lazy(() => import("./pages/Login"));

// AFTER
// dist/index.html                           0.45 kB │ gzip:   0.29 kB
// dist/assets/Logo-515b84ce.css             0.03 kB │ gzip:   0.05 kB
// dist/assets/Login-f39ef3ff.css            0.35 kB │ gzip:   0.22 kB
// dist/assets/Product-cf1be470.css          0.47 kB │ gzip:   0.27 kB
// dist/assets/Navbar-d3c5d403.css           0.51 kB │ gzip:   0.28 kB
// dist/assets/Home-380f4eeb.css             0.51 kB │ gzip:   0.30 kB
// dist/assets/AppLayout-2f896d7c.css        1.91 kB │ gzip:   0.70 kB
// dist/assets/index-d5b1c57a.css           27.63 kB │ gzip:   4.50 kB
// dist/assets/Product.module-02d70b80.js    0.06 kB │ gzip:   0.07 kB
// dist/assets/PageNotFound-4b7b5f61.js      0.15 kB │ gzip:   0.15 kB
// dist/assets/Logo-dabbdb7e.js              0.21 kB │ gzip:   0.19 kB
// dist/assets/Navbar-a294692b.js            0.49 kB │ gzip:   0.27 kB
// dist/assets/Pricing-bf3fdad0.js           0.65 kB │ gzip:   0.41 kB
// dist/assets/Home-20527f2d.js              0.66 kB │ gzip:   0.41 kB
// dist/assets/Product-70792195.js           0.85 kB │ gzip:   0.48 kB
// dist/assets/Login-db777cf5.js             1.01 kB │ gzip:   0.53 kB
// dist/assets/AppLayout-4202e963.js       156.94 kB │ gzip:  46.14 kB
// dist/assets/index-3c3e1ef7.js           367.80 kB │ gzip: 102.58 kB

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="login" element={<Login />} />
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to={"cities"} />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
