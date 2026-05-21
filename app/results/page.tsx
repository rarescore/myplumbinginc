import ResultClient from "../components/ResultClient";

export const metadata = {
  robots: { index: false, follow: false },
  title: "Your RareScore Result",
};

export default function Page() {
  return <ResultClient />;
}
