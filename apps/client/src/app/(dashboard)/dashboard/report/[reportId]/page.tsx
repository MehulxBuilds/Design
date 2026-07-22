import ReportPage from "@/components/modules/tracking/report-page";

interface HostEventProps {
    params: Promise<{
        reportId: string;
    }>
}

const SpecificReport = async({ params }: HostEventProps) => {
  const { reportId } = await params;

  return (
    <ReportPage id={reportId} />
  );
}

export default SpecificReport;