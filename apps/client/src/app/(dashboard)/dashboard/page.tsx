import { redirect } from "next/navigation";

const DashboardPage = () => {
  return redirect('/dashboard/ranking');
}

export default DashboardPage;