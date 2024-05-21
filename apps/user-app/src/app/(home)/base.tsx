
import AppBar from "./components/AppBar";
import SideBar from "./components/SideBar";
import MainComponent from "./main";

export default function BaseComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="min-w-screen min-h-screen bg-homeBg">
        <AppBar />
        <div className="flex">
          <div className="w-72 border-r border-slate-300 min-h-screen mr-4 pt-28  ">
            <div>
              <SideBar />
            </div>
          </div>
          <MainComponent>{children}</MainComponent>
        </div>
      </div>
    </>
  );
}
