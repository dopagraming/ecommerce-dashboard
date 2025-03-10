import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import RequireAuth from './components/RequireAuth';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Categories from './pages/Categories';
import SubCategories from './pages/SubCategories';
import Brands from './pages/Brands';
import Users from './pages/Users';
import Reviews from './pages/Reviews';
import Coupons from './pages/Coupons';
import Addresses from './pages/Addresses';
import WishLists from './pages/WishLists';
import Login from './pages/atuh/Login';
import Signup from './pages/atuh/Signup';
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/*"
            element={
              <RequireAuth>
                <Layout>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/categories" element={<Categories />} />
                    <Route path="/subcategories" element={<SubCategories />} />
                    <Route path="/brands" element={<Brands />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/reviews" element={<Reviews />} />
                    <Route path="/coupons" element={<Coupons />} />
                    <Route path="/addresses" element={<Addresses />} />
                    <Route path="/wishlists" element={<WishLists />} />
                  </Routes>
                </Layout>
              </RequireAuth>
            }
          />
        </Routes>
      </Router>
      <Toaster position="top-right" />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;