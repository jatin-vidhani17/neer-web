import React from 'react';

const VolunteerYourself = () => {
  return (
    <div className="registration-content">
            <h3>New Registration</h3>
            <form id="registrationForm" method="post">
                <input type="text" name="fname" placeholder="Enter First Name" required />
                <input type="text" name="lname" placeholder="Enter Last Name" required />
                <div>
                    <span>Gender:</span>
                    <label>
                        <input type="radio" name="gender" value="m" required /> Male
                    </label>
                    <label>
                        <input type="radio" name="gender" value="f" required /> Female
                    </label>
                </div>
                <input type="email" name="email" placeholder="Enter Email" required />
                <input type="tel" name="phone" placeholder="Enter Mobile No." pattern="[0-9]{10}" required />
                <input type="text" name="insti" placeholder="Enter Institute Name" required />
                <input type="text" name="state" placeholder="Select State" required />
                <input type="text" name="city" placeholder="Select City" required />
                <input type="password" name="pass" placeholder="Enter Password" required minLength="8" maxLength="16" />
                <input type="password" name="pass_conf" placeholder="Confirm Password" required minLength="8" maxLength="16" />
                <input type="submit" value="Submit" />
            </form>
        </div>
  );
};

export default VolunteerYourself;
