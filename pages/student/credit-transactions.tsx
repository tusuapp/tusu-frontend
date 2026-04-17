import Header from "../../components/header";
import Container from "../../components/container";
import Footer from "../../components/footer";

import Head from "next/head";
import useCreditTransactions from "@/student/hooks/useCreditTransactions";
import moment from "moment";
import { useState } from "react";

function CreditTransaction() {
  const [page, setPage] = useState(0);
  const { data, isLoading } = useCreditTransactions(page, 20);

  const transactions = data?.transactions ?? [];
  const totalPages = data?.totalPages ?? 0;

  return (
    <>
      <Head>
        <title>Tusu - Student | Dashboard</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <Container>
        <div className="container">
          <div className="inner-container">
            <h3 className="small-header">Credit Points Transaction History</h3>
            <div className="table-responsive">
              <table className="table table-borderless bg-light mt-4 mb-5">
                <thead>
                  <tr className="d-flex text-muted" style={{ fontSize: "13px" }}>
                    <th className="col-4 col-md-2 col-lg-2">Date</th>
                    <th className="col-6 col-md-7 col-lg-7">Description</th>
                    <th className="col-2 col-md-3 col-lg-3 text-end">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading && (
                    <tr>
                      <td colSpan={3} className="text-center py-4">
                        Loading...
                      </td>
                    </tr>
                  )}
                  {!isLoading && transactions.length === 0 && (
                    <tr>
                      <td colSpan={3} className="text-center py-4 text-muted">
                        No transactions found.
                      </td>
                    </tr>
                  )}
                  {transactions.map((item: any) => (
                    <tr className="d-flex" key={item.id}>
                      <td className="col-4 col-md-2 col-lg-2">
                        {moment(item.createdAt).format("DD/MM/YYYY")}
                      </td>
                      <td className="col-6 col-md-7 col-lg-7">
                        {item.description}
                      </td>
                      <td
                        className={`col-2 col-md-3 col-lg-3 text-end fw-semibold ${
                          item.type === "CREDIT" ? "text-success" : "text-danger"
                        }`}
                      >
                        {item.type === "CREDIT" ? "+" : "-"}
                        {item.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="d-flex justify-content-center align-items-center gap-3 mb-5">
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
        </div>
      </Container>

      <Footer />
    </>
  );
}

export default CreditTransaction;
