   'use strict';

    describe('Client', function() {
        var client, helloProvider, http;

        beforeEach(inject(function() {
            //ProviderClient is the class you have written to make the HTTP calls to the provider
            var i = angular.injector(['ng']), rs = i.get('$rootScope');
            http = i.get('$http');
            var ProviderClient = function(hostName) {
                return {
                    get: function(url) {
                        console.log('GET METHOD CALLED');
                        return http.get('http://localhost:1234/alligators/Tommy');
                    }
                }
            };

            client = new ProviderClient('http://localhost:1234');
            helloProvider = Pact.mockService({
                consumer: 'Antuanett1',
                provider: 'Data1',
                port: 1234,
                done: function(error) {
                    expect(error).toBe(null);
                }
            });
        }));

        it('should say hello', function() {
            helloProvider
                .given('an alligator with the name Tommy exists')
                .uponReceiving('a request for an alligator')
                .withRequest('get', '/alligators/Tommy', {
                }).willRespondWith(200, {
                    'Content-Type': 'application/json'
                }, {
                    'name': 'Tommy'
                });
            var flag;
            var done = function() {
                console.log("It's DONE");
            };
            var result;
            runs(function() {
                helloProvider.run(done, function(runComplete) {
                    client.get('/alligators/Tommy').then(function(data) {
                        console.log('CALLLBACK CALLED');
                        result = data.data;
                        flag = true;
                        runComplete();
                    }, function(error) {
                        console.log(error);
                        flag = true;
                        runComplete();
                    });

                })
            });
            waitsFor(function() {
                return flag;
            });

            runs(function() {
                expect(result).toEqual({name: 'Tommy'});
            });
        });
    });