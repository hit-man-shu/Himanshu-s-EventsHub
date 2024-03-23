export default function Header({ children }) {
  return (
    <>
      <header id="main-header">
        <div id="header-title">
          <h1>{"Himanshu's EventsHub"}</h1>
        </div>
        <nav>{children}</nav>
      </header>
    </>
  );
}
