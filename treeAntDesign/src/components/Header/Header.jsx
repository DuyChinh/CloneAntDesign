import classes from "./Header.module.css"

function Header() {
  return (
    <header className={classes.header}>
      <h1>Demo Tree</h1>
      <a href="https://github.com/DuyChinh/CloneAntDesign" target="blank">
        <i className="fa-brands fa-github" style={{ fontSize: "3rem" }}></i>
      </a>
    </header>
  );
}

export default Header