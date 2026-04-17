import React, { useState, useMemo } from "react";
import TutorDashboardLayout from "layouts/TutorDashboard";
import { usePayouts, useRequestPayout } from "modules/tutor/hooks/usePayouts";
import { PayoutStatus } from "models/PayoutRequest";
import useEarnings from "@/tutor/hooks/useEarnings";
import moment from "moment";
import { toast } from "react-toastify";
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

const StatusBadge = ({ status }: { status: PayoutStatus }) => {
  const styles: Record<PayoutStatus, { bg: string; color: string }> = {
    [PayoutStatus.PAID]: { bg: "#d1e7dd", color: "#0f5132" },
    [PayoutStatus.APPROVED]: { bg: "#d1e7dd", color: "#0f5132" },
    [PayoutStatus.REJECTED]: { bg: "#f8d7da", color: "#842029" },
    [PayoutStatus.PENDING]: { bg: "#fff3cd", color: "#664d03" },
  };
  const s = styles[status] ?? styles[PayoutStatus.PENDING];
  return (
    <span
      style={{
        backgroundColor: s.bg,
        color: s.color,
        borderRadius: "20px",
        padding: "2px 10px",
        fontSize: "12px",
        fontWeight: 600,
      }}
    >
      {status}
    </span>
  );
};

function TutorPayouts() {
  const { data: payouts, isLoading: payoutsLoading } = usePayouts();
  const { data: earningsSummary, isLoading: earningsLoading } = useEarnings();
  const { mutate: requestPayout, isLoading: isRequesting } = useRequestPayout();
  const [amount, setAmount] = useState<string>("");

  const pendingAmount = useMemo(() => {
    if (!payouts) return 0;
    return payouts
      .filter((p) => p.status === PayoutStatus.PENDING)
      .reduce((sum, p) => sum + p.amount, 0);
  }, [payouts]);

  const handleRequest = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseFloat(amount);
    if (!num || num <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    requestPayout(
      { amount: num },
      { onSuccess: () => setAmount("") }
    );
  };

  const isLoading = payoutsLoading || earningsLoading;

  return (
    <TutorDashboardLayout>
      <h2 className="tutor__dashboard__title mb-4">My Payouts</h2>

      {/* Summary Cards */}
      <div className="row g-3 mb-5">
        <div className="col-6">
          <SummaryCard
            label="Available Balance"
            value={`$${(earningsSummary?.currentBalance ?? 0).toFixed(2)}`}
            color="#924781"
            isLoading={earningsLoading}
          />
        </div>
        <div className="col-6">
          <SummaryCard
            label="Pending Payout"
            value={`$${pendingAmount.toFixed(2)}`}
            color="#4E5A64"
            isLoading={payoutsLoading}
          />
        </div>
      </div>

      {/* Request Payout */}
      <h4 className="mb-3" style={{ color: "#924781", fontSize: "16px" }}>
        Request Payout
      </h4>
      <div className="transaction-summaries mb-5">
        <form onSubmit={handleRequest}>
          <div className="d-flex align-items-center gap-3">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                background: "#f5f5f5",
                borderRadius: "12px",
                padding: "0 14px",
                flex: 1,
                maxWidth: "320px",
              }}
            >
              <span style={{ color: "#888", fontWeight: 600, marginRight: "6px" }}>$</span>
              <input
                type="number"
                placeholder="0.00"
                min="1"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                style={{
                  border: "none",
                  background: "transparent",
                  outline: "none",
                  fontSize: "15px",
                  padding: "12px 0",
                  width: "100%",
                }}
              />
            </div>
            <button
              type="submit"
              disabled={isRequesting}
              style={{
                backgroundColor: "#924781",
                color: "#fff",
                border: "none",
                borderRadius: "12px",
                padding: "12px 28px",
                fontWeight: 600,
                fontSize: "14px",
                cursor: isRequesting ? "not-allowed" : "pointer",
                opacity: isRequesting ? 0.7 : 1,
              }}
            >
              {isRequesting ? <BeatLoader color="#fff" size={6} /> : "Request"}
            </button>
          </div>
        </form>
      </div>

      {/* Payout History */}
      <h4 className="mb-3" style={{ color: "#924781", fontSize: "16px" }}>
        Payout History
      </h4>
      <div className="transaction-summaries">
        {isLoading && (
          <div className="text-center py-5">
            <BeatLoader color="#924781" size={8} />
          </div>
        )}

        {!isLoading && (!payouts || payouts.length === 0) && (
          <div
            className="text-center py-5 text-muted"
            style={{ fontSize: "14px" }}
          >
            No payout requests yet.
          </div>
        )}

        {!isLoading &&
          payouts?.map((payout) => (
            <div className="transaction-item" key={payout.id}>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div
                    style={{ color: "#000", fontWeight: 500, fontSize: "14px" }}
                  >
                    Payout Request
                    {payout.adminNotes && (
                      <span
                        style={{
                          color: "#6D6A6A",
                          fontWeight: 400,
                          fontSize: "13px",
                          marginLeft: "8px",
                        }}
                      >
                        — {payout.adminNotes}
                      </span>
                    )}
                  </div>
                  <div
                    style={{
                      color: "#6D6A6A",
                      fontSize: "12px",
                      marginTop: "2px",
                    }}
                  >
                    {moment(payout.createdAt).format("DD MMM YYYY, hh:mm a")}
                  </div>
                </div>
                <div
                  className="d-flex align-items-center gap-3"
                  style={{ fontWeight: 600, fontSize: "15px" }}
                >
                  <StatusBadge status={payout.status} />
                  <span style={{ color: "#924781" }}>
                    ${payout.amount.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </TutorDashboardLayout>
  );
}

export default TutorPayouts;
