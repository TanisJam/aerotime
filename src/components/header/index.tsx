import { Layout } from './header';

interface HeaderProps {
  children: React.ReactNode;
}

export const Header = ({ children }: HeaderProps) => {
  return <Layout>{children}</Layout>;
};
