import Hero from "../components/Hero";
import TransactionPreview from "../components/TransactionPreview";
import ReportSummary from "../components/ReportSummary";
import ExportReportCard from "../components/ExportReportCard";
import PageWrapper from "../components/PageWrapper";

const Reports = () => {
    return (
        <PageWrapper>
            <div className="space-y-4">
                <Hero />

                <div className="flex flex-col xl:flex-row gap-4">
                    {/* Left Side */}
                    <div className="xl:w-[70%]">
                        <TransactionPreview />
                    </div>

                    {/* Right Side */}
                    <div className="xl:w-[30%] flex flex-col gap-4">
                        <ReportSummary />
                        <ExportReportCard />
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
};

export default Reports;