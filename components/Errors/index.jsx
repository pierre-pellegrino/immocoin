const Errors = ({ serverErrors }) => (
  <div className="errors">
    {serverErrors.split(";").map((error) => (
      <p key={error} style={{ color: "var(--red)" }}>
        {error}
      </p>
    ))}
  </div>
);

export default Errors;
