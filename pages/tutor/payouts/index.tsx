import React, { useState, useMemo } from "react";
import TutorDashboardLayout from "layouts/TutorDashboard";
import { usePayouts, useRequestPayout } from "modules/tutor/hooks/usePayouts";
import { PayoutStatus } from "models/PayoutRequest";
import moment from "moment";
import { toast } from "react-toastify";
import {
  AttachMoney,
  AccessTime,
  CheckCircle,
  Cancel,
  History,
  TrendingUp,
  AccountBalanceWallet
} from "@mui/icons-material";

const TutorPayouts = () => {
  const { data: payouts, isLoading } = usePayouts();
  const { mutate: requestPayout, isLoading: isRequesting } = useRequestPayout();
  const [amount, setAmount] = useState<number | "">("");

  // Calculate stats
  const stats = useMemo(() => {
    if (!payouts) return { totalRequested: 0, totalPaid: 0, pendingAmount: 0 };
    return payouts.reduce(
      (acc, curr) => {
        acc.totalRequested += curr.amount;
        if (curr.status === PayoutStatus.PAID) {
          acc.totalPaid += curr.amount;
        } else if (curr.status === PayoutStatus.PENDING) {
          acc.pendingAmount += curr.amount;
        }
        return acc;
      },
      { totalRequested: 0, totalPaid: 0, pendingAmount: 0 }
    );
  }, [payouts]);

  const handleRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    requestPayout(
      { amount: Number(amount) },
      {
        onSuccess: () => {
          setAmount("");
        },
      }
    );
  };

  const getStatusBadge = (status: PayoutStatus) => {
    const styles = {
      [PayoutStatus.PAID]: { bg: "#d1e7dd", color: "#0f5132", icon: <CheckCircle fontSize="small" className="me-1" /> },
      [PayoutStatus.APPROVED]: { bg: "#d1e7dd", color: "#0f5132", icon: <CheckCircle fontSize="small" className="me-1" /> },
      [PayoutStatus.REJECTED]: { bg: "#f8d7da", color: "#842029", icon: <Cancel fontSize="small" className="me-1" /> },
      [PayoutStatus.PENDING]: { bg: "#fff3cd", color: "#664d03", icon: <AccessTime fontSize="small" className="me-1" /> },
    };
    const style = styles[status] || styles[PayoutStatus.PENDING];

    return (
      <span
        className="badge rounded-pill d-inline-flex align-items-center"
        style={{
          backgroundColor: style.bg,
          color: style.color,
          padding: "0.5em 0.8em",
          fontSize: "0.85em",
          fontWeight: 500,
        }}
      >
        {style.icon}
        {status}
      </span>
    );
  };

  return (
    <TutorDashboardLayout>
      <div className="container-fluid px-4 py-4">
        {/* Header */}
        <div className="d-flex align-items-center mb-5">
           <div className="bg-white p-3 shadow-sm rounded-circle me-3" style={{ color: "#5A294F" }}>
               <AccountBalanceWallet fontSize="large" />
           </div>
           <div>
              <h2 className="fw-bold mb-0 text-dark">Payouts</h2>
              <p className="text-muted mb-0">Manage your earnings and withdrawal requests</p>
           </div>
        </div>

        {/* Stats Row */}
        <div className="row mb-5 g-4">
          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100" style={{ borderRadius: "16px", background: "linear-gradient(135deg, #924781 0%, #5A294F 100%)", color: "white" }}>
              <div className="card-body p-4 d-flex flex-column justify-content-between">
                <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                        <h6 className="opacity-75 mb-1">Total Requested</h6>
                        <h3 className="fw-bold mb-0">${stats.totalRequested.toFixed(2)}</h3>
                    </div>
                    <TrendingUp fontSize="large" style={{ opacity: 0.8 }} />
                </div>
                <div className="small opacity-75">All time requested amount</div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100" style={{ borderRadius: "16px", background: "linear-gradient(135deg, #4fd6ca 0%, #3bbdb1 100%)", color: "white" }}>
              <div className="card-body p-4 d-flex flex-column justify-content-between">
                 <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                        <h6 className="opacity-75 mb-1">Total Paid</h6>
                        <h3 className="fw-bold mb-0">${stats.totalPaid.toFixed(2)}</h3>
                    </div>
                     <CheckCircle fontSize="large" style={{ opacity: 0.8 }} />
                </div>
                <div className="small opacity-75">Successfully transferred</div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100" style={{ borderRadius: "16px", background: "linear-gradient(135deg, #707283 0%, #515259 100%)", color: "white" }}>
              <div className="card-body p-4 d-flex flex-column justify-content-between">
                <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                        <h6 className="opacity-75 mb-1">Pending Amount</h6>
                        <h3 className="fw-bold mb-0">${stats.pendingAmount.toFixed(2)}</h3>
                    </div>
                     <AccessTime fontSize="large" style={{ opacity: 0.8 }} />
                </div>
                <div className="small opacity-75">Awaiting processing</div>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-4">
          {/* Request Form */}
          <div className="col-lg-4">
            <div className="card border-0 shadow-sm h-100" style={{ borderRadius: "16px" }}>
              <div className="card-body p-4">
                <h5 className="fw-bold mb-4 d-flex align-items-center">
                    <AttachMoney className="me-2 text-primary" /> Request Payout
                </h5>
                <p className="text-muted small mb-4">
                    Enter the amount you wish to withdraw from your available balance.
                </p>
                <form onSubmit={handleRequest}>
                  <div className="mb-4">
                    <label htmlFor="amount" className="form-label text-muted small fw-bold text-uppercase">
                      Amount (USD)
                    </label>
                    <div className="input-group input-group-lg">
                      <span className="input-group-text bg-light border-end-0 text-muted">$</span>
                      <input
                        type="number"
                        className="form-control border-start-0 bg-light"
                        id="amount"
                        placeholder="0.00"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        min="1"
                        step="0.01"
                        style={{ fontSize: "1.2rem", fontWeight: 600 }}
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary w-100 py-3 fw-bold shadow-sm"
                    disabled={isRequesting}
                    style={{
                        backgroundColor: "#5A294F",
                        borderColor: "#5A294F",
                        borderRadius: "12px",
                        letterSpacing: "0.5px"
                    }}
                  >
                    {isRequesting ? "Processing..." : "Submit Request"}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* History Table */}
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm h-100" style={{ borderRadius: "16px" }}>
              <div className="card-body p-0">
                  <div className="p-4 border-bottom">
                     <h5 className="fw-bold mb-0 d-flex align-items-center">
                        <History className="me-2 text-secondary" /> History
                     </h5>
                  </div>
                {isLoading ? (
                  <div className="text-center py-5">
                      <div className="spinner-border text-primary" role="status">
                          <span className="visually-hidden">Loading...</span>
                      </div>
                  </div>
                ) : payouts && payouts.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                      <thead className="bg-light">
                        <tr>
                          <th scope="col" className="ps-4 py-3 text-muted small text-uppercase fw-bold border-0">Date</th>
                          <th scope="col" className="py-3 text-muted small text-uppercase fw-bold border-0">Amount</th>
                          <th scope="col" className="py-3 text-muted small text-uppercase fw-bold border-0">Status</th>
                          <th scope="col" className="py-3 text-muted small text-uppercase fw-bold border-0 text-end pe-4">Notes</th>
                        </tr>
                      </thead>
                      <tbody>
                        {payouts.map((payout) => (
                          <tr key={payout.id} style={{ cursor: "default" }}>
                            <td className="ps-4 py-3 border-bottom-0">
                                <div className="fw-bold text-dark">{moment(payout.createdAt).format("MMM DD, YYYY")}</div>
                                <div className="small text-muted">{moment(payout.createdAt).format("HH:mm A")}</div>
                            </td>
                            <td className="py-3 border-bottom-0">
                                <span className="fw-bold" style={{ fontSize: "1.1rem" }}>
                                    {payout.currency} {payout.amount.toFixed(2)}
                                </span>
                            </td>
                            <td className="py-3 border-bottom-0">
                              {getStatusBadge(payout.status)}
                            </td>
                            <td className="py-3 border-bottom-0 text-end pe-4">
                                {payout.adminNotes ? (
                                    <span className="text-muted small d-inline-block text-truncate" style={{ maxWidth: "200px" }} title={payout.adminNotes}>
                                        {payout.adminNotes}
                                    </span>
                                ) : (
                                    <span className="text-muted small">-</span>
                                )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-5 text-muted">
                    <AccountBalanceWallet fontSize="large" className="mb-3 opacity-25" />
                    <p className="mb-0">No payout requests found.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </TutorDashboardLayout>
  );
};

export default TutorPayouts;
