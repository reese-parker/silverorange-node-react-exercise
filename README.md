silverorange Intermediate Developer Assessment
==============================================

This is my submission for the silverorange Intermediate Developer Assessment.
The tasks have been completed using vanilla Javascript, additional libraries were installed through NPM. The exercise was completed within the 4 hour limit and below are the steps I took.  

### Task A

* Installed axios for get request to GitHub API. Imported local data using ES6 modules.
* Created an aggregate data array using the spread operator on data sources, filtering the result to only include projects with a false repository.fork boolean.
* Sent the aggregate data as json with the appropriate status code. res.json handles setting the content type.

### Task B

 * Set up folder structure along with Repo and Repos components for data display.
 * Installed axios to fetch repos data and created a loadingStatus variable to facilitate dynamic rendering. If the get request fails, the loading state is set to 'failed' and the app renders short error message and retry button. The successful reponse is saved to state in reverse chronological order(achieved through a helper function). useEffect calls the fetch function on initial page load.
 * Updated the fetch function to set the state for languages found in the data, using the Set method to return an array of unique languages. I then mapped over this array to create the buttons that update a languageFilter variable in state.
 * Mapped over the data to render Repo components, applying the filter variable if neccessary. Used axios to make a get request for any README data, updating state if successful. Moved commit and markdown data into a modal container, created state variable for the modals display status. Installed the react-markdown library to display the README.
 * Attempted to create function to retrieve commit data, however I encountered errors trying access the data. My thought process was to use axios to make a get request to the commit_url data found in the repos, however this reponds with a 404 error. I researched the issue online and found the Octokat library for GitHubs api and attempted to implement it, but the get requests still returned errors. I have marked this as a bug for further review.
 * Extracted the logic for fetching data from the server to a custom hook. The README request could also be moved here once the aforementioned issue is resolved. 
 * Applied styling to components using CSS modules. Installed dayjs library to format the date information.

### Additional notes

When researching your team before applying I read and enjoyed your blog post on "Roughing Things In". It was interesting to read your views on managing projects and I've tried to apply those philosophies as much as possible while completing this exercise.



### Running the Express Application

```sh
cd api/
yarn install
yarn start
```

You can verify the API is working by visiting http://localhost:4000/repos in
your browser or another HTTP client. **Please note that about 25% of the time,
the API returns an error message.**



### Running the Expo Application

```sh
cd web/
yarn install
yarn start
```

This will open your browser at http://localhost:3000, allowing you to test the
React client.
