export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white",
  };
  return (
    <button
      style={styles}
      className={props.className}
      onClick={props.dieHeld}
    >
      {props.value}{""}
    </button>
  );
}
