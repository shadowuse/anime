import nodeAssert from 'assert/strict';

export function assertEqual(val, expected, msg) {
  nodeAssert.deepEqual(val, expected);
}

export function runTests(tests) {
  let numFailures = 0;

  console.log('--- RUNNING TESTS ---');

  for (let test of tests) {
    try {
      console.log(`${test.name}`);
      test();
    } catch (e) {
      console.log(`${test.name}: ${e.message}`);
      numFailures++;
    }
  }

  if (numFailures > 0) {
    console.log(`${numFailures} tests failed`);
  } else {
    console.log(`----------------`)
    console.log(`ALL TESTS PASSED`)
  }
}
