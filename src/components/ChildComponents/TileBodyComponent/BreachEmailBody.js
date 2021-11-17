import React from "react";

const BreachEmailBody = ({ data }) => {
  const { emails } = data;

  return (
    <div>
      {!(emails === undefined) &&
        emails.map((email) => {
          return !(email[0].email === undefined) && <li>{email[0].email}</li>;
        })}
    </div>
  );
};

export default BreachEmailBody;
