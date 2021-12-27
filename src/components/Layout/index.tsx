import Header from '../Header';
import { LayoutWrapper } from './Layout.style';

interface LayoutPropsType {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutPropsType) => {
  return (
    <LayoutWrapper>
      <Header />
      {children}
    </LayoutWrapper>
  );
};

export default Layout;
