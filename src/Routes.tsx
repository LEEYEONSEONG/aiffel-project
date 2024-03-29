import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  Outlet,
} from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Login, Forum, ForumWrite, ForumDetail } from 'pages';
import { Layout, Header } from 'components/organisms';

import { IRootState } from 'types/payloadTypes';

const PrivateRoute = () => {
  const {
    user: { username },
    token,
  } = useSelector((state: IRootState) => state.auth);

  return username && token ? <Outlet /> : <Navigate to="/" />;
};

const CheckHeader = () => {
  const {
    user: { username },
    token,
  } = useSelector((state: IRootState) => state.auth);

  return username && token ? <Header /> : <div />;
};

const ConditionalHeader = CheckHeader;

function App() {
  return (
    <BrowserRouter>
      <ConditionalHeader />
      <Layout>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/forum" element={<Forum />} />
            <Route path="/write" element={<ForumWrite />} />
            <Route path="/forum/:id" element={<ForumDetail />} />
          </Route>
          <Route path="/" element={<Login />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
