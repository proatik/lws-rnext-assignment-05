import { Route, BrowserRouter, Routes } from "react-router-dom";

// layouts.
import MainLayout from "./components/MainLayout";

// pages.
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateBlog from "./pages/CreateBlog";
import EditBlog from "./pages/EditBlog";
import Profile from "./pages/Profile";
import SingleBlog from "./pages/SingleBlog";
import NotFound from "./pages/NotFound";

// routes.
import PublicRoutes from "./routes/PublicRoutes";
import PrivateRoutes from "./routes/PrivateRoutes";

// context providers.
import AuthProvider from "./providers/AuthProvider";
import ProfileProvider from "./providers/ProfileProvider";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route element={<PublicRoutes />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
            <Route element={<PrivateRoutes />}>
              <Route path="/blogs/create" element={<CreateBlog />} />
            </Route>
            <Route path="/blogs/:blogId/edit" element={<EditBlog />} />
            <Route element={<ProfileProvider />}>
              <Route path="/profile/:userId" element={<Profile />} />
            </Route>
            <Route path="/single-blog/:blogId" element={<SingleBlog />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </MainLayout>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
