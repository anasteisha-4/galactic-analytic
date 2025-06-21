import { Route, Routes } from 'react-router-dom';
import { Header } from '~/components';
import { AnalyticPage } from '~/pages/Analytic';
import { GeneratorPage } from '~/pages/Generator';
import { HistoryPage } from '~/pages/History';

const App = () => (
  <>
    <Header />
    <Routes>
      <Route path="/" element={<AnalyticPage />} />
      <Route path="/generator" element={<GeneratorPage />} />
      <Route path="/history" element={<HistoryPage />} />
    </Routes>
  </>
);

export default App;
