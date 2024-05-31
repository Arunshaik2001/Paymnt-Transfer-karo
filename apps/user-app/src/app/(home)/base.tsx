
import AppBar from "./components/AppBar";
import SideBar from "./components/SideBar";
import MainComponent from "./main";

export default function BaseComponent({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-w-screen min-h-screen bg-homeBg">
      <AppBar />
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-72 border-b md:border-b-0 md:border-r border-slate-300 md:min-h-screen md:pt-28">
          <SideBar />
        </div>
        <MainComponent>{children}</MainComponent>
      </div>
    </div>
  );
}
