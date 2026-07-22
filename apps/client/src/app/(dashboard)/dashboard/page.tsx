import { redirect } from "next/navigation";

const DashboardPage = () => {
  return redirect('/dashboard/publish');
}

export default DashboardPage;