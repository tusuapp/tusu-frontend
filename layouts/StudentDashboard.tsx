import Header from "@/student/components/Header";
import { AnimatePresence, motion } from "framer-motion";
import Head from "next/head";
import Footer from "components/footer";

interface Props {
  children: React.ReactNode;
}

const StudentDashboardLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Tusu - Student Dashboard</title>
      </Head>
      <Header />

      <AnimatePresence>
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer />
    </>
  );
};

export default StudentDashboardLayout;
