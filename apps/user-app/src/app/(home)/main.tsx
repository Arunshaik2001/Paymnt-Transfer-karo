import sessionAtom from "@/store/atoms/sessionAtom";
import { useRecoilValue } from "recoil";
import Loader from "./loader";

export default function MainComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useRecoilValue(sessionAtom);

  if (!user) {
    return <Loader />;
  }
  return <>{children}</>;
}
