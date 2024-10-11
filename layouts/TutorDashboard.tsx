import TutorContainer from "components/tutorContainer";
import Content from "@/tutor/components/Content";
import Header from "@/tutor/components/Header";
import Sidebar from "@/tutor/components/Sidebar";
import { AnimatePresence, motion } from "framer-motion";
import Head from "next/head";

const TutorDashboardLayout: React.FC = ({ children }) => {
  return (
    <>
      <Head>
        <title>Tusu - Tutor Dashboard</title>
      </Head>
      <Header />
      <TutorContainer>
        <Sidebar />

        <Content>
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
        </Content>
      </TutorContainer>
    </>
  );
};

export default TutorDashboardLayout;
