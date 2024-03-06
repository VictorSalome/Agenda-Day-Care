import { MainContentProps } from "../../../interfaces";

const MainContent: React.FC<MainContentProps> = ({ children }) => {
  return <div className="h-screen flex-1 p-0.4">{children}</div>;
};

export default MainContent;
