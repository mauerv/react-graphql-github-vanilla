import React from "react";

const Organization = (organization, errors) => {
  console.log(errors);

  /* TODO: Github API changed how errors are sent and not whis is broken. 
  if (errors) {
    return (
      <p>
        <strong>Something went wrong:</strong>
        {errors.map((error) => error.message).join(" ")}
      </p>
    );
	}
	*/

  return (
    <div>
      <p>
        <strong>Issues from Organization:</strong>
        <a href={organization.url}>{organization.name}</a>
      </p>
    </div>
  );
};

export default Organization;
