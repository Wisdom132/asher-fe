// src/app/connection/page.tsx
import Connection from "../../components/connections/list";
import DashboardLayout from "../../layouts/dashboard";
export default function ConnectionPage() {
  return (
    <DashboardLayout>
      <Connection />
    </DashboardLayout>
  );
}
