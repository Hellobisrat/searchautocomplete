# search auto complete 

# Component Structure
Your SearchAutoComplete component consists of several key pieces:

State Variables: To manage different states such as loading status, user data, error messages, search parameters, dropdown visibility, and filtered user data.

Effect Hook (useEffect): To fetch the list of users when the component mounts.

Event Handlers: To manage user interactions like input changes and dropdown item clicks.

Render Logic: To display different UI elements based on the state.


# Input Change Handler
This function handles changes in the search input and updates the state accordingly:

function handleChange(event) {
  const query = event.target.value.toLowerCase(); // Get the input value and convert to lowercase
  setSearchParam(query); // Update the search parameter state
  if (query.length > 1) { // Only filter users if the input length is greater than 1
    const filteredData = users.filter(item => item.toLowerCase().includes(query)); // Filter users based on the input
    setFilteredUsers(filteredData); // Update the filtered users state
    setShowDropdown(true); // Show the dropdown
  } else {
    setShowDropdown(false); // Hide the dropdown if the input length is less than or equal to 1
  }
}

# Click Handler
This function handles clicks on dropdown items:

function handleClick(event) {
  setShowDropdown(false); // Hide the dropdown
  setSearchParam(event.target.innerText); // Set the search parameter to the clicked item text
  setFilteredUsers([]); // Clear the filtered users
}

# Render Logic
The component's render method includes conditions to display different UI elements based on the state:

return (
  <div className="search-autocomplete-container">
    {loading ? (
      <h1>Loading Data! Please wait...</h1> // Display loading message if loading is true
    ) : (
      <>
        <input
          value={searchParam} // Bind input value to searchParam state
          name="search-users"
          placeholder="Search Users here..."
          onChange={handleChange} // Handle input change
        />
        {showDropdown && <Suggestions handleClick={handleClick} data={filteredUsers} />} // Show dropdown if showDropdown is true
        {error && <div>{error}</div>} // Display error message if error is not null
      </>
    )}
  </div>
);

# Suggestions Component
The Suggestions component renders a list of filtered users as dropdown items:

function Suggestions({ handleClick, data }) {
  return (
    <ul className="suggestions-dropdown">
      {data.map((item, index) => (
        <li key={index} onClick={handleClick}>
          {item}
        </li>
      ))}
    </ul>
  );
}



# bisrat November 21 2024