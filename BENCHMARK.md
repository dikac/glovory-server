# Running Benchmark

### Unix
```./ghz --insecure --proto ./protos/auth.proto --call glovory.Auth.Login -d '{ "username": "Hello", "password": "Hello"}' 0.0.0.0:5051```
```./ghz --insecure --proto ./protos/auth.proto --call glovory.Address.List -d '{ \"user_id\": \"02704cb9-b7fb-4d47-8457-0510cdbde619\" }' -m '{\"authorization\": \"bearer GlovoryBearerAuth\"}' 0.0.0.0:5051```
### Win
```./ghz --insecure --proto ./protos/auth.proto --call glovory.Auth.Login -d '{ \"username\": \"Hello\", \"password\":\"Hello\"}' 0.0.0.0:5051```
```./ghz --insecure --proto ./protos/auth.proto --call glovory.Address.List -d '{ \"user_id\": \"02704cb9-b7fb-4d47-8457-0510cdbde619\" }' -m '{"authorization": "bearer GlovoryBearerAuth"}' 0.0.0.0:5051```
