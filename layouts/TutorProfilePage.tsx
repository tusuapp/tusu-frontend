import TutorContainer from "components/tutorContainer";
import ProfileContent from "@/tutor/components/ProfileContent";
import Header from "@/tutor/components/Header";
import { AnimatePresence, motion } from "framer-motion";
import Head from "next/head";

const TutorProfilePage: React.FC = ({ children }) => {
  return (
    <>
      <Head>
        <title>Tusu - Tutor Dashboard</title>
      </Head>
      <Header />
      <TutorContainer>
        <ProfileContent>
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
        </ProfileContent>
      </TutorContainer>
    </>
  );
};

export default TutorProfilePage;
