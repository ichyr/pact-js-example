I am forced to use **karma@0.10.10** with **jasmine@1.3.1**. Thus I've modified you syntax a bit in the sets ( excluded *done* ).

1. Run standalone pat-mock-server (pact-mock-service-0.7.2-1-win32.zip) from https://github.com/bethesque/pact-mock_service/releases
	https://github.com/bethesque/pact-mock_service/releases/download/v0.7.2/pact-mock-service-0.7.2-1-win32.zip

	with command 

	````
	pact-mock-service.bat --port 1234 --pact-specification-version 2.0.0
	````

2. Run npm install

3. Run tests with **npm test** or **node_modules/karma/bin/karma start**.

4. Tests will pass.

5. Go to the browser end enter

	**https://localhost:1234/alligators/Tommy**

	and

	**https://localhost:1234/alligators/Mary**

Question is **why I get correct data for Tommy and 'no interactions found' for Mary?**