console.log('TestApplicationController');
class TestApplicationController extends ApplicationController {}

if (typeof window === 'object') {
    window.TestApplicationController = TestApplicationController;
} else {
    global.TestApplicationController = TestApplicationController;
}
