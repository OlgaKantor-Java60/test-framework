function myReduce(array, callback, initialValue) {
  let index = initialValue == undefined ? 1 : 0;
  let acc = initialValue ?? array[0]; // now '0' = 'true'
  for (; index < array.length; index++) {
    acc = callback(acc, array[index], index, array);
  }
  return acc;
}

function minMaxValue(array) {
  const res = myReduce(array, (acc, curr) => {
    acc[0] = acc[0] > curr ? curr : acc[0];
    acc[1] = acc[1] < curr ? curr : acc[1];
    return [acc[0],acc[1]];
  }, [array[0], array[0]]);
  return res;
}

let arr1 = [155, 2000, 0, -10, 1];
let arr2 = ["kukareku", "TelRan", "str", "60", "JavaScript"];

console.log(test({script: 'minMaxValue(["hello", "kuku", "abc"])', expected: ["abc", "kuku"]}));
console.log(test({script: 'minMaxValue([155, 2000, 0, -10, 1])', expected: [-10, 2000]}));

function test(testObj){
  // testObj structure {
  //      script: <string containing script text>, expected: <any type>
  //      }
  // returns resultObject with structure {
  //      script: <string containing script text>, 
  //      expected JSON: <JSON string, containing expected result>, 
  //      actual JSON: <JSON string containing actual result>,
  //      result: <string containing either 'passed' or 'failed'>
  //      }
  const expectedJSON = JSON.stringify(testObj.expected);
  let evalRes;
  try {
      evalRes = eval(testObj.script);
  } catch (error) {
      evalRes = error;
  }
  const actualJSON = JSON.stringify(evalRes);
  const result = expectedJSON === actualJSON ? 'passed' : 'failed';
  const testResult = createTestResult(testObj.script, expectedJSON, actualJSON, result);
  return testResult;
}

function createTestResult(script, expectedJSON, actualJSON, result) {
  return {script, expectedJSON, actualJSON, result};
}

function testFramework(scripts, expectedResults) {
  //TODO
  //input
  //scripts - array of tested scripts 
  //expected result - array of appropriate results
  //scripts[i] and expectedResults[i] should be consistent
  //************** */
  //output
  const bodyElement = document.querySelector('body');
  // bodyElement.innerHTML = <orderedList of test results with coloring legend: passed by green, failed by red>
  // after list summery including number of passed/failed tests (same coloring)
  //presenting list items on the browser
}