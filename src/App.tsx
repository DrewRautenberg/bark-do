import { Routes, Route, Navigate } from 'react-router';
import { AppShell } from './components/layout/AppShell';
import { InboxRoute } from './routes/InboxRoute';
import { ProjectRoute } from './routes/ProjectRoute';

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<Navigate to="/inbox" replace />} />
        <Route path="inbox" element={<InboxRoute />} />
        <Route path="projects/:projectId" element={<ProjectRoute />} />
      </Route>
    </Routes>
  );
}
