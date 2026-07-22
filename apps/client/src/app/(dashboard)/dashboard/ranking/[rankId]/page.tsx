import RankDetailsPage from "@/components/modules/tracking/rank-detail-page";

interface SpecificRankProps {
  params: Promise<{
    rankId: string;
  }>
}


const SpecificRank = async ({ params }: SpecificRankProps) => {
  const { rankId } = await params;
  return (
    <RankDetailsPage id={rankId} />
  )
};

export default SpecificRank;