const Hello = ({ name }) => {
  if (name) {
    return (
      <h1>Bonjour {name} !</h1>
    )
  }
  
  return (
    <h1>Salut étranger !</h1>
  );
};

export default Hello;
