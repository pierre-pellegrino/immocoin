import Header from "../header";

const Layout = ({ children }) => {
  return (
    <div className="Layout">
      <Header />
      <main>
        {children}
      </main>
    </div>
  );
};

export default Layout;
