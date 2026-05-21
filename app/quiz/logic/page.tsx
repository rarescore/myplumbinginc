import QuizRunner from "../../components/QuizRunner";

export const metadata = {
  robots: { index: false, follow: false },
  title: "RareScore Quiz",
};

export default function Page() {
  return <QuizRunner type="logic" />;
}
