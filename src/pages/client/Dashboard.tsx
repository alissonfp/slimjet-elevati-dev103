import { Helmet } from "react-helmet";
import DashboardSection from "@/components/sections/DashboardSection";

const Dashboard = () => {
  return (
    <>
      <Helmet>
        <title>ElevaTI - Dashboard</title>
        <meta name="description" content="Gerencie seus agendamentos e consultas" />
      </Helmet>
      <DashboardSection />
    </>
  );
};

export default Dashboard;
