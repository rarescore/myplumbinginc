import FreshSetClient from "../components/FreshSetClient";

export const metadata = {
  title: "Fresh 30 Question Set | RareScore",
  description: "Unlock a fresh 30-question version of your selected RareScore test and compare your second result.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <FreshSetClient />;
}
