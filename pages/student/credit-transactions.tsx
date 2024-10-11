import Header from "../../components/header";
import Container from "../../components/container";
import Footer from "../../components/footer";

import Head from "next/head";
import useCreditTransactions from "@/student/hooks/useCreditTransactions";
import moment from "moment";

function CreditTransaction() {
  const { data } = useCreditTransactions();
  console.log(data);
  
  return (
    <>
      <Head>
        <title>Tusu - Student | Dashboard</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <Header />
      <Container>
        <div className="container">
          <div className="inner-container">
            <h3 className="small-header">Credit Points Transaction History</h3>
            <div className="table-responsive">
              <table className="table table-borderless bg-light mt-4 mb-5">
                <tbody>
                  {data?.map((item: any)=>(
                    <tr className="d-flex">
                    <td className="col-4 col-md-2 col-lg-2">{item?.date} </td>
                    <td className="col-6 col-md-7 col-lg-7">
                      {item?.notes}
                    </td>
                    <td
                      className={ item?.transaction_type == "credit" ? "col-2 col-md-3 col-lg-3 text-success" : "col-2 col-md-3 col-lg-3 text-danger"}
                      align="right"
                    >
                      {item?.transaction_type == "credit" ? "+" : "-"}
                      {item?.amount}
                    </td>
                  </tr>
                  ))}
                  
                  
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Container>

      <Footer />
    </>
  );
}

export default CreditTransaction;
