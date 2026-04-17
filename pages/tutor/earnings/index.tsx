import TutorDashboardLayout from "layouts/TutorDashboard";
import useEarningsHistory from "@/tutor/hooks/useEarningsHistory";
import { useState } from "react";
import moment from "moment";
import BeatLoader from "react-spinners/BeatLoader";

const SummaryCard = ({
  label,
  value,
  color,
  isLoading,
}: {
  label: string;
  value: string;
  color: string;
  isLoading: boolean;
}) => (
  <div
    className="p-4 h-100"
    style={{
      borderRadius: "16px",
      background: color,
      color: "#fff",
    }}
  >
    <div style={{ fontSize: "13px", opacity: 0.85, marginBottom: "8px" }}>
      {label}
    </div>
    <div style={{ fontSize: "26px", fontWeight: 700 }}>
      {isLoading ? <BeatLoader color="#fff" size={7} /> : value}
    </div>
  </div>
);

function Earnings() {
  const [page, setPage] = useState(0);
  const { data, isLoading } = useEarningsHistory(page, 20);

  const summary = data?.summary;
  const history = data?.history ?? [];
  const totalPages = data?.totalPages ?? 0;

  return (
    <TutorDashboardLayout>
      <h2 className="tutor__dashboard__title mb-4">My Earnings</h2>

      {/* Summary Cards */}
      <div className="row g-3 mb-5">
        <div className="col-6 col-lg-3">
          <SummaryCard
            label="Total Earned"
            value={`$${(summary?.totalEarned ?? 0).toFixed(2)}`}
            color="#fbb017"
            isLoading={isLoading}
          />
        </div>
        <div className="col-6 col-lg-3">
          <SummaryCard
            label="Current Balance"
            value={`$${(summary?.currentBalance ?? 0).toFixed(2)}`}
            color="#924781"
            isLoading={isLoading}
          />
        </div>
        <div className="col-6 col-lg-3">
          <SummaryCard
            label="Total Withdrawn"
            value={`$${(summary?.totalWithdrawn ?? 0).toFixed(2)}`}
            color="#5A294F"
            isLoading={isLoading}
          />
        </div>
        <div className="col-6 col-lg-3">
          <SummaryCard
            label="Total Classes"
            value={String(summary?.totalClasses ?? 0)}
            color="#4E5A64"
            isLoading={isLoading}
          />
        </div>
      </div>

      {/* Earnings History */}
      <h4 className="mb-3" style={{ color: "#924781", fontSize: "16px" }}>
        Earnings History
      </h4>
      <div className="transaction-summaries">
        {isLoading && (
          <div className="text-center py-5">
            <BeatLoader color="#924781" size={8} />
          </div>
        )}

        {!isLoading && history.length === 0 && (
          <div
            className="text-center py-5 text-muted"
            style={{ fontSize: "14px" }}
          >
            No earnings history yet.
          </div>
        )}

        {history.map((item: any) => (
          <div className="transaction-item" key={item.id}>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <div
                  style={{ color: "#000", fontWeight: 500, fontSize: "14px" }}
                >
                  {item.description}
                </div>
                <div
                  style={{
                    color: "#6D6A6A",
                    fontSize: "12px",
                    marginTop: "2px",
                  }}
                >
                  {moment(item.createdAt).format("DD MMM YYYY, hh:mm a")}
                </div>
              </div>
              <div style={{ fontWeight: 600, fontSize: "15px" }}>
                {item.type === "DEBIT" ? (
                  <span style={{ color: "red" }}>
                    -${Math.abs(item.amount).toFixed(2)}
                  </span>
                ) : (
                  <span style={{ color: "green" }}>
                    +${Number(item.amount).toFixed(2)}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}

        {totalPages > 1 && (
          <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
            >
              Previous
            </button>
            <span style={{ fontSize: "14px" }}>
              Page {page + 1} of {totalPages}
            </span>
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page >= totalPages - 1}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </TutorDashboardLayout>
  );
}

export default Earnings;
